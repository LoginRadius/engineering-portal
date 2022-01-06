---
title: "What is Risk-Based Authentication"
date: "2021-02-26"
coverImage: "risk-based-authentication.png"
category: ["security"]
featured: false
author: "Rajeev Sharma"
description: "RBA is a method of applying various levels of stringency to authentication processes based on the likelihood that the access to a given system could result in it being compromised. As the level of risk increases, authentication becomes more restrictive."
metatitle: "What is Risk-Based Authentication"
metadescription: "What is risk-based authentication and how it works. Learn why businesses should use RBA and learn how to implement it using the LoginRadius RBA feature."
type: "start-with-identity"
---

# What is Risk-Based Authentication

Risk-based authentication is a non-static authentication system that considers the profile(IP address, Browser, physical Location, and so on) of a consumer requesting access to the system to determine the risk profile associated with that action. The risk-based implementation allows your application to challenge the consumer for additional credentials only when the risk level is appropriate.

It is a method of applying various levels of stringency to authentication processes based on the likelihood that the access to a given system could result in it being compromised. As the level of risk increases, the authentication process becomes more complicated and restrictive.

## How Risk-Based Authentication Works

RBA implementation follows the challenge and response process. One party presents a challenge (in the form of a question) and the other party provides a response (in the form of response) as the second factor after submitting the username and password.

Whenever a system identifies any risk with a login activity, there can be multiple actions based on the configuration setup. See below:

- **Block the consumer** - The system will block the consumer if it identifies a compromising risk associated with the consumer account.
- **Multi-Factor Authentication** - The system will prompt the consumer to pass through the next security channel as below:
  - Google Authenticator
  - SMS Passcode

In addition to prompting the consumer with challenge and response, there are options to either send an email to the consumer about the suspicious activity or let the Site Administrator know that the account has been compromised. It will alert the consumer as well as the Site Administrator.

[![mfa](mfa.png)](https://www.loginradius.com/resource/buyers-guide-to-multi-factor-authentication/)

## Why Should Businesses Use RBA

Risk-based authentication is an essential security feature because it works in real-time to prevent cyber frauds like accounts getting compromised without causing an inconvenience for legitimate consumers.

Risk-based authentication helps businesses in achieving the following goals:

- Reduce online fraud and the risk of improper access.
- It enforces different authentication levels depending on factors such as consumer activity and geolocation and similar calculated risk scores.
- It helps in improving the consumer experience. Consumers need to provide the additional details for authentication only when the associated risk appears.
- Access control in federated setups.
- Widely used and easy to deploy.

## How to Implement RBA with LoginRadius

At LoginRadius, we know how critical it is to maintain consumer security and how we can efficiently and effectively manage the process if a consumer account gets compromised.

LoginRadius’ RBA feature allows a quick, simple, and time-saving way to implement this on your website. You can create a consumer risk profile based on the below factors :

- IP
- City
- Browser
- Country.

## A Use Case of RBA

LoginRadius Risk-based authentication applies the precise security level for each unique consumer interaction and avoids unnecessary security steps for low-risk transactions, which can add friction for the consumer.

A good example is a legitimate consumer logging into a banking portal with a known personal device that has been registered with the bank, using the same browser they typically do. In this case, the system determines the risk of fraud is pretty low that they don’t need to re-authenticate after they’ve logged in.

Only when the consumer behavior deviates from normal activity (such as a different device or Browser) are additional authentication challenges added, resulting in increased security hurdles for riskier transactions such as bank transactions. The consumer will be prompted to authenticate themselves in one or another form and, if successful, they will go on to the correct portal.

To learn more about this feature, please visit our [Risk-Based Authentication documentation](https://www.loginradius.com/docs/api/v2/admin-console/platform-security/risk-based-auth/).

## Conclusion

In this article, we talked about making the accounts secured using Risk Based Authentication and learnt how it will enhance the consumer security. This feature helps define the risk areas and take actions if any risk is detected with respect to the defined constraints.

[![book-a-demo-loginradius](../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
