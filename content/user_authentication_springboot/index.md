---
title: "How to Implement User Authentication in Spring Boot Apps"
date: "2021-10-03"
coverImage: "php-filter-portfolio.png"
author: Akaash Mohan Saxena
tags: ["User Authentication","Spring Boot", "Spring Security"]
---

# Introduction

Securing your applications can be difficult and ever evolving making it difficult to keep up with changes. Spring security helps in securing your application while also introduces you to a large community of developers, constantly innovating and updating the framework, to protect our applications.

This article covers Spring Security framework support for OAuth2, OIDC and JWT.

## Challenges with Authentication/Authorization in modern applications

Authentication/authorization approach usually involves sending user credentials (usually username and password) to server in form of request body or as part of header, over HTTPS. Server-side password hash is retrieved from database and matched with password hash, once match a session is created.

However, some challenges are involved: user credentials are sent in form of plain text, making it vulnerable to leaking by some malicious code. Also, storing credentials alongside application data exposes them to injection vulnerabilities introduced by development team.
It also poses difficulty when scaling up applications, or when user have to maintain their credentials across different applications.

For this single sign on is required, where user authenticates once and gets access to all the applications they are authorized for. OAuth, OIDC and JWT are standards that can help with it.


## Creating a page with Spring Initializr

1. Head over to Spring Initializr [start.spring.io]
2. Fill in the required **Group Name** and **Artifact**. In **Dependencies** search for **OAuth2**

![server-side-template](/images/server-side-config.png "image_tooltip")

3. Click on **Generate** and download the template .zip file

4. For client side, we'll create another project using Spring Initializr. Once again, fill in the details but this time under **Dependencies** search **ThymeLeaf**. Thymeleaf is a template engine, based on JAVA XML/XHTML/HTML5 which we'll be using for UI. Click on **Generate** and download the template .zip file.

![client-side-template](/images/server-side-config.png "image_tooltip")

Now the Spring Boot template for both server and client side is initialized. Next, we'll create a resource configuration on the server side.

## Creating a resource config on server side

1. Locate the downloaded **spring-security-auth-server.zip** file and extract it. Open the project in your preferred code editor.

2. Under `src/main/java/com/userauthentication/springsecurityauthserver` path create a new package called **config**.


![alt_text](/images/config.png "image_tooltip")

3. Inside the **config** package create a class **ResourceServiceClass**.

The @EnableWebSecurity annotation and WebSecurityConfigurerAdapter work together to provide security to the application. The @Order annotation is used to specify which WebSecurityConfigurerAdapter should be considered first.

```

```