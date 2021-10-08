---
title: "How to Fix Memory Leaks in React"
date: "2021-10-08"
coverImage: "title-image.png"
author: "Versha Gupta"
tags: ["React", "Memory Leak", "Fix"]
description: "This article helps you understand memory leaks in React and explains three different methods for fixing memory leaks."
---
A memory leak is a commonly faced issue when developing React applications. It causes many problems, including:
- affecting the project's performance by reducing the amount of available memory; 
- slowing down the application; and 
- crashing the system.

So, you need to eliminate memory leaks issues. 

You may encounter the following warning message in React application when working with asynchronous calls:

`Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`

React can't detect memory leaks directly, but it introduces a warning to guide you to help figure them out on your own.

## Primary Causes Of Memory Leaks

React components that perform state updates and run asynchronous operations can cause memory leak issues if the state is updated after the component is unmounted. Here is a normal scenario that causes this memory leak issue:
1. The user performs an action that triggers an event handler to fetch data from an API.
2. After that, a user clicks on a link, which navigates to another page before completing step #1.
3. Now, the first action completes and passes the data retrieved from the API and calls function, which updates the state.

Since the component was unmounted and function is being called in a component that is no longer mounted, it causes memory leak issue -- and in the console, you'll get a warning.

Example of unsafe code:

 ```
const [value, setValue] = useState('checking value...');
useEffect(() => {
	fetchValue().then(() => {
      setValue("done!"); // ⚠️ what if the component is no longer mounted ?
      // we got console warning of memory leak
    });
}, []); 
```

## Fixes for Memory Leaks

There are a few ways to eliminate memory leaks. Some of them are as follows.

### 1) Using Boolean Flag
```
const [value, setValue] = useState('checking value...');
useEffect(() => {
let isMounted = true;
fetchValue().then(() => {
      if(isMounted ){
      setValue("done!"); // no more error
      } 
    });
   return () => {
    isMounted = false;
    };
}, []);
```
In the above code, I've created a boolean variable `isMounted`, whose initial value is true. When `isMounted` is true, the state is updated and function is returned. Else if the action is unmounted before completion, then function is returned with `isMounted` as false. This ensures that when a new effect is to be executed, the previous effect will be first taken care of. 

### 2) Using AbortController
```
useEffect(() => {  
    let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  
    }, []);
```
In the above code, I've used `AbortController` to unsubscribe the effect. When the async action is completed, then I abort the controller and unsubscribe the effect.

### 3) Using [use-state-if-mounted ](https://www.npmjs.com/package/use-state-if-mounted) Hook
```
const [value, setValue] = useStateIfMounted('checking value...');
    useEffect(() => {
    	fetchValue().then(() => {
          setValue("done!"); // no more error
        });
    }, []);
```
In the above code, I've used a [hook](https://www.loginradius.com/blog/async/react-hooks-guide/) that works just like React's `useState`, but it also checks that component is mounted before updating the state!

## Conclusion

In this article, you've learned what React memory leaks are and how to use three different methods to fix memory leaks.