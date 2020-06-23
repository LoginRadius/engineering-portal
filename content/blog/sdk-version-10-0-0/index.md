---
title: "SDK Version 10.0.0"
date: "2019-10-31"
coverImage: "SDK.png"
author: "Indrasen"
tags: ["Engineering", "SDK", "Version"]
---

We're delightfully Announcing SDK Version 10.0.0. 

This full-version release includes major changes with several improvements and optimizations, the details have been given below. For complete information please visit [LoginRadius API documents](https://www.loginradius.com/docs/api/).

### **New Features Added:**

- **Added PIN Authentication feature APIs.** : We have added the PIN authentication feature. By enabling this feature Customer can provide PIN code for the authorization process. For more details please refer to the [PIN Authentication Document](https://www.loginradius.com/docs/api/v2/customer-identity-api/authentication/pin-authentication/overview/).

- **Added Consent Management feature APIs. :** The Consent Management feature allows collecting consent details from the new or existing customers so that you can further use that data.

- **Added Local SOTT generation (Secured one-time token):** SOTT is used for LoginRadius user registration via the authentication API or via the Javascript Interfaces. Now SOTT can be generated from the SDK. More detail on SOTT Usage can be seen [here](https://www.loginradius.com/docs/api/v2/customer-identity-api/sott-usage).

### **Improvements and optimizations:** 

- Added internal parameter validations in the API function.
- ApiKey and ApiSecret usage redundancy removed.
- All LoginRadius related features need to be defined once only and SDK will handle them automatically.
- Improved the naming conventions of API functions for better readability.
- Better Error and Exception Handling for LoginRadius API Response in SDK.
- Completely revamped each SDK and restructured them with the latest API function names and parameters.
- Added detailed description to API functions and parameters for better understanding.
- Updated the SDK demos according to the latest SDK changes.

### **New APIs:**

We have added new APIs in this release, that will complement the existing ones.

- Update Phone ID by UID
- Upsert Email
- Role Context profile
- MFA Resend OTP
- User Registration By Captcha
- Get Access Token via Linkedin Token
- Get Access Token By Foursquare Access Token
- Get Active Session By Account Id
- Get Active Session By Profile Id
- Delete User Profiles By Email
- Verify Multifactor OTP Authentication
- Verify Multifactor Password Authentication
- Verify Multifactor PIN Authentication
- Update UID
- MFA Re-authentication by PIN
- Pin Login
- Forgot Pin By Email
- Forgot Pin By UserName
- Reset PIN By ResetToken
- Reset PIN By SecurityAnswer And Email
- Reset PIN By SecurityAnswer And Username
- Reset PIN By SecurityAnswer And Phone
- Forgot Pin By Phone
- Change Pin By Token
- Reset PIN by Phone and OTP
- Reset PIN by Email and OTP
- Reset PIN by Username and OTP
- Set Pin By PinAuthToken
- Invalidate Pin Session Token
- Submit Consent By ConsentToken
- Get Consent Logs
- Submit Consent By AccessToken
- Verify Consent By AccessToken
- Update Consent Profile By AccessToken
- Get Consent Logs By Uid
- Album With Cursor
- Audio With Cursor
- Check-In With Cursor
- Event With Cursor
- Following With Cursor
- Group With Cursor
- Like With Cursor

### **Removed APIs:**

To cope up with the changes around the social platforms, we have removed some existing APIs as they are no longer supported by the social providers. Below are the details of those APIs.

- **GetCompanies API:** This API was used to get the list of companies from social sites. we removed this API because it is not supported by the social providers

- **Getstatus API:** This API was used to get the status from social sites.
