---
title: "Enqueuing Scripts in WordPress"
date: "2015-03-02"
coverImage: "wordpress.png"
author: "Zoie Carnegie"
tags: ["WordPress", "PHP"]
---

In this tutorial I want to explain the different methods to enqueue scripts and style sheets in WordPress. This can be a really confusing process for new WordPress developers.

There are three different areas that a developer can enqueue scripts for; the first is the client side, the second is the admin side and the third is the login pages.

Each of these areas uses a specific hook to enqueue scripts to use in that area. For example, if a script was enqueued using the [login\_enqueue\_scripts](http://codex.wordpress.org/Plugin_API/Action_Reference/login_enqueue_scripts) hook that script would not be loaded in the admin area. This allows WordPress to load only the scripts needed for that specific section. Optimization!

When you don’t enqueue scripts using these hooks and instead use the `<script>` tag, it can cause the script to be loaded every time you load the site, admin area or login page. This can cause conflicts with other scripts, plugins or themes. WordPress takes care of these problems when you use the hooks intended.

An example of the three enqueuing hooks are below:

**wp\_enqueue\_scripts hook – Front End**

```php
function themeslug_enqueue_style() {
    wp_enqueue_style( 'core', 'style.css', false );
}
function themeslug_enqueue_script() {
    wp_enqueue_script( 'my-js', 'filename.js', false );
}
add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'themeslug_enqueue_script' );

```
  

**admin\_enqueue\_scripts hook – Admin area**

```php
function load_custom_wp_admin_style() {
    wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/admin-style.css', false, '1.0.0' );
    wp_enqueue_style( 'custom_wp_admin_css' );
}
function my_enqueue($hook) {
    if ( 'edit.php' != $hook ) {
        return;
    }
    wp_enqueue_script( 'my_custom_script', plugin_dir_url( __FILE__ ) . 'myscript.js' );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );
add_action( 'admin_enqueue_scripts', 'my_enqueue' );

```
  
**login\_enqueue\_scripts hook – Login pages**

```php
function themeslug_enqueue_style() {
    wp_enqueue_style( 'core', 'style.css', false );
}
function themeslug_enqueue_script() {
    wp_enqueue_script( 'my-js', 'filename.js', false );
}
add_action( 'login_enqueue_scripts', 'themeslug_enqueue_style', 10 );
add_action( 'login_enqueue_scripts', 'themeslug_enqueue_script', 1 );

```
  
If you are calling the same script in many different areas you can register the script or stylesheet first and then use it when needed in your plugin. In the above examples you’ll notice the function being called is enqueuing a script or a style only and not registering a script or a style. When you register first it allows that script or style to be called in the area it was registered in when you enqueue it. Here’s an example of registering scripts first.

```php

add_action( 'admin_enqueue_scripts', 'my_plugin_admin_scripts' );
function my_plugin_admin_scripts() {
    /* Register our script. */
    wp_register_script( 'my-plugin-script', plugins_url( '/script.js', __FILE__ ) );
    wp_enqueue_script( 'my-plugin-script');
}
```
  
In the example above you can see first I have registered the script then used wp\_enqueue\_script to enqueue it. You don’t need to enqueue the script directly after registering as a practice, however after registering the script you can enqueue it on pages you require it. If you have registered the script or style using wp\_enqueue\_scripts it will only be available on the front end of your site and not the admin pages or the login pages.
