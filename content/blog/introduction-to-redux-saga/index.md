---
title: "Introduction to Redux Saga"
date: "2020-11-20"
coverImage: "unsplash.png"
author: "Nick Chim"
tags: ["React", "Redux", "Redux Saga"]
description: "A high level introduction to Redux Saga."
---

A High Level Introduction to Redux Saga
===

Redux Saga is a middleware library used to allow a Redux store to asynchronously interact with resources outside of itself. This includes making HTTP requests to external services, accessing browser storage, and executing I/O operations. These operations are also known as side effects. Redux Saga helps to organize these side effects in a way that is easier to manage.

Why do we even need this?
---

A redux store natively only knows how to dispatch actions and update its state using its root reducer. Actions represent an event describing something happening in your application, and an intention to change the state of your application. A reducer accumulates values from or stemming from dispatched actions, and accumulates these values into the new updated state of your application.

Reducers must be written as a pure function, as it is necessary to enable useful features of Redux such as time travel (replaying past actions). Actions are simply objects passed on into the reducer, and are naturally deterministic. Thus we have a problem, there isn’t any place in your Redux application to put your side effects in.

The solution
---

A Redux middleware lies between an action and a reducer. This enables actions to contain something else other than a plain object, as long as the middleware intercepts this, performs its logic, and returns a plain object to pass along to the reducer. 

Redux Thunk, a common alternative to Redux Saga, allows functions to be passed into the Redux store dispatch, which checks to see if it is a function or an action object, executing the function in the former case, and directly passing along the action object to the reducer in the latter case. These functions can then perform whatever complex asynchronous logic that it wants, and produce a plain action object to be then passed into the reducer.

Redux Sagas are slightly different in that a separate set of actions are defined in your Redux application, which are captured exclusively by watcher functions (as part of your saga). Upon capturing the action, the saga will execute the corresponding logic, and dispatch a resultant action to your application’s reducer. The saga essentially acts like a separate thread to your application, listening for specific actions from your main application to perform complex asynchronous tasks, and updating your application’s state once it is completed. 


Redux Saga vs alternatives
---

While I wouldn’t say Redux Saga is inherently better than any of the alternatives available, it does have a few benefits that might make you want to consider using it.

Redux Saga offers a place completely decoupled from your action creators for you to handle your application’s side effects. Some people may feel that this makes your application’s data flows harder to follow (which I would agree with), but I think that this decoupling makes organizing your codebase and extending functionality easier down the road. 

For example, in a situation where you might need to support a workflow that requires multiple HTTP requests to different services in a particular order, Redux Saga allows you to compose granular sagas into a single one, and represent this new high level function with a separate action. Your application can still access each individual HTTP resource in other workflows, but for this particular one, your React component can simply call this high level action to load whatever it needs from a single place. As far as your component is concerned, your asynchronous logic to load multiple resources in a particular order is abstracted away. 

Redux Saga also offers us a collection of helper functions that are used to spawn your tasks when some specific actions are dispatched. These can be used to help organize when and how your tasks are executed.

For example, one of the most commonly used helper functions is `takeEvery()`. This instructs the middleware to spawn a new task for every action dispatched to your store matching a given pattern. This provides a behaviour similar to Redux Thunk, and is as simple as it gets: “Application tells you to fetch something, go fetch it”.

Now imagine that you had 2 functionally independent components that needed to retrieve the most up to date data from the same place. Previously they existed on 2 different pages, and could both be visited at any time. It would make sense for both components to try to retrieve a fresh copy of the resource whenever it is visited. Now imagine that your specification has changed, and now the two components need to exist on the same page. Now you have a situation where 2 different components are redundantly spawning the same task. 

Obviously, you could rewrite one of the components to no longer try to retrieve a fresh copy, and rely on the other to create the necessary action to retrieve this resource and populate the application store. Or you could add some logic to ensure that your component does not try to create a new action to retrieve this resource, if this resource is already being loaded. But this could also be solved using another Redux Saga helper function: `take()`. This function instructs the middleware to spawn a new task for an action dispatched matching a given pattern, but will effectively ignore any new actions until the spawned task has been completed.

With this, your 2 independent components can coexist together without changing any component specific logic! As far as your component is concerned, it asks your saga to retrieve a resource on its behalf, and retrieves it from the resultant updated state. Your saga gets to decide how it wants to handle 2 requests from different components.

Concluding thoughts
---
There is a fair bit more to Redux Saga than I managed to cram into this post. If you’re interested in incorporating it into your project or just want to know more, check out their fantastic documentation here: https://redux-saga.js.org/. It’s packed full of useful examples if you’d like to get into the low level details.

Redux Saga is one of many tools that can help you handle your application’s side effects. It’s heavy and has a learning curve, but contains a lot of functionality that will help keep your codebase neat and modular.

