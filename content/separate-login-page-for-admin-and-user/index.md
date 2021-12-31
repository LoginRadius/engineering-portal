---
type: async
title: "Separate Drupal Login Page for Admin and User"
date: "2015-10-29"
coverImage: "drupal.png"
author: Versha Gupta
tags: ["Drupal", "Admin Panel"]
---

Are you afraid of hackers and feel unsafe for admin and front user to login through same area?  
No need to worry as in this article, I am going to guide you with how to create separate login area for admin. Along with that, I will also provide the required steps to disable administrator login through user/login page.

Please follow the following implementation steps.

**Step by step Guide:**

1. In the first step, you need to implement [hook\_menu](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_menu/7.x) in your module file.

```php
 t('Admin Login Page'),
    'page callback' => 'yourmodule_admin_login_page',
    'page arguments' => array(),
    'access arguments' => array('access content'),
    'type' => MENU_CALLBACK,
  );
  return $menu_items;
}-->
```
2. After adding menu in module file, the next step is to define the page callback function yourmodule_admin_login_page. In this function, we’ll define the layout of admin login page using theme.

```php

function yourmodule_admin_login_page() {
  return theme('yourmodule_admin_login_template');
}
```

3. Now that you have defined page callback function, the next step is to implement hook_theme in your module file.

```php
array(
      'template' => 'yourmodule-admin_login',
      'render element' => 'form',
      'path' => $path,
    ),
  );
  return $theme;
}-->

```
4. After implementation of hook theme in module file, the next step is to implement preprocess function for template file.

```php 
 'hidden',
    '#value' => 'admin_login',
    '#name' => 'hidden_admin_login_form',
  );
  $variables['rendered'] = drupal_render($form);
}-->
```
**Note** : In the above code, we have used the hidden element to identify the admin login page.
5. After adding menu in module file, the next step is to define the page callback function yourmodule\_admin\_login\_page. In this function, we’ll define the layout of admin login page using theme.

'yourmodule-admin_login.tpl.php'

6. Now paste the following code in yourmodule-admin_login.tpl.php file.

```php

<!--
  
-->

```
7. After that, clear your website’s cache and check the following url for your admin login page


URL : **your-site-domain/admin/login**

All above steps are used to show admin login page. But if you want that only administrator can login through page admin/login then follow the following the next steps.

1. In this step, you need to implement [hook\_form\_alter](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_form_alter/7.x) function. In this function we will add custom validation.

```php
function yourmodule_form_alter(&amp;$form, &amp;$form_state, $form_id) {
  if ($form_id == 'user_login') {
    $form['#validate'][] = 'yourmodule_external_validate';
  }
}

```
  
 2. After that, add the following code to define the custom validation in which only administrator can login.

```php
roles);
    if ($access_granted) {
      return TRUE;
    }
    else {
      form_set_error('', t('Only site administrator can login.'));
      return FALSE;
    }
  }
}-->
```

  
**Note**: If you want that administrator can’t login through user login page then add following code to do this.

Add the mentioned code in function **yourmodule\_external\_validate**

```php
roles);
    if ($user_access_granted) {
      form_set_error('', t('Only front user can login.'));
      return FALSE;
    }
    else {
      return TRUE;
    }
}-->
```

  
Complete code of function yourmodule\_external\_validate looks like:

```php
roles);
    if ($access_granted) {
      return TRUE;
    }
    else {
      form_set_error('', t('Only site administrator can login.'));
      return FALSE;
    }
  }
  else {
    $user = user_load($form_state['uid']);
    $user_access_granted = in_array('administrator', $user->roles);
    if ($user_access_granted) {
      form_set_error('', t('Only front user can login.'));
      return FALSE;
    }
    else {
      return TRUE;
    }
  }
}-->
```
  
If you are searching over the web and can’t find anything to create separate admin login page in drupal, Please follow the mentioned above steps and you are done. Also create different layout for this  admin login page.
