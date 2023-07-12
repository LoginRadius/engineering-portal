---
title: "What is SAML SSO?"
date: "2021-06-18"
coverImage: "saml-sso.jpg"
tags: ["saml", "sso","authentication"]
author: "Rajeev Sharma"
description: "SAML SSO is an authentication standard for single sign-on (SSO) based on XML. Learn more about how it works, advantages and its components."
metatitle: "What is SAML SSO?"
metadescription: "Learn about SAML SSO and its advantages. Explore components of SAML SSO and how it works to enhance user authentication and access management. Check out to know more."
---

## Introduction

When it comes to robust enterprise cybersecurity strategy, nothing could replace the perfect symphony of SAML and [Single Sign-On](https://www.loginradius.com/single-sign-on/) (SSO) that delivers excellent user experience and stringent security. 

While SAML helps create, request and exchange security assertions between platforms and applications, SSO within SAML ensures the highest level of user experience while users authenticate themselves on multiple interconnected platforms. 

Let’s understand the aspects of leveraging SAML SSO and how businesses can take a giant leap toward a secure and seamless user authentication experience. 

## What is SAML? 

Security Assertion Markup Language or SAML is an XML-based markup language for creating, requesting, and exchanging security assertions between applications. In addition, SAML enables the cross-domain single sign-on (web-based), which helps reduce the administrative overhead of distributing multiple authentication tokens to the user. SAML is also:

* A set of XML-based protocol messages
* A set of protocol message bindings
* A set of profiles (utilizing all of the above)

## What is SAML SSO? 

SAML SSO is basically an open standard for exchanging [authentication and authorization](https://www.loginradius.com/blog/identity/authentication-vs-authorization-infographic/) data between two parties, in particular, between an identity provider and a service provider, where: 

* An identity provider (IdP) authenticates a consumer and provides a SAML Assertion to service providers.
* A service provider (SP) verifies the Assertion and allows access to the consumer.

## What is SAML Used For? 

SAML is basically used to enable web browser SSO (single sign-on) that allows users to authenticate once and gain access to multiple interconnected platforms without having to re-enter the credentials. 

SAML providers ensure that every authentication request is processed securely and user information remains secure. 

## What is a SAML SSO Provider?

A SAML SSO provider can be defined as a system that helps obtaining access to a service as requested. SAML offers every bit of identity-related information between two parties viz., an IdP and an SP. Here’s what these two types of SAML SSO providers do: 

* Identity Provider (IdP): It performs the authentication and forwards a user’s identity and authorization request to the service provider (SP). Here, the IdP has authenticated the individual user and then forwarded the same to SP to allow access. 
* Service provider (SP): It authorizes the given user to access the resources/network. An SP initially requires authentication from the IdP to [grant authorization](https://www.loginradius.com/blog/identity/loginradius-m2m-authorization-data-access/) to the user. The entire process works seamlessly and a user just need to provide authentication credentials once. 

## Advantages of SAML

Below are the benefits that SAML provides:

### 1. Standardization

The SAML is a standard format that allows a seamless exchange of information between systems, independent of implementation, platform-specific architecture, and performance.

### 2. Platform neutrality

The SAML abstracts the security framework away from platform architecture and also from particular vendor implementation. Making the security more independent of application logic is an essential tenet of Service-Oriented Architecture.

### 3. Loose coupling of directories

The SAML does not require the user information to be maintained and synchronized between directories.

### 4. Better UI experience

The SAML enables single sign-on by allowing users to authenticate at an identity provider end and then access service providers without additional authentication. In addition, [identity federation](https://www.loginradius.com/blog/identity/what-is-federated-identity-management/) (linking multiple identities) with SAML allows a better-customized user experience at each service while promoting privacy.

### 5. Reduced complexity

One can use SAML to 'reuse' a single act of authentication (like logging in with the username and password) multiple times across multiple services can reduce the cost of maintaining account information. The identity provider will handle this burden.

### 6. Centralized Risk Management

In SAML, the responsibility for the proper management of identities lies with the identity provider. It is more manageable and desirable rather than handling multiple service provider systems.

[![DS-SSO](DS-SSO.png)](https://www.loginradius.com/resource/loginradius-single-sign-on/)

## SAML Components

SAML framework consists of three basic sets of components, and they are as below:

### 1. Assertions

A SAML assertion is basically a package of data a SAML authority produces. Alternatively, you can say that a SAML Assertion is the XML document containing the user authorization that the identity provider sends to the service provider.

### 2. Protocols

SAML protocols describe how certain SAML elements (including assertions) are packaged within request and response elements and give the processing rules that SAML entities must follow when producing or consuming these elements.

### 3. Bindings

SAML bindings describe how a SAML message must be mapped on non-SAML messaging formats and communication protocols.

## How Does SAML Work? 
The SAML SSO works by transferring the user’s identity details from one site (the identity provider) to another (the service provider). This process is done through an exchange of digitally signed XML documents.

Let us consider a scenario: A user is logged into a system that acts as an [identity provider](https://www.loginradius.com/blog/identity/2021/06/what-is-identity-provider/). The user wants to log in to another remote application, such as a Job application (the service provider app). 

Here, following process occurs:

- The user accesses the remote application via a link on an intranet, a saved bookmark, or similar, and the application loads.

- The application identifies the user’s origin (by the user agent or equivalent) and then redirects the user to the identity provider, to ask for authentication. It is an authentication request.

- The user either has an active browser session with the identity provider or establishes a new via login process into the identity provider.

- The identity provider creates the authentication response in the form of an XML document that contains the user’s username or email address, signs it using an X.509 certificate, and posts this information to the service provider.

- The service provider, which already knows the identity provider and has a certificate fingerprint, retrieves the authentication response and validates the same using the certificate fingerprint.

- The identity of the user is verified, and the user is now authorized to access the app.

## SAML SSO Flow

The below diagram illustrates the single sign-on flow for SAML SSO, i.e., when an application triggers SSO.
 
![SAML FLOW](https://apidocs.lrcontent.com/images/SAMLflow_1484060cc3534702fa4.48760508.png "SAML FLOW")

If you want to learn more on how LoginRadius can help implement IDP-initiated SSO and SP initiated SAML SSO, refer to the LoginRadius SAML overview documentation.

### Conclusion

In this article, we talked about the basics of SAML SSO and its key components. However, before implementing any functionality on your website, it is recommended to analyze and consider the pros and cons from every possible angle. 

[![book-a-demo-Consultation](../../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
