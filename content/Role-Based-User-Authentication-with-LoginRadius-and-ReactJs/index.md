---
title: "Role Based User Authentication with LoginRadius and ReactJS"
date: "2021-08-09"
coverImage: "coverImage.png"
author: "Victory Tuduo"
description: "This is an article that illustrates user authentication and role assignment using LoginRadius and ReactJS"
Tags: "Authentication, React"
---

# Role Based User Authentication with LoginRadius and ReactJS

![](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627316877077_cover+image.png)


In this tutorial, we will learn how to perform user authentication and role assignment to these users using LoginRadius and ReactJS.


> In modern websites today that attend to different kinds of users, there is a need to create a distinction between our users to determine what kind of privileges are assigned to them. We would achieve this by a method called Authentication. Through authentication, we validate certain credentials inputted by our users to determine if the user is genuine and then assign a specific role which could be a simple client or an administrator to that user.
> User Authentication is usually carried out through the use of third-party software. In this tutorial, we would carry out user authentication and role assignment using the LoginRadius API with our ReactJS application.


## Prerequisites

knowledge of ReactJS is required to make use of this tutorial. Also, you should have the node package manager or yarn installed on your pc.


## Overview

First, we will be installing the [LoginRadius React SDK](https://www.npmjs.com/package/loginradius-react). We will then configure it to provide authentication and role assignment for use within our React application.


## Introduction

### What is LoginRadius
According to its docs, "[LoginRadius](https://www.loginradius.com/docs/api/v2/getting-started/introduction/) is a SaaS-based Customer Identity and Access Management system(CIAM) with features to manage customer identity, privacy, and access. It is a simple implementable solution for adding user authentication and authorization to your website".
 LoginRadius has features to add different login authentication options including email, phone, and social network logins such as Google and Facebook. It also provides security on these data. Some of its security features it offers includes:

- Accessing the Admin Console: this is generally where we can control authentication factors regarding our apps.
- Using API Secret: A unique generated key to access our API.
- Multi-Factor Authentication (two-factor authentication)
- SSL verification

LoginRadius comes with different SDKs support for different frameworks. One of them is the [LoginRadius ReactJS SDK](https://github.com/LoginRadius/loginradius-react) which allows us to add authentication within our React app.


## Getting Started

### Creating a LoginRadius Account
First, we would be [creating a LoginRadius account](https://accounts.loginradius.com/auth.aspx?action=register) with a "Developer Pro plan selected" instead of the free plan. This is to be able to provide role management which is only accessible to the developer pro plan. You will get a page requesting you to create a new application. Click on create a new application.

After which a page comes up where you are to enter the name of your app and the URL to your app. Input any name and URL of your choice.


![Naming App](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627245515754_Screenshot+97.png)


## Auth page(IDX)
LoginRadius allows you to create a custom login page(an auth page that can be customized from our dashboard) which you can then preview. This is a page provided by LoginRadius which can be easily customized to contain different form contents. Features like user log in, signup, email, and password have already been implemented on this page. We will be using this page for registration and authentication with our react application. To learn more on how to customize this page to contain more form contents refer to [customizing Auth page.](https://www.loginradius.com/docs/developer/guide/customize-auth-page)


![A preview of my Auth page](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627245718848_Screenshot+100.png)


To be able to use user roles within our app we first have to set up these roles and their respective privileges from our dashboard. In this tutorial, we will set up two roles namely: Admin and client roles. To set up roles navigate to your dashboard, click on user management. Click on manage roles and click on add roles. A popup opens in this popup we add the role name and in the permission tab add what permissions that role should have. For this tutorial we have added a client role with a permission called view and an admin role with permissions: view, edit, delete. Enable set as default for the client role to automatically assign the role of client to any user in our app by default.


![Role Creation](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627245829693_Screenshot+101.png)



## Integrating LoginRadius into ReactJS

### Creating a ReactJS application
To build our application we will be using the Command Line Interface with the Create React App.
For node users:

   ```powershell
npx create-react-app {project name}
```

Alternatively, if you are using yarn, write:

```powershell
yarn add create-react-app {project name}
```

Next, `cd` into the directory with the command below:

```powershell
cd {project name}
```

## Configuring LoginRadius for React
Next, we will install the LoginRadius react dependency using the CLI:
For node users:

```powershell
npm install loginradius-react
```

yarn:

```powershell
yarn add loginradius-react
```

To use the react-router components we would have to install the `react-router-dom` using our command line. Run the following code to achieve this:
for node:

```powershell
npm install react-router-dom
```

yarn:

```powershell
yarn add react-router-dom
```

Setup a .env file in the root directory with the following details:

```powershell
REACT_APP_LR_APP_NAME={app name}
REACT_APP_API_KEY={your app key}
REACT_APP_SECRET={your secret key}
```

You can find the keys required above in your dashboard within user Configuration, API key and secret.


## Building our Login Components

The Auth Page(IDX) is a web page created for us that reflects the configurations we make in our dashboard. We will utilize this page as our login and signup page within our app and set up routes to route users to a different page based on their roles.

Go to the index.js file and add:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LRAuthProvider } from "loginradius-react";

ReactDOM.render(
<React.StrictMode>
  <LRAuthProvider
    appName={process.env.REACT_APP_LR_APP_NAME || ""}
    apiKey={process.env.REACT_APP_API_KEY || ""}
    redirectUri={window.location.origin}
  >
    <App />
  </LRAuthProvider>
</React.StrictMode>,
document.getElementById("root")
);
```
 
In the above code we made imports for required modules, set up our `LRAuthProvider` component with parameters `appname` and `apikeys` from our .env file, and also made our redirect URI. in this case, it is equal to our current `window.location.origin` which is the URL of the webpage and in this case is our localhost. Localhosts are whitelisted by default if you are building your app using a hosted site you have to whitelist the URL in your dashboard. The entry component in our code is set to the `App` component.

In our `App.js` component add the following code:

```javascript
import React from 'react';
import './App.css';
import {
BrowserRouter as Router,
Switch,
Route
} from "react-router-dom";
import Auth from "./Landing";
import CallAPI from './Return';

function App() {
return (
 <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div>{"Application home"}</div>
            <Auth />
          </Route>
          <Route path="/login">
          <CallAPI />
          </Route>
        </Switch>
      </div>
    </Router>
);
}

export default App;
```

 Here we set up our routes using the  `Browser routes`, `Switch`, and `Route` components imported from the `react-router-dom` module. The path to our home page is blank ("/"). It displays the text Application home.  It runs a `Auth` component which was earlier imported. A second route is made for a second page with a path of "/login" which runs the `CallAPI` component on the new page.

We will then create a page that will serve as the landing page for our site. To do this create a `Landing.js` file in your `src` folder and input the following code:

 ```javascript
import { useLRAuth } from "loginradius-react";
 
 const Auth = () => {
 
 const {isAuthenticated,loginWithRedirect,logout } =  useLRAuth();
   if (isAuthenticated) {
     return (
       <div>
         <button onClick={() => logout()}>
           Log out
         </button>
       </div>
     );
   } else {
     
     return <button onClick={() => loginWithRedirect("/login")}>Login/Register</button>;
 
   }
 }; 
 
 export default Auth;
```

In the code written above, we made use of `loginWithRedirect`, `loginWithPopup`, and `logout` authentication methods from the `useLRAuth` hook in our components to set up our authentication flow within our react application. We can also get access to the authentication state using `isAuthenticated`. The `isAuthenticated` method is used to check if our user is already logged into the app, it returns true and displays a `log out` button which is connected to a logout function. Else if it returns false it displays a `Login/Register` button which when clicked is set up to redirect us to the path "/login". The loginWithRedirect() and logout() methods make use of the Auth Page(IDX), where Registration and Login functionality is already implemented to perform these tasks.

We can style our button to make it easier to see by adding the following code within our App.css file:

```css
//for our login button on our landing page 
button{
  background-color: #2d56da;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}
//for the output in our login route which we will cover later
span{
  font-size: 24px;
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
```


## Using the LoginRadius API

As an additional feature, we can use the LoginRadius react SDK to access the API to get parameters that are assigned upon logging in using the login form. We will use this method to check if our user is a client or administrator. Whenever a user creates an account using the form they are assigned a unique user-id called `Uid` which we can view in our dashboard under manage users. We will reference this user id to determine our user’s roles. To do this we will need to fetch and return the uid of the current user. The fetch request for the user role requires the `Uid` and your `app secret key` as parameters within the URL.

Within your `src` folder create a file name `return.js` and populate it with the following code:

```javascript
import React, { useEffect, useState } from "react";
import { useLRAuth, withAuthenticationRequired } from "loginradius-react";

const CallAPI = () => {

  const [resp, setResp] = useState(null);
    const { user } = useLRAuth();
    const uid = user["Uid"];
    

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.loginradius.com/identity/v2/manage/account/${uid}/role?apiKey=${process.env.REACT_APP_API_KEY}&apiSecret=${process.env.REACT_APP_SECRET}`,
          {}
        );
        setResp(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  });

  if (!resp) {
    return <div>Loading...</div>;
  }

  return <span>{JSON.stringify(resp, null, 2)}</span>;
};

export default withAuthenticationRequired(CallAPI, {
  onRedirecting: () => <div>Loading...</div>,
});
```

Here, within our `CallAPI` component, we used `usestate` hook to create two states `resp` and `setResp`  to check if we have received a response from our API. A constant `user` was made to use the `LAuth` method to get the current user data and then the next line gets the id of the current user. The `useeffect` react hook which runs after the render contains an asynchronous function that is used to fetch the role of the current user `uid` and when it returns the data and outputs it in JSON form which value is given to `SetResp` else it throws an error if the fetch request fails.
Since it is an asynchronous function the code below it runs while it is fetching and awaiting a response. The `resp` is false during this time while waiting for the result of the asynchronous function therefore it outputs "Loading..." on the screen until the async returns the data which it then outputs. The last code block: the `export` is simply used to show "Loading..." on the screen during redirecting. 


## Running the code

You can run the present code by `cd` into your parent directory and running:
```powershell
`npm start`
```

When it successfully starts the server you would have a page similar to these:


![landing page](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627246380248_Screenshot+102.png)


Which is the landing page we built in the `Auth` component and is our "/" path in our routes within App.js. if you click on the login/register button you will be redirected to your custom Auth Page(IDX) provided by LoginRadius where you can create a user account and login. You can manage the users who have accounts from your dashboard in manage users.

After logging in with your user you will get redirected to the "/login" route which will then run the `CallAPI` component and give you a result similar to the following:


![Login route](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627246565180_Screenshot+110.png)


This is the current role of our user. Any user has the role of client assigned to him since we assigned the client role by default to all our users from our dashboard during the creation of roles.


## Managing user authentication and data

### User Authentication
In the above section, we created a user account with different parameters for the email and password. We notice, upon creation of an account we get directed to the login page where we can sign in using the details of the created account. Authentication was carried out on the parameters in the input field by the LoginRadius API set up in the Auth page. 

Our user authentication is carried out by the API. This checks the input details against the registered user details. If an input not matching this is put in the form we get a user does not exist prompt upon clicking the login button. Upon logging-in our app key and secret are sent by our app to the authentication server, upon authentication the server responds with an access token and authorizes our user. To view this token you can create a new file called `Token.js` and key in the following codes into it:

```javascript
import React, { useEffect, useState } from "react";
import { useLRAuth, withAuthenticationRequired } from "loginradius-react";

const CallAPI = () => {
  const { getAccessTokenSilently } = useLRAuth();
  const [resp, setResp] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
        `https://api.loginradius.com/identity/v2/auth/access_token/validate?access_token=${token}&apiKey=${process.env.REACT_APP_API_KEY}`,
          {}
        );
        setResp(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!resp) {
    return <div>Loading...</div>;
  }

  return (
    <span>{JSON.stringify(resp, null, 2)}</span>
  );
};

export default withAuthenticationRequired(CallAPI, {
    onRedirecting: () => <div>Loading...</div>, 
    });
```

The code above runs a fetch request for the access token and displays it when the data is returned. To view the output of this code import the newly created file into our App.JS file and since the name of the function component in the code is still `CallAPI` we dont need to edit the component called in the login route, we just need to comment out the former import for the component from our `return.js`  file as shown below:


```javascript
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Landing";
// import Login from "./Login";
import React from 'react';
// import CallAPI from './Return';
 import CallAPI from './Token';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div>{"Application home"}</div>
            <Auth />
          </Route>
          <Route path="/login">
            <CallAPI />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
```

 We then run the code by starting the server using the `npm start` command. Upon starting the server when you log-in you will have your user token displayed on the screen. Your output will be similar to the following image:
 

![access token](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1628266027077_Screenshot+120.png)


Here we can see the access token and its details. We can then return our code to the previous `CallAPI` component imported from Return.js.


### User Data 
We can view and manage user accounts from our dashboard. We can find the panel for this under User management:

![User Manangement](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1628263707754_Screenshot+117.png)


Manage users:

![Manage users](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1628263762129_Screenshot+119.png)


Here we can view the account of information of our users, search for a particular user detail using the email, Uid or phone number as the query in the search box. Also the panel provides option to reset the password of a user, block user and delete user as shown in the image above. New users can be created by clicking on the add user button and filling the details of the new user.


## Viewing User permissions

To view all roles and permissions for our app change the URL in the fetch request to:
`https://api.loginradius.com/identity/v2/manage/role` 

with the rest of the URL the same. That is it still contains your `appkey` and `appsecret` parameters.
Reload your page and you will have an output similar to the image below:


![All user Roles and permissions](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627246708426_Screenshot+111.png)



## Adding a Role to the current user

To add the role of admin to the current user create objects for this by adding the following code within the parenthesis after your fetch URL:

```json
method: "PUT",
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      roles: ["Admin"],
     }),
```

This will add the Admin role to the current logged-in user since it is the `Uid` that is within our URL. The `fetch` uses a GET request by default. Since we are making a change to the URL we are using a PUT method instead. You will get a result similar to the result below:


![Added admin role to current Uid](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627246814587_Screenshot+112.png)


Our user has both client  and admin roles because we added client roles by default to all our users.


## Assigning Client and admin roles
To assign specific roles to different people first, we would uncheck the set as default in the manage roles section of your dashboard. We can then run an `if block` to check if our user’s logged-in mails are equal to a particular set of mails and then perform the assignment of admin roles to them else assign the client roles instead. Modify your `return.js` file as shown below:

```javascript
import React, { useState } from "react";
import { useLRAuth, withAuthenticationRequired } from "loginradius-react";

const CallAPI = () => {

  const [resp, setResp] = useState(null);
  const { user } = useLRAuth();
  const uid = user["Uid"];
  var response;
  const email = user["Email"];
  var emailmain = email[0].Value;
  
  
  (async () => {
    if (emailmain.toLowerCase() === "admin@gmail.com"){
      try {
          
        
        response = await fetch(
          `https://api.loginradius.com/identity/v2/manage/account/${uid}/role?apiKey=${process.env.REACT_APP_API_KEY}&apiSecret=${process.env.REACT_APP_SECRET}`,
          {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              roles: ["Admin"],
            }),
          }
        );
        setResp(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
    else {
       try {
         response = await fetch(
           `https://api.loginradius.com/identity/v2/manage/account/${uid}/role?apiKey=${process.env.REACT_APP_API_KEY}&apiSecret=${process.env.REACT_APP_SECRET}`,
           {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               roles: ["Client"],
             }),
           }
         );
         setResp(await response.json());
       } catch (e) {
         console.error(e);
       }
    }
  })();
  

  if (!resp) {
    return <div>Loading...</div>;
  }

   return <span>
    Welcome user : {uid}<br/>
    Email : {emailmain}<br/>
    {JSON.stringify(resp, null, 2)}
  </span>;
};

export default withAuthenticationRequired(CallAPI, {
  onRedirecting: () => <div>Loading...</div>,
});
```

In the code above, we created a const email that returned an array containing the user email. To get the email specifically we created another variable `emailmain` which gets the value at a particular array position containing the user email.
The `async` request block has now been modified to check if the user mail being used to log in is equivalent to a particular email which I declared. Alternatively, you can have your mails pulled from a database and assign the admin roles to the ones you want. The else block assigns a client role to emails that do not meet the first criteria. When you create a new account with an email similar to what I have in the `if block`, that is: admin@gmail.com; when rerouted to the "/login" path you will discover that the role of admin was assigned while any other email will have the client role assigned upon login. The return statement returns the user id of the logged-in user, the email, and then the role in a JSON format. The output would be similar to the image below:


![output on login route](https://paper-attachments.dropbox.com/s_14B4BD8EDBFA59296DCDB812AB5C6EF8CE164AAF0A2268A9E90E57893E23504E_1627306768831_Screenshot+114.png)

## Conclusion

In this tutorial, we covered setting up LoginRadius with ReactJS and using it to authenticate users and assign specific roles with different privileges to them.  These privileges can be used to give users certain permissions as to what they can do on your website.
We started by introducing LoginRadius, its uses, and its benefits. We then used it to authenticate users and perform role assignments in our React application.

LoginRadius is a great tool that is easy to implement if you are looking to add authentication within your application.

A working version of the code used in this article can be found on Github at: [LoginRadius github repo](https://github.com/Victory-ET/LoginRadius).


