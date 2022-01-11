---
title: "Customize User Login, Register and Forgot Password  Page in Drupal 7"
date: "2015-08-11"
coverImage: "drupal-custom-login-register-password-pages1.png"
author: "Versha Gupta"
tags: ["Drupal"]
---

Did you ever want to customize your registration or login page on Drupal 7, but did not know how? Customizing these pages by adding new text or changing theme is not a difficult task.

To help you out with that, I have compiled some simple steps to customize your registration or login page. All that you need to do is to add the following code :

### Steps:

1. In the first step of customization, you need to implement [hook\_theme](https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_theme/7.x) in your module file.
    

```php
 array(
      'template' => 'user_login',
      'render element' => 'form',
      'path' => drupal_get_path('module', 'yourmodule') . '/templates'
    ),
    'user_pass' => array(
      'template' => 'user_pass',
      'render element' => 'form',
      'path' => drupal_get_path('theme', 'yourmodule') . '/templates'
    ),
    'user_register' => array(
      'template' => 'user_register',
      'render element' => 'form',
      'path' => drupal_get_path('theme', 'yourmodule') . '/templates'
     ),
  );
  return $theme;
}-->
```

  
Now that you have implemented hook theme in module file, the next step is to implement three pre-process functions. These functions are used if module needs to override or you want to add something in theme pre-processing.

  
In the third step, you need to create following template files for login/register/forgot password.

  1. user\_login.tpl.php
  2. user\_register.tpl.php
  3. user\_pass.tpl.php

Now paste the following code into user\_login.tpl.php. Also, don’t forget to modify user\_register.tpl.php and user\_pass.tpl.php template files accordingly.

```php
<!--

  
-->
```

  
Now your login page will contain new intro text **This is my awesome login form**. Customization of registration page in Drupal 7 is not difficult and if you follow above mentioned tips, you can design an amazing registration / login / forgot password page according to your audience.
