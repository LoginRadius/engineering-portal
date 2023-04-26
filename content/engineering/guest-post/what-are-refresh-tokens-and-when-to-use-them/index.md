---
title: What Are Refresh Tokens? When & How to Use Them
date: "2021-10-05"
coverImage: "coverImage.png"
author: "Mcvean Soans"
tags: ["Authentication","Tokens", "UX"]
description: "This is your guide to understanding refresh tokens, and why you may need to use them to enhance the user experience of your applications."
---

Ever wondered how amazing it would be if an application knows you are trying to access it, without having to re-validate your credentials time and again?!

Let's say you try accessing the application after a day or two, or even at the end of an entire week, and somehow... magically (not really xD) the system just knows it's you.

Furthermore, the Security aspect of the app being completely robust, no other individual with malicious intent can access confidential information. Now that's music to a developer's ears -- or, at least, a powerful way to secure applications and systems at scale.

Before diving into the know-hows of refresh tokens, let's understand why it is even needed in the first place.

## Conventional Approach of Securing Apps

Many applications utilize the so-called _token-based authentication_ to permit a user to access information (or resources) that would normally not be available for the general public (unauthenticated users).

A [__token__](https://www.loginradius.com/blog/identity/pros-cons-token-authentication/) is an unique approval given to you (more like a digital signature) for accessing any resource. The application issues it to you once you have authenticated yourself with valid credentials. These tokens are generally short-lived, i.e., valid only for a short amount of time (say 5-15 minutes). This is plenty for you to perform a particular task requiring validation but makes it harder for individuals with malicious intent to get their hands on confidential resources. Now, until the token expires, the user would not have to enter the credentials again.

This kind of system is widely used to perform online transactions where security is of utmost importance. However, due to the short-lived nature of such access tokens, the user would have to re-validate themselves to be re-issued a new access token.

## Refresh Tokens to The Rescue

We can clearly make out that access tokens overall provide better security but hampers the user experience (UX) of the application. Imagine having to log in again and again just because the application has to make sure that you're still, well... you!

Here is where refresh tokens come to the rescue. A __refresh token__ just helps you re-validate a user without them having to re-enter their login credentials multiple times. The access token is re-issued, provided the refresh token is a valid one requesting permission to access confidential resources. This method provides an enhanced user experience all while keeping a robust security interface.

[_OAuth 2.0_](https://www.loginradius.com/blog/engineering/oauth2/) is a popular authentication framework that essentially allows client applications to access resources provided by other applications & servers on behalf of the user. This architecture leverages the benefits of utilizing access and refresh tokens.

Now, having discussed the impact a refresh token has on enhancing the user experience of the application, is there any other benefit to using them?

It is true that, generally, web applications and SPAs (Single-Page Applications) are meant to have short-term access to any resource leveraging authentication. When you do need access after a few days to the resources, you could definitely log in again, right? So why bother setting up refresh tokens?

### When to use Refresh Tokens?

The main purpose of using a refresh token is to considerably shorten the life of an access token. The refresh token can then later be used to authenticate the user as and when required by the application without running into problems such as cookies being blocked, etc. If that does not make much sense, think of it this way:

When a browser makes a request to an API endpoint to use a resource provided only to authenticated users, the application would require the credentials of the user. And upon authentication (login), the application on the user's browser is granted access to the resource. This access is provided by sharing an access token with the user's browser so that subsequent API calls from the browser -- which requires the credentials -- can be sent without any hassle.

Now in the process of sharing the access token with the user, the system may also provide a refresh token that would later authenticate the user while making the subsequent API calls -- even if the access token has expired -- by requesting a new access token when required.

Hence, the refresh tokens allow applications to obtain new access tokens utilizing mere API calls without any need of having users approve cookies, login multiple times, etc.

### Drawbacks and Ways to Conquer

It's also true that you may not need the "added superpowers" offered by the refresh tokens to keep the user session and experience smooth. After all, methods such as _cookies_ and _silent authentication_ are beneficial in their own ways too! Let's talk about a scenario when refresh tokens might actually turn out to be an application's kryptonite... (not really xD).

If a refresh token is compromised (someone else got their hands on it or, even worse -- steals it), the individual would not only gain access to the resources provided by the API but also the amount of time the access has been granted would be more. Now that's a dreadful scenario for developers and users alike.

Having said that, counter-measures such as **_Refresh Token Rotation_** and **_Automatic Reuse Detection_** help limit the destructive nature -- and highlight the benefits of these refresh tokens.

In such methods, when a refresh token is utilized to access any resource, the system not only responds with the access token but also with a new refresh token in turn. Any subsequent API requests can be made through newer refresh tokens from there onwards. If a request is made utilizing an older refresh token, the request is efficiently rejected (assuming the person/client requesting is unauthenticated).

Also, [_Risk-Based Authentication (RBA)_](https://www.loginradius.com/blog/engineering/risk-based-authentication/) method suggests that if a refresh token is utilized multiple times, the tokens are revoked; thereby, preventing further access to valuable resources. Such a mechanism further helps strengthen the security of applications using refresh tokens.

### Conclusion

Refresh Tokens are really a consummate way of providing sturdy security all while providing a great experience for users, provided it being used in appropriate ways. That being said, it might not be completely essential for your applications and their needs, so the final decision rests with you.

I hope this blog provided an insight into refresh tokens and how you may utilize these in your applications. Thanks for reading!
