---
title: "How to Deploy REST API in Kubernetes"
date: "2021-02-03"
coverImage: "cover.png"
author: "Andy Yeung"
tags: ["Kubernetes"]
description: "The Kubernetes API is the front end of the Kubernetes control plane, Check out how to create and deploy a REST API in local Kubernetes."
---

The Kubernetes API is the front end of the control plane of Kubernetes and is how users communicate with their cluster of Kubernetes. The server of the API decides whether a request is legitimate and processes it afterwards.

This blog will help you get started on deploying your REST API in Kubernetes. First, we'll set up a local Kubernetes cluster, then create a [simple API](https://www.loginradius.com/blog/async/what-is-an-api/) to deploy.

There are already a lot of [free resources available](https://www.quora.com/What-are-the-best-resources-to-learn-Kubernetes) explaining basic Kubernetes concepts, so go check those out first if you haven't already. This blog is intended for beginners but assumes you already have a [basic understanding of Kubernetes](https://www.loginradius.com/blog/async/understanding-kubernetes/) and Docker concepts.

## 1. Set Up Local Kubernetes

There's a couple options for running Kubernetes locally, with the most popular ones including [minikube](https://github.com/kubernetes/minikube), [k3s](https://github.com/k3s-io/k3s), [kind](https://github.com/kubernetes-sigs/kind), [microk8s](https://github.com/ubuntu/microk8s). In this guide, any of these will work, but we will be using k3s because of the lightweight installation.

Install [k3d](https://github.com/rancher/k3d), which is a utility for running k3s. k3s will be running in Docker, so make sure you have that installed as well. We used k3d v4.0 in this blog.

```
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
```

Set up a cluster named test:
- The port flag is for mapping port 80 from our machine to port 80 on the k3s load balancer. This is needed later when we use the Ingress.

```
k3d cluster create test -p "80:80@loadbalancer"
```

Optionally, check that your kubeconfig got updated and the current context is correct:

```
kubectl config view
kubectl config current-context
```

Optionally, confirm that k3s is running in Docker. There should be two containers up, one for k3s and the other for load balancing:

```
docker ps
```

Make sure that all the pods are running. If they are stuck in pending status, it may be that there is not enough disk space on your machine. You can get more information by describing:

```
kubectl get pods -A
kubectl describe pods -A
```

There's a lot of kubectl commands you can try, so I recommend checking out the list of resources and being aware of their short names:

```
kubectl api-resources
```

## 2. Create a Simple API

We will create a simple API using Express.js.

Set up the project:

```
mkdir my-backend-api && cd my-backend-api
touch server.js
npm init
npm i express --save
```

```
// server.js
const express = require("express");
const app = express();

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    id,
    name: `John Doe #${id}`
  });
});

app.listen(80, () => {
  console.log("Server running on port 80");
});
```

Optionally, you can try running it if you have Node.js installed and test the endpoint /user/{id} with curl:

```
node server.js

// request:
curl http://localhost:80/user/123

// response: {"id":"123","name":"John Doe #123"}
```

Next, add a Dockerfile and .dockerignore:

```
// Dockerfile
FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 80
CMD ["node", "server.js"]
```

```
// .dockerignore
node_modules
```

Then, build the image and push it to the Docker Hub registry:
- If you want to skip this step, you can use the existing image [here](https://hub.docker.com/r/andyy5/my-backend-api).

```
docker build -t <YOUR_DOCKER_ID>/my-backend-api .
docker push <YOUR_DOCKER_ID>/my-backend-api
```

## 3. Deploy

Now, we deploy the image to our local Kubernetes cluster. We use the default namespace.

Create a deployment:

```
kubectl create deploy my-backend-api --image=andyy5/my-backend-api
```

- Alternatively, create a deployment with a YAML file:

```
kubectl create -f deployment.yaml
```

```
// deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-backend-api
  labels:
    app: my-backend-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-backend-api
  template:
    metadata:
      labels:
        app: my-backend-api
    spec:
      containers:
      - name: my-backend-api
        image: andyy5/my-backend-api
```

Create a service:

```
kubectl expose deploy my-backend-api --type=ClusterIP --port=80
```

- Alternatively, create a service with a YAML file:

```
kubectl create -f service.yaml
```

```
// service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-backend-api
  labels:
    app: my-backend-api
spec:
  type: ClusterIP
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: my-backend-api
```

Check that everything was created and the pod is running:

```
kubectl get deploy -A
kubectl get svc -A
kubectl get pods -A
```

Once the pod is running, the API is accessible within the cluster only. One quick way to verify the deployment from our localhost is by doing port forwarding:
- Replace the pod name below with the one in your cluster

```
kubectl port-forward my-backend-api-84bb9d79fc-m9ddn 3000:80
```

- Now, you can send a curl request from your machine

```
curl http://localhost:3000/user/123
```

To correctly manage external access to the services in a cluster, we need to use Ingress. Close the port-forwarding and let's expose our API by creating an ingress resource.
- An ingress controller is also required, but k3d by default deploys the cluster with a Traefik ingress controller (listening on port 80).
- Recall that when we created our cluster, we set a port flag with the value "80:80@loadbalancer". If you missed this part, go back and create your cluster again.

Create an Ingress resource with the following YAML file:

```
kubectl create -f ingress.yaml
kubectl get ing -A
```

```
// ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-backend-api
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /user/
        pathType: Prefix
        backend:
          service:
            name: my-backend-api
            port:
              number: 80
```

- Now try it out!

```
curl http://localhost:80/user/123
```

In this walkthrough, we have just scratched the surface. See the [API guide](https://kubernetes.io/docs/reference/) for additional tools. It would be a good idea to follow the API modifications community board for this knowledge for power users considering editing the API in which Kubernetes comes bundled.

If you want to learn more on how to deploy using a managed Kubernetes service in the cloud, such as Google Kubernetes Engine, then check out the excellent guides on the [official Kubernetes docs](https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/).
