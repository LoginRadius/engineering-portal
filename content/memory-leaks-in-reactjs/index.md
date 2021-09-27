---
title: "Memory Leaks in React JS : What is it and How to solve this?"
date: "2021-09-27"
coverImage: "title-image.png"
author: "Versha Gupta"
tags: ["react", "memory-leaks", "context api", "javascript"]
description: "Deep Dive into Memory Leaks in React JS"
---

# Memory Leaks in React JS : What is it and How to solve this?

Memory leak issue is very common whenever we develop the react applications. It causes many problems like reducing the project's performance by reducing the amount of available memory, slowing down, and crashing the system. 
So we need to take care of memory leaks issues. 

Following warning message is encountered  in react application when we work with asynchronous calls:
`Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`

React can't detect the memory leaks directly, but it introduces a warning to guide the developer to figure them out on their own.

**Main reason for memory leaks**:
React components that perform state updates and run asynchronous operations can cause memory leak issues if the state is updated after the component is unmounted. Here is a normal scenario that causes this memory leak issue:
1.  The user performs an action that triggers an event handler to fetch data from an API.
2. After that user clicks on a link, which navigates to another page before completing step #1.
3. Now, the first action completes and passes the data that was retrieved from the API and calls function, which updates the state.

Since the component was unmounted and function is being called in a component that is no longer mounted case of the memory leak issue and in the console, we saw that warning.

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

**Solutions of memory leaks:**
There are a few ways to eliminate this problem. some of them are:
1. **Use Boolean Flag**

        const [value, setValue] = useState('checking value...');
        useEffect(() => {
        let isMounted = true;
        fetchValue().then(() => {
              if(!isMounted ){
              setValue("done!"); // no more error
              } 
	        });
	       return () => {
	        isMounted = false;
	        };
	    }, []);

	
	In the above code, I have created a boolean variable `isMounted ` which initial value is true, and then I have updated my state and returned to false that variable, which means when a new effect is to be executed, then it will clean the previous effect. 

2. Using **AbortController**
``` 
useEffect(() => {  
    let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  
    }, []);
```
In the above code, we have used `AbortController` to unsubscribe the effect. When the async action is completed, then we abort the controller and unsubscribe the effect.

3. **Using [use-state-if-mounted ](https://www.npmjs.com/package/use-state-if-mounted) hook**
```
const [value, setValue] = useStateIfMounted('checking value...');
    useEffect(() => {
    	fetchValue().then(() => {
          setValue("done!"); // no more error
        });
    }, []);
```
In the above code, we used a hook that works just like React's useState, but it also checks that component is mounted before updating the state!