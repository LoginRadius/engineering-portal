---
type: async
title: "How to Install and Configure Istio"
date: "2021-01-22"
coverImage: "Istio.png"
author: "Piyush Kumar"
tags: ["Istio", "Service Mesh"]
description: "This article will provide a step by step process on how to install and configure services using Istio."
---

An infrastructure layer that allows you to manage communication between the microservices of your application is a service mesh. As more developers work with microservices, by consolidating common management and administrative tasks in a distributed setup, service meshes have developed to make the job easier and more effective.

To know more about Istio, you can read this article on [Istio service mesh](https://www.loginradius.com/blog/async/istio-service-mesh) to understand the basic terminology, In this tutorial, will explain how to install and configure Istio. Let's get started.

## Installing Istio

Get the latest Istio release:
```
curl -L https://istio.io/downloadIstio | sh -
```
Extract the archive and export the bin directory in the environment path.

This will also install istioctl, a command-line tool to manage Istio service mesh.

### Configuration Profiles

Istio provides various built-in configuration profiles, a set of pre-defined configs related to data and control plane. We can customize the configs according to our needs.

For testing locally or trying it ou, you can use a demo profile. For dev and other environments, we will be using the default configuration profile.
```
istioctl install --set profile=demo
```

### Customizing configs

Run:
```
istioctl profile dump default
```
to see the various configurations. We can change those flag using istioctl commands and --set flag.

For development purpose, we can enabled/changes following flags:
```
istioctl install --set addonComponents.kiali.enabled=true \ 
--set components.telemetry.enabled=true \ 
--set components.citadel.enabled=true \ 
--set values.global.proxy.privileged=true \ 
--set addonComponents.tracing.enabled=true \ 
--set values.pilot.traceSampling=100.0 \ 
--set values.global.proxy.tracer=datadog
```
The path value of `--set` flag is the YAML path, which you can see in the profile dump command.

>While changing any config, make sure to pass all the previous flags with the new ones. For example, if first time, you enabled istioctl install --set addonComponents.kiali.enabled=true and now let’s say, you want to enable citadel, then you have to pass both flags like this: istioctl install --set addonComponents.kiali.enabled=true --set components.telemetry.enabled=true. 
>Failing to add any previously enabled variable will revert the config to its default values.
>One way to store the dump in a file and do istioctl apply or use helm charts for Istio.

### Sidecar injection

For Istio to work properly, a sidecar Envoy proxy needs to be enabled for the services. By default, the Istio control plane will not enable any sidecar to any services. To enable sidecar, we have to add labels at the namespace level.
```
kubectl label namespace dsl-test istio-injection=enabled
```
You need to have this label even if you do not want to add a sidecar to all your services.

You need to restart the pods.

For services, which do not require sidecar, we need to add the following annotation in the deployment template:
```
# Pod Annotations 
podAnnotations: 
	sidecar.istio.io/inject: "false"
```

## Configuring Services

For demonstration, we will take two demo services demo-1 and demo-2, and configure both services with Istio, and will try to call demo-2 service from demo-1. Make sure there is an env variable in demo-1, which we will configure with demo-2 internal DNS url. The programming language for the two services does not matter here.

A service configuration requires a VirtualService, DestinationRule, PeerAuthentication, and optionally a Gateway configuration.

### Gateway
```
apiVersion: networking.istio.io/v1alpha3 
kind: Gateway 
metadata: 
	name: demo-1
spec: 
	selector: 
		istio: ingressgateway 
	servers: 
	- port: 
		number: 80 
		name: http 
		protocol: HTTP 
	- hosts: 
		- "demo-1.example.com"
```

Gateway is used when we want to access the services from the public network.

Here we are using the default gateway provided by the Istio. We can also create multiple gateways and assign the proper name here.

The above gateway configuration enables both HTTP and HTTPS communication. In the case of HTTPS, we have to supply the secret containing the CA certs and key.

```
spec:
	servers: 
	- port: 
		number: 443
		name: http 
		protocol: HTTP
	  tls: 
		mode: SIMPLE 
		credentialName: div4-dev-certs
	  hosts: 
		- "demo-1.example.com"
```
We can apply the same gateway for demo-2. We just have to update the hosts and metadata name. Since we will demo-2 internally from demo-1, there is no need for an external gateway for demo-2 here.

### VirtualServices

```
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: demo-1
spec:
  hosts:
  - "demo-1.test.svc.cluster.local"
  - "demo-1.example.com"
  gateways:
    - demo-1
  http:
  - route:
    - destination:
        host: demo-1.test.svc.cluster.local
        port:
          number: 80
```

**spec.hosts:** Specifies the URL which the caller of the service will use. Here, dsl-es.pbdp.svc.cluster.local will be used by the services calling internally. The endpoint demo-1.example.com will be exposed publicly, and it should match the **spec.servers.hosts** value in Gateway config.

**spec.gateways:** In order for the gateways configured above to reach the service, we need to define the gateway metadata name here.

**http.route.destination.host:** This value should be the actual service FQDN.


### DestinationRule

After the virtualservice decides the destination hosts, DestinationRule defines the configuration on the actual service. DestinationRule is optional and is needed only in case we want to override the default behavior.

```
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: demo-1
spec:
  host: "demo-1.test.svc.cluster.local"
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
    tls:
      mode: ISTIO_MUTUAL
```

**spec.host:** specifies service FQDN

**spec.trafficPolicy:** Specifies policy on the traffic. Here we can specify load balancing algorithms, TLS mode, circuit breaking policies.

**spec.trafficPolicy.tls.mode:** ISTIO_MUTUAL mode is a TLS mode where we will use the certificates generated by the Istio.

A configuration like circuit breakers, outlier detection comes under the Destination Rule.


### PeerAuthentication

This configuration defines how the other services will connect.

```
---
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: demo-1
spec:
  selector:
    matchLabels:
      app: demo-1
  mtls:
    mode: STRICT
```
**spec.selector.matchLabels.app:** Specify the deployment label on which this configuration will be applied.

**spec.mtls.mode:** TLS mode. STRICT being the connection will always be mutual tls.

PeerAuthentication can be applied to a whole namespace. This is useful when all the services in the namespace are part of the mesh.

> Apply the same configuration for virutalservice, destination, and peerauthentication by replacing demo-1 with demo-2 assuming both services are in the same namespace.

```
kubectl apply -f <file>.yaml -n test
```

Access the objects:

```
kubectl get virtualservices -n pbdp
kubectl get gateways -n pbdp
kubectl get destinationrule -n pbdp
kubectl get peerauthentication -n pbdp
```

Now update the env for demo-2 with `demo-2.test.svc.cluster.local` in demo-1 service.
