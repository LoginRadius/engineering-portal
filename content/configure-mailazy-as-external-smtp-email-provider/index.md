---
title: "How to Configure Mailazy as an External SMTP Email Provider"
date: "2021-09-03"
coverImage: "banner.jpg"
author: "Kunal"
tags: ["SMTP", "Transactional Email", "Mailazy"]
description: "This guidehelps you configure LoginRadius for sending authentication and other transactional emails using Mailazy."
---

A necessary part of handling users in an application is sending them emails. For example, when a user signs up on your app, the user should be sent an email to verify their account. LoginRadius handles email for you out of the box, but you can also easily change this up to use Mailazy as your email provider.

LoginRadius allows configuring your choice of SMTP email provider, so you can manage, monitor, and troubleshoot your email communications.

## Prerequisites

- You must have a configured [Mailazy](https://mailazy.com) account.

## Configure Mailazy

**Step 1:** Sign Up for [LoginRadius Developer Account](https://accounts.loginradius.com/auth.aspx?action=register).

**Step 2:** Log into your [Mailazy](https://app.mailazy.com) account or [sign up](https://app.mailazy.com/signup) for an account if you don’t have one. Go to "Access Keys" and create "Access Keys". Skip if you already have generated access keys.

![mailazy-access-keys](mailazy-access-keys.png)

**Step 3:** Enable and configure Mailazy as your email provider.

Navigate to LoginRadius [Dashboard > Click Select & Configure > Configuration](https://dashboard.loginradius.com/configuration).

![lr-dashboard](lr-dashboard.png)

![lr-dashboard-app](lr-dashboard-app.png)

**Step 4:** Expand "Email/SMS Provider Settings" 

1. Select SMTP Provider Settings and select `other` in "SMTP Provider" dropdown, type in "From Name" and "From Address".
2. Type "SMTP Host" value as `smtp.mailazy.com` and "SMTP Port" value as `587`.
3. Paste generated API Key in "SMTP User Name" and API Secret in "SMTP Password".
4. Enable SSL.

![lr-smtp](lr-smtp.png)

You can send a test email using the "Verify" button on the same page of the LoginRadius dashboard. If you don't receive an email after a few minutes, check your Mailazy dashboard logs for any failures.

**Step 5:** Check your Mailazy account

The [Logs](https://app.mailazy.com/logs) page in Mailazy now displays all emails which have been sent to your users and the delivery status of each message.

![mailazy-logs](mailazy-logs.png)

**Step 6:** Done!

That's it, you've now got Mailazy set up as your LoginRadius email provider!

## Wrapping Up
There's so much more to authentication today than just entering a username and password. Fortunately, we've now got ways to make authentication and identity more secure for both users and companies, all with the added benefit of it being more convenient in many cases. This is made possible with features like social login, passwordless authentication, single sign-on, and multi-factor authentication. These features can be difficult to implement from scratch, but LoginRadius makes it really easy and seamless. In fact, it's often possible to set up authentication in an application within 10 minutes with LoginRadius.

