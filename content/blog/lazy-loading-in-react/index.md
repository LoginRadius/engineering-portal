---
title: "Lazy loading in React"
date: "2020-10-01"
coverImage: "react.jpg"
author: "Akshay Avinash"
tags: ["React", "Lazy loading", "React Suspense"]
descripiton: "Lazy loading in React and how/when to use it"
---

### Overview
Lazy loading is not a new concept. It has been available for quite some time. In essence, lazy loading means that a component or a part of code must get loaded only when it is required. It is also referred to as `code splitting` and `data fetching`.

Talking about `React` specifically, it bundles the complete code and deploys all of it at the same time. Now, usually that's not a bad idea, since React SPAs (Single page applicaiton) are quite small and do not affect the performance. But what if we have a gigantic application, like a content management system with customer portal, admin portal etc. In such a case it does not seem like a smart idea to load the complete application.
- It will be a huge application and will cost a lot of unnecessary data transfer which can lead to slow loading of website.
- A customer login, will not have access to admin specific features so loading it is a waste of memory and time.

In this post, I will try to explain advantages of lazy loading and how to implement it in `React`.

### Advantages
In situations where we know that certain code/features will not be accessible to all the users or the user does not access it frequently, it is best to load them when the user actually requests for it. This improves user experience as well as initial loading time.

For example, let's consider that our application has two sections, `A` and `B`. Size of A is 1 MB and its loading time is approximately 1 second. Size of B is also 1 MB and so its loading time is also 1 second. And we know that a user will access either of the sections, or a user accessing section A will rarely access section B and vice versa. If we were to load the complete application at the starting of our application, it will cost the user 2 MB of data and the loading time will also be 2 seconds. The user might not like to wait for 2 seconds or won't be happy that a site is costing them a lot of data. This can be improved and halved with proper lazy loading.

> Note: This is not the general case. Small single page applications are usually in kbs.


### Prerequisites
To follow this tutorial, you’ll need the following:

- [**Latest Node version**](https://nodejs.org/en/download/) installed
- `create-react-app` tool 

	```
	npm install -g create-react-app
	```

### General instructions
1. We will perform lazy loading with React suspense and without it.

2. First of all, create the app using `npm create-react-app` 

	```
	npm create-react-app my-app
	```

3. Now run the app by running following command in the project directory root

	```
	npm start
	```
4. The default react app will run in http://localhost:3000

5. Let the directory structure be 
	```
	|
	|-src
	|	|-components
	|	|	|-Admin.js
	|	|	|-Customer.js
	|	|	|-Home.js
	|	|-app.js
	|-index.js
	```
6. Application will first render `app.js` which will have an input field, we will pass the input received as props to Home, and render `Home.js`. On the basis of props received, we will either render `Admin` or `Customer`.

### Using React Suspense (`React 16.6+`)
From React 16.6+, react added [React Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) which performs lazy loading.

1. In our `Home.js`, we will lazy load Admin and Customer
	```js
	import React, {Suspense} from 'react'
	const Customer = React.lazy(()=>import('./Customer.js'));
	const Admin = React.lazy(()=>import('./Admin.js'));
	
	//Instead of regular import statements, we will use the above approach for lazy loading

	export default (props)=>{
		if(props.user==='admin'){
			return (
				// fallback component is rendered until our main component is loaded
				<Suspense fallback={<div>Loading</div>}>
					<Admin/>
				</Suspense>
			)
		}else if(props.user==='customer'){
			return (
				<Suspense fallback={<div>Loading</div>}>
					<Customer/>
				</Suspense>
			)
		}else{
			return (
				<div> Invalid User </div>
			)
		}
	}
	```

### Without React Suspense
If you are working with React version prior to 16.6, you won't have the Suspense component. It is best to upgrade to the latest version and use Suspense. If you're not able to upgrade and still want this feature, it is still possible to create your own React Suspense component. I will be using [Higher Order Component(HOC)](https://reactjs.org/docs/higher-order-components.html).

- Our HOC (`lazyLoader.js`)
	```js
	const lazyLoader = (importComp)=>{
		return class extends React.Component{
			state:{
				component :null //initializing state
			}

			//loading the component and setting it to state
			componentDidMount(){
				importComp()
					.then(comp => setState({component:comp.default}));
			}

			//rendering the component
			render(){
				const C = this.state.component;
				return C?<C {...this.props}/>:null;
			}
		}
	}
	export default lazyLoader;
	```
- Our calling component, in this case `Home.js`
	```js
	import React from 'react'
	import {lazyLoader} from './lazyLoader';

	const Customer = lazyLoader(()=>import('./Customer.js'));
	const Admin = lazyLoader(()=>import('./Admin.js'));
	
	//Instead of regular import statements, we will use the above approach for lazy loading

	export default (props)=>{
		if(props.user==='admin'){
			return (
					<Admin/>
			)
		}else if(props.user==='customer'){
			return (
					<Customer/>
			)
		}else{
			return (
				<div> Invalid User </div>
			)
		}
	}
	```
	If you need the fall back feature, you can update HOC's render method where it is returning null. Instead of null you can return your fallback component and it can be passed as props too.

	Now our HOC would look like - 
	```js
	const lazyLoader = (importComp, fallback)=>{
		return class extends React.Component{
			state={
				component :null //initializing state
			}

			//loading the component and setting it to state
			componentDidMount(){
				importComp()
					.then(comp => setState({component:comp.default}));
			}

			//rendering the component
			render(){
				const C = this.state.component;
				return C?<C {...this.props}/>: (fallback?fallback:<div>loading</div>);
				// If component is not loaded then return fallback component, if fallback is not provided then use default loading
			}
		}
	}
	export default lazyLoader;
	```

