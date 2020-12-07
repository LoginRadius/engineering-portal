---
title: "Istio Service Mesh: A Beginners Guide"
date: "2020-12-07"
coverImage: "Istio.png"
author: "Piyush Kumar"
tags: ["Istio", "Service Mesh"]
description: "This post will give a high-level introduction to Istio and its related concepts and terminologies."
---


This post will give a high-level introduction to Istio and its related concepts and terminologies.


# What is Istio?

Istio is an Open Source service mesh (developed in partnership between teams from Google, IBM, and Lyft), providing a dedicated infrastructure layer for creating service-to-service communication that is safe, fast, and reliable. Having such a fanatical communication layer can provide various advantages, like providing observability into communications, providing secure connections, or automating retries and backoff for failed requests.
A service mesh also often has more complex operational requirements, like A/B testing, canary rollouts, rate limiting, access control, and end-to-end authentication.
Istio does this by adding a sidecar proxy which intercepts all network communication between microservices, then configures and manages Istio using its control plane functionality, which incorporates:
 1. Granular control over the service-to-service communication and its routing with the additional functionality of retries, fault injection, circuit breakers.
 2. Providing secure mTLS without any changes in the application code.
 3. Cluster to cluster communication using ingress and egress gateways.


# Architecture

An Istio service mesh is logically split into a data plane and a control plane.

The data plane is composed of Envoy proxy deployed as sidecars. Envoy itself is an L7 proxy and communication bus designed for modern microservices-based architecture. These proxies intercept and control all network communication between microservices. They also collect and report telemetry on all mesh traffic.

The control plane manages and configures the proxies to route traffic.

![Istio Architecture](https://istio.io/latest/docs/ops/deployment/architecture/arch.svg)

# Core Components

### Pilot

Istio Pilot manages and configures all the Envoy proxy instances deployed. It takes the rules for traffic behavior provided by the control plane and converts them into configurations applied by Envoy.

### Citadel

Responsible for controlling the authentication and identity management between services. Allow developers to build a zero-trust network based on service identity.

### Mixer

Responsible for enforcing access control and usage policies across the service mesh and collects telemetry data from the Envoy proxy and other services.

# Features

## Traffic Management

It is the basic feature of Istio, which facilitates the routing between services. Istio simplifies the configuration of service-level properties like circuit breakers, timeouts, and retries.
All traffic that your mesh services send and receive (data plane traffic) is proxied through Envoy, making it easy to direct and control traffic around your mesh without making any changes to your services.

For discovering all the services in the ecosystem, Istio connects to the Service discovery System and populates its service registry. The Envoy sidecar proxy then uses this registry to route traffic to the correct service.

Here are a few resources you can add for your deployment apart from the basic service discovery and load balancing:

### Virtual Services
Virtual services play a key role in making Istio's traffic management flexible and powerful. They do this by strongly decoupling where clients send their requests from the destination workloads that actually implement them.  
So, instead of sending requests directly to a service data plane, you send traffic through this virtual service. Using virtual service, you can route requests to different versions of the same service or different hostnames based on particular endpoints. This helps us to do various other things like A/B testing or doing canary rollouts.  
  
A typical example:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
    - bookinfo.com
  http:
  - match:
    - uri:
        prefix: /reviews
    route:
    - destination:
        host: reviews  <-- Resolves to reviews.<namespace>.svc.cluster.local
  - match:
    - uri:
        prefix: /ratings
    route:
    - destination:
        host: ratings

```

### Destination Rule
We use destination rules to configure what happens to traffic for that destination. Destination rules are applied after virtual service routing rules are evaluated, so they apply to the traffic's real destination.  
Using destination rules, we specify the subsets of the service using labels, which are then used by the virtual service to route requests to a particular subset. In addition to that, we can also customize traffic policy, load balancing policy, connection pool settings, mTLS, etc.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: my-destination-rule
spec:
  host: my-svc
  trafficPolicy:
    loadBalancer:
      simple: RANDOM
  subsets:
  #### This will work only if we have defined version label in the deployment
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
    trafficPolicy:
      loadBalancer:
        simple: ROUND_ROBIN
  - name: v3
    labels:
      version: v3
```
Here we have defined destination rule for service **my-svc** and defined subsets and traffic policy global and per subset.

### Gateway

It is used to manage inbound and outbound traffic for your mesh, letting you specify which traffic you want to enter or leave the mesh. Gateway configurations are applied to standalone Envoy proxies running at the edge of the mesh, rather than sidecar Envoy proxies running alongside your service workloads. Using this, we can expose our services to the internet.  
  
A typical example would be:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: my-svc-gateway
  namespace: test
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - my-svc.example.com
```

**istio: ingressgateway** is the gateway which is enabled by default after installation. We can create our custom gateway. Here, the hosts **my-svc.example.com** will resolve to the load balancer provided by the Istio by default. To use this gateway, one has to add config in the virtual service like for example:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-svc
spec:
  hosts:
  - my-svc
  - my-svc.example.com   <-- The host should match
  gateways:               <--- gateway config
    - my-svc-gateway
  http:
  - route:
    - destination:
        host: my-svc.test.svc.cluster.local
        port:
          number: 80 
```

### Network Resilience
This feature provides network configuration dynamically at runtime, which includes retries, fault injection, circuit breakers, and timeouts.

### Service Entries
This object is used to add an external service as part of the service mesh, including a service running in a VM or other K8s cluster in case of multi-cluster installation.

A typical example would be connecting a service to a database cluster that is not part of the mesh.
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: elasticsearch
  namespace: test
spec:
  hosts:
  - elasticsearch.elasticsearch.svc.cluster.local
  location: MESH_INTERNAL
  ports:
  - name: https
    number: 9200
    protocol: TCP
  resolution: DNS
```
The Service Entry should be in the same namespace as that of the calling service. This is helpful, especially in the case where the service is not exposed to a public endpoint and can be accessed using internal service DNS like the above example.

## Security

Istio provides security features that will help us to establish a zero-trust network. Istio enables security by default and provides various authentication and authorization policy to regulate security.

For example:

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: dsl-es
  namespace: pdp-test
spec:
  selector:
    matchLabels:
      app: dsl-es
  mtls:
    mode: STRICT
```
Here we define a peer authentication object for a service labeled **my-svc**, which tells that any service that needs to talk to **my-svc** will communicate using mtls. The service will accept only TLS connection. By default, Istio enables **PERMISSIVE** mode, which accepts both plaintext and encrypted communication. 

We can define peer authentication on the mesh, namespace, and pod level.

That is all for the introduction to Istio. In the next part, we will look at installing Istio and configuring services to use Istio.
