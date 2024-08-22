---
title: "How Chrome’s Third-Party Cookie Restrictions Affect User Authentication?"
date: "2024-07-08"
coverImage: "third-party-cookies-phaseout-chrome.png"
author: "Raghunath Reddy"
tags: ["Identity", "Cookies", "Chrome"]
description: "Google Chrome has planned to phase out third-party cookies, which will affect different website functionalities depending on third-party cookies. This blog focuses on how this phase-out affects identity and user authentication and discusses alternatives for overcoming challenges."
---

Google has prepared a roadmap to restrict third-party cookies in Chrome. Since 04 January 2024, Chrome has rolled out third-party cookie restrictions for 1% of stable clients and 20% of Canary, Dev, and Beta clients.

__What does it mean for user authentication?__

On one hand, Google believes third-party cookies are widely used for cross-site tracking, greatly affecting user privacy. Hence, Google wants to phase out (or restrict) supporting third-party cookies in Chrome by early Q2 2025 (subject to regulatory processes).

On the other hand, Google introduced Privacy Sandbox to support the use cases (other than cross-site tracking and advertising) previously implemented using third-party cookies.

In this article, we’ll discuss:

- How is user authentication (identity) affected?

- What is Google offering as part of Privacy Sandbox to support various identity use cases when third-party cookies are phased out?

## How is User Authentication Affected?

Third-party cookie restrictions affect user authentication in three ways, as follows.

### External Identity Providers

If your website or app uses an external Identity Provider (IdP) — like LoginRadius, the IdP sets a third-party cookie when the user authenticates on your app.

### Web SSO

If you have multiple apps across domains within your organization and authentication is handled using an IdP (internal or external) with web SSO, you already use third-party cookies to facilitate seamless access for each user using a single set of credentials.

If you have implemented web SSO with one primary domain and multiple sub-domains of the primary domain, third-party cookie restrictions may not apply. For now, Google doesn’t consider the cookies set by sub-domains as third-party cookies, although this stance may change in the future.

For example, you have apps at `example.com`, `travel.example.com`, `stay.example.com`, and web SSO is handled by `auth.example.com`. In this case, third-party cookie restrictions don’t apply.

### Federated SSO

Federated SSO is similar to, albeit different from, web SSO. It can handle multiple IdPs and applications—aka., Service Providers (SPs)—spanning multiple organizations. It can also implement authentication scenarios that are usually implemented through web SSO.

Usually, authentication is handled on a separate pop-up or page when the user wants to authenticate rather than on the application or website a user visits. 

For example, you already use federated SSO if you facilitate authentication for a set of apps through multiple social identity providers as well as traditional usernames and passwords.

> __Note__: It is also possible to store tokens locally, not within cookies. In this case, third-party cookie restrictions won’t affect token-based authentication. However, the restrictions still affect authentication where tokens are stored within third-party cookies (a common and secure method).

## Chrome’s Alternatives for Third-Party Cookies

Google has been developing alternative features and capabilities for Chrome to replace third-party cookies as part of its Privacy Sandbox for Web initiative.

Specific to authentication, Google recommends the following:

1. Cookies Having Independent Partitioned State (CHIPS)
2. Storage Access API
3. Related Website Sets
4. Federated Credential Management (FedCM) API

### Cookies Having Independent Partitioned State (CHIPS)

[CHIPS](https://developers.google.com/privacy-sandbox/3pcd/chips) are a restricted way of setting third-party cookies on a top-level site without making them accessible on other top-level sites. Thus, they limit cross-site tracking and enable specific cross-site functionalities, such as maps, chat, and payment embeds.

For example, a user visits `a.com` with a map embed from `map-example.com`, which can set a partitioned cookie that is only accessible on a.com. 

If the user visits `b.com` with a map embed from `map-example.com`, it cannot access the partitioned cookie set on `a.com`. It has to create a separate partitioned cookie specific to `b.com`, thus blocking cross-site tracking yet allowing limited cross-site functionality.

You should specifically opt for partitioned cookies (CHIPS), which are set with partitioned and secure cookie attributes.

If you’re using an external identity provider for your application, CHIPS is a good option to supplant third-party cookie restrictions. 

However, CHIPS may not be ideal if you have a web SSO or federated SSO implementation. It creates separate partitioned cookies for each application with a separate domain, which can increase complexity and create compatibility issues.

### Storage Access API

With [Storage Access API](https://developers.google.com/privacy-sandbox/3pcd/storage-access-api), you can access the local storage in a third-party context through iframes, similar to when users visit it as a top-level site in a first-party context. That is, it gives access to unpartitioned cookies and storage.

Storage Access API requires explicit user approval to grant access, similar to locations, camera, and microphone permissions. If the user denies access, unpartitioned cookies and storage won’t be accessible in a third-party context.

It is most suitable when loading cross-site resources and interactions, such as:

Verifying user sessions when allowing interactions on an embedded social post or providing personalization for an embedded video. 
Embedded documents requiring user verification status to be accessible.

As it requires explicit user approval, it is advisable to use Storage Access API when you can’t implement an identity use case with the other options.

### Related Website Sets

With [Related Website Sets](https://developers.google.com/privacy-sandbox/3pcd/related-website-sets), you can declare a `primary` website and `associatedSites` for limited purposes to grant third-party cookie access and local storage for a limited number of sites.

Chrome automatically recognizes related website sets declared, accepted, and maintained in this open-source GitHub repository: https://github.com/GoogleChrome/related-website-sets

It provides access through Storage Access API directly without prompting for user approval, but only after the user interacts with the relevant iframe.

It is important to declare a limited number of domains in related website sets that are meaningful and used for specific purposes. Google may block or suspend any exploitative use of this feature.

The top-level site can also request approval for specific cross-site resources and scripts to Storage Access API using `resuestStorageAccessFor()` API.

If you’re using an external identity provider for your web application, you can declare the domain of the identity provider in the related set to ensure limited third-party cookies and storage access to the identity provider, thus ensuring seamless user authentication.

Related Website Sets can also work to supplement third-party cookie restrictions in web SSO and federated SSO if the number of web applications (or domains) is limited.

### Federated Credential Management (FedCM) API

FedCM API enables federated SSO without third-party cookies.

With FedCM API, a user follows these steps for authentication:

1. The User navigates to a Service Provider (SP) — aka., Relying Party (RP)

2. As the user requests to authenticate, the SP requests the browser through FedCM API to initiate authentication.

3. The browser displays a list of available identity providers (supported by the RP), such as social IdPs like Google, Apple, LinkedIn, and Facebook, or other OAuth IdPs like LoginRadius.

4. Once the user selects an IdP, the browser communicates with the IdP. Upon valid authentication, the IdP generates a secure token. 
The browser delivers this secure token to the RP to facilitate user authorization.

You can access a user demo of FedCM here: https://fedcm-rp-demo.glitch.me/. 

For more information about implementing federated SSO with FedCM API, go through the [FedCM developer guide](https://developers.google.com/privacy-sandbox/3pcd/fedcm-developer-guide).

## How is LoginRadius Preparing for the Third-party Cookie Phase-out?

Firstly, we’re committed to solving our customers' user identity pain points — and preparing for the third-party cookies phase-out is no different.

We’ll implement the most relevant and widely useful solutions to facilitate a smooth transition for our customers.

Please subscribe to our blog for more information. We’ll update you on how we help with the third-party cookie phase-out.

## In Conclusion

The proposed changes to phase out third-party cookies and suggested alternatives are evolving as Google has been actively collaborating and discussing changes with the border community.

Moreover, browsers like Firefox, Safari, and Edge may approach restricting third-party cookies differently than Google does.

From LoginRadius, we’ll keep you updated on what we’re doing as a leading Customer Identity and Access Management (CIAM) vendor to prepare for the third-party cookie phase-out.

## Glossary

__Top-level site__: It is the primary site a user has visited.

__First-party cookie__: A cookie set by the top-level site.

__Third-party cookie__: A cookie set by a domain other than the top-level site. For example, let’s assume that a user has visited `a.com`, which might use an embed from `loginradius.com` to facilitate authentication. If `loginradius.com` sets a cookie when the user visits `a.com`, it is called a third-party cookie as the user hasn’t directly visited `loginradius.com`.

## References

- https://developers.google.com/privacy-sandbox/3pcd/prepare/prepare-for-phaseout
- https://developers.google.com/privacy-sandbox/3pcd/guides/identity 