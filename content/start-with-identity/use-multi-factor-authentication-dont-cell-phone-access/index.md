---
title: "How to Use Multi-Factor Authentication When You Don’t Have Cell Phone Access"
date: "2018-12-19"
coverImage: "cover2.jpg"
tags: ["customer-experience"]
featured: false 
author: "Deepak Gupta"
description: "To verify the identity of clients, many security-minded organisations use multi-factor authentication. The most popular approach is to send a code via SMS text message to customers, which the customer then enters on the website or app. But what if you drive and have no mobile phone service? For authenticating yourself, you have a few other choices. Before you fly, just make sure to set them up!"
metatitle: "How to Use Multi-Factor Authentication When You Don't Have Cell Phone Access | LoginRadius"
metadescription: "What if you drive and have no mobile phone service? For authenticating yourself, you have a few other choices. Before you fly, just make sure to set them up!"
---

Many security-minded businesses use multi-factor authentication to verify [customers’ identities](https://www.loginradius.com/blog/2019/06/customer-identity-and-access-management). The most familiar method is to send customers a code by SMS text message, which the customer then enters on the website or app.

But what if you are traveling and don’t have cell phone service? You have a few other options for authenticating yourself. Just make sure to set them up before you travel!

## Why Use Multi-Factor Authentication?

These days a simple password isn’t always enough to make sure that someone is who they say they are. There are so many ways that passwords can be leaked or stolen:

- **Malicious software** such as screen grabbers and keyloggers
- **Phishing**, where an illegitimate email directs customers to log in to their account using a genuine-looking but false website
- **Shoulder surfing**, either in person or using CCTV
- **Social engineering**, where hackers call up tech support lines and reset a customer’s password, possibly using stolen personal information

[Multi-factor authentication](https://www.loginradius.com/blog/2019/06/what-is-multi-factor-authentication/) (MFA) makes it harder for hackers to get into customer accounts with a password alone. It protects companies and customers from [security breaches](https://www.loginradius.com/blog/2020/04/marriott-data-breach-2020/) by requiring that customers also have physical possession of a verified device, such as a phone or security fob.

## The Problem with MFA When Traveling

![](image-1.jpg)

MFA typically uses a code sent via SMS text message as the second verification factor.

But SMS texts can be problematic if you’re traveling and don’t have mobile phone service outside your city or country. Logging in from unfamiliar devices, locations, and networks can also trigger risk-based authentication, which requires extra verification when you deviate from your typical login profile.

You could find yourself locked out of vital services and apps at a critical moment, and without your normal phone service, account recovery options may not work either. Not fun.

## Options for MFA When You Don’t Have Mobile Service

Thankfully, there are some great options for alternative second factors that don’t depend on cell phone service. You may even find that they’re more convenient to use at home too.

For maximum peace of mind, you could set up more than one of these factors to make sure you can log in even if another factor fails or is unavailable. Also make sure that all of your recovery information, such as phone numbers and email addresses, is up to date.

### Using an authenticator app for MFA

An authenticator app runs on your smartphone or tablet, and you don’t need internet access or cell phone service to use it for MFA. You do need internet to set it up, though.

Both Google and Microsoft offer Android and iOS authenticator apps as part of their MFA ecosystem.

LoginRadius offers a white-labeled version of Google Authenticator for multi-factor authentication to companies that use our customer identity platform.

[![multi factor authentication guide loginradius](EB-Buyer’s-Guide-to-Multi-Factor-Authentication-1024x310.png)](https://www.loginradius.com/resource/buyers-guide-to-multi-factor-authentication/)

#### Setting up Google Authenticator

[Google Authenticator](https://www.google.ca/landing/2step/) works for MFA wherever you sign into your Google account.

**To set up an authenticator app in Google**

1. Open your email account on your computer.
2. On the top right of your screen, click your avatar, and then click **Google Account**. A new browser tab opens.
3. Click **Sign-in & security**.
4. Scroll down and click **2-Step Verification**. Enter your password and click **Next**. Scroll down and, under **Authenticator app**, click **Set Up**.
5. Select **Android** or **iPhone**, depending on what kind of phone you have. Then click **Next**. A QR code is displayed.

**To set up an authenticator app on your phone**

1. On your phone, go to the Play Store or App Store and install Google Authenticator.
2. Open the Google Authenticator on your phone and tap the plus button. On Android, you may need to tap the line at the bottom of the screen.
3. Tap **Scan barcode**.
4. Authorize the app to use your phone camera, so it can scan the QR code.
5. Point your camera to the QR Code shown on the screen of your computer. After you scan the QR code, a 6-digit code appears on your phone. A new code is given every few seconds.

**To finish setting up an authenticator app in Google**

1. On your computer, click **Next**, and then enter the code you generated on your phone.
2. After typing the code, click **Verify**.
3. A success message displays on your computer.

Google Authenticator is now your default second-step verification method.

#### Setting up Microsoft Authenticator

With Microsoft you’ll need to follow slightly different procedures depending on whether you or your organization is an Office 365 customer.

Office 365 users need their administrators to [enable MFA](https://docs.microsoft.com/en-us/office365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide) (there’s a free version of Azure MFA available to subscribers).

If you just want to use MFA for your personal Microsoft account, you’ll need to set everything up yourself. Just go to **Security Basics** in your account, select **More security options,** and follow the prompts.

Regardless of which method you use to set up Microsoft 2-factor authentication, you’ll then be able to sign in to your account using the Microsoft Authenticator app. Office 365 users need to go into their [Office 365 account online](https://support.office.com/en-gb/article/use-microsoft-authenticator-with-office-365-1412611f-ad8d-43ab-807c-7965e5155411) to do this, and personal account users follow a slightly different set of [instructions](https://support.microsoft.com/en-gb/help/4026727).

### Using Google Phone Prompt

If you have a compatible Android, iPhone, or iPad (and your needs fall within Google’s digital ecosystem), Google phone prompt is one of the easiest MFA methods to use.

Once you’ve enabled 2-factor authentication, follow the instructions for setting up [phone prompts](https://support.google.com/accounts/answer/7026266?co=GENIE.Platform%3DiOS&oco=0). You’ll then receive a prompt on your mobile device to confirm login when needed, with no separate app required.

Often Google phone prompt involves putting a two-digit number into either your smart device or your browser when you sign in from a new location. In some cases, though, you may be authenticating yourself with the same device you’re logging in on. So the device also needs to be locked after use to stay secure.

### Using a Security Key or Fob

You have several options for dedicated MFA devices as an alternative to your phone or tablet. 

With Google, you can buy a separate [security key](https://support.google.com/accounts/answer/6103523) to help you log in to Google. Like most key-based solutions, you’ll need to get a key that’s compatible with FIDO Universal 2nd Factor (U2F), and that can plug into the USB ports on any devices you may want to use it with. (Watch out for devices that only have USB-C unless you have a suitable connector!)

If you or your business is at particular risk of online attacks, you’ll need to use a security key and sign up for Google’s [Advanced Protection](https://landing.google.com/advancedprotection/) scheme. This service is aimed at journalists, activists, and business leaders who are at high risk of attack, and it’s free. You’ll need at least two compatible keys to register for the service, though.

There are also a number of third-party authenticator apps out there, from companies like LastPass, Authy, and YubiKey. Some of these require a separate dongle, and because they aren’t the owner of the services they unlock, recovery policies following a lost key or password can vary. (This means that sometimes you will have to go through the full recovery process for each account you’ve secured using a third-party provider.)

## Balancing Security and Convenience with MFA

![](chad-madden-445638-unsplash-1024x683.jpg "Multi-Factor Authentication")

B2C companies that offer MFA for an extra level of security still have their eye on providing a convenient customer experience.

Travel can make [SMS-based MFA solutions](https://www.loginradius.com/integrations/sms-gateway) unreliable, but with the right solution and a little preparation, companies can make it easier for customers to securely log in anywhere.

Providing travelers with easy-to-use MFA solutions doesn’t just keep your data and their data secure. It improves their digital experience and encourages them not to side-step essential security measures when traveling in potentially risky situations.

[![book-free-demo-loginradius](Book-Free-Demo-1024x310.png)](https://www.loginradius.com/book-a-demo/)
