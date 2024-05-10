---
title: "Testing Brute force lockout using LoginRadius"
date: "2024-05-08"
coverImage: ""
author: "Gayathri Suresh"
tags: ["Engineering","API","Identity Experience Framework", "Login", "Authentication", "Brute force lockout"]
description: "In this blog, we'll learn about brute force lockout, creation of basic app using Identity Experience Framework, and on how to unlock an user account using APIs."
---


# Brute force lockout and unlock

---

## Contents
- [Basic Terminologies](#basic-terminologies)
- [API Implementation](#api-implementation)
    - [Creating a Basic Application](#creating-a-basic-application)
    - [Brute force lockout](#brute-force-lockout)
        - [Enabling](#enabling)
        - [Testing](#testing)
    - [Lockout types supported by LoginRadius](#lockout-types-supported-by-loginradius)
    - [Unlocking an account locked through brute force lockout](#unlocking-an-account-locked-through-brute-force-lockout)
        - [Account Update API from the LoginRadius Account API collections](#account-update-api-from-the-loginradius-account-api-collections)
        - [Auth Unlock Account by Access Token from the LoginRadius Authentication API collections](#auth-unlock-account-by-access-token-from-the-loginradius-authentication-api-collections)
- [Conclusion](#conclusion)
- [Miscellaneous](#miscellaneous)
    - [CAPTCHA](#captcha)
    - [MFA](#mfa)

---

## Basic Terminologies
1. **Brute force attack:**
- A method where every possible combination of characters or values is systematically tried to gain unauthorized access to a system, application, or data.

2. **Brute force lock:**
- Brute force lock is a type of account lock made to prevent a bruteforce attack.

3. **Brute force lockout:**
- Brute force lockout is a security mechanism that blocks access after a certain number of failed authentication attempts to prevent unauthorized access through repeated trial and error.

4. **CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart):**
- CAPTCHA is a method used to determine whether a user is human or not by presenting a challenge that is easy for humans to solve but difficult for bots.

5. **Multi-Factor Authentication (MFA):**
-  MFA is a security method that requires multiple forms of identification to grant access, typically combining something the user knows, has, and is.

In _LoginRadius_, the brute force lockout can be implemented using APIs.


> To implement brute force lockout in either of the above-mentioned ways, the user should own an admin account in the [_LoginRadius Admin Console_](https://admin-console.loginradius.com/dashboard).

In this blog, we'll go through the API implementation of brute force lockout and user unlock

---

## API implementation
### Creating a Basic Application
1. In order to achieve brute force lockout using API, we need create a simple app with the login and registration features.
2. This can be done by using the _[Admin Console](https://admin-console.loginradius.com/deployment/idx)_.
3. Navigate through _[Deployment>Identity Experience Framework](https://devadmin-console.lrinternal.com/deployment/idx)_.
4. Using theme, customization, preview, implement options, we can design the required application.
5. We can customize the predefined templates if needed.

> The created app can be accessed using the link _[https://`<app-name>`.hub.loginradius.com/auth.aspx](https://`<app-name>`.hub.loginradius.com/auth.aspx)_ in the _implement_ section of the _Identity Experience Framework_ or can be accessed from the preview section.

### Brute force lockout
#### Enabling
In _LoginRadius_, the brute force lockout feature can be enabled from the _[Admin Console](https://admin-console.loginradius.com/platform-security/account-protection/auth-security/brute-force-lockout)_.

<br>

[![admin_bfl_page.png](assets/admin_bfl_page.png)](assets/admin_bfl_page.png)

<br>

#### Testing
Brute force lockout can be achieved by following these steps: 
1. Register with a new user, and login with the correct user email and password. It is observed that the user is redirected to the profile page after authentication.
<br>
[![loginpage_with_data.png](assets/loginpage_with_data.png)](assets/loginpage_with_data.png)
<br>
[![successful_login.png](assets/successful_login.png)](assets/successful_login.png)
<br>

2. Now, logout and try to login with incorrect credentials.
3. If the password is incorrect successively till the lockout threshold, the account gets locked. 
4. Therefore, brute force lockout is achieved.
<br>
[![incorrect_pwd.png](assets/incorrect_pwd.png)](assets/incorrect_pwd.png)
<br>

> In the _[Admin Console](https://admin-console.loginradius.com/platform-security/account-protection/auth-security/brute-force-lockout)_, we can set the _brute force lockout threshold, lockout type, and suspend effective period_. 

### Lockout types supported by LoginRadius
_LoginRadius_ supports the following lockout types: 
1. <u>Suspend:</u> 
    - Suspends further login attempts after multiple failed tries for a certain amount of time, deterring automated attacks and enhancing system security by limiting access from suspicious sources.
<br>
2. <u>CAPTCHA:</u> 
    - A security measure used to unlock a locked account on entering valid credentials by presenting a challenge to solve. 
    - This challenge is often very easy for humans to solve but difficult for the bots.

> _Refer [CAPTCHA](#captcha) in miscellaneous section to learn more_.

<br>

3. <u>Security Question:</u>
    - A personalized query set up by the user to verify identity to unlock a locked account with valid credentials.
<br>
4. <u>Block:</u>
    - Restricts login attempts from a specific source after multiple failed tries, enhancing security against unauthorized access.


### Unlocking an account locked through Brute force lockout
The locked user account can be unlocked in two ways, using: 
1. Account Update API from the LoginRadius Account API collections.
2. Auth Unlock Account by Access Token from the LoginRadius Authentication API collections.

> For more understanding on _Auth Unlock Account_, refer [Auth Security Configuration](https://www.loginradius.com/docs/api/v2/admin-console/platform-security/auth-security-configuration/)

#### Account Update API from the LoginRadius Account API collections
- Calling the Account Update API with the provided enpoint, using the given method, providing the apisecret, and apikey formatting the given body will unlock the account.
1.<u>Endpoint:</u> https://api.loginradius.com/identity/v2/manage/account/{uid}
2.<u>Method:</u> PUT
3.<u>Parameters:</u> apisecret, apikey
4.<u>Body:</u> 
```
{
   ...
  "FirstName": "Test",
  "MiddleName": null,
   ...
}
```

5.<u>Response:</u> 
```
{
    ...
    "LoginLockedType": "None",
    "Email": [
        {
            "Type": "Primary",
            "Value": "user1@yopmail.com"
        }
    ],
    ...
}
```

<br>

[![unlocked_account_update.jpeg](assets/unlocked_account_update.jpeg)](assets/unlocked_account_update.jpeg)

---

## Conclusion
- Unlocking user accounts previously locked due to brute force lockout using LoginRadius APIs demonstrates the platform's efficiency in account management and security enhancement. 
- Moving forward, leveraging LoginRadius's robust security features ensures uninterrupted user access while fortifying our system against unauthorized access attempts.

---

## Miscellaneous
### CAPTCHA: 
- _LoginRadius_ supports the following type of CAPTCHAs: 
    - <u>reCAPTCHA V2:</u> 
        - Users solve challenges like clicking on images or entering text to prove they're human.
    - <u>reCAPTCHA V3:</u>
        - Operates in the background, assessing user behavior to assign a risk score without user interaction.
    - <u>hCAPTCHA:</u> 
        - Similar to reCAPTCHA, offers bot protection with privacy focus.
    - <u>QQ Tencent CAPTCHA:</u> 
        - A CAPTCHA service by Tencent, commonly used in China for verifying human users.

### Multi-Factor Authentication (MFA): 
- _LoginRadius_ offers multiple types of security features, one of which is Multi-Factor Authentication. 
- This feature can be enabled from the _[Admin Console](https://admin-console.loginradius.com/dashboard)_ to add an additional layer of security.
- There are a set of predefined MFA types provided by LoginRadius, which can further be enabled as per the requirement.

<br>

<u>_To understand more about _LoginRadius_ APIs, refer the [API docs](https://www.loginradius.com/docs/api/v2/getting-started/introduction/)_</u>.

