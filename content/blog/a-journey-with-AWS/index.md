---
title: "AWS Services-Walkthrough"
date: "2020-10-09"
coverImage: "aws.png"
author: "Nitin Gupta"
tags: ["AWS", "Serverless"]
description: "Learn step by step setting up and basics of some basic AWS services."
---

Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.Below are some salient features provided by AWS.
1.  Secure cloud services platform
2.  Compute power
3.  Database storage
4.  Content delivery 
5.  **Pay for what you use**

Prerequisites:

- AWS Account
- Active internet connection
- CLI usage

## AWS EC2(Elastic Compute Cloud)
This is most commonly used service of AWS and catered deployment of various applications as per AMI configured before creating ec2 Instance.
Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. 
It is designed to make web-scale cloud computing easier for developers. <br>
**Here are some of the important steps while setting up new EC2 Instance->** <br>

Choose an Amazon AMI.
![AWS](AWS_EC21.PNG)

Choose instance type.
![AWS](AWS_EC22.PNG)

Configure security group(It allows specific IP's that user will give permission to specific ports as per requirement.)
![AWS](AWS_EC23.PNG)



Login to EC2 via CLI
```
$ ssh -i ec2-key.pem ec2-user@11.11.11.111
```
Switch to ROOT
```
sudo su
```
## AWS RDS(Relational Database Service)
Amazon Relational Database Service is a web service that makes it easier to set up, operate, and scale a relational database in the AWS Cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.
After setting up RDS you can logged in to local tool(SQL Developer/ MY SQL Workbench) and copy endpoint of RDS with Username/Password configured while setting RDS.

![Available Databases](AWS_RDS.PNG)

## AWS Elasti Cache
Amazon ElastiCache allows you to seamlessly set up, run, and scale popular open-Source compatible in-memory data stores in the cloud.This service is commonly used to avoid unnecessary calls to RDS and impriving the user experience by displaying the data at faster rate.

Login redis in local via this command (First port can be anyone except 6379 as it will direct AWS redis to local redis installed on machine) and after first port just paste the endpoint of redis.

```
ssh -f -i ec2-key.pem -N -L 6378:demo-redis.xxxx.xx.0001.xxxx.cache.amazonaws.com:6379 ec2-user@11.11.11.111
```
## AWS Lex
Amazon Lex provides provide advanced deep learning functionalities of ASR(Automatic Speech Recognition) & NLU(Natural Language Understanding).With the use of Lex we can build chatbots that can converse using speech and text as mediums.
There are few components of BOT that need to be understood in order to build it.

- Intent:- It is a particular goal that user wants to achieve.
- Utternaces :-These are spoken/typed phrases that invoke content.
- Slots:- Data provided by user to fulfill the intent.
- Prompts:-These are queris/questions asked by user to input the data.

![AWS Lex](AWS_Lex.PNG)


## AWS API Gateway
This AWS service is used to Create,Publish,Maintain and Monitor secure Application Programmin Interfaces(**API**).Moreover it provides an easy interface for code running on AWS Lambda.
Here are some of pointers that explains the need of this service.
- Efficient API Development.
- Performance at Scale.
- Cost saving at scale.
- Flexible Security Controls.

## AWS DynammoDB
Dynammo DB is NO SQL database provide by Amazon Web Services.The main job of Dynammo DB is to Store & Retrieve any amount of data and serve any level requests of traffic.
In this there are different terminologies as that of normal database.Secondary Indexes is Data Structure that contains a subset of attributes from a table.
- Partition & Sort Keys
- Local & Global Secondary Indexes

![AWS Dynammo](AWS_Dynammo.PNG)


