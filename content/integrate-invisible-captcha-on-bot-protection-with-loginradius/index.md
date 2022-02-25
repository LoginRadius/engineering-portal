---
title: "Integrate Invisible Captcha on Bot Protection with LoginRadius"
date: "2022-02-24"
coverImage: "cover.png"
author: "Versha Gupta"
tags: ["Captcha", "LoginRadius", "Google reCaptcha", "Invisible Captcha"]
description: How to integrate invisible captcha on specific pages with LoginRadius
---

Tough to integrate invisible captcha only at specific pages with LoginRadius? Learn how to implement invisible captcha only at distinct containers, such as login, forgot password quickly with LoginRadius.

[Google reCAPTCHA](https://www.google.com/recaptcha/about/) is a security service that protects your websites from fraud and abuse.

Currently, LoginRadius supports two different versions of the  **Google v2reCAPTCHA**.

-   **Checkbox**: In this version of v2reCaptcha, "I'm not a robot" Checkbox requires the consumer to click it, indicating the consumer is not a robot.
    
-   **Invisible reCAPTCHA**: This version of v2reCaptcha provides a better experience to the consumer by tracking mouse movements to identify if a human is interacting with the website.


**Problem**

When we enable the invisible captcha from the Dashboard of Loginradius, it will also enable the captcha at the registration page. But if we want to add Bot protection only on the Login page, how can we do that. 

**Solution**

 - First, you need to enable Captcha (Invisible Captcha) from the dashboard of LoginRadius.
 - Now, you will see that captcha will automatically enable at the registration page of IDX also.
 - So, we will need to do the following client-side setup for adding the invisible captcha at specific page only example, at the login page.
     - Disable the Captcha first using the following code before initialization of LoginRadius Object.
          `raasoption.invisibleRecaptcha = false;`
     - Now, add the following code to render the captcha only at the login page, and here we used beforeFormRender hook.
    

        ` LRObject.$hooks.register('beforeFormRender', function(name, schema){
        LRObject.options.invisibleRecaptcha = false;
        if (name == 'login' ) {
          LRObject.options.invisibleRecaptcha = true;
           LRObject.util.addRecaptchaJS();
           LRObject.util.captchaSchema("loginradius-recaptcha_widget_login", schema);
        }
    });`

In the above code, we used the utility method addRecaptchaJS, which adds the required JS for invisible captcha. We used the captchaSchema method to add captcha within the Login Schema. 

- The last step is to stop resetting the Captcha before Captcha submit. So we added the following code:

` LRObject.$hooks.register('eventCalls', function(name){
    LRObject.options.invisibleRecaptcha = false;
    LRObject.options.optionalRecaptchaConfiguration.IsEnabled = true;
  if (name == 'login' ) {
      LRObject.options.invisibleRecaptcha = true;
      LRObject.options.optionalRecaptchaConfiguration.IsEnabled = false;
    }
});`

When you check your hosted page, only at the login page, invisible captcha will show.