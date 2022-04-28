---
title: "Build a Modern Login/Signup form using TailwindCSS and React"
date: "2022-04-28"
coverImage: "Modern-Login-and-Signup-Form-Banner.png"
author: "Siddhant Varma"
tags: ["TailwindCSS","React","Login", ]
description: "In this article, I’ll walk you through how to instantly build great-looking authentication forms for Login and Signup using TailwindCSS in React. You'll also understand how to make these forms functional using the third-party Authentication service LoginRadius."

---
# Build a Modern Login/Signup form using TailwindCSS and React

![Modern Login and Signup Form Banner](./Modern-Login-and-Signup-Form-Banner.png)

Web design and CSS has come a long way. Today modern websites have everything you could wish for alongside stunning designs. Then why should your website's login and signup forms look boring?

The web ecosystem has tons of reliable third-party libraries and frameworks that can help you build intuitve designs even if you're not a design wizard. Amidst that plethora of libraries comes a utility first CSS framework called [TailwindCSS](https://tailwindcss.com/).

So in this post, we'll learn what TailwindCSS is, why it's awesome and how we can use it in a React app. I'll then walk you through step by step how to use it to create a modern login and signup form with routing in React. Finally, we'll see how we can add make these forms functional using [LoginRadius](https://www.loginradius.com/) authentication APIs.

## What is TailwindCSS?

If you've heard of Materialize and Bootstrap, TailwindCSS is much similar with respect to what it offers. It's a CSS framework that helps developers build layouts, components, themes and whatnot without writing all the CSS themselves. 

However, unlike Bootstrap and Materialize, it doesn't give you built in components out of the box. Rather, it gives you a wide range of fully customizable utility classes that you can use to style your pages. 

![TailwindCSS vs Bootstrap Comparison](./TailwindCSS%20vs%20Bootstrap%20Comparison.png)



## Why it's better or worse than the others?

Tailwind is asbolutely loved by the community. For most developers, the key takeway is it gives you more freedom on how you want your components or elements to look like. So in lot of cases when developers use component based CSS frameworks like Bootstrap, they have a hard time changing the way they want their website to look. 

Being utility first, it's definitely the most customization friendly CSS framework out there! 

Also, it's quite easy to integrate with modern frontend frameworks like React, NextJS, VueJS, Angular, Svelte etc. We'll also explore that shortly when we add Tailwind to our React app. 

![TailwindCSS Pros](./TailwindCSS%20Pros.png)

On the downside, Tailwind might make your HTML bloated with loads of CSS classes for small and specific rules. However, with a framework like React in hand, you can control it by building smaller reusable components and using JSX bindings for long class names for more maintainability and readability. 

In fact, moving forward we'll take this optimal approach in building our Login form so you'll understand some best practices you can use to avoid bloated HTML templates in your React app. 



## What we'll build today

We'll create a simple yet modern looking login and singup form that looks like this:

<video src="./Demo.mov"></video>

It will be interactive using React state, have the ability to route to different pages and we'll also at the end talk about how we can make it functional from a backend standpoint. 

Sounds good? Let's start by understanding how we can add TailwindCSS to our React app. 

## Project Setup

Inside a directory of your choice, we'll create a new React project by running:

```shell
npx create-react-app react-tailwind-app
```

Next, move inside the project and install react-router-dom by running:

```shell
cd create-react-app react-tailwind-app && npm i react-router-dom
```

### Install TailwindCSS

Now, we'll go ahead and add Tailwind to our React project by following the steps given [here](https://tailwindcss.com/docs/guides/create-react-app). 

First, we'll install TailwindCSS and it's related dependencies by running the following command in the root directory:

```shell
npm install -D tailwindcss postcss autoprefixer
```

Next, we'll generate some configurational files by running the following command in the root directory:

```shell
npx tailwindcss init -p
```

That should generate a ``tailwind.config.js`` file and ``postcss.config.js`` file for you as shown:

![tailwind config files](./tailwind%20config%20files.png)

Awesome! 

### Configuring TailwindCSS

We'll now go ahead and update the ``tailwind.config.js`` file to support templates for our React component files as shown:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Almost there! We'll now add some important Tailwind directives to our ``index.css`` file present in the root directory:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

...
```

Each of the above directive represents a layer of Tailwind's utility classes that we can use in our project. Their declaration allows us to use these utility classes anywhere in our project. 

Finally, we'll kickstart our React project by spinning a local development server:

```shell
npm start
```

We're now ready to start using Tailwind CSS to create some awesome looking UI for our React app!



## Frontend Architecture and Boilerplate

 To ensure our code is readable and maintainable and doesn't have bloated HTML templates, we'll break down the entire page into small and reusable components. 

### Component Architecture

For instance, we can have a `<Header/>` component that takes care of the page's heading and displays a link to navigate to another page. 

Similarly, we can have a reusable custom `<Input/>` component that can be used inside the form. All in all, here's what our frontend architecture would look like:

![Login Page Architecture Hierarchy](./Login%20Page%20Architecture%20Hierarchy.png)



### Directory Structure

So first, let's go ahead and create these files and folders. We'll create corresponding files for Signup page as well. Create the following files and folders inside your root directory:

```shell
.
├── components/
│   ├── FormAction.js
│   ├── FormExtra.js
│   ├── Header.js
│   ├── Input.js
│   ├── Login.js
│   └── Signup.js
├── constants/
│   └── formFields.js
└── pages/
    ├── Login.js
    └── Signup.js
```

For perspective, here's how we'll use those components to build our entire Login Page:



![Login Page Architecture](./Login%20Page%20Architecture.png)

Makes sense? Great! 

### Components Boilerplate Code

While we're at it, let's also go ahead and create some component boilerplate for all these files except the `/src/constants/formFields.js`. 

For the Login.js files (`/src/pages/Login.js`) we can put down the following code:

````jsx
export default function LoginPage(){
    return(
        <>
            
        </>
    )
}
````

Similarly you can create such boilerplates for rest of the files as well. 

### Form Fields Constants

We created a `formFields.j`s file earlier. This file will hold all the input fields related constants like placeholder, value, name, field type etc. Inside this file, add the following code:

```javascript
const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

export {loginFields,signupFields}
```

The above file has two arrays, one each for our login form fields and signup form fields. Each array contains an object that contains attributes for the input fields.

The field names should be self-explanatory as to what they represent. Here's a quick summary on that:

- `labelText`: The label for an input field
- `labelFor`: The value that associates a label to the input field via an id attribute on the input field
- `id`, `name` , `type` and `placeholder`: Respective attributes on the input field  
- `isRequired`: If we want to make an input field mandatory, in this case all our input fields for form submission will be mandatory

Later we'll simply use this array to cycle through each input field and render a custom `<Input/>` component that we'll create shortly. 

## Setup Routing

Since we already have our components boilerplates in place, let's first setup routing for our app. By default when a user opens the app, we'll direct them to a Login page. Then, if the route changes to **/signup**, we'll direct them to a Signup page. 

Head over to your `/src/App.js` file and add the following code:

```jsx
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;

```

Notice that we have two containers wrapped around our `<BrowserRouter/>` with some long classnames. 

The first container gives a minimum height of 100% and sets a fixed height of the container to 100vh via the `min-h-full` and `h-screen` classes. Then, it centers everything via `flex`, `items-center` to veritcally center all the flex child elements and `justifty-center` to center them horizontally. 

Finally, we have some padding classes prefixed with `p`. For top and bottom padding, we use the prefix `py-` followed by some value. We also have some responsive padding on small and large screen devices prefixed with `sm:` and `lg:` respectively. You can learn more about these [padding](https://tailwindcss.com/docs/padding) and [margin](https://tailwindcss.com/docs/margin) properties to see other similar classes you can use. 

Similarly, the second container sets some width for it's child elements and provides some spacing via the respective Tailwind classes. 

## The Header Component

Let's now create the `<Header/>` component that we can render on both the login and singup pages for some quick information and navigation. 

Head over to `/src/components/Header.js` and add the following code:

```jsx
import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}
```

Our `<Header/>` component takes four props, a dynamic `heading` that it displays on the top. Then some additional text as `paragraph` , a `linkName` to display which page it will redirect the user to and it's corresponding path as `linkUrl`. 

We place all these elements inside a flexbox container and horizontally center them using the `justify-center` class. There is also an outer container that simply gives the header some bottom margin using the `mb-10` class. Then, we give our header image some fixed height and width using `h-14` and `w-14` classes respectively. 

Finally, our text and links have some typography classes for font-size, font-colour, some hover effect and font-weight. Let's now go ahead and render the `<Header/>` component with all the props inside the Login page (`/src/pages/Login.js`):

```jsx
import Header from "../components/Header"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            
        </>
    )
}
```

Here's how the login page should now look like:

![login page header](./login%20page%20header.jpeg)

Let's now start building the rest of the Login page form. 



## The Input Component

We'll now create our reusable and great looking `<Input/>` component that we'll use to build our Login form. Head over to `/src/components/Input.js` file and add the following code:

```jsx
const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass
}){
    return(
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={value}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              className={fixedInputClass+customClass}
              placeholder={placeholder}
            />
          </div>
    )
}
```

Remember all those fields key-value pairs we set earlier in our `formFields.js` constants file? Those are all the props our `<Input/>` component will take. Additionally, it will also take a `value` and a `handleChange` prop since we want this to be a controlled component linked to some state. 

Notice how the HTML markup of this component looks very clean. How is that possible? Are we not using any Tailwind classes here?

Since there is a lot of Tailwind classes we're using to style this input field, we have created a constant for it called `fixedInputClass`. It contains all the essential styling classes for the input field. Additonally, we also take a `customClass` prop that will append any custom Tailwind class you want to pass to the input field for customisations. How cool is that!



## The Login Component

Next, we'll create the `<Login/>` component inside `/src/components/Login.js` where the entire Login form will be rendered. This component will also be responsible for owning any state or event handlers passed down as props to other child components. 

Based on our `loginFields` from our `formFields` constants, we programmatically generate an initial value for our `loginState`. Then we have a `handleChange` event handler to update our state whenever an `onChange` event is fired from the nested `<Input/>` component. 

Then we simply loop through the `fields` array and render an `<Input/>` component that we created in the previous section.

```jsx
import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }


    return(
        <form className="mt-8 space-y-6">
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

       

      </form>
    )
}
```

Before we can see how the login form looks like, we need to render it inside our Login page. So render the above `<Login/>` component inside `/src/pages/Login.js` file as shown:

```jsx
import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </>
    )
}
```

Now if you go back to your React app, you should see your Login page input fields to appear as shown below:

![login page with input fiels](./login%20page%20with%20input%20fiels.jpeg)

Awesome, looks like we're almost there! Let's now add the final pieces to the Login page by writing our `<FormExtra>` and `<FormAction/>` components.



## Wrapping Up the Login Page

The `<FormExtra/>` component holds the template and styles for a simple Remember me functionality. Inside the `/src/components/FormExtra.js` file add the following code:

```jsx
export default function FormExtra(){
    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Forgot your password?
          </a>
        </div>
      </div>

    )
}
```

Again here we're using some Tailwind typography and flexbox classes to style and structure the layout of the UI. 

Let's now go to `/src/components/FormAction.js` file and create a submit button for our Login form. Add the following code inside this file:

```jsx
export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}
```

Notice that here as well we have loads of CSS classes inside our `<button/>` element to style it. It makes our HTML appear bloated and difficult to read. We can follow the same approach of using a constant along with a prop against the `className` for the `<button/>` as we did previously to combat this. 



At last, we'll put everything together inside our `/src/components/Login.js` file as shown:

```jsx
import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{

    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}
```

And once we do that, we should have a stunning, modern looking login page appear right infront of us:



![login page](./login%20page.png)

## The Signup Page

We have created so many reusable components now, that it's really easy to use them to further build our Signup page. Feel free to take this as a challenge and build it yourself based on what you've learnt so far. 

Here's a quick walk through of the steps and how we can use the same approach to build the Signup page in minutes. 

First, we'll create our main `<Singup/>` component inside `/src/components/Signup.js` file similar to the `<Login/>` component we completed in the previous section. It will render the signup form fields and attatch some state and event handlers to it. Here's what the entire code looks like:

```jsx
import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}
```

Then, we'll render this component inside `/src/pages/Signup.js` alongisde the `<Header/>` components with some modified props for the signup page. 

```jsx
import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </>
    )
}
```

And that's it! That's all there is to building a great looking signup page that looks like this:



![Signup page](./Signup%20page.png)

Don't worry, if you got stuck somewhere, feel free to refer to the entire codebase for this tutorial here. 

## Use LoginRadius Authentication APIs

You can use [LoginRadius](https://www.loginradius.com/) to quickly setup an authentication backend for your frontend application. First, you'll need to setup an account and get your API key and secret from your account Dashboard. Then, you can simply use their [login endpoint](https://api.loginradius.com/identity/v2/auth/login) to authenticate users. 

The endpoint takes an email and password as parameters and validates them against them against the correct credentials. If we were to integrate this enpoint in our previously build `<Login/>` component (`/scr/components/Login.js`) here's, how the `authenticateUser` method would look like:

```javascript
//Handle Login API Integration here
    const authenticateUser = () =>{
        
       
        const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}&apisecret=${apiSecret}`;
         fetch(endpoint,
             {
             method:'POST',
             headers: {
             'Content-Type': 'application/json'
             },
             body:JSON.stringify(loginFields)
             }).then(response=>response.json())
             .then(data=>{
                //API Success from LoginRadius Login API
             })
             .catch(error=>console.log(error))
         
    }
```



Similarly, you can use a Signup endpoint to create users without managing a complete backend database yourself. Curious to learn more? I did a full-fledged guide on how to authenticate Svelte apps with LoginRadius that you can check out [here](https://www.loginradius.com/blog/engineering/guest-post/authenticating-svelte-apps/). 