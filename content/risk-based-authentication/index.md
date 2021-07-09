---
title: "What is Risk-Based Authentication? And Why Should You Implement It?"
date: "2021-05-25"
coverImage: "cover.jpg"
author: "Raghunath Reddy"
tags: ["RBA","Authentication"]
description: "RBA is a process of assessing the risk of an authentication request in real-time and requesting additional layers of authentication and identification based on the risk profile to validate that a user attempting to authenticate is who they claim to be."
---

While most of you — developers and architects — understand the need for strong password security and practice it, your users might not. 

For years security researchers have been hollering about the risks of weak, repeated passwords. Still, average Joe seems to be complacent about it and reuses the same or similar passwords across multiple logins, despite the fact that even a strong password is secure only if used for a single login.

![https://twitter.com/JohnLegere/status/371699808014462976/photo/1](incorrect.jpg)

A good password manager can alleviate the problem of remembering tens of passwords, if not hundreds. However, in reality, the average Joe doesn't invest in a password manager and carries on with life. 

So, what's the greater risk? You may ask.

Millions of data records, including login credentials, are being exposed in data breaches, which continue to make headlines around the world. In fact, data breaches globally exposed more than 36 billion records in 2020.

Cybercriminals get access to these exposed records in black markets (generally on the dark web) and use them to perform credential stuffing and account takeover attacks or commit fraud. 

Whether it's yours or your users' fault, such type of attacks damage brand reputation, make your business liable to legal damages, and impact user experience. 

You should take the onus upon yourself to ensure user access to your apps or portals is as secure as possible without impacting user experience. This is where risk-based authentication (RBA) — also known as adaptive authentication — comes into play.  

## What is Risk-based Authentication (RBA)?

RBA is a process of assessing the risk of an authentication request in real-time and requesting additional layers of authentication and identification based on the risk profile to validate that a user attempting to authenticate is who they claim to be. 

The risk is usually assessed based on various parameters and the environment from which the user is attempting to authenticate. Some common parameters used for risk profiling include:

 - User's geolocation
 - Origin IP address 
 - Sensitivity of the information or system the user wants to access
 - User's device. Is it a familiar device or a new device?

Based on the risk assessed, an RBA system requests additional methods of authentication, such as:

- A verification link sent to the user's registered email ID
- An OTP sent to the user's phone or email ID 
- OTP generated from user's authenticator app
- User's preset security questions

RBA is different from multi-factor authentication (MFA). MFA is a static authentication method — that is, regardless of the risk of an authentication request, this method requires an additional layer(s) of validation. 

On the other hand, RBA is a non-static authentication method that requires additional authentication factors only when necessary based on the risk profile — as a result, RBA provides a better user experience. 

Now, it's clear that better safe than sorry when it comes to authenticating users, and implementing RBA reduce account compromise risk on your apps. 

That said, RBA doesn't have to stop at user authentication; you can extend it to signups, payments, and other types of online transactions.  
How to Implement Risk-based Authentication (RBA)?
You have two options:

 - Develop an RBA system in-house
 - Rely on an RBA provider 
 
Yes, developing an RBA system in-house is possible. But, you should ponder upon some important details: 

 - At what cost? 
 - Does our team have the time and capability to develop and maintain an in-house RBA system that is reliable?
 - Can we keep it up-to-date with threat intelligence to get ahead of evolving attacks and data breaches happening elsewhere that might affect our users?

If you got convincing responses to the above questions, you may go ahead and develop your in-house RBA system. 

But a lot of you might not have that sort of resources or just don't want to focus on non-core development projects. In this case, you can rely on a reputed RBA provider - for example, LoginRadius.😉

When choosing an RBA provider, make sure the solution meets the following criteria:

 - How easy is it to implement and maintain?
 - Does it offer out-of-the-box rules and risk profiling methods for quick configuration?
 - Can you customize the solution's AI/ML or statistical models based on your in-house expertise?
 - How well does it integrate with your existing authentication strategy?
 - Does it offer comprehensive CIAM features beyond RBA so that you can reliably depend on a single vendor and provide a unified user experience?
 - How effectively it stops fraud or accounts takeover in real-time?

Once you have evaluated and finalized the vendor, it is vital to test the RBA solution and ensure that the user experience is as expected while minimizing risk.

If you want to learn more about RBA and want to test how RBA works in LoginRadius? [Signup](https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login) for a free account here. 