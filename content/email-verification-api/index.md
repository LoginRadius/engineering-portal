---
type: async
title: Email Verification API (EVA)
date: "2020-08-31"
coverImage: "eva.png"
author: "Aman Agrawal"
tags: ["Free tool","Developer Resources ","Verification", "Email"]
description: "Email authentication, being the traditional way of authentication and used most widely. Increase in the spams has also increased the disposable email registrations. To reduce and identify such unwanted users, EVA(Email Verification API) is the tool, developed by LoginRadius developers."
---

## Introduction

Authentication is the necessary implementation for secure and genuine access to resources of web and mobile applications. It helps to authorize the user and provide access control for applications based on the user’s credentials. 

There are various authentication mechanisms like Email, Phone numbers, Biometrics, etc. However, Email is still considered the primary means of authentication because other mechanisms are not as optimized or in approach to everyone. 

So it is safe to say that most of your application users used email for creating their accounts. With that, some users tend to use disposable email services for fake account creation. These fake accounts result in additional liability to your application resources and servers.

You can effectively reduce such spams for your applications by analyzing the user’s email address during registration for the following aspects:

- Email is valid or not.
- Email is disposable or not.
- Email is deliverable or not.

There are some tools available that could help you analyze the above factors, and one such tool is [EVA](https://eva.pingutil.com), an Email Verification API. It is a free API and analyzes the user’s email for all of the factors mentioned above. 

### API Details

The details of Email Verification API (API) is as follows:

| Parameters  | Value  | 
|---|---|
| URL | `https://api.eva.pingutil.com/email`|
|Query Param | ```{ email: test@mail7.io }```| 
| Response |  `{    "status": "success",     "data": {        "email_address": "test@mail7.io",        "domain": "mail7.io",        "valid_syntax": true,        "disposable": true,        "deliverable": true    }}`|

Valid_syntax, disposable, and deliverable are three attributes of this API, let’s see how these works:

#### Output Parameters:
`valid_syntax`
This attribute verifies the syntax of the entered email address matches the standard email address format or not. It is useful in the cases where the end-user might misspell email addresses while typing.

`disposable`
This attribute verifies whether the entered email address domain belongs to the disposable email service. EVA checks the email address against a valid database of more than 4500 disposable email services. Thus, it can effectively help the developer to prevent users from registering using disposable email.

`deliverable`
This attribute verifies whether the email domain has valid MX records or not. The email address is considered deliverable if the valid MX record for the email domain is found.

 > **Note**: A mail exchanger record (MX record) specifies the mail server responsible for accepting email messages on behalf of a domain name. It is a resource record in the Domain Name System (DNS). 

The response received for the above three attributes of API can help you take further action. These attributes are not just limited to registration use cases, you can utilize them for other use cases like if you have an existing user base but would like to limit the spammers (who have registered using disposable emails) from commenting on the blog or accessing your application resources.

*This API tool has been developed and designed as a way of giving back to the developer community initiative by LoginRadius Developers. Your opinion is important to us. This way we can keep improving our product for the developer community. Please share your feedback [here](https://docs.google.com/forms/d/e/1FAIpQLSfa76A9ES0wvIF0_I7ebLAFugVhhDKB7em-WPbMjHPj1w7mOw/viewform)*