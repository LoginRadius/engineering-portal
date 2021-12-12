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


## Setitng up Oauth2 with Google

1. Open [Google Cloud Console]() and sign in using your Google Account.Click on **Create Project**.

![alt_text](/images/google-console-dashboard.png "image_tooltip")

2. Fill in the details of the project and click **Create**.

![alt_text](/images/create-new-project.png "image_tooltip")

3. A new project will be set-up and you'll be redirected to dashboard displaying user analytics. Once here, select **Credentials** from left navigation menu.

![alt_text](/images/new-project-created.png "image_tooltip")

4. Click on **Create Credentials** and select **Oauth Client ID**.


![alt_text](/images/create-credentials.png "image_tooltip")

5. Select **Create Consent Screen**. Depending on your needs you can select **Internal** or  **External**, for purposes of this tutorial we'll keep option for account accessible to users outside our organisation, so we'll select **External**.


![alt_text](/images/creat.png "image_tooltip")

6. On **Edit App Registration** screen, fill in the details as required. Once done, click on **Save and Continue** to move onto the next step.

![alt_text](/images/edit-application-details.png "image_tooltip")

7. Under **Scopes** section click on **Add or Remove scopes**, a form opens up where you can configure the scopes you'd like to add. You may also manually add scopes under **Manually Add Scopes** option. Once done click on **Save** to move to next step.

![alt_text](/images/update-selected-scopes.png "image_tooltip")


8. Under **Test Users** you can choose to add the users who'll have access to app while its under "testing" status.

![alt_text](/images/update-selected-scopes.png "image_tooltip")

9. Now all the settings are done, you can review the settings on final page. Click on **Back to dashboard**. Once here, navigate back to **Credentials** from side navigation bar and select **Application Type** from drop down. For this tutorial we'll choose web application application type. You can also enter the URIs **Authorised JavaScript origins**. s

![alt_text](/images/web-applications.png "image_tooltip")

10. Once you are done with above step you'll get your user credentials (**Client ID** and **Client Secret**).



## Creating a page with Spring Initializr

1. Head over to Spring Initializr [start.spring.io]
2. Fill in the required **Group Name** and **Artifact**. In **Dependencies** search for **OAuth2**, **Lombok**, **Spring Web**, **JPA**, **H2 Database** and add them as shown.

![server-side-template](/images/server-side-config.png "image_tooltip")

3. Click on **Generate** and download the template .zip file

4. For client side, we'll create another project using Spring Initializr. Once again, fill in the details but this time under **Dependencies** search **ThymeLeaf**. Thymeleaf is a template engine, based on JAVA XML/XHTML/HTML5 which we'll be using for UI. Click on **Generate** and download the template .zip file.

![client-side-template](/images/server-side-config.png "image_tooltip")


Open the project in your code editor.

5. Locate to **src>main>resources>application.properties** and paste this 

```

spring.security.oauth2.client.registration.google.client-id= **Your ClientID from above Google OAuth2 setup**

spring.security.oauth2.client.registration.google.client-secret= **Your Client Secret from above Google OAuth2 setup**

```

1. Under **src>main>java** create a new package **Config**. Under this we are going to create a configuration which will allow browser Cross Origin access. Create a **.java** file **CrossOrigin.java** and add following configuration to it.

```

```