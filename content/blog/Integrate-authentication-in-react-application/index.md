---
title: "Integrate Authentication in React application"
date: "2020-12-02"
coverImage: "authentication-main.svg"
author: "Versha Gupta"
tags: ["Authentication", "LoginRadius"]
---

# Integrate Authentication in React application
Using LoginRadius, we can easily and quickly add authentication to your React application. In this article, if you have customized login / registration page then I will give you steps to add authentication.

## Configure LoginRadius

A new application was created for you when you [signed up] (https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login) for LoginRadius. Form here, you get some essential information.

1. API Key  [How to get API Key?](https://www.loginradius.com/docs/developer/faq/api-credentials/)
2. Sott  [Work with SSO](https://www.loginradius.com/docs/developer/howto/work-with-sott/)

## Add following LoginRadius JS library into your application

    <script type="text/javascript" src="https://auth.lrcontent.com/v2/LoginRadiusV2.js"></script>

## Add Authentication when you have customized Login Page

### Add Login to your application

We will use API framework to call LoginRadius APIs for authentication.  Create new file **LoginPage.js** and add the following code.

    import  React, { useState } from  "react";
    const  lrconfig = {
    apiKey:  "*************************", //LoginRadius API key
    };
    const  loginradius = {};
    if (window.LoginRadiusV2) {
      loginradius = new  window.LoginRadiusV2(lrconfig);
      loginradius.api.init(lrconfig);
    }
    const  LoginButton = () => {
      const  loginButtonHandler = () => {
      loginradius.api.login({emailid:  emailValue,
      password:  passwordValue},
      (successResponse)=>{
      //Here you will get the access Token of user
      console.log(successResponse);
      },
      (errors) => {
      console.log(errors);
      });
      }
      const [emailValue, updateEmailValue] = useState("");
      const [passwordValue, updatePasswordValue] = useState("");
      return (
      <React.Fragment>
      <input  type="text"  value={emailValue}  onChange={(e)=>{updateEmailValue(e.target.value)}}  placeholder={"email"}/>
      <input  type="password"  value={passwordValue}  onChange={(e)=>{updatePasswordValue(e.target.value)}}  placeholder={"Password"}  />
      <button  onClick={() =>  loginButtonHandler()}>Log In</button>
      </React.Fragment>
      );
      };
      export  default  LoginButton;

In above code , You will see the lrConfig object which have apikey that you will get from LoginRadius. After calling `loginradius.api.login` you will get the response in which you will get the access Token through which you can get the user profile.

### Add Logout to your application
Create **LogoutPage.js** file and add following code:

    import React, { useState } from "react";
    
    const lrconfig = {
      apiKey: "*************************", //LoginRadius API key
    };
    
    const loginradius = {};
    if (window.LoginRadiusV2) {
      loginradius = new window.LoginRadiusV2(lrconfig);
      loginradius.api.init(lrconfig);
    }
    
    const LogoutButton = () => {
      const token  = '************'; // Access Token that you got after login
      const logoutButtonHandler = () => {
        //Note: Call invalidate token api to invalidate the token.**
        loginradius.api.invalidateToken(
               token,
               (successResponse)=>{
           console.log(successResponse);
           },
               (errors) => {
                 console.log(errors);
               }
             );
       }
      return (
        <React.Fragment>
       <button onClick={() => logoutButtonHandler()}>Logout</button>
       </React.Fragment>
       );
    };
      export default LogoutButton;
In above code, We have called invalidate token api which expire your access token.


### Add Signup to your application

   Create **SignupPage.js** file and add following code:

        import  React, { useState } from  "react";
    const  lrconfig = {
    apiKey:  "*************************", //LoginRadius API key
    sott:  "***************************"  //Secure Token for signup functionality
    };
    const  loginradius = {};
    if (window.LoginRadiusV2) {
      loginradius = new  window.LoginRadiusV2(lrconfig);
      loginradius.api.init(lrconfig);
    }
    const  SignupButton = () => {
      const  signupButtonHandler = () => {
      loginradius.api.registration({
        email: [{ type: "Primary", value: emailValue }],
              password: passwordValue
            },
      (successResponse)=>{
      //Here you will get the response after registration
      console.log(successResponse);
      },
      (errors) => {
      console.log(errors);
      });
      }
      const [emailValue, updateEmailValue] = useState("");
      const [passwordValue, updatePasswordValue] = useState("");
      return (
      <React.Fragment>
      <input  type="text"  value={emailValue}  onChange={(e)=>{updateEmailValue(e.target.value)}}  placeholder={"email"}/>
      <input  type="password"  value={passwordValue}  onChange={(e)=>{updatePasswordValue(e.target.value)}}  placeholder={"Password"}  />
      <button  onClick={() =>  signupButtonHandler()}>Log In</button>
      </React.Fragment>
      );
      };
      export  default  SignupButton;

In above code, You will get success/error response after calling registration api.

## Wrap up

  Here we have used the LoginRadius API Framework so that if you have your own designed forms, call the LoginRadius API. If you want to integrate our hosted page, follow [this] (https://www.loginradius.com/docs/developer/howto/authentication-theme/) documentation.

