---
title: "What is Kubernetes? - A Basic Guide"
date: "2020-10-26"
coverImage: "image3.png"
author: Prabhat Kumar
description: "Learn about the Kubernetes. A container Orchestration tool on a basic level, and how it is making the job of Developers simpler."
tags: ["Kubernetes","Deployment","Distributed Systems"]
---

Kubernetes is a standard container orchestration open-source platform, that is, for managing applications constructed from several, often self-contained runtimes called containers.

Since the Docker containerization project launched in 2013, [containers have become increasingly](/container-security-scanning/) common, but massive distributed containerized apps can become increasingly difficult to coordinate.

Kubernetes became a central part of the container revolution by making containerized systems significantly more straightforward to handle at scale.

This blog targets the way modern applications are deployed and consumed. It [introduces the](https://en.wikipedia.org/wiki/Kubernetes) importance of Kubernetes, a container Orchestration tool on a basic level, and how it is making Developers more convenient.

### What is Kubernetes

Kubernetes (also known as k8s) is a container orchestration tool widely used to deploy and update the application without any downtime. It enables auto-scaling of resources in case of an increase/decrease in requests to the server. 
Also, it provides intelligent management, allocation of resources, and services, which saves a lot of money for us.

### Benefits of Kubernetes

By using Kubernetes, developers can build cloud-native applications with Kubernetes as a runtime framework. Patterns are the tools a developer of Kubernetes requires to construct applications and services based on containers.

**Here are a few benefits of Kubernetes:**

- Optimize the resources required to run your enterprise applications, make better use of hardware.
- Monitor and automate deployments and updates of applications.
- Run Stateful Applications, mount, and add room.
- Manage services declaratively, ensuring that the applications deployed always run the way you expected them to run.
- Health-check your apps with auto-placement, auto restart, auto replication, and autoscaling, and self-heal them.

### Kubernetes vs. Docker

Often mistaken as a choice between one or the other, Kubernetes and [Docker for running containerized applications](/production-grade-development-using-docker-compose/) are different but complementary technologies.

[Docker](https://docs.docker.com/get-started/overview/) lets you put everything you need into a box that can be stored and opened when and where it is required to run your application. It would help if you had a way to handle them once you start boxing up your applications, and that's what Kubernetes does.

1. With or without the Docker, Kubernetes can be used.
2. The distinction between Docker and Kubernetes refers to the role each plays in your applications' containerization and execution.
3. Docker is an open industry standard to package and distribute container applications.
4. To deploy, manage, and scale containerized software, Kubernetes uses Docker.


### Why do you need Kubernetes?

Kubernetes will assist you in deploying and managing containerized, legacy, and cloud-native applications, as well as microservice, refactors.

To meet evolving business demands, the development team needs to build new products and services rapidly. The cloud-native architecture starts with container microservices, allowing faster development and making it easier to transform and optimize existing software.

- With the rise in the number of internet users, it is expected that applications should not have any downtime for maintenance and updates.
- Each organization wants its deployments to scale according to users' needs, i.e., if more user's requests are coming, then more CPU and Memory should be automatically allocated to the deployment; otherwise, the server will crash.
- Furthermore, no one wants to pay more for CPU and Memory on cloud services if there are no such requirements every time. So there should be some intelligent system that effectively allocates and manages the CPU and Memory utilization as per need.

That is where Kubernetes comes into the picture. It handles all the above requirements effectively and reduces a lot of burden from the developer's shoulders.

 
![Kubernetes Features](image2.png)

### Technical Aspect

Kubernetes was designed as a highly available cluster of computers connected to work as a single unit. This abstraction level allows us to deploy the application without thinking much about the machines on which the application would run. *Kubernetes' role is to automate the distribution of application containers on computer clusters efficiently.*  

A typical computer cluster in Kubernetes consists of:

- **Node**: Where we run our applications
- **Master**: Used to coordinate the cluster.

> The Master is responsible for managing the cluster. The master nodes will coordinate all the activities in your cluster, such as scheduling applications, maintaining their desired state, scaling applications, and rolling new updates. Whereas a Node is a VM or a physical computer that is used as a worker machine in a Kubernetes cluster to  actually, run the application 

![Kubernetes Architecture](image4.jpeg)

*A master node contains processes that continuously watch the deployment for any CPU or Memory requirement and smartly allocated it in the form of new pods to auto-scale the application, which handles the vast amount of requests coming to the server.*

Most of the current cloud services like Amazon Web Service(AWS), Microsoft Azure, and Google Cloud come with automatic support for Kubernetes to provide ease in deploying and maintaining application containers.

A Kubernetes cluster can be deployed on either virtual or physical machines. A software named Minikube can be installed on your local machine that creates a VM on your local machine and deploys a simple cluster containing only one node. 
Minikube provides a CLI through which we can execute commands & simulate a small-scale Kubernetes cluster.

![Kubernetes Deployment](image1.png)

#### Some of the basic Kubernetes CLI commands are:
- **kubectl get nodes** - It gets the total number of working nodes available in the k8s cluster.
- **kubectl get pods** - It returns the total number of Running pods present in the cluster.
- **kubectl create deployment {DEPLOYMENT_NAME} --image={IMAGE_NAME}**  - It creates a new deployment on given cluster. We need to specify a deployment name to the deployment and the image from which the deployment should be made.
- **kubectl logs {POD_NAME}** - It prints the logs for a particular pod specified using pod name. Logs are handy for debugging the application.
- **kubectl cluster-info** - It fetches all the metadata related to the cluster. 
- **kubectl delete pod {POD_NAME}** - It deletes the deployed pods specified using the pod name.

### Conclusion 
There are many benefits of learning Kubernetes as it releases a lot of deployment stress from the developer's shoulders. It helps in auto-scaling, intelligent utilization of available resources, and enables low downtime for maintenance. 

Without k8s, a lot of human effort and money is gone into these things, but with the help of k8s, everything can be automated.

Since K8s is a vast technology, it is impossible to wrap all things in just one blog. To simplify things, I will be publishing more blogs soon related to **k8s Deployments, ReplicaSets, Services, Ingress Controller, Master and Worker Processes, Kubectl**, etc. Stay connected and keep learning.
