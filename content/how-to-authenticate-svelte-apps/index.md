---
title: "How to Authenticate Svelte Apps"
date: "2022-14-02"
coverImage: "blog-banner.png"
author: "Siddhant Varma"
tags: ["Authentication", "Svelte", "LoginRadius"]
description: "In this post, I’ll talk about how add authentication in a Svelte application using LoginRadius Authentication APIs. We'll understand step by step how to create forms in Svelte, add reactivity to it, configure routing for our Svelte app and setup protected routes for authenticated users. We'll also learn how to consume REST APIs in a Svelte app using Fetch API and update user information in our Svelte store."
---

# How to Authenticate Svelte Apps?

![How to Authenticate Svelte Apps](./blog-banner.png)

[Svelte](https://svelte.dev/) is a light-weight and minimal JavaScript compiler that ships a single JavaScript bundle to your application without any internal code of it's own.  This results in smaller bundle size and often times a faster running application. It was also the [most loved framework of 2021](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks).  

But what's the first feature you'd add in a Svelte application? Authentication! It's the gateway for your users to interact and use your website. 

So in this post, I’ll talk about how to add authentication in a Svelte application.

## Project Demo

You'll learn how to create forms in Svelte and add reactivity to it. You'll also understand how to conditionally render different UI components and set up protected routes for authenticated users in a Svelte application.

To speed things up, we won't build our own authentication services from scratch. Instead, we'll use using [LoginRadius](https://www.loginradius.com/) to quickly configure an authentication backend for our Svelte App. 

Here's a little demo of what your Svelte App would look like by the end of the tutorial:

<video src="./Svelte-Auth-LoginRadius-Demo.mp4"></video>

Looks exciting? Let's jump right into it!

## Setup a Svelte App

We'll get started by creating a new Svelte project and adding some boilerplate code. 

### Create a new Svelte Project

Navigate into the directory of your choice and create a new Svelte project by running:

```shell
npx degit sveltejs/template svelte-auth-app
```

That should create a fresh Svelte project with a simple starter template.

Additionally, we'll need to install [svelte-navigator](https://github.com/mefechoel/svelte-navigator) package to set up routing in our Svelte app:

```shell
npm i svelte-navigator
```

### Configure Environment Variable Support

We need to add environment variable support in our Svelte app to store and use our LoginRadius API Keys and Secrets. 

First, we'll install a package called [dotenv](https://www.npmjs.com/package/dotenv) that lets us create and use a special `.env` file to define our environment variables. 

```shell
npm i dotenv
```

Next, we'll head over to the `rollup.config.js` file. Here, we'll make some configurational changes on the  `plugins` property so our Svelte app can read those environment variables on the client side:

```javascript
	...
	plugins: [
		replace({
			// stringify the object       
			__myapp: JSON.stringify({
			  env: {
				isProd: production,
				...config().parsed // attached the .env config
			  }
			}),
		  }),
    ...
	],
```

You can refer to the complete `rollup.config.js` file for this project [here](https://github.com/FuzzySid/svelte-auth-app/blob/master/rollup.config.js). 

### Create Files and Folders 

Besides the initial set of files, our project will have the following directory structure:

![Directory Structure Svelte App](./Directory-Structure-Svelte-App.PNG)

So go ahead and create those files and folders accordingly. We'll talk about each of these as we start filling them with some code. 

### Add Project Styles

Your starter template should come with the following styles inside your `App.svelte file`:

```css
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
```

However, I have also added some additional styles inside the global stylesheet inside (`/public/build/global.css`) file. You can copy those styles from [here](https://github.com/FuzzySid/svelte-auth-app/blob/master/public/global.css). 

## Global Data Store for Authenticated User

Our Svelte app will store the authenticated user's data in a global data store to easily access and modify that data from any component within our application. Svelte provides us with the `writable` function inside the `svelte/store` dependency.

We'll create a global object called `user` inside our `/src/stores.js` file:

```javascript
import { writable } from "svelte/store";

export const user = writable(localStorage.user?JSON.parse(localStorage.getItem('user')):null);

```

We have also synced the above `user` object with browser's local storage so that this data persists on page reloads. If you're unfamiliar with what local storage is, check out my [blog](https://www.loginradius.com/blog/async/guest-post/local-storage-vs-session-storage-vs-cookies/) that dives deeper into browser storage and other related concepts.

## The App Component Boilerplate

The root component in our Svelte app is the App Component. This is located inside `/src/App.svelte`. 

It has the following imports declared inside it:

```javascript
<script>

	/** IMPORTS */
	import Login from './Login.svelte';
	import Signup from './Signup.svelte';
	import Home from './Home.svelte';
	import PrivateRoute from "./routes/PrivateRoutes.svelte";

	/** VARIABLES */
	const sdkoptions = {}
	
</script>

```

It also has an `sdkoptions` variable that will store our environment variables that we can easily pass to different components as and when they need it. You can get rid of any additional HTML inside the `App.svelte` file generated by the starter template. 



## The Login Component

Let's head over to the `/src/Login.svelte` file to create our Login Page. 

### Create Login Form

Here's how what the HTML of our Login Form consists of:

```html
<h3>Login </h3>
<form on:submit|preventDefault={handleSubmit}>
    <input class="form-field" bind:value={email} type="email" placeholder="Email" >
    <input class="form-field" bind:value={password} type="password" placeholder="Password" >
    <button class="form-field">
        Login 
    </button>
</form>
<p>
    Don't have an account? 
    <strong class="link" on:click={navigateToSignup}>Sign up</strong>
</p>
```

We have a Login form with two input fields for email and password and a submit button. Our form also has an `on:submit` handler with an event modifier to prevent the default reloading action of the form when it gets submitted. 

After the form, we have a simple link with an `on:click` handler that allows the user to navigate to the Signup page. 

### Login Form Field Bindings and Handlers

Inside the script of our Login component, we will create two variables, `email` and `password` to handle the bindings to the input fields. We also create the `sdkoptions` variable as exportable since we'll be receiving it as `props` from the App component. 

```javascript
<script>
	let email;
    let password;
    export let sdkoptions;
</script>
```

We also need to create a function called `handleSubmit` which is the `on:submit` handler for our Login form:

```javascript
<script>
	...
    const handleSubmit=(e)=>{
       let loginFields={email,password};
	   console.log(loginFields)
    }
    const navigateToSignup=()=>{}
</script>
```

At the moment, we're simply encapsulating the `email` and `password` bindings into a JavaScript object. Later, we'll make a request to our Login API here. We also have an empty `navigateToSignup` function that we'll come back to once we setup our routes. 

Let's render the Login component inside our `App.svelte` file:

![Login Page](./Login-Page.PNG)

Awesome! Let's follow the same process to create our Signup form.



## The Signup Component

Next head over to the `/src/Signup.svelte` file to create our Signup Page. 

### Create Signup Form

Similar to the Login Form, our Signup Form will have the following HTML:

```html
<h3>Create a New Account</h3>
<form on:submit|preventDefault={handleSubmit}>
    <input class="form-field" bind:value={firstName} type="text" placeholder="First Name" >
    <input class="form-field" bind:value={lastName} type="text" placeholder="Last Name" >
    <input class="form-field" bind:value={email} type="email" placeholder="Email" >
    <input class="form-field" bind:value={password} type="password" placeholder="Password" >
    <button class="form-field">
        Signup
    </button>
</form>
<p>
    Already have an account? 
    <strong class="link" on:click={navigateToLogin}>Login</strong>
</p>
```

The only difference is now we have two additional fields - first name and last name. We also have a link just below the signup form that takes the user to the login page. 

### Signup Form Field Bindings and Handlers

Here's how the script section of our `Signup.svelte` file should look like:

```javascript
<script>
    
	let email;
    let password;
    let firstName;
    let lastName;
    let loading;


    export let sdkoptions;

    const handleSubmit=()=>{
        const signupFields={
            "FirstName": firstName,
            "LastName": lastName,
            "Email": [
                {
                "Type": "Primary",
                "Value": email
                }
            ],
            "Password": password
     }
     console.log(signupFields)
   }
   
   const navigateToLogin=()=>{}
</script>
```

Our `signupFields` object has a specific format because it aligns with the structure of our Signup API's request. It would make complete sense when we hook our Signup API here. 

Let's render the Signup component inside your `App.svelte` file:

![Signup Page](./Signup-Page.PNG)

## The Home Component

Now let's create our Home component or the page where we'll redirect the user on a successfully login. Inside `/src/Home.svelte` file, add the following HTML:

```html
{#if user && _user}
    <h3>Welcome {_user?.profile?.FullName}</h3>
	<button on:click={logout}>Logout </button>
{/if}
```

In the above HTML, we simply use some Svelte conditionals to render the user's name and a logout button. The script part of our Home component looks like this:

```javascript
<script>
    import {user} from './stores';

    let _user;
    
    user.subscribe(data=>_user=data)
    const logout=()=>{
        user.set(null);
        localStorage.clear();
    }
   
</script>


```

We import the global `user` object from our Svelte store and store it inside our Home component's state `_user`. For the `logout` function, we simply set this `user` object on our store to null and clear our local storage. 

## Setup LoginRadius

The next step is to setup LoginRadius so we can start using it's Authentication APIs from our Svelte App. 

### Create LoginRadius Account 

Head over to [LoginRadius](https://www.loginradius.com/) and create a new account by filling in the following details:

![Signup 2](./Signup-2.PNG)

You'll then see a form with the name of your App, a URL and Data Center:

![Signup 3](./Signup-3.PNG)

Hit **Next** and LoginRadius will set up an authentication app  for you. You can try the pre-built authentication page LoginRadius provides for your app by clicking on **Try Signing Up Now**.

![Signup 4](./Signup-4.PNG)

Once you do that, you'll be shown a pre-built authentication page of your LoginRadius app:

![LoginRadius Auth Page](./LoginRadius-Auth-Page.PNG)

However, for this tutorial all we need are the LoginRadius APIs since we already have a frontend (our Svelte App) in place.

### Get LoginRadius API Configurations

Once you're inside your LoginRadius account, head over to the **Configurations** tab from your dashboard. Then expand the **API Credentials** tab of your application.

![LoginRadius Configuration Tab](./LoginRadius-Configuration-Tab.PNG)

Inside that, you should see your APP Name, API Key and API Secret.

![LoginRadius API Credentials](./LoginRadius-API-Credentials.PNG)

### Add API Credentials as Environment Variables

Head back to the Svelte App's `.env` file and add the above credentials inside it:

```.env
APP_NAME=<YOUR_APP_NAME>
API_CLIENT_KEY= <YOUR_APP_API_KEY>
API_SECRET= <YOUR_APP_API_SECRET>

```

You'll need to ensure that the above `.env` file is present inside the `.gitignore` of your Svelte project. You don't want to be accidentally pushing this file to a public repository on Github. 

```.gitignore
/node_modules/
/public/build/

.DS_Store

.env
```

### Consume Environment Variables in Svelte Components

Finally, we need to extract these environment variables in our `sdkoptions` variables inside our App component file. 

```javascript
...
	const sdkoptions = {
	"apiKey": __myapp["env"].API_CLIENT_KEY,
	"appName":__myapp["env"].APP_NAME,
    "apiSecret":__myapp["env"].API_SECRET
	}
...
```

And pass this variable as props to both the Login and Signup component:

```html
...
	<Login {sdkoptions} />
	<Signup {sdkoptions} />
...
```

Great! Now we're ready to integrate LoginRadius APIs in our Svelte app. 

## Integrate LoginRadius API

We'll use two APIs - one for registering the user on the Signup page and the other for authenticating the user on the Login Page. However, both APIs will take the API key and API secret as query parameters. 

```javascript
    const endpoint=`${BASE_URL}?apikey=${sdkoptions.apiKey}&apisecret=${sdkoptions.apiSecret}`;

```

So in the above endpoint we'll only change the `BASE_URL` according to which API we're hitting. 

### Integrate Signup API

Inside our `Signup.svelte` file, we'll create a variable called `signupResponse` to store the result of the Signup API. It also has properties like `success` and `error` to prompt the user on the status of our API calls.

```javascript
<script>
    let signupResponse={
            success:null,
            error:null,
            uid:null,
            id:null,
            fullname:null
     }
 	let loading;

</script>
```

Since an API request is an asynchronour process, we also have a variable called `loading` to disable the submit button till the API returns a response. 

#### Signup API Request on Signup Form Submission

Now we need to make a request to the Signup API inside our `handleSubmit()` function. First we'll set the `loading` to true and reset the `signupResponse` object. Then we'll use the fetch API to make a POST request with the `signupFields` object as post parameter: 

```javascript
const handleSubmit=()=>{
        const signupFields={
            "FirstName": firstName,
            "LastName": lastName,
            "Email": [
                {
                "Type": "Primary",
                "Value": email
                }
            ],
            "Password": password
    }
    loading=true;
    signupResponse={
        success:null,
        error:null,
        uid:null,
        id:null,
        fullname:null
    }
    const endpoint=`https://api.loginradius.com/identity/v2/manage/account?apikey=${sdkoptions.apiKey}&apisecret=${sdkoptions.apiSecret}`;
    fetch(endpoint,
    {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(signupFields)
    }).then(response=>response.json())
      .then(data=>{
          
      })
      .catch(error=>console.log(error))
      .finally(()=>loading=false);
}
```

#### Handle API Response

Inside the callback of our fetch request, we can handle any errors returned by the API based on different error codes. In case of a success, we will populate our `signupResponse` object with data from the API. In the `finally` block, we set the `loading` to false. 

```javascript
...
.then(data=>{
          if(data.ErrorCode){
              if(data.ErrorCode==936){ 
              signupResponse={
                    ...signupResponse,
                    error:data.Message
                }
             }
            else if(data.ErrorCode==1134){
                signupResponse={
                    ...signupResponse,
                    error:data.Errors[0].ErrorMessage
                }
            }else{
                signupResponse={
                    ...signupResponse,
                    error:data.Description
                }
            }
        }else{
            signupResponse={
                ...signupResponse,
                success:"Account created successfully! Please login via the same details.",
                fullname:data.FullName,
                id:data.id,
                uid:data.Uid
            }
        }
      })
...
```

#### Disable Submit Button

We can set the disabled attribute on our Submit button based on the loading state of the API. 

```html
...
   <button disabled={loading} class="form-field">
        Signup
    </button>
...
```

#### Show Signup Success and Error

Lastly, we'll render some conditional template based on the status of our Signup API. 

```html
...
{#if signupResponse.error}
	<p class="error">Error ❌ {signupResponse.error}</p>
{/if}
{#if signupResponse.success}
	<p class="success">
        Success ✔
        {signupResponse.success}
    </p>
{/if}
...
```

And that's it! Let's give our Signup functionality a whirl. We'll create a new account first:

![Signup Success with API](./Signup-Success-with-API.PNG)

And voila! You can see in the network tab that the API was successful and we got back a bunch of data about the newly created user. We also have a success that appears underneath the Signup form. 

Let's also test an erroneous flow. What if I signup via the same credentials again? 

![Signup Failure Existing Email](./Signup-Failure-Existing-Email.PNG)

The LoginRadius Signup API gives back the error message, details, error code etc that we have handled accordingly. 

Also, if you use a simple password, the LoginRadius API returns an error based on a validation mechanism. 

![Signup Error Password Validation](./Signup-Error-Password-Validation.PNG)

That's great, because it makes our authentication workflow more air-tight. 

### Integrate Login API

Similarly we can now integrate the Login API as well in our `Login.svelte` file:

```javascript
<script>
    
	...
    import {user} from './stores';

    let email;
    let password;
    let loading;

    let loginResponse={
        error:null,
        success:null,
        profile:null,
        auth_token:null
    }

    export let sdkoptions;

    const handleSubmit=(e)=>{
       let loginFields={email,password};
       loading=true;
        loginResponse={
        error:null,
        success:null,
        profile:null,
        auth_token:null
    }
       const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${sdkoptions.apiKey}&apisecret=${sdkoptions.apiSecret}`;
       loading=true;
    fetch(endpoint,
        {
        method:'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(loginFields)
        }).then(response=>response.json())
        .then(data=>{
            console.log(data)
            if(data.ErrorCode){
                if(data.ErrorCode==936){ 
                loginResponse={
                        ...loginResponse,
                        error:data.Message
                    }
                }
                else if(data.ErrorCode==1134){
                    loginResponse={
                        ...loginResponse,
                        error:data.Errors[0].ErrorMessage
                    }
                }else{
                    loginResponse={
                        ...loginResponse,
                        error:data.Description
                    }
                }
            }else{
                loginResponse={
                    ...loginResponse,
                    success:true,
                    profile:data.Profile,
                    auth_token:{
                        access_token:data.access_token,
                        refresh_token:data.refresh_token,
                        ttl:data.expires_in
                    }
                }
                user.set(loginResponse)
                localStorage.setItem('user',JSON.stringify(loginResponse))

            }
        })
        .catch(error=>console.log(error))
        .finally(()=>loading=false);
    }
    ...

</script>

...
{#if loginResponse.error}
	<p class="error">Error ❌ {loginResponse.error}</p>
{/if}
{#if loginResponse.success}
	<p class="success">
        Success ✔
    </p>
{/if}
<p>
    Don't have an account? 
    <strong class="link" on:click={navigateToSignup}>Sign up</strong>
</p>


```

If you relate it to the Signup component, it's almost identical. The only things that have changed is the API endpoint. Additionally, if the Login API is success we're also storing the data in our `user` store and consequently updating our `localStorage`.  

Let's also test this out:

![Login API Success](./Login-API-Success.PNG)

Let's also test an erroneous Login flow by entering the credentials for a user that doesn't exist:

![Login Error](./Login-Error.PNG)

Great! Let's now tie all these individual pages together by setting up routing in our Svelte app. 

## Setup Routes

We'll use the `svelte-navigator` package that we previously installed to configure routing in our app. 

### Add Routing

First, we'll define the routes for the Signup, Login and Home pages inside our `App.svelte` file:

```html
<script>

	/** IMPORTS */
	import { Router, Route } from "svelte-navigator";
	...
	
</script>

<main>
	<Router>
		<div>
			<Route path="signup">
				<Signup {sdkoptions} />
			</Route>
			<Route path="login">
				<Login {sdkoptions} />
			</Route>
			<Route path="/" >
				<Home />
			 </Route>
		</div>
	</Router>
</main>


```

So now if you visit `/login`, you should see the Login Page. Similarly, if you go to `/signup`, you should see the Signup Page. 

### Programmatic Redirection

Remember we had a link to the Signup page at the bottom of the Login page and vice versa? Also, our Login page doesn't redirect us anywhere after we login successfully. In order to programmatically navigate to a certain page on completion of an action, we can use the `useNavigate` hook from the `svelte-navigator` library. 

To use this hook, import `useNavigate` and save it's invoked reference inside a variable as shown:

```javascript
<script>
   import { useNavigate } from "svelte-navigator";
   const navigate = useNavigate();
   ...
</script>
```

Now call the `navigate()` function and pass the path of the page you wish to redirect to. So let's complete the `navigateToLogin` function inside our Signup component:

```javascript
<script>
   ...
   const navigateToLogin=()=>navigate('/login');
   ...
</script>
```

Similarly we can also complete the `navigateToSignup` function inside our Login component:

```javascript
<script>
   ...
   const navigateToSignup=()=>navigate('/signup')
   ...
</script>

```

Finally, we'll also navigate to the Home page on successful response from our Login API inside our Login component's `handleSubmit` function:

```javascript
 const handleSubmit=(e)=>{
       ...
    fetch(endpoint,
       ...
        .then(data=>{
 				...
            }else{
				...
                navigate('/')
            }
        })
       ...
    }
 
</script>
```

Great! You can now navigate from your Login page to Signup page and vice versa. You should also be automatically redirected to the Home page on a successful login. 

### Add Protected/Private Routes

If you try to visit the Home component by entering the path `/` in the URL, you'll be able to visit the Home page regardless of your authenticated state. However, we must protect this route so that it's only accessible to authenticated users in our application. 

For this purpose, we have created a `RouteGuard.svelte` file inside our `routes` folder. It's a higher order component that uses the `useNavigation` hook to programmatically redirect to the login page if an unauthenticated user visits the home page. We use the `user` object from our Svelte store to validate the authenticated state of a user. 

```javascript
<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../stores";
  
    const navigate = useNavigate();
    const location = useLocation();
  
    $: if (!$user) {
      navigate("/login", {
        state: { from: $location.pathname },
        replace: true,
      });
    }
  </script>
  
  {#if $user}
    <slot />
  {/if}
```

We can then wrap another higher order Route component on top of the `RouteGuard` component inside the `PrivateRoutes.svelte` file as shown below:

```javascript
<script>
    import { Route } from "svelte-navigator";
    import RouteGuard from "./RouteGuard.svelte";
  
    export let path;
  </script>
  
  <Route {path} let:params let:location let:navigate>
    <RouteGuard>
      <slot {params} {location} {navigate} />
    </RouteGuard>
  </Route>
```

Now all we need to do is use this `PrivateRoute` component to wrap our Home component instead of a regular Route component:

```javascript
...	
	<PrivateRoute path="/" let:location>
		<Home />
	</PrivateRoute>
...
```

And now you should be able to access the `/` route or the Home page only when you're authenticated:

![Home Component](./Home-Component.PNG)



## Conclusion

I hope I was able to shed some light on how to authenticate Svelte apps. You can do a lot from here like adding Svelte Kit to this project to simplify the routing system for your Svelte application. You can refer to the entire source code for this tutorial [here](https://github.com/FuzzySid/svelte-auth-app). You can also explore [LoginRadius](https://www.loginradius.com/) to add forgot password functionality or social signups with Facebook and Google. 

