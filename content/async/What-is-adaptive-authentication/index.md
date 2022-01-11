---
title: "What is Adaptive Authentication or Risk-based Authentication?"
date: "2021-03-09"
coverImage: "adaptive-authentication.jpg"
author: "Jitender Agarwal"
tags: ["Adaptive Authentication", "Risk-based Authentication"]
description: "Adaptive Authentication intelligently identifies malicious attempt based on the defined risk factors and prompt the consumers to complete an additional step to verify their identities"
--- 

Adaptive Authentication (also known as Risk-based Authentication) is a method to send notifications or prompt the consumers to complete an additional step(s) to verify their identities when the authentication request is deemed malicious according to your organization's security policy. It allows users to log in using a username and password without presenting any additional authentication barrier while providing a security layer whenever a malicious attempt is made to access the system. 

## Malicious Attempt Factors

Adaptive Authentication analyzes the user interaction with your application and intelligently builds a risk profile based on the consumer behavior or your organization's security policy. The system creates a user. You can define the risk factors in one of the following ways:

### Pre-defined Factors

You can define one or more risk factors based on your business requirements: 

**User Role:** The employees with higher user roles in the system can perform sensitive actions; hence, you can ask them to perform additional steps to complete the authentication. The employees with lower user roles pose a lower security risk and can log in with usernames and passwords for a frictionless user experience. 
Accessing sensitive resource: You can also ask the employees to perform additional authentication steps when they try to access a sensitive resource like financial statements, 

**Perform sensitive actions:** If the employees are trying to perform sensitive actions like edit or delete actions on the sensitive information, they can be asked to verify the identity with additional steps. 

**Location:** The employees are trying to login into a system using a public network instead of the office network. 

**Device:** If employees use their personal laptop instead of using a company-issued laptop. 

### Dynamic Factors

Most systems build a risk profile based on a consumer's recent interaction with your applications. The system generally leverages machine learning to create this profile on the fly. Here are the common risk factors: 

**Country:** The system can trigger actions and notifications if the consumer is logged in from a different country. e.g., If the consumers travel outside of their country of residence and try to access the system, some financial instructions like credit card companies block the access for the consumers to the system. These companies require you to inform the companies before leaving the country to whitelist the country for your account in the system. 

**City:** If the consumer has logged in from a different city than he usually logs in from, it will trigger Adaptive Authentication. Once the consumer completes the Adaptive Authentication for the new city, the city can be added to the system for future Logins without the Adaptive Authentication. 

**Device:** If the consumer tries to login in from a new device, the request will be flagged as malicious under the Adaptive Authentication. Once the consumer completes the Adaptive Authentication for the new device, the city can be added to the system for future Login without Adaptive Authentication. 

**Browser:** If the consumer was logging from the Chrome browser and suddenly tries to log in from the Firefox browser, the authentication attempt will be deemed malicious and trigger the Adaptive Authentication. Once the consumer completes the Adaptive Authentication step, it will whitelist the browser for future authentication attempts for the consumer account.

### Combination of Factors

You can also combine the Pre-defined factors (as mentioned above) and Dynamic factors to trigger the Adaptive Authentication.

## How does adaptive authentication work?

Whenever an authentication request is deemed as a malicious attempt based on the risk factors defined for your application, it can trigger one or more of the following actions  according to your business requirements:

**Email Notification:** An email is sent to notify the consumer about the authentication request. If the consumer found the authentication request malicious, they can inform the company to take appropriate actions. 

**SMS Notification:** An SMS is sent to the consumer's phone numbers to notify the consumer about the authentication request. It gives an advantage as the consumer checks the SMS more frequently than email, or the consumer might not have access to the email all the time. If the consumer found the authentication request malicious, they can inform the company to take appropriate actions. 

**Multi-Factor Authentication:** The consumer is asked to verify the identity with the second factor of authentication. This factor can be configured in many ways as per your business requirements. Please see my blog on [Multi-factor Authentication](https://www.loginradius.com/blog/async/why-mfa-important/) for more details.

**Blocking User Access:** The account is blocked immediately for further login attempts once specific risk criteria have been met. The consumer needs to contact the company to unblock the access. 

**Security Questions:** This forces the consumer to answer one or more security questions before authenticating the request.

**Push authentication:** User authentication is accomplished by delivering a push notification to a secure application on the user's device.

**FIDO U2F tokens:** FIDO U2F tokens allow users to utilise a single device to access any website or online service that supports the FIDO U2F protocol.


## Benefits of Adaptive Authentication

[Multifactor authentication](https://www.loginradius.com/blog/start-with-identity/2019/06/what-is-multi-factor-authentication/) creates a longer authentication process for the consumers, which causes lower consumer conversation at your application. Adaptive Authentication only triggers an elevated-risk situation while keeping the frictionless authentication process in place for normal conditions. 

You can configure actions based on the severity of the risk factors like if the consumer normally logs into your system from Vancouver and they make an authentication request to access the application from Cancun, this is an elevated-risk situation and you might want to block the account instead of sending the notification to the consumer. 

Adaptive Authentication is evolving as Machine learning can add more risk factors by studying consumer behavior over the period. Hence, it provides an updated layer of security against fraudulent attempts. 

Adaptive authentication is getting popular as it provides frictionless authentication for consumers while preventing fraudulent attempts to access the system. 

LoginRadius provides Adaptive Authentication to its customers to assist their businesses. Please see [Risk-Based Authentication](https://www.loginradius.com/docs/api/v2/admin-console/platform-security/risk-based-auth/) Document for more information on the LoginRadius Adaptive Authentication. 
