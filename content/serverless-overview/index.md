---
title: "A Look Into the Popular Serverless Computing Platforms"
date: "2021-03-02"
coverImage: "cover.png"
author: "Andy Yeung"
tags: ["Serverless"]
description: "A brief overview of the most popular serverless computing platforms."
---

Serverless computing has been gaining a lot of popularity in the last couple of years, and for good reason. It saves developer's time, allowing them to focus on writing code, rather than dealing with infrastructure. Deploying powerful, scalable applications has generally become much quicker and easier with serverless. However, there can be drawbacks as well, such as vendor lock-in and lack of control.

This blog will briefly go over some of the most popular serverless computing options from major cloud providers. There are also plenty of great resources online explaining serverless architecture in detail, so definitely go check those out if you haven't already. Now, let's go over some of the popular choices for serverless computing.

## Popular Cloud Options

Almost all major cloud providers offer serverless computing such as AWS, Azure, Google Cloud, IBM Cloud, Alibaba Cloud, etc. In this blog, we'll only be going over a few.

### AWS Lambda

AWS Lambda released in 2014 and has played a major role in the rise of serverless computing.
- Lambda functions are run using [AWS Firecracker](https://github.com/firecracker-microvm/firecracker), an open-source virtualization project that focuses on securing and isolating functions, while enabling the best performance possible.
- It supports plenty of runtimes: Node.js, Python, Ruby, Java, Go, .NET Core, and even custom runtimes for cases where the desired runtime is not natively supported.
- A good way to get support is through their official public [forum](https://forums.aws.amazon.com/forum.jspa?forumID=186), where AWS employees can be found answering questions.
- AWS Lambda offers free usage of 1M requests per month and 400,000 GB-seconds of compute time per month.

Recent notable updates include:
- [Dec 2020](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/): Function's can be defined as container images up to 10GB. Previously, a function's code had to be written through the UI code editor or uploaded as zip archives.
- [Dec 2020](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-functions-with-up-to-10-gb-of-memory-and-6-vcpus/): Function's memory can be configurable up to 10GB. Previously, the memory limit was 3GB, so this is an increase of over 3 times. Since Lambda automatically allocates CPU in proportion to the memory limit, now there can be up to 6 vCPUs.
- [Dec 2020](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-1ms-billing-granularity-adds-cost-savings/): For pricing calculation, function execution duration is rounded up to the nearest 1ms. Previously, duration was rounded up to the nearest 100ms. This means lower cost for functions executing in under 100ms.
- [June 2020](https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/): Share a file system between Lambda functions via Amazon EFS.

### Azure Functions

Launched in 2016:
- Part of the open-source initiative which started back when Microsoft purchased GitHub in 2018. This includes the Azure function runtime, core tools, portal, and more. Check them out [here](https://github.com/Azure/Azure-Functions)!
- Runtime support includes .NET Framework, .NET Core, Node.js, Java, Python, and more.
- Offers free usage of 1M requests per month and 400,000 GB-seconds of compute time per month.

Recent notable updates include:
- [Dec 2020](https://azure.microsoft.com/en-us/updates/azure-functions-custom-handlers-are-now-generally-available/): Custom handlers are now supported, allowing creating functions in any runtime.
- [Dec 2020](https://azure.microsoft.com/en-us/updates/rabbitmq-extension-for-windows-and-linux-is-now-generally-available/): Functions can now send and receive messages to and from RabbitMQ.

### Google Cloud Functions

Launched in 2017:
- Run with the help of [gVisor](https://github.com/google/gvisor) for sandboxing containers. Since containers were never designed to be secure sandboxes, gVisor is a tool Google built to protect against potential vulnerabilities allowing container escapes and others.
- Runtime support includes Node.js, Go, Ruby, Java, Python, .NET Core.
- Offers free usage of 2M requests per month and 400,000 GB-seconds of compute time per month. Allows 1M more free requests per month compared to AWS and Azure!

Recent notable updates include:
- [Jan 2021](https://cloud.google.com/blog/products/application-development/ruby-comes-to-cloud-functions): Support Ruby runtime.
- [Nov 2020](https://cloud.google.com/blog/products/application-development/introducing-net-google-cloud-functions): Support .NET Core runtime.

### CloudFlare Workers

Launched in 2017:
- Takes advantage of Cloudflare's edge locations for great performance.
- Run using the V8 JavaScript engine, allowing for much less overhead compared to using VMs or containers.
- V8 engine allows Cloudflare Workers to run JavaScript. This includes languages that can compile to WebAssembly, such as Rust, C, Cobol. Also, languages that can compile to JavaScript, such as Python, Kotlin, Perl.
- Offers free usage of 100,000 requests per day and 128MB worker memory limit. Details on all their free plan restrictions [here](https://developers.cloudflare.com/workers/platform/limits#worker-limits).

Recent notable updates include:
- [Sep 2020](https://blog.cloudflare.com/introducing-workers-durable-objects/): Maintain state with durable objects.
- [Sep 2020](https://blog.cloudflare.com/introducing-cron-triggers-for-cloudflare-workers/): Use a scheduler to trigger workers on a timed interval.

## Conclusion

There are a lot of great options worth considering when looking for serverless computing from a cloud provider. This was a very brief introduction to some of the most popular options, so definitely check out each provider's official documentation for more detail!
