---
title: "What are Federated Identity Providers?"
date: "2021-03-26"
coverImage: "federated-identity-providers.png"
tags: ["customer-experience"]
featured: false 
author: "Rajeev Sharma"
description: "Federated identity management is a configuration that can be made between two or more trusted domains to allow consumers of those domains to access applications and services using the same digital identity. Such identity is known as federated identity, and the use of such a solution pattern is known as identity federation."
metatitle: "What are Federated Identity Providers?"
metadescription: "What is Federated Identity Providers and how they enhance businesses. Also, learn the three protocols for federated identity, SAML, OpenID and OAuth. "
---


# A Beginner's Guide to Federated Identity Providers
Federated identity defines linking and using the electronic identities that a consumer has across several identity management systems. In simpler words, an application doesn't have to get and store clients' certifications to confirm them. Alternatively, the application can use the identity management system that already holds the consumer's electronic identity to authenticate the consumer. However, note that the application must trust that identity management system. 
 
This methodology permits the decoupling of the confirmation and approval capacities. It also makes it simpler to bring together these two capacities to evade a circumstance where each application needs to deal with a bunch of certifications for each client. It is also advantageous for clients since they don't need to keep many usernames and passwords for each application.


# What is Federated Identity Management
[Federated identity management](https://www.loginradius.com/resource/federated-identity-management-datasheet) is a configuration that can be made between two or more trusted domains to allow consumers of those domains to access applications and services using the same digital identity. Such identity is known as federated identity, and the use of such a solution pattern is known as identity federation.
 
Identity and access management (IAM) is an essential feature of every digital enterprise today, assigned to a service provider known as the identity broker. A service provider specialized in brokering access control between different service providers is an identity broker (also referred to as relying parties).

There are three protocols for federated identity:
- SAML
- OpenID
- OAuth

## SAML

Security Assertion Markup Language (SAML) is an open-source framework for exchanging authentication and authorization data between an identity provider and a service provider, where:
- **An identity provider (IdP)** authenticates a consumer and provides a SAML Assertion to service providers.
- **A service provider (SP)** verifies the assertion and allows access to the consumer.
 
SAML is an XML-based markup language for creating, requesting, and exchanging security assertions between applications. SAML enables web-based, cross-domain single sign-on (SSO), which reduces the administrative overhead of distributing multiple authentication tokens to the consumer.

## OpenID


OpenID Connect 1.0 is an essential character layer on top of the [OAuth 2.0 convention](https://www.loginradius.com/blog/async/what-is-the-difference-between-oauth1-and-oauth2/). It empowers clients to check the end user's identity, dependent on the verification performed by an Authorization Server, to acquire essential profile data about the end-user. OpenID permits clients to be verified utilizing outsider administrations called character suppliers. Clients can decide to use their favored OpenID suppliers to sign in to sites that acknowledge the OpenID validation plot.

There are three roles that define OpenID specification:
- The end-user that is looking to verify its identity.
- The relying party (RP) is the entity looking to verify the identity of the end-user.
- The OpenID provider (OP) is the entity that registers the OpenID URL and can confirm the end user's identity.

## OAuth

[OAuth 2.0](https://www.loginradius.com/blog/async/authorization-code-flow-oauth/) is a protocol that facilitates token-based authentication and authorization; thus, allowing consumers to gain limited access to their resources on one application, to another application, without having to expose their credentials. You can let your application's consumers log in to an OAuth-enabled application without creating an account. OAuth is slightly different from OpenID and SAML in being exclusively for authorization purposes and not for authentication purposes.
 
The OAuth specifications define the following roles:

- The end-user or the entity that owns the resource.
- The resource server (OAuth Provider) is the entity hosting the resource.
- The client (OAuth Consumer) is the entity looking to consume the resource after getting authorization from the client.


[![book-a-demo-loginradius](book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)