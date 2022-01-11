---
title: "How to Get Email Alerts for Unhandled PHP Exceptions"
date: "2015-10-26"
coverImage: "email-alerts-unhandled-php.png"
author: "Team LoginRadius"
tags: ["PHP","Email"]
---

This tutorial provides a solution to get email alerts, when a unhandled error occurs. For this tutorial, we are using WordPress.

Imagine you created a php application and it’s running fine.  A couple of days later, a user complains about an error which you’re totally unaware of. Such unhandled errors are very common in php applications. So, to find these issues, we are going to send email notifications whenever an error occurs.

**Step 1.** First of all we need to identify a common application file that include at top of application. in this case the file is “wp-config.php” at the root of your wordpress hosting directory.  

**Step 2.** Let’s add the following line of code in this file under php tag.

```php
set_error_handler('errorHandler'); // this line of code sets an error handler custom function to handle any php error. And here we pass our custom function that name “errorHandler”

function createTable($array){
    if(is_array($array) && count($array)>0){
        $errorContent = "<table border = 1><tr><td>";
        foreach ($array as $key => $val) {
            $errorContent .= $key . "</td><td>";
            if(is_array($val) && count($val)>0){
                $errorContent .= createTable(json_decode(json_encode($val),true)) ;
            }else{
                $errorContent .= print_r($val, true) ;
            }
        }
        $errorContent .= "</td></tr></table>";
        return $errorContent;
    }
    return '';
}
 
/**
 * 
 * @param type $errorNumber        // This parameter returns error number.
 * @param type $errorString           // This parameter returns error string.
 * @param type $errorFile               // This parameter returns path of file in which error found.
 * @param type $errorLine              // This parameter returns line number of file in which you get an error.
 * @param type $errorContext         // This parameter return error context.
 */
function errorHandler($errorNumber, $errorString, $errorFile, $errorLine, $errorContext) {
    $emailAddress = 'example@example.com';
    $emailSubject = 'Error on my Application';
    $emailMessage = '<h2>Error Reporting on :- </h2>[' . date("Y-m-d h:i:s", time()) . ']';
    $emailMessage .= "<h2>Error Number :- </h2>".print_r($errorNumber, true).'';
    $emailMessage .= "<h2>Error String :- </h2>".print_r($errorString, true).'';
    $emailMessage .= "<h2>Error File :- </h2>".print_r($errorFile, true).'';
    $emailMessage .= "<h2>Error Line :- </h2>".print_r($errorLine, true).'';
    $emailMessage .= "<h2>Error Context :- </h2>".createTable($errorContext);
    $headers = "MIME-Version: 1.0" . "rn";
    $headers .= "Content-type:text/html;charset=UTF-8" . "rn";
    mail($emailAddress, $emailSubject, $emailMessage, $headers); // you may use SMTP, default php mail service OR other email sending process
}
```
  
**Step 3.** Now save the file and upload on server.

Whenever we got any error in wordpress then above code will send an email to given email-address (example@example.com). You can use the above code on production websites to improve application performance and track all errors that’s are missed.

Similarly we can use above code in drupal, joomla, and many other content management systems.  
Common config files on other platforms are listed below:

| **CMS/application name**      | **Location of common file** |
| ----------------------------- | --------------------------- |
| 4Images Gallery      | /config.php       |
| B2 Evolution   | /conf/\_basic\_config.php        |
| Boonex Dolphin   | /inc/header.inc.php        |
| Concrete5   | /config/site.php        |
| Coppermine Photo Gallery   | /include/config.inc.php        |
| Crafty Syntax Live Help   | /config.php        |
| Cube Cart   | /includes/global.inc.php        |
| dotProject   | /includes/config.php        |
| Drupal   | /sites/default/settings.php        |
| e107   | /e107\_config.php        |
| FAQMasterFlex   | /faq\_config.php        |
| Gallery   | /config.php        |
| Geeklog   | /db-config.php or /siteconfig.php or /lib-common.php  |
| glfusion   | /private/db-config.php        |
| Hotaru   | /hotaru\_settings.php        |
| Joomla   | /configuration.php        |
| LiveSite   | /livesite/config.php        |
| LifeType   | /config/config.properties.php        |
| Mambo   | /configuration.php        |
| Marketecture   | /include/config.php        |
| MODx   | /manager/includes/config.inc.php        |
| Moodle   | /config.php        |
| MyBB   | /inc/config.php        |
| Noahs Classifieds   | /app/config.php        |
| Nucleus   | /config.php        |
| ocPortal   | /info.php        |
| OpenCart   | /config.php or /admin/config.php        |
| osCommerce   | /includes/configure.php or /admin/includes/configure.php        |
| Oxwall   | /ow\_includes/config.php        |
| PHP-Nuke   | /config.php        |
| phpBB   | /config.php        |
| phpFormGenerator   | /index.php or /mysql.class.php        |
| phpFreeChat   | /forms/admin/config.inc.php (only if you have saved form input to a database)        |
| PHPlist   | /config/config.php        |
| phpMyDirectory   | /defaults.php        |
| phpWCMS   | /include/inc\_conf/conf.inc.php        |
| phpWebSite   | /conf/config.php        |
| PhpWiki   | /admin.php or /lib/config.php        |
| Pligg   | /libs/dbconnect.php        |
| Post-Nuke   | /config.php        |
| PrestaShop   | /config/settings.inc.php        |
| Saurus CMS   | /config.php        |
| ShopSite   | /includes/configure.php or /admin/includes/configure.php        |
| Siteframe   | /config.php        |
| Simple Machines Forum   | /Settings.php        |
| Soholaunch   | /sohoadmin/config/isp.conf.php        |
| SugarCRM   | /config.php        |
| Textpattern   | /textpattern/config.php        |
| TikiWiki   | /db/local.php        |
| Tomato Cart   | /includes/configure.php        |
| TYPO3   | /typo3conf/localconf.php        |
| WebCalendar   | /includes/settings.php        |
| WHMCS   | /configuration.php        |
| WordPress   | /wp-config.php        |
| X7 Chat   | /config.php        |
| Xoops   | /mainfile.php        |
| Zen Cart   | /includes/configure.php or /admin/includes/configure.php        |
| Zikula   | /config.php        |
