---
title: "Service Mesh with Envoy"
date: "2020-07-03"
coverImage: "front-image.jpeg"
author: "Piyush Kumar"
tags: ["Service Mesh", "Envoy", "Microservices"]
---


This post will cover a demo working setup of a service mesh architecture using Envoy using a demo application. In this service mesh architecture, we will be using Envoy proxy for both control and data plane. The setup is deployed in a Kubernetes cluster using Amazon EKS.

# Pre-requisites

We will be deploying an echo-grpc test application provided by Google in their article related to gRPC load balancing and was used as a reference to test the service mesh setup with Envoy. The article covers setting up Envoy as an edge proxy only.
This is a simple gRPC application that exposes a unary method that takes a string in the content request field and responds with the content unaltered.
Repo: https://github.com/GoogleCloudPlatform/grpc-gke-nlb-tutorial
- Clone this repo.
- Go to the echo-grpc directory.
- Using the Dockerfile provided in the folder, we would have to build the image and push it to the Docker registry of choice. Since we are not using GCP, Docker Hub is used as the registry.
- Run docker login and login with your hub credentials.
- Build the image docker build -t echo-grpc .
- Tag the image docker tag echo-grpc <hub-username>/echo-grpc
- Push the image docker push <hub-username>/echo-grpc
- Create a separate folder to put all the YAML files.
- Create namespace in k8s:
  ```kubectl create namespace envoy```
- Install grpcurl tool which is similar to curl but for gRPC for testing:
    ```go get github.com/fullstorydev/grpcurl```


# Sidecar Deployment

Configuration of envoy for the sidecar deployment:

**envoy-echo.yaml:**
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: envoy-echo
data:
  envoy.yaml: |
    static_resources:
      listeners:
      - address:
          socket_address:
            address: 0.0.0.0
            port_value: 8786
        filter_chains:
        - filters:
          - name: envoy.http_connection_manager
            config:
              access_log:
              - name: envoy.file_access_log
                config:
                  path: "/dev/stdout"
              codec_type: AUTO
              stat_prefix: ingress_https
              route_config:
                name: local_route
                virtual_hosts:
                - name: https
                  domains:
                  - "*"
                  routes:
                  - match:
                      prefix: "/api.Echo/"
                    route:
                      cluster: echo-grpc
              http_filters:
              - name: envoy.health_check
                config:
                  pass_through_mode: false
                  headers:
                  - name: ":path"
                    exact_match: "/healthz"
                  - name: "x-envoy-livenessprobe"
                    exact_match: "healthz"
              - name: envoy.router
                config: {}
      clusters:
      - name: echo-grpc
        connect_timeout: 0.5s
        type: STATIC
        lb_policy: ROUND_ROBIN
        http2_protocol_options: {}
        load_assignment:
          cluster_name: echo-grpc
          endpoints:
          - lb_endpoints:
            - endpoint:
                address:
                  socket_address:
                    address: "127.0.0.1"
                    port_value: 8081
        health_checks:
          timeout: 1s
          interval: 10s
          unhealthy_threshold: 2
          healthy_threshold: 2
          grpc_health_check: {}
    admin:
      access_log_path: "/dev/stdout"
      address:
        socket_address:
          address: 127.0.0.1
          port_value: 8090
```

A couple things to note here. 
- We are exposing sidecar on 8786 port on the container. 
- Filter **envoy.http_connection_manager** handles the HTTP traffic. 
- **route_config** is used to define the routes for each domain to their respective clusters. Here we are keeping the domain as `*`, allowing all domains to pass-through.
- A cluster is envoy defines the services that will be called based on the route.
- In the cluster, the **lb_policy** defines the algorithm for load balancing, keeping as ROUND_ROBIN, with type STATIC because it is a sidecar and needs to communicate to only one pod always which leads to the reason for keeping the address in socket_address as localhost while port_value is what will be exposed by that particular service’s deployment.

Run:
    ```kubectl apply -f envoy-echo.yaml -n envoy```

Deployment of echo-grpc application with 3 replicas. The config contains two containers, one for application and another being the Envoy image.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-grpc
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo-grpc
  template:
    metadata:
      labels:
        app: echo-grpc
    spec:
      containers:
      - name: echo-grpc
        image: <hub-username>/echo-grpc
        imagePullPolicy: Always
        resources: {}
        env:
        - name: "PORT"
          value: "8081"
        ports:
        - containerPort: 8081
        readinessProbe:
          exec:
            command: ["/bin/grpc_health_probe", "-addr=:8081"]
          initialDelaySeconds: 1
        livenessProbe:
          exec:
            command: ["/bin/grpc_health_probe", "-addr=:8081"]
          initialDelaySeconds: 1
      - name: envoy
        image: envoyproxy/envoy:v1.9.1
        resources: {}
        ports:
        - name: https
          containerPort: 443
        volumeMounts:
        - name: config
          mountPath: /etc/envoy
      volumes:
        - name: config
          configMap:
            name: envoy-echo
```

Here, echo-grpc is test application and envoy is being deployed in the same pod. Config volumes are mounted so that the envoy can read the configmaps.

Run:
```kubectl apply -f echo-deployment.yaml -n envoy```

# Headless Service Configuration

We are using headless service for echo-grpc. Using service as headless will expose the Pods IP to the DNS server of kubernetes which will be used by Envoy to do service discovery for the pods.

**echo-service.yaml**
```
apiVersion: v1
kind: Service
metadata:
  name: echo-grpc
spec:
  type: ClusterIP
  clusterIP: None
  selector:
    app: echo-grpc
  ports:
  - name: http2-echo
    protocol: TCP
    port: 8786
  - name: http2-service
    protocol: TCP
    port: 8081
```

In the above config file, we are exposing two ports, one for envoy sidecar (this is the same port we mentioned in the config map of sidecar envoy) and one for the service itself.

Run:
```kubectl apply -f echo-service.yaml -n envoy```

# Front Envoy Configuration

Creating a service of type LoadBalancer so that client can access the backend service.

**envoy-service.yaml:**
```
apiVersion: v1
kind: Service
metadata:
  name: envoy
spec:
  type: LoadBalancer
  selector:
    app: envoy
  ports:
  - name: https
    protocol: TCP
    port: 443
    targetPort: 443
```

### Creating self-signed certificates
Run:
```kubectl apply -f envoy-service.yaml -n envoy```

Since we are deploying front envoy LoadBalancer on port 443, we have to create a self-signed certificate to make it terminate SSL/TLS connection.
- Get the external IP:
```kubectl describe svc/envoy -n envoy```

- Copy the LoadBalancer address in the EXTERNAL-IP section and do a nslookup and copy the IP address:
```nslookup <your load balancer aadess>```

- Create a self-signed cert and key:
```openssl req -x509 -nodes -newkey rsa:2048 -days 365 -keyout privkey.pem -out cert.pem -subj "/CN=<ip-address>"```

- Create a Kubernetes TLS Secret called envoy-certs that contains the self-signed SSL/TLS certificate and key:
```kubectl create secret tls envoy-certs --key privkey.pem --cert cert.pem --dry-run -o yaml```

### Edge Envoy configuration
Configuration for the edge Envoy:

**envoy-configmap.yaml**
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: envoy-conf
data:
  envoy.yaml: |
    static_resources:
      listeners:
      - address:
          socket_address:
            address: 0.0.0.0
            port_value: 443
        filter_chains:
        - filters:
          - name: envoy.http_connection_manager
            config:
              access_log:
              - name: envoy.file_access_log
                config:
                  path: "/dev/stdout"
              codec_type: AUTO
              stat_prefix: ingress_https
              route_config:
                name: local_route
                virtual_hosts:
                - name: https
                  domains:
                  - "*"
                  routes:
                  - match:
                      prefix: "/api.Echo/"
                    route:
                      cluster: echo-grpc
              http_filters:
              - name: envoy.health_check
                config:
                  pass_through_mode: false
                  headers:
                  - name: ":path"
                    exact_match: "/healthz"
                  - name: "x-envoy-livenessprobe"
                    exact_match: "healthz"
              - name: envoy.router
                config: {}
          tls_context:
            common_tls_context:
              tls_certificates:
              - certificate_chain:
                  filename: "/etc/ssl/envoy/tls.crt"
                private_key:
                  filename: "/etc/ssl/envoy/tls.key"
      clusters:
      - name: echo-grpc
        connect_timeout: 0.5s
        type: STRICT_DNS
        lb_policy: ROUND_ROBIN
        http2_protocol_options: {}
        load_assignment:
          cluster_name: echo-grpc
          endpoints:
          - lb_endpoints:
            - endpoint:
                address:
                  socket_address:
                    address: echo-grpc.envoy.svc.cluster.local
                    port_value: 8786
        health_checks:
          timeout: 1s
          interval: 10s
          unhealthy_threshold: 2
          healthy_threshold: 2
          grpc_health_check: {}
    admin:
      access_log_path: "/dev/stdout"
      address:
        socket_address:
          address: 127.0.0.1
          port_value: 8090
```

Since we will be offloading HTTPS, we are using port_value of 443. Most of the configurations are same as of sidecar envoy except for three things:
- A **tls_context** config is required to mention the tls certifications needed for authentication purposes.
- In clusters, the type has been to STATIC to STRICT_DNS which is a kind of service discovery mechanism making use of Headless service we deployed earlier.
- The socket_address’s address value has been changed to the FQDN of the service.

Run:
```kubectl apply -f envoy-configmap.yaml -n envoy```

### Deployment Configuration

**envoy-deployment.yaml**
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: envoy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: envoy
  template:
    metadata:
      labels:
        app: envoy
    spec:
      containers:
      - name: envoy
        image: envoyproxy/envoy:v1.9.1
        resources: {}
        ports:
        - name: https
          containerPort: 443
        volumeMounts:
        - name: config
          mountPath: /etc/envoy
        - name: certs
          mountPath: /etc/ssl/envoy
        readinessProbe:
          httpGet:
            scheme: HTTPS
            path: /healthz
            httpHeaders:
            - name: x-envoy-livenessprobe
              value: healthz
            port: 443
          initialDelaySeconds: 3
        livenessProbe:
          httpGet:
            scheme: HTTPS
            path: /healthz
            httpHeaders:
            - name: x-envoy-livenessprobe
              value: healthz
            port: 443
          initialDelaySeconds: 10
      volumes:
      - name: config
        configMap:
          name: envoy-conf
      - name: certs
        secret:
          secretName: envoy-certs
```

Run:
```kubectl apply -f envoy-deployment.yaml -n envoy```

# Testing
Proto file for the echo-grpc service:

**ccho.proto:**
```
syntax = "proto3";

package api;

service Echo {
  rpc Echo (EchoRequest) returns (EchoResponse) {}
}

message EchoRequest {
  string content = 1;
}

message EchoResponse {
  string content = 1;
}
```


Run the following command to call the server:
```grpcurl -d '{"content": "echo"}' -proto echo.proto -insecure -v <load_balancer_or_external_ip>:443 api.Echo/Echo```

The output will be similar to something like this:

```
Resolved method descriptor:
rpc Echo ( .api.EchoRequest ) returns ( .api.EchoResponse );

Request metadata to send:
(empty)

Response headers received:
content-type: application/grpc
date: Wed, 27 Feb 2019 04:40:19 GMT
hostname: echo-grpc-5c4f59c578-wcsvr
server: envoy
x-envoy-upstream-service-time: 0

Response contents:
{
  "content": "echo"
}

Response trailers received:
(empty)
Sent 1 request and received 1 response
```

Run the above command multiple times and check the value of the hostname field every time which will contain the pod name of one of the 3 pods deployed. 

# References
- Article: https://cloud.google.com/solutions/exposing-grpc-services-on-gke-using-envoy-proxy
- Headless service: https://kubernetes.io/docs/concepts/services-networking/service/#headless-services
