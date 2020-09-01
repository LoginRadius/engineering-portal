---
title: "Best Practice Guide For Rest API Security | LoginRadius"
date: "2020-09-01"
coverImage: "index.jpg"
author: "Vijay Singh Shekhawat"
tags: ["RestAPI", "Rest API","Rest API Security", "Best Practice", "Rest API Developer Guide", "Security"]
description: "RESTful APIs are the most common way of intercating with the backend in stateles manner. Since these APIs are exposed to public, we need to make sure the suitable security mechanisms to prevent abuse, protect sensitive data, and ensure that only authenticated and authorized users can access them. In this blog we will understand some of the basic concepts related to REST API security."
---


### What is the Rest API?
RESTful programming provides stateless and a uniform interface, Rest API is HTTP-based URLs that hide the back-end infrastructure from the user. Rest APIs provide the back end for modern web and mobile applications. 

### Why is API security important?
Rest APIs are the most important layer in the back-end infrastructure for most modern applications. Cybercriminals are increasingly targeting APIs. Ensuring web API security is the most important and crucial. Let’s see what you can do to ensure REST API security.

### Common Security Vulnerabilities & Mistakes and Best Practices to Secure REST APIs

#### Always Use HTTPS 
API security start with Http Connection. All requests from clients to your API should be encrypted (HTTPS). Unfortunately, many client HTTP do not enable HTTPS/secure connections by default it’s necessary to enforce that from the server. When Clients who attempt to connect via HTTP should forcefully be redirected to secure HTTPS connections. 

You can get a free certificate with Let's Encrypt. SSL provides security from basic API vulnerabilities with almost minimal effort

### Distributed Denial of Service Attacks (DDoS)
A Distributed Denial of Service (DDoS) is a targeted cyber attack on a web site or device where a malicious attacker flood of traffic is sent from single or multiple sources. the main purpose of DDos is to make a machine or network resource unavailable to its genuine users by temporarily or disrupting services of a host connected to the Internet. if we are not using appropriate security practice or tools then it makes RESTful API into a non-functional situation.

###### How to Prevent or Stop DDoS Attacks
API DoS attacks are more common these days. Rest APIs utilizations also increasing day-by-day. The organization's dependency is increasing day-by-day because of business needed a unified platform. An attacker can use multiple ways for the DDoS attack so as developer or security engineer you need to implement long-term solution not a temporary

##### Rate Limit
 Attackers can make so many repeated calls on the APIs. it can make resources unavailable to its genuine users. A rate limit is the number of API calls an app or user can make within a given period. When this limit is exceeded, block API access temporarily and return the 429 (too many requests) HTTP error code.

##### Passive cache
Active cache means if the service first attempts to read from the cache backend and falls back to reading from the actual source. The service is not dependent or requesting the data from the actual upstream server. a cache backend is a key-value store (e.g. Redis) or In-Memory cache and the actual source of data is an SQL, MongoDB, etc.

Passive cache architecture ensures high volume traffic never hit to actual server or service.


#### Sensitive Data Exposure
Sensitive data exposure happens when an application, organization, or other entity unable to properly secure sensitive data. It is different from a data breach, it includes personal information, tokens, etc. We can make sure sensitive data security using  
multiple ways which include encryption at rest or in transit and masking 


#### Cross-Site Scripting
Cross-Site Scripting (XSS) attacks are a type of injection, in which attacker aims to execute malicious scripts in a web browser of the victim. an attacker can transfer untrusted data into the API as part of a query or command.which can result in an attacker obtaining unauthorized access to information or carry out other damages.

###### How to Prevent or Stop Cross-Site Scripting (XSS) Attack

###### 1.Filter input on arrival: 
At the point where user input is received, filter as strictly as possible based on what is expected or valid input.

###### 2. Use appropriate response headers:
To prevent XSS in HTTP responses that aren't intended to contain any HTML or JavaScript, you can use the Content-Type and X-Content-Type-Options headers to ensure that browsers interpret the responses in the way you intend.

If you want to know more details about the security headers. Please go to [Security Headers](https://www.loginradius.com/engineering/blog/http-security-headers/)

###### 3. Use Content Security Policy: 
As a last line of defense against attackers, you can use Content Security Policy (CSP) to reduce the severity of any XSS vulnerabilities that still occur.

#### Insufficient Logging and Monitoring
We can discover suspicious activity using proper logging and monitoring. When We have insufficient logging and monitoring in that case sometimes we can miss some system access or user activity logs, a step of the particular activity and security alerts. 

##### Logging and Monitoring
A lot of logging and monitoring tools are available. We can choose the best tools as per our requirement also we can define some policies like data retention policy that includes how far backlogs will be kept. Instrument your API access actions to record key metrics and events. Keep logs indexable and searchable.

#### Give Limited Access
Each API should limit access, API only able to perform what tasks they need to do. We can do this with Role-Based Access, separate read/write API Keys, OAuth Scopes, and permissions systems. This minimizes the chances that you’ll accidentally expose a sensitive field.

### Security Reports
Sometimes, people find security vulnerabilities, and they would like to report them so the vendor or the developer can fix them. you must have a public contact point where security issues can be reported.

We can create a ` security.txt` file on the site. `security.txt` is a proposed standard for websites' security information that will allow security researchers to easily report security vulnerabilities. The "security.txt" that is similar to robots.txt. security.txt files have been adopted by Google, GitHub, LinkedIn, and Facebook

You can easily create ` secuirty.txt` file using the [securitytxt.org](https://securitytxt.org/) 

### Summary
Now days lot of data breaches are happing. We can save mostly data breaches after following some basic security guidelines.You have to pay attention to security during Rest API development. I have covered most of the general Rest API security issues with resolution. these guidelines will help you for developing more secure and quality REST API service.



