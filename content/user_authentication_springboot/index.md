---
title: "How to Implement User Authentication in Spring Boot Apps"
date: "2021-10-03"
coverImage: "php-filter-portfolio.png"
author: Akaash Mohan Saxena
tags: ["User Authentication", "Spring Boot", "Spring Security"]
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

5. Select **Create Consent Screen**. Depending on your needs you can select **Internal** or **External**, for purposes of this tutorial we'll keep option for account accessible to users outside our organisation, so we'll select **External**.

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

6. Under **src>main>java>com>tutorial>userauthentication>springsecurityauthserver** create a new package **Config**. Under this we are going to create a configuration which will allow browser Cross Origin access. Create a **.java** file **CrossOrigin.java** and add following configuration to it.

```

package com.tutorial.userauthentication.springsecurityauthserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CrossOriginConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT","DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(60);
    }
}

```

1. Now we have successfully configured our application for CORS policy. We will now shift our focus on building application, for the purposes of demonstration I'll be building a books shop, you may build any class as you like as long as we follow MVC structure.

## Creating a book shop application

1. Under **src>main>java>com>tutorial>userauthentication>springsecurityauthserver** create a new package **books**.
2. Inside the package create a file **booksController**, inside it we'll define our route mapping and some books we can add to our model.

```
package com.tutorial.userauthentication.tutorial;



import com.tutorial.userauthentication.springsecurityauthserver.userdetails.MyUserDetails;
import com.tutorial.userauthentication.springsecurityauthserver.userdetails.UserDetailsService;
import java.math.BigDecimal;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/books")
@RequiredArgsConstructor
@Slf4j
public class BooksController {
    private final UserDetailsService userDetailsService;

    List<Book> booklist = List.of(
            new Book("Pride and Prejudice", "Romance", BigDecimal.valueOf(1234.65)),
            new Book("The Naughtiest Girl", "Adventure", BigDecimal.valueOf(444.625)),
            new Book("Bible", "Fiction", BigDecimal.valueOf(333.665)),
            new Book("Star Wars", "Sci-Fi", BigDecimal.valueOf(12334.65))
    );

    @GetMapping("/")
    @SneakyThrows
    public String bookShop(Model model, OAuth2AuthenticationToken token){
        model.addAttribute("title", "Book Shop");
        MyUserDetails userDetails = userDetailsService.getUserDetails(token);
        model.addAttribute("picture", userDetails.getPicture());
        model.addAttribute("fullname", userDetails.getName());
        model.addAttribute("email", userDetails.getEmail());
        model.addAttribute("books", booklist);
        log.info("Userdetails: \n{}", userDetails);
        return "books";
    }

}

```

3. Navigate to **src>main>resources>templates** create a new html file **books.html**. We'll create a very basic HTML page without any styling, just so we can preview the OAuth2 system working.

```


<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title th:text="${title}">My title....</title>
    <link rel="stylesheet" th:href="@{/css/flower.css}"/>
</head>
<body>
<div class="header">
    <div class="header-logo">Books shop</div>
    <div class="header-user">Books shop</div>
        <div class="header-user-image"><img th:src="${picture}" height="100px"/></div>
        <div th:text="${fullname}"></div>
        <div th:text="${email}"></div>
    </div>
</div>

<div class="content">
    <div th:each="book : ${books}" class="book">
        <div class="book-name" th:text="${book.name}">name</div>
        <div class="book-right">
            <div class="book-smell" th:text="${book.category}">name</div>
            <div class="book-price" th:text="${book.price}">name</div>
        </div>
    </div>
</div>


</body>
</html>

```

4. Start the JAVA application and you'll find the following browser view.

![alt_text](/images/error_redirect_uri.png "image_tooltip")

This error basically is telling Google to redirect the user to our landing page after authentication, but we need to first configure this address with Google OAuth2 Console.

5. To fix above shown error, head over to [Google Oauth2 Console.](https://console.cloud.google.com/apis/credentials?project=demooauth2-329412)

![alt_text](/images/uri_update_credentials.png "image_tooltip")

Click on the app under OAuth2 2.0 Client IDs. Under **Authorised Redirected URI** add your URI or in this case **https://localhost:8080/login/oauth2/code/google**. Click **Save**.

6. Go back to your hosted page and refresh. Now you'll find your login page working.

![alt_text](/images/redirect_uri_working.png "image_tooltip")

Our OAuth implementation is pretty much done at this point, we can choose to further add UI front end changes to our HTML, display some more details on our page. Let's display some more information related to user on the page.

7. Further update **\booksController.java** like this.

```

package com.tutorial.userauthentication.springsecurityauthserver.book;



import com.tutorial.userauthentication.springsecurityauthserver.userdetails.MyUserDetails;
import com.tutorial.userauthentication.springsecurityauthserver.userdetails.UserDetailsService;
import java.math.BigDecimal;
import java.net.URI;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;


@Controller
@RequestMapping(value = "/books", method = RequestMethod.GET)
@RequiredArgsConstructor
@Slf4j
public class BooksController {
    private final UserDetailsService userDetailsService;
    private final OAuth2AuthorizedClient authorizedClientService;

    List<Book> booklist = List.of(
            new Book("Romeo Juliet", "Romance", BigDecimal.valueOf(1234.65)),
            new Book("Bush", "Adventure", BigDecimal.valueOf(444.625)),
            new Book("Rich Dad Poor Dad", "Non-Fiction", BigDecimal.valueOf(333.665)),
            new Book("Star wars", "Sci-Fi", BigDecimal.valueOf(12334.65))
    );

    @GetMapping("/")
    @SneakyThrows
    public String bookShop(Model model, OAuth2AuthenticationToken token){
        model.addAttribute("title", "Book Shop");
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
            token.getAuthorizedClientRegistrationId(), token.getPrincipal().getName()
        );
        URI userDetailsEndpoint = URI.create(
            client.getClientRegistration()
            .getProviderDetails()
            .getUserInfoEndpoint()
            .getUri()
        );

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", client.getAccessToken().getTokenValue());
        RequestEntity<String> request = new RequestEntity<>("",headers,HttpMethod.GET, userDetailsEndpoint);
        ResponseEntity<Map> response = restTemplate.exchange(request, Map.class);

        MyUserDetails userDetails = userDetailsService.getUserDetails(token);
        model.addAttribute("picture", userDetails.getPicture());
        model.addAttribute("fullname", userDetails.getName());
        model.addAttribute("email", userDetails.getEmail());
        model.addAttribute("books", booklist);
        log.info("Userdetails: \n{}", userDetails);
        return "books";
    }

}

```

8.
