---
title: "A Guide To React User Authentication with LoginRadius"
date: "2020-12-10"
coverImage: "authentication-main.png"
author: "Versha Gupta"
tags: ["Authentication", "LoginRadius", "React"]
description: "This article focuses on helping developers learn how to integrate user authentication in React applications and determine the basic principles of authentication with React."

---

This guide uses LoginRadius API for authenticating React apps. It provides React developers with a more straightforward way to add user authentication to react apps. To handle a lot of authentication implementation information, LoginRadius offers a high-level API. Using security best practices, now you can protect your response apps while writing less code.

This article [focuses on helping developers](/react-hooks-guide/) learn how to integrate user authentication in the React application. Practice the following security principles to improve authentication on React applications:

- Add user login and user login.

- User information retrieval.

- Attach a tab for sign-up.

In the React application, we can [easily and quickly](/react-context-api/) add authentication by using LoginRadius. If you already have a customized login/registration page ready, then I'll guide you to the next step of adding authentication in react apps.

## Configure LoginRadius for React Application

A new application was created for you when you [signed up](https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login) for LoginRadius. From here, you get some essential information.

1. API Key  [How to get API Key?](https://www.loginradius.com/developers/)
2. Sott  [Work with Sott](https://www.loginradius.com/developers/)

## Add following LoginRadius JS library into your application

    <script type="text/javascript" src="https://auth.lrcontent.com/v2/LoginRadiusV2.js"></script>

## Add Authentication when you have customized Login Page

### Add Login to your react application

We will use an API framework to call LoginRadius APIs for authentication.  Create a new file **LoginPage.js**, and add the following code.
```javascript
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
      //Here you will get the access Token of 
      
      
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
```
In the above code, you will see the `lrConfig` object, which has apikey that you will get from the LoginRadius account. After calling `loginradius.api.login`, you will get the response in which you will get the access Token. Through this access token, you can get the user profile.

### Add Logout to your react application
Create **LogoutPage.js** file and add following code:

```javascript
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
```
In the above code, we have called invalidated token api, which expires your access token.


### Add Signup to your react application

Create **SignupPage.js** file and add the following code:
```javascript
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
  ```

In the above code, You will get a success/error response after calling the registration api.

## Wrap up

The most common authentication use case for a React application gets covered in this tutorial: quick login and logout. However, LoginRadius is an expandable and versatile platform that can help you accomplish much more. In this guide, We have used the LoginRadius API Framework. If you want to incorporate our hosted page into your application, follow this [documentation](https://www.loginradius.com/developers/).

Let me know what you think of this tutorial in the comments below. Thanks for reading :)
