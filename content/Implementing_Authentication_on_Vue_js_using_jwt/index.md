---
title: "Implementing Authentication on Vue.js using jwt token"
date: "2021-05-26"
coverImage: "coverimage.png"
author: "Uma Victor"
tags: ["Auth","JWT","Vue.js"]
description: "In recent times, when building a modern application, users are required to verify their identity. The process by which we carry out this verification is what we call authentication and in this tutorial we would look at how we can carry out this task using jwt authentication on a vuejs app"
---

# Implementing Authentication on Vue.js using jwt token

> In recent times, when building a modern application, users are required to verify their identity. The process by which we carry out this verification is what we call authentication and in this tutorial we would look at how we can carry out this task using jwt authentication on a vuejs app


## Goals

In this tutorial, we will be covering some authentication concepts and learn about authentication and how to use json jwt web tokens to authorize a vue app. To continue in this tutorial, you should be comfortable using vue, vuex and express

## Overview

In our app, we have a login form, the user enters a username and password that is then posted to an endpoint. The flow of the app is the user opens the app then the login page appears, the user submits the login form which does a post request to a login endpoint, then we check if the username and password checks out then we return a jwt and store the token in vuex and depending on the token we display a different page

![App Workflow](https://paper-attachments.dropbox.com/s_E8FB3BC64D80223D4CC4AFEEE119F2426D27A7EBE018696513C17DED12022079_1622019813698_AppWorkflow.png)

## Setting up our Vue app

You can start a new project using the [vue cli](https://cli.vuejs.org/guide/installation.html) but you have to install the CLI first by running-

    npm install -g @vue/cli
     OR
    yarn global add @vue/cli

after the `cli` is installed you can create a new project by running-

    vue create jwt-auth-app

you will then be prompted to select some basic setup. In your setup, select Babel, Linter, Vue Router and Vuex!. That’s all we need.


## Setup Express Server

To set up our server, we need to install `cors`, `dotenv`, `express`, and `nodemon`

    npm install cors dotenv express

Our server.js file is simplistic in a way that we just import express, tell it what port to listen to and return “hello world” when we hit the base url, and then we listen on that port

    require("dotenv").config();
    const express = require("express");
    const cors = require("cors");
    const app = express();
    const port = 3000;
    app.use(cors());
    app.use(express.json());
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })


## Building a login form

In our views folder, we add `login.vue` and `welcome.vue` files and in the `login.vue` file, we build out the login form. But before that, we want to add a route to our vue router so that we can navigate to the login and welcome page.
So for the `index.js` file of our router folder, we import the login and welcome view and we add login and welcome routes for the components to point to.

    import Vue from "vue";
    import VueRouter from "vue-router";
    import Login from "../views/Login.vue";
    import Welcome from "../views/Welcome.vue";
    Vue.use(VueRouter);
    const routes = [
      {
        path: "/",
        name: "Welcom",
        component: Welcome,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
    ];
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      routes,
    });
    export default router;

We can now navigate to both pages. On our welcome page we want to check if the user is not logged in, then present the link they can click to navigate to the login page. We use a router link to achieve this

    <template>
      <div>
        <h1>Welcome</h1>
        <router-link  to="/login"><button>Login</button></router-link> 
      </div>
    </template>

In our login view, we scaffold our form. In the form, we are going to have two input boxes, one is the username input and the other is a password. We then add a button with the type `submit` to submit the form. when we submit, we perform a login function in our script then set `preventDefault` on our form to stop the page from refreshing each time we click the login button.
In the script of our application, we model our input data by doing a two-way binding to the data state.

    <template>
      <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
          <input v-model="username" placeholder="username" />
          <br />
          <br />
          <input v-model="password" placeholder="password" type="password" />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </template>
    <script>
    export default {
      data: () => {
        return {
          username: "",
          password: "",
        };
      },
    };
    </script>
![login form](https://paper-attachments.dropbox.com/s_E8FB3BC64D80223D4CC4AFEEE119F2426D27A7EBE018696513C17DED12022079_1622020162212_loginForm.png)


For the login method that runs when you click the button, we would like to perform an HTTP request to our express backend. We want to do a post request to our `/login` route we will create in our server.
in the fetch method, the first parameter is the URL you are sending a request to, then the second is the object you are posting containing the headers which contain information about the request, and the body containing the form data

    <script>
    export default {
      data: () => {
        return {
          username: "",
          password: "",
        };
      },
      methods: {
       login() {
          fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
        },
      },
    };
    </script>

In our server.js, we create a post request to the `/login` route and send back some `json` to test it out. Now if we click login now we get back a 200 ok message.

*Note: Make sure you set up* `*cors*` *so that you don't encounter an error message when hitting the* `*/login*` *route*

    app.post("/login?", (req, res) => {
      res.json({
        message: "hello ma guy"
      })
    })


## Check if the username and password exist

The next step is to check if the username or password exists in a database or somewhere else. To not waste time dealing with a database, we can use a hardcoded username and password. In the post route, if somebody tries to log in with the exact login information we just hardcoded, we want to give the person a *green light* and log the person into the application, otherwise, we throw an error.

Using the login payload we got from submitting the form, we can now check if the username and password are the same, else we throw an error and respond with a status of 403 and a wrong login information message.

    app.post("/login", (req, res) => {
      const USERNAME = "uma victor";
      const PASSWORD = "8888";
      const { username, password } = req.body;
      if (username === USERNAME && password === PASSWORD) {
        const user = {
          id: 1,
          name: "uma victor",
          username: "uma victor",
        };
      } else {
        res.status(403);
        res.json({
          message: "wrong login information",
        });
      }
    });


## JWT Authentication in our app

This is the interesting part of the tutorial. Now, if you provide the correct login information and it checks out, the next step is to sign a JWT web token. Let’s first install the jwt plugin.

    npm install jsonwebtoken

also make sure to import it at the top of your `server.js` file

    const jwt = require("jsonwebtoken");

Then when the user login is successful, we want to send a jwt that is signed. So we import the jwt package. Then you sign it with a unique password. In a real application, we will want to have a `.env` file where we store the secret key. Then use `process.env` to grab and use it when signing our user model. Imagine we have a user object which we got back from our database with a unique ID, name, and username

    app.post("/login", (req, res) => {
      const USERNAME = "uma victor";
      const PASSWORD = "8888";
      const { username, password } = req.body;
      if (username === USERNAME && password === PASSWORD) {
        const user = {
          id: 1,
          name: "uma victor",
          username: "uma victor",
        };
        const token = jwt.sign(user, process.env.JWT_KEY);
        res.json({
          token,
          user,
        });
      } else {
        res.status(403);
        res.json({
          message: "wrong login information",
        });
      }

It is the user object we want to sign so when you send it to the client, we can uniquely identify them. The unique ID is also very important because when a server gets a request with a token, we want to know what uniquely identifies the request.
Now when we enter the username and password in our form, we can see in the console that our jwt token is generated but is not encrypted. 

You can visit this site [jwt.io](https://jwt.io/) and paste in the token that was generated and your token will be decoded and return information about your payload

*Note: The token is not encrypted and anyone who gets access to the token can hit your server with it. Tokens normally have an expiry period of between 30 - 60 minutes*

## Store Token in vuex

In our fetch method in the login view, we want to get back the token and the user and store it somewhere. Now we make our login method `async` then we set our response to equal to the fetch method that returns the user and token, and we get back the user and token from the response.

    <script>
    export default {
      data: () => {
        return {
          username: "",
          password: "",
        };
      },
     methods: {
    async login(e) {
          e.preventDefault();
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
        },
      },
    };
    </script>

In our store, we add the user and token data in our state and set them to `null` initially. You can use the token to see if the user is logged in or not. If the token is `null` then we are not logged in, but if it’s set to something, then we are probably logged in. 
We create a `setUser` mutation in our mutation object that sets the state to the user object. We also create a `setToken` mutation to assign our token.

    import Vue from "vue";
    import Vuex from "vuex";
    Vue.use(Vuex);
    export default new Vuex.Store({
      state: {
        user: null,
        token: null,
      },
      mutations: {
        setUser(state, user) {
          state.user = user;
        },
        setToken(state, token) {
          state.token = token;
        },
      },
      actions: {},
      getters: {},
    });

*Note: It is best practice to always call mutations from our actions, but since our mutations can easily be traced we are calling the mutations directly*

In the login view, we can import `mapMutations` from vuex and map the `setUser` and `setToken` mutation. We can now call the mutations from the login method

    <script>
    import { mapMutations } from "vuex";
    export default {
      data: () => {
        return {
          username: "",
          password: "",
        };
      },
      methods: {
        ...mapMutations(["setUser", "setToken"]),
        async login(e) {
          e.preventDefault();
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
          const { user, token } = await response.json();
          this.setUser(user);
          this.setToken(token);
        },
      },
    };
    </script>

Now that we're logged in, our state has been mutated and updated with the information from our form. But after we login, we want to redirect to our welcome page using the `$router.push("/")` method to redirect to the home page, which is also our welcome page. 

    this.$router.push("/");

// image of welcome page here
Since you are logged in, you don’t want the login button showing anymore. On the welcome page. You can use a getter from our store to do this. we check if the token is null or not and return `true` or `false`. 

      getters: {
        isLoggedIn(state) {
          return !!state.token;
        },
      },

then in our welcome component template, we can use now map to our Getter and use the `v-if` directive to display the login button if `isLoggedIn` is `true` or `false`


    
    <template>
      <div>
        Welcome
        <router-link v-if="!isLoggedIn" to="/login"><button>Login</button></router-link>
      </div>
    </template>
    <script>
    import { mapGetters } from "vuex";
    export default {
      computed: {
        ...mapGetters(["isLoggedIn"])
      }
    };
    </script>


## Conclusion

In this tutorial, we looked at how to authenticate a person using the json web token. We created a login form and used an express server for the login route in the application using Vue.js as a frontend framework.

## Resources
- [GIthub souce code](https://github.com/uma-victor1/jwt-auth-app)
- [jwt.io](https://jwt.io/)
- [What are json web token](https://www.freecodecamp.org/news/what-are-json-web-tokens-jwt-auth-tutorial/#:~:text=private%20key%20pair.-,Authentication,user%20is%20allowed%20to%20access.).



