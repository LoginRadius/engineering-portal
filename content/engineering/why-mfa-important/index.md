---
title: "The Importance of Multi-Factor Authentication (MFA)"
date: "2021-02-11"
coverImage: "multifactor-authentication.jpg"
author: "Jitender Agarwal"
tags: ["MFA", "2FA", "PIN Auth", "Push-based Auth"]
description: "Multi-factor authentication verifies the consumer's identity in multiple steps using different methods. Hence, it provides another layer of security on top of the login credentials."
--- 

In reaction to the Covid-19 pandemic, as offices closed, few of us knew that we would be working from home for months or forever, Many of us set to continue the trend of  working from home for the foreseeable future. With remote working set to become the “new normal” for many, it's important to make sure our systems are safe and secure.

In today's digital world, consumers are using more and more web and mobile apps to access various services. These apps require the consumer to create accounts with usernames and passwords. This poses the threats for password breaches due to lack of [strong passwords](https://www.loginradius.com/blog/engineering/password-security-best-practices-compliance), common passwords, or re-used passwords for multiple sites.

Businesses are looking for ways to protect their digital assets while validating their consumer's identities and at the same time providing a smooth user experience. [Multi-factor Authentication (MFA)](https://www.loginradius.com/multi-factor-authentication/) is the simplest and the most effective tool to provide another layer on top of the login credentials.  After the consumer enters their login credentials, whether via email, phone number, username, or social profile, the consumer verifies the system with some other independent factor. Hence, it restricts any malicious attempt to access the system or service even if someone gets access to the consumer's password. 

Multi-factor or [Two-factor Authentication](https://www.loginradius.com/blog/identity/2021/01/how-to-setup-2fa-in-online-accounts/) verifies the consumer's identity using one of the following factors: 

*   **Knowledge Factor:** Something, only the consumer, knows like PIN 
*   **Possession Factor:** Something only the consumer has, like a USB containing an encrypted security key, Google Authenticator app, etc. 
*   **Inherence Factor:** Something only the consumer is like Fingerprints, Facial or Eye scan, etc.
*   **Location Factor:** Authentication is restricted to registered devices or geographic location derived from the Internet Protocol (IP) address used for an authentication request.
*   **Time factor:** This limits the user authentication to a specific time frame in which access to the system is permitted and prohibits access to the system outside of the timeframe.

There are several MFA authentication methods available leveraging the above authentication factors to protect the consumer account. Businesses can use one or all of the following MFA authentication methods as per their business requirements.


## Knowledge Factor


### PIN Authentication: 

The PIN Authentication feature allows the consumer to set a PIN in addition to the password during registration. After the consumer enters their login credentials, the consumer will be asked to enter the PIN set at the time of registration. This is generally used in devices with physical interfaces like smartphones or PIN pad on the doors. Check our [LoginRadius PIN Authentication method](https://www.loginradius.com/docs/api/v2/customer-identity-api/pin-authentication/overview/#pin-authentication-overview) to know more.

**Pros:** It is easy for consumers to remember and enter the four-digit PIN into the application, eliminating the need to have a device to complete the MFA. 

**Cons:** Brute forcing the PIN is easier than a password as the PIN is generally a combination of 4 digit numbers.


### Security Questions: 

The consumers are asked to answer some security questions at the time of registration. The security questions should be such that the answers are easy to remember for the consumers, hard to guess for someone else, and be consistent over time. The same security question(s) can be asked as a second factor of authentication to verify the consumer identity. This is used in web applications as you can type security answers quickly on the computer. LoginRadius allows its customers to configure security questions for authentication. Please see the [LoginRadius Security Question Overview](https://www.loginradius.com/docs/api/v2/customer-identity-api/security-question-api-usage/#security-question-api-overview) document for more details.

**Pros:** You can easily set up the security questions as most of the services allow you to select the questions from a series of predefined questions. It does not require any additional hardware device. 

**Cons:** Other people can find out the answers from your social profiles or use social engineering, like phishing emails or phone calls. If they know you, they can also guess the answers to the security questions, e.g., your favorite color, etc. You need to memorize responses for the security questions if you have set the fictitious responses so that nobody can guess or find out. 


## Possession Factor


### Text Message (SMS) Authentication:  

After the consumers enter their login credentials, they receive an instant text message with a unique authentication code. The consumers are required to enter the code into the application to get access to their accounts. Visit [LoginRadius SMS authentication](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/overview/#smsworkflow0) to know more.

**Pros:** MFA via SMS code is the most popular method due to its low cost and easy setup. It is also fast as the text arrives almost instantly. 

**Cons:** The code is sent over the telecom network, hence, poses the risk of SMS messages being intercepted or redirected. In this case, the consumer will still get the code and report it to the business if it is not he who tried to login into the application. If you have misplaced or don't have the device nearby, Or the device has run out of battery, you can't log in to the application. Some disreputable services can use your phone number for marketing and sales purposes.

### Phone Call: 

Consumers receive the code over a phone call instead of receiving the text message. 

**Pros:** You can receive the call on your cell phones as well as on your landline phones.

**Cons:** It requires phone network connectivity to receive the call.  


### Email Authentication: 

Like SMS Authentication, once the consumer enters their login credentials, they receive a unique code in the email. Enter the code to complete the authentication process. 

**Pros:** You can access the code on any device, hence, removing the need to have a mobile phone nearby. 

**Cons:** You should avoid logging into your email account on public computers or while you're connected to an unsecured Wi-Fi hotspot.


###  Push-based Authentication: 

Instead of sending a code, a push notification is sent directly to a secure application on the user's device, e.g., a mobile phone asking them to confirm an authentication attempt is made from another device. The consumer can approve or deny access by pressing a button on the device. 

**Pros:**  It provides a better user experience as the consumer does not need to type the code.

**Cons:** The push notifications can be compromised if the device is lost, stolen, or someone gets access to the device. Your phone should have access to the internet to complete the push notification. If you are logging from multiple devices or multiple times, you will get many notifications. Hence, you might ignore the authentication information like IP address, location, etc. In the push and approve it without thinking, can grant access to the malicious person.


### Authenticator App: 

This requires the consumer to install an authenticator app, e.g., Google Authenticator, to their mobile devices. During registration, the consumers will scan a QR code from the website with the app. The app will auto-generate a Time-Based One Time Password (TOTP) that the consumer will have to enter after they've provided their login credentials.  LoginRadius supports MFA via an authenticator app, e.g., [Google authenticator](https://www.loginradius.com/docs/api/v2/customer-identity-api/multi-factor-authentication/overview/#googleauthenticatorworkflow4).

**Pros:** It gives an advantage over SMS Authentication as the code is not sent over the telecom network, but the device is required to be connected to the internet. You can scan the QR code by multiple devices to avoid getting locked out.

 

**Cons:** The authenticator app generates the code with a very short validity, which results in entering invalid codes into your service. Some malware can steal MFA code directly from the authenticator app. 


### U2F FIDO Authentication: 

U2F is an open authentication standard that leverages encrypted security keys to verify the identity.  The consumer needs to plug in a physical security device carrying encrypted security keys into a USB port after submitting their login credentials.  

**Pros:** This is one of the most secure MFA authentication methods as the device works with the registered site only and can't be digitally intercepted or redirected. Also, the devices don't store any personal information. The consumers can't be authenticated without the physical device. 

**Cons:** U2F keys require a USB port to plug in the device, making this an untenable solution for mobile devices or devices without USB ports. There is also a cost involved in purchasing these physical devices. Employees mostly use this within an enterprise as they are required to carry the physical device for login. 

**Note:** The consumers are mostly provided a set of backup codes to complete the second factor in the event of the device being lost, stolen, or not being accessible. It is recommended to keep these backup codes securely. 

## Inherence Factor


### Biometric Verification: 

The consumer verifies the device's identity using Biometric factors like a Fingerprint, Eye scan, Facial recognition, or Voice recognition on the device. This is mostly used in mobile applications for authenticating the consumers on smartphones with biometric verification capability.

LoginRadius supports various forms of biometric authentication e.g. [TouchID](https://www.loginradius.com/docs/libraries/mobile-sdk-libraries/ios-library/#touchid10). You can leverage Any third-party biometric services to provide secondary forms of authentication to consumers.

**Pros:** It is complicated to hack biometrics. 

**Cons:** You can only login into the devices with biometric verification capabilities. The registered services can misuse your biometrics. Once your biometrics are hacked, you can not use them for any applications in the future. 


## Location factor 


### Location-based Authentication: 

When the consumer tries to log in to a device, the device location is derived from its IP address or GPS. If the device's location is listed as allowable in the system, access to the system is granted. LoginRadius supports triggering actions based on the stored city, browser, or device. Please see the [LoginRadius Risk Based Authentication](https://www.loginradius.com/docs/api/v2/admin-console/platform-security/risk-based-auth/) document for more information.

**Pros:** This provides the best user experience as it does not require additional devices or steps to complete MFA. 

**Cons:** You can only access the device in specific locations or devices. 

You can leverage any Multi-factor Authentication method to improve security over the traditional username and password authentication. But none of the MFA methods is 100% foolproof and should not be used as a single factor of account protection. Also,  MFA causes the login process longer for the consumer. Hence, the choice of any or combination of  MFA methods depends on your business requirements around security and user experience. Here are some recommendations:


*   U2F keys provide the best security layer, especially for remote users allowing them to access the system securely while outside the company network. If the U2F keys are compromised, you can order a new device to update it.
*   Most consumers carry cell phones these days; hence, SMS authentication provides the best user experience as they don't have to install any software or memorize answers. 
*   Time-Based One Time Password (TOTP)  via authenticator app provides better security than SMS authenticator but requires the consumer to install the software. It falls between U2F and SMS authentication for convenience and security purposes.
