---
title: "Passwordless Authentication For Your PHP Project"
date: "2022-03-14"
coverImage: "coverImage.jpg"
author: "Temitope Oyedele"
tags: ["PHP", "webdev", "authentication"]
description: "This post talks about how to implememnt paswordless login using login radius in your Php project"
---

Paasowrdless authentication is the process of validating a software user's identification without using a password is known as passwordless authentication. Instead of passwords, identity can be validated using a `possession factor`, which is a unique identifier for the person. This authentication method authorizes users through various methods. some of these methods include:

- Biometrics: Biometric authentication relies on distinct physical characteristics to determine whether or not a person is who they claim to be without requiring a password.
- Magic Links: In this method, passwordless authentication requires the user to input their email address into the login box. An email is then sent to them with a link that allows them to log in. This procedure is carried out each time the user signs in.
- One-Time Passwords/Codes: A one-time password (OTP), also known as a one-time personal identification number (PIN), one-time authorization code (OTAC), or dynamic password, is a password that is valid for only one login session or transaction on a computer system or other digital device. OTPs are similar to magic links, but instead of merely clicking a link, users must enter a code that you deliver to them (by email or SMS to their mobile device). This procedure is carried out each time a user signs in.
- Push Notifications: Users receive a push notification on their mobile devices from a specific authenticator app (such as Google Authenticator) and open the app via the push notification to verify their identity.

In this tutorial, you'll discover how the infrastructure supporting passwordless authentication works, as well as showing how to implement it using loginradius passwordless login.

### How Does It Work?

For one time password (which will be what we'll be implementing). The user is prompted to input a valid phone number while using this method of authentication. A one-time, unique code is then provided to the phone number. When a user inputs this code into your application, your app confirms that the code is correct and that the phone number exists and belongs to a user, initiates a session, and logs the user in.

Passwordless authentication is a security investment that will result in significant cost reductions over time. The cost of deployment varies according to the size of your organization's existing user directory and authentication systems. The technology required to implement a passwordless authentication approach may already be in use at your business, or it may necessitate the procurement of new equipment. This is where loginradius comes in. The LoginRadius Identity Platform helps companies securely manage customer identities and data to deliver a unified customer experience. loginradius can cut the time it takes to create passwordless authentication for millions of users to months in some circumstances, as well as offload many of the future maintenance costs. To learn more about their services, [visit their website here](https://www.loginradius.com/company/)

### Benefits

- Better Security: User-controlled passwords pose a significant risk since users repeat passwords and can share them with others. Passwords are the most common attack vector even after the development of password generators and managers. They also facilitate assaults such as credential stuffing, corporate account takeover (CATO), password spraying, and brute force attacks.Passwordless authentication prevents this because there is no password to hack.
- Better User Experience: Passwordless authentication eliminates the need for users to remember passwords, simplifying the authentication process.
- IT Gains Control and Visibility: When relying on passwords, phishing, reuse, and sharing are frequent difficulties. With passwordless authentication, the IT team reclaims its mission of having comprehensive insight over identity and access management. 

### Limitation

Because it requires a verification channel (email, push notification, or text message), if the user does not have access to one of these mediums, they will be unable to access the system.

Now that you have a fundamental grasp of how passwordless authentication works, let's build a sample application to demonstrate it. To implement this we'll be using Loginradius.

### Prerequisites

To follow through, we'll need the following:

- Basic understanding of php.
- Xampp installed.
- PHP 7.4 or higher with the mysqli extension installed.
- A login radius account( must be deverloper pro ). You can [check it out here](https://www.loginradius.com/pricing/).
- A twilio acctount. Register [here](https://www.twilio.com/try-twilio)

**NOTE:** For everyone to have an understanding, I'll be writing the codes in the most basic way possible.

### Our Project

For better understanding, I'll dividing the process into sections. These are:

- Setting up loginradius.
- Installing loginradius PHP SDK.
- Registering a user on our cloud platform.
- passwordless login verification process.

#### Setting Up Login Radius

Here, We'll be setting up evrything we'll need to do berfore proceeding the with codes. Login to your login radius account. Head over to the `configuration` section. Click on `Auth Configuration`.

![auth](auth.PNG)

click on the login method. We'll be adding two methods which is the passwordless login and phone login. Add both of these from the `add a login method` dropdown. Once we're done with that, we want to congigure our SMS provider so we navigate to the `integration` section.
![integrate](integration.PNG)
 Click the Add button, the available integrations screen will appear. Either search for SMS in the search bar or go to the Select Category dropdown and select Communication category. Locate SMS Provider. Click the Let’s Configure option, the following screen will appear:
![sms provider](sms-provider-configuration.png)

Now we want to configure our SMS provider settings. We'll be using twilio as earlier stated. To get a twilio account and also buy a number use this [link](https://www.twilio.com/try-twilio). Once we've done that let's configure the settings in this format:

- SMS Provider: Select Twilio SMS Provider.
- Twilio Account SID: Enter the Twilio Account SID.
- Twilio Auth Token: Enter the Twilio Auth Token.
- Twilio Number: Enter the Twilio registered number.

We need to do one more thing that's to copy out our API key, API secret key and our SOTT. We can copy all of these somewhere as we'll be needing this in our codes. Navigate to `configurations`. click on `API credentials` and click on `API Key And Secret`. Here, we should see our API key and secret API. For the `SOTT`, under the `API crendentials` click on `Secure Moblile OTP tOKEN`. Now, we have successfuly set up our login radius account.

#### Installing loginradius PHP SDK

 For this process, we can choose the follow the already written documentation of the SDK installation [here](https://www.loginradius.com/docs/developer/references/sdk/php-sdk/) or follow my guide. Whichever works for us.
 To install the sdk, we need to run the composer command:
 
 ```bash
 composer require loginradius/php-sdk:10.0.0
 ```

 Once we're done with that, Let's create a folder where we want our project files. In our terminal write this:

 ```bash
 mkdir php_demo
 ```

This will create a folder for our project files. We then want to create a file called `config.php` and paste this:

```php

define('LR_API_KEY', 'LOGINRADIUS_API_KEY_HERE'); // Replace LOGINRADIUS_API_KEY_HERE with your site API key that provide in LoginRadius account.
define('LR_API_SECRET', 'LOGINRADIUS_API_SECRET_HERE');  // Replace LOGINRADIUS_API_SECRET_HERE with your site Secret key that provide in LoginRadius account.

require_once "./src/LoginRadiusSDK/Utility/Functions.php";
require_once "./src/LoginRadiusSDK/LoginRadiusException.php";
require_once "./src/LoginRadiusSDK/Clients/IHttpClientInterface.php";
require_once "./src/LoginRadiusSDK/Clients/DefaultHttpClient.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/AuthenticationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/OneTouchLoginAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/PasswordLessLoginAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/PhoneAuthenticationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/RiskBasedAuthenticationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/RiskBasedAuthenticationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Authentication/SmartLoginAPI.php";

require_once "./src/LoginRadiusSDK/CustomerRegistration/Account/AccountAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Account/RoleAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Account/SottAPI.php";

require_once "./src/LoginRadiusSDK/CustomerRegistration/Advanced/ConfigurationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Advanced/CustomObjectAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Advanced/CustomRegistrationDataAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Advanced/MultiFactorAuthenticationAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Advanced/CustomRegistrationDataAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Social/NativeSocialAPI.php";
require_once "./src/LoginRadiusSDK/CustomerRegistration/Social/SocialAPI.php";


?>
```

Let's not forget to replace with our site API key and our secret key. Now that we're done with let's login to our login radius account and make a few changes before proceeding further.

#### Registering A User On Login Radius Platform
This is important if we're to implement login radius passowrdless login. To do this we'll be creating:
- register.php(contains basic html codes for registering) 
- verify.php 

For `register.php`, let's paste in the following codes:

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Registration Page</title>
      <link
         href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
         rel="stylesheet"
         />
   </head>
   <body>
      <div class="d-flex min-vh-100 justify-content-center align-items-center">
         <div class="shadow-sm mx-2 border rounded p-5">
            <h3>Welcome</h3>
            <form action="verify.php" method="POST">
               <div class="form-group">
                  <label  class="mt-3 mb-1 text-muted">
                  Firstname
                  </label>
                  <input  type="text" name="firstname" class="form-control" />
                  <label  class="mt-3 mb-1 text-muted">
                  Lastname
                  </label>
                  <input  type="text" name="lastname" class="form-control" />
                  <label  class="mt-3 mb-1 text-muted">
                  Email
                  </label>
                  <input  type="email" name="email" class="form-control" />
                  <label  class="mt-3 mb-1 text-muted">
                  Password
                  </label>
                  <input  type="text" name="password" class="form-control" />
                  <label  class="mt-3 mb-1 text-muted">
                  <label  class="mt-3 mb-1 text-muted">
                  Phone
                  </label>
                  <input type="text" name="phone" class="form-control" />
                  <button name="submit" type="submit" class="btn btn-success mt-2 w-100" >
                  Continue
                  </button>  
               </div>
            </form>
         </div>
      </div>
   </body>
</html>
```

For our `verify.php`. Paste this:

```php
require_once 'config.php';
require_once 'connection.php';
use \LoginRadiusSDK\CustomerRegistration\Authentication\PhoneAuthenticationAPI;
use \LoginRadiusSDK\CustomerRegistration\Account\SottAPI;
if (isset($_POST['submit']))
{

    $phoneAuthenticationAPI = new PhoneAuthenticationAPI();
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phoneid = $_POST['phone'];
    $token = 'YOUR TOKEN '; // put in your SOTT here

    $payload = array(
        "firstName" => $firstname,
        "lastName" => $lastname,
        "password" => $password,
        "phoneId" => $phoneid,
        "Email" => array(
            array(
                "Type" => "Primary",
                "Value" => $email
            )
        )
    ); //Required
    $sott = $token; //Required
    $fields = null; //Optional
    $options = "options"; //Optional
    $smsTemplate = "smsTemplate"; //Optional
    $verificationUrl = "verificationUrl"; //Optional
    $welcomeEmailTemplate = "welcomeEmailTemplate"; //Optional
    $result = $phoneAuthenticationAPI->userRegistrationByPhone($payload, $sott, $fields, $options, $smsTemplate, $verificationUrl, $welcomeEmailTemplate);
    if ($result)
    {

        echo '<script>alert("registration succesful")</script>';

        exit();
    }
    else
    {
        echo 'Unable to send verification code';
    }
}

```

**NOTE:** DON'T FORGET TO PUT IN YOUR GENERATED SOTT CODE!

Let's start our Xampp or server and run our app:

#### Passwordless Verification Process

In this process, we'll be creating:

- login.php
- process.php
- otp.php
- otp_verify.php
- homepage.php

Inside our `login.php`, let's paste this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Login Page</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>

  <body>
    <div class="d-flex min-vh-100 justify-content-center align-items-center">
      <div class="shadow-sm mx-2 border rounded p-5">
        <h3>Login</h3>
        <form action="login.php" method="POST">
          <div class="form-group">
            <label for="uinput" class="mt-3 mb-1 text-muted">
              Kindly, enter your mobile number to proceed.
            </label>
            <input id="uinput" type="text" name="phone" class="form-control" />
            <button name="submit" type="submit" class="btn btn-success mt-2 w-100" >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</html>
```

Also add this on top of it:

```php
<?php
  require ('process.php');
?>
```

For `process.php`, let's paste in this:

```php
<?php
      session_start();
      require_once 'config.php';
      use \LoginRadiusSDK\CustomerRegistration\Authentication\PasswordLessLoginAPI;
      
      
      if (isset($_POST['submit'])) {
      $passwordLessLoginAPI = new PasswordLessLoginAPI();
       $phone_number = $_POST['phone'];
       $phone = $phone_number; //Required 
       $smsTemplate = "smsTemplate"; //Optional
       
       $result = $passwordLessLoginAPI->passwordlessLoginByPhone($phone,$smsTemplate);
          if($result){
            $_SESSION['phone'] = $phone_number;
            header("location:otp.php");
            exit();
    } else {
        echo 'Unable to send verification code';
    }
          }
?>
```

For the `otp.php` let' paste this in:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title> Veification Page</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>

  <body>
    <div class="d-flex min-vh-100 justify-content-center align-items-center">
      <div class="shadow-sm mx-2 border rounded p-5">
        <h3>Confirm it's you</h3>
        <form action="otp.php" method="POST">
          <div class="form-group">
            <label for="uinput" class="mt-3 mb-1 text-muted">
              An otp code has been sent to your phone
            </label>
            <input id="uinput" type="text" name="otp" class="form-control" />
            <button name="submit" type="submit" class="btn btn-success mt-2 w-100" >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</html>
```

For the `otp_verify.php`, let's paste this in:

```php
<?php
   session_start();
   require_once 'config.php';
   use \LoginRadiusSDK\CustomerRegistration\Authentication\PasswordLessLoginAPI;
  if (isset($_POST['submit'])) {
    $passwordLessLoginAPI = new PasswordLessLoginAPI();
  $otp= $_POST['otp'];
  $phoneid = $_SESSION['phone']; 
  $payload = array(
    "otp"  => $otp,
    "phone" => $phoneid,
); //Required 
    $fields = null; //Optional 
    $smsTemplate = "smsTemplate"; //Optional
    
    $result = $passwordLessLoginAPI->passwordlessLoginPhoneVerification($payload,$fields,$smsTemplate);
    if($result){
      $res = json_decode($result);
      $phoneVerified = $res["Profile"]["PhoneIdVerified"];
      if($phoneVerified){
        header("location:homepage.php");
    }else{
        echo '<script>alert("incorrect otp")</script>';
    }
}
?>
```
Almost done! lets just create a homepage that says welcome back user.  Create a file called `homepage.php` and paste this:

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>welcome back user</h1>
</body>
</html>
```
We can then run our application. That's how to implement passwordless authentication using login radius for your php project.

### Conclusion
We learned how passwordless authentication works as well as some of the benefits and drawbacks of using it throughout this tutorial. We also built a sample app that makes use of this authentication method.Would you please share if you found this helpful?
