---
title: "How to Integrate Invisible reCAPTCHA for Bot Protection"
date: "2022-04-08"
coverImage: "configure-invisible-reCAPTCHA.png"
author: "Versha Gupta"
tags: ["reCAPTCHA", "LoginRadius"]
description: "If you only want to integrate reCAPTCHA invisibly on specific pages, LoginRadius can help you. This tutorial explains how you can quickly integrate invisible reCAPTCHA."
---

Finding it challenging to integrate invisible reCAPTCHA only on specific web pages? This short tutorial helps you implement invisible reCAPTCHA at specific and distinct containers, such as login and forgot password. This tutorial uses LoginRadius to demonstrate this.

> You can [quickly create a free LoginRadius account here](https://accounts.loginradius.com/auth.aspx?plan=developer&action=register).

## What is reCAPTCHA?

[Google reCAPTCHA](https://www.google.com/recaptcha/about/) is a security service that helps protect your websites from fraud and abuse.

Currently, LoginRadius supports two different versions of **Google v2reCAPTCHA**.

- **Checkbox**: In this version of v2reCaptcha, the "I'm not a robot" checkbox requires a user to click it to verify the user is not a robot.

- **Invisible reCAPTCHA**: This version of v2reCaptcha provides a better user experience by tracking mouse movements to identify if a human is interacting with the website.

## The Scenario

You want to enable invisible reCAPTCHA on a specific page — a login page, for demonstration. To achieve this, first [login to your LoginRadius dashboard](https://dashboard.loginradius.com/login). Or, [sign up here for a free account or 21-day free trial for the Developer Pro plan](https://accounts.loginradius.com/auth.aspx?action=register).

If you're new to LoginRadius, [follow our Getting Started documentation](https://www.loginradius.com/resource/loginradius-ciam-developers-whitepaper)docs/references/javascript-library/getting-started/) to get going. 


### Solution Steps

- First, you need to [enable reCAPTCHA (Invisible reCAPTCHA) from the LoginRadius dashboard](https://www.loginradius.com/resource/loginradius-ciam-developers-whitepaper)docs/guide/captcha/#step-2-captcha-deployment).
- When you enable the invisible reCAPTCHA from the Loginradius dashboard, it will also enable the reCAPTCHA at the registration page.
- Now, you want to only enable invisible reCAPTCHA for enabling bot protection only on the login page.
- So, you will need to do the following client-side setup for adding the invisible reCAPTCHA on a specific page only — for example, on the login page.

  - Disable the reCAPTCHA using the following code before initializing the LoginRadius Object.
    `raasoption.invisibleRecaptcha = false;`
  - Now, add the following code to render the captcha only at the login page, and here `beforeFormRender` hook is used.

      ```
        LRObject.$hooks.register('beforeFormRender', function(name, schema){
        LRObject.options.invisibleRecaptcha = false;
        if (name == 'login' ) {
          LRObject.options.invisibleRecaptcha = true;
           LRObject.util.addRecaptchaJS();
           LRObject.util.captchaSchema("loginradius-recaptcha_widget_login", schema);
        }
        });
      ```

The above code used the utility method `addRecaptchaJS` that adds the required JS for invisible reCAPTCHA. It also used the `captchaSchema` method to add reCAPTCHA within the Login Schema.

- The last step is to stop resetting the reCAPTCHA before reCAPTCHA submission. So, add the following code:

  ```
  LRObject.$hooks.register('eventCalls', function(name){
    LRObject.options.invisibleRecaptcha = false;
    LRObject.options.optionalRecaptchaConfiguration.IsEnabled = true;
  if (name == 'login' ) {
      LRObject.options.invisibleRecaptcha = true;
      LRObject.options.optionalRecaptchaConfiguration.IsEnabled = false;
    }
  });
  ```

When you check your hosted page, invisible reCAPTCHA will appear only on the login page.

Similarly, you can follow the above steps to enable invisible reCAPTCHA on the registration(signup) page or any other page.

## Conclusion
You have learned how to use invisible reCAPTCHA on specific web pages and forms with LoginRadius to improve user experience and prevent malicious bot traffic from being effective.
