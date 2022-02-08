---
title: "What is SAML SSO?"
date: "2021-06-18"
coverImage: "saml-sso.jpg"
tags: ["security"]
featured: false
author: "Rajeev Sharma"
description: "SAML SSO is an authentication standard for single sign-on (SSO) based on XML. Learn more about how it works, advantages and its components."
metatitle: "What is SAML SSO?"
metadescription: "SAML is an XML-based markup language for creating, requesting, and exchanging security assertions between applications. In addition, SAML enables the cross-domain single sign-on (web-based), that helps reduce the administrative overhead of distributing multiple authentication tokens to the user."
---


# What is SAML SSO?
Security Assertion Markup Language is basically an open standard for exchanging authentication and authorization data between two parties, in particular, between an identity provider and a service provider, where:

- An identity provider (IdP) authenticates a consumer and provides a SAML Assertion to service providers.
- A service provider (SP) verifies the Assertion and allows access to the consumer.

SAML is an XML-based markup language for creating, requesting, and exchanging security assertions between applications. In addition, SAML enables the cross-domain single sign-on (web-based), that helps reduce the administrative overhead of distributing multiple authentication tokens to the user.

SAML is also:
- A set of XML-based protocol messages
- A set of protocol message bindings
- A set of profiles (utilizing all of the above)

## Advantages of SAML

Below are the benefits that SAML provides:

- **Standardization**: The SAML is a standard format that allows seamless exchange of information between systems, independent of implementation, platform-specific architecture, and implementation.

- **Platform neutrality**: The SAML abstracts the security framework away from platform architecture, and also from particular vendor implementation. Making the security more independent of application logic is an essential tenet of Service-Oriented Architecture.
- **Loose coupling of directories**: The SAML does not require the user information to be maintained and synchronized between directories.

- **Better UI experience**: The SAML enables single sign-on by allowing users to authenticate at an identity provider end, and then access service providers without additional authentication. In addition, [identity federation](https://www.loginradius.com/blog/start-with-identity/what-is-federated-identity-management/) (linking multiple identities) with SAML allows a better-customized user experience at each service while promoting privacy.

- **Reduced complexity**: One can use SAML to 'reuse' a single act of authentication (like logging in with the username and password) multiple times across multiple services can reduce the cost of maintaining account information. The identity provider will handle this burden.

- **Centralized Risk Management**: In SAML, the responsibility for the proper management of identities lies with the identity provider. It is more manageable and desirable rather than handling multiple service provider systems.

Also Read: [Best SSO Provider: Why LoginRadius Is Considered As The Best SSO Solution](https://www.loginradius.com/blog/start-with-identity/best-sso-providers-loginradius/)

## SAML Components
SAML framework consists of three basic sets of components, and they are as below:

- **Assertions:** A SAML assertion is basically a package of data produced by a SAML authority. Alternatively, you can say that a SAML Assertion is the XML document containing the user authorization that the identity provider sends to the service provider.

- **Protocols:** SAML protocols describe how certain SAML elements (including assertions) are packaged within request and response elements and give the processing rules that SAML entities must follow when producing or consuming these elements.

- **Bindings:** SAML bindings describe how a SAML message must be mapped on non-SAML messaging formats and communication protocols. 

## How SAML works
The SAML SSO works by transferring the user’s identity details from one site (the identity provider) to another (the service provider). This process is done through an exchange of digitally signed XML documents.

Let us consider a scenario: A user is logged into a system that acts as an [identity provider](https://www.loginradius.com/blog/start-with-identity/2021/06/what-is-identity-provider/). The user wants to log in to another remote application, such as a Job application (the service provider app). 

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


[![LoginRadius Book a Demo](../../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
