---
title: "A journey from Node to GoLang"
date: "2020-08-11"
author: "Narendra Pareek"
coverImage: "node-go.png"
tags: ["Node", "NodeJs", "Golang", "Hapi", "Restify", "Fastify", "Express"]
description: "If your existing technology is not fulfilling all your needs and you are thinking about switching to the new one. Also, if you are concerned about the performance. Here is the blog that can help you in this direction."
---



Migrating your existing code to a new programming language is a very tedious task. We need to have a proper set of requirements and some obvious benchmarking between the new and existing technology.

So here our journey started to transform (not conversion) our existing code to a new language. You might think that why I’ve used word transformation rather than conversion so -

**Conversion:** Conversion is just about to write your existing code in different languages as it is.

**Transformation:** Transformation is about to leverage all possible benefits of a new language and convert accordingly.

## Why we decided to change?

The idea of migrating code to a new programming language started with a simple requirement which was we wanted to take our cloud solution to on-premise as well. till now, our services were written in NodeJS for a cloud solution and it was doing pretty well. The performance was also good but there is nothing that can not improve. So along with performance improvement, we started to find out that **can we make a GUI or CLI using existing NodeJS code that can take our solution on-premise?**

Answer for that was practically YES. but, technically NO. If we’re writing apps with a GUI, Node can’t do it on its own. We had to use some other projects which provide GUI creation capabilities (eg: ElectronJS, NW.js, etc). Making CLI seemed doable but there were also problems like we can't have single file distribution for our code. And the ability to download a single file and execute commands - without an installer, or even setup process - does wonder to a user. This also makes the product easily backward compatible.

Also, another factor came in that it was better to switch to a technology that works closely with gRPC.

So, we drew out a few goals for our new solution
- Zero deployment dependencies
- Performance up-gradation
- Single file distribution
- Easily compatible with gRPC
- Good memory management
- Better readability and maintainability

After research with our requirement, we were able to figure out that we can achieve these with Golang, developed by google.
On the basis of our research, we also did some benchmarking on different node js framework and GoLang.

**Benchmarking sever** we’ve used with below configurations

| | |
| -------------------- | ----------------------------------- |
| benchmarking\_server | 4 GB RAM                            |
|                      | 2 vCPUs                             |
|                      | 80 GB SSD                           |
| Zone                 | Ubuntu Mumbai, Zone A (ap-south-1a) |
| Operating System     | Ubuntu 16.04.6 LTS                  |
| Kernel               | Linux 4.4.0-1052-aws                |
| Architecture         | x86-64                              |


**The benchmarking result** was pretty much similor that we are thinking. Here are the benchmarking result, Both the below table having 
- 100000 Requests 5000 Concurrency
- 100000 Requests 7500 Concurrency

|                                  | GO(FastHTTP) | Express   | Hapi      | Restify   | Fastify   |
| -------------------------------- | ------------ | --------- | --------- | --------- | --------- |
| Total Time is taken for Test (s) | 9.036        | 21.514    | 30.008    | 21.357    | 23.07     |
| Total data transferred (bytes)   | 686400000    | 553900000 | 554200000 | 547400000 | 547200000 |
| Request per second (s)           | 11067.08     | 4648.11   | 3332.49   | 4682.25   | 4334.55   |
| Time per request (ms)            | 451.79       | 1075.705  | 1500.379  | 1067.863  | 1153.522  |
| Transfer Rate kb/s               | 74184.01     | 25142.48  | 18035.8   | 25029.92  | 23162.76  |
| Failed Request (req)             | 0            | 0         | 0         | 0         | 0         |


|                                  | GO(FastHTTP) | Express   | Hapi      | Restify   | Fastify   |
| -------------------------------- | ------------ | --------- | --------- | --------- | --------- |
| Total Time is taken for Test (s) | 9.224        | 23.238    | 31.114    | 22.258    | 19.935    |
| Total data transferred (bytes)   | 686400000    | 553900000 | 554200000 | 547400000 | 547200000 |
| Request per second (s)           | 10841.52     | 4303.32   | 3213.96   | 4492.78   | 5016.34   |
| Time per request (ms)            | 691.785      | 1742.84   | 2333.572  | 1669.344  | 1495.114  |
| Transfer Rate kb/s               | 72672.04     | 23277.44  | 17394.29  | 24017.08  | 26806.07  |
| Failed Request (req)             | 0            | 0         | 0         | 0         | 0         |

There was a big difference, For better clarity let’s see the below graphs.

### Total Time taken for Test(s)

In the below chart, we can clearly see that Golang won the competition and Hapi has taken the maximum time to finish the test.

![total-time-taken-for-test](total-time-taken-for-test.png)


### Request per second (s) and Transfer Rate kb/s

In the below chart, we can see that Golang served maximum requests per second.

![request-per-second-and-transfer-rate-kb-s](request-per-second-and-transfer-rate-kb-s.png)

### Request per second (s) and Time per request (ms)

The below chart is showing that the Number of requests is very high compared to other node js frameworks.

![request-per-second-and-time-per-request](request-per-second-and-time-per-request.png)

### Total Data Transferred

![chart](chart.png)

All the data clearly shows the direction so we decided to move to GoLang.