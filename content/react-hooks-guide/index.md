---
title: "React Hooks: A Beginners Guide"
date: "2020-08-07"
author: "Mohammed Modi"
coverImage: "react-hooks.png"
tags: ["React", "Hooks"]
description: "A walkthrough guide on React Hooks, what is React Hooks, benefits of Hooks, and how to use Hooks in React and more."
---

## Overview

I want to explain the inspiration for React Hooks in this walkthrough, what React Hook is and the advantages of hooks, and more. This article covers only an introduction to React Hooks. React Hooks have been introduced in React function components as a way of utilising state and side effects.

Have you ever assigned a task to change the **functional component** which is full of UI and business logic to a **Class Component** just because the new feature requires the use of **state**, just to toggle some text colour to red on some events occurred?

Chances are there if you are a react developer, Hopefully we can solve this using the Hooks.

## What are Hooks?

Hooks are features that allow you to “hook into” the features of [React state](/react-state-management/) and lifecycle from function components. Hooks do not function inside classes. Without classes, they let you use React.

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

[Dan Abramov](https://twitter.com/dan_abramov) has provided a well-rounded introduction to the API, and how and why the framework that many of us use has evolved to where it is now. You can read about it and watch his [ReactConf 2018 keynote](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) introducing the hooks proposal.

The key takeaway maybe this:

>If the React community embraces **hooks**, it will reduce the number of concepts you need to juggle when writing React applications. Hooks let you always use functions instead of having to constantly switch between functions, classes, higher-order components, and render props.

## Benefits of React Hooks

React Hooks enables the functional components to attach the local state to it, so that you can use React functionality without using a **class component**.

Advantages of react hooks:

- Readable
- Lesser Code.
- Overall Optimized component
- Writing a Functional component with state
- Writing complex components became easier
- Handling events & logics in functional components.
- Performance boost up with Functional Components

### A Practical View

As you all know there are two ways to create the React components, one is using the **function** and other is using the **class**, there is always a confusion between one v/s other.

Let us assume we have a simple class component and then we will convert it to a functional with hooks and see the difference. 

#### Component without Hook: Class Component

```jsx
import React, { Component } from "react";
class Greeting extends Component {
  state = {
    text: "",
  };
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };
  render() {
    return <input value={this.state.text} onChange={this.handleChange} />;
  }
}
export default Greeting; 
```

#### Components with Hook:Functional Component: 

```jsx
import React, { useState } from "react";
export default () => {
  const [text, setText] = useState("");
  return (
    <input
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};
```

> If you disagree with any of the above, you can play with it in practice. I’m sure that would change your mind! 

## Basics Of React Hooks

Let us understand some basic hooks with examples.

1. useState()
2. useEffect()

I will take one example and will explain all the hooks in that example using a various scenarios.

### useState()

```jsx
import React, { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('Hi there, how are you?');

  return <h1>{message}</h1>
};

export default App;
```

In this example variable `message` will save the value **Hi there, how are you** using the `useState()` hooks. It will be similar to this code we write in the `constructor()` of **class component**. 

```js
this.state = {
    message: "Hi there, how are you?"
}
```

> If you are wondering about the `setMessage` @line 3 then be calm, I will explain later in this tutorial

### useEffect()

React `useEffect()` function can be executed in 3 different React component life cycles that are
 1. componentDidMount
 2. componentDidUpdate
 3. componentWillUnmount

Let's understand the `useEffect()` hook by taking the above example. So let's say I want to change the message 1 second after the component is mounted.

```jsx
import React, { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("Hi there, how are you?");

  useEffect(() => {
    console.log("trigger use effect hook");

    setTimeout(() => {
      setMessage("I'm fine, thanks for asking.");
    }, 1000);
  });

  return <h1>{message}</h1>;
};

export default App;
```

As you can see, In this example we have used the `useEffect` hook to trigger the `setMessage` method the change the `message` variable after 1 second.

But there is one problem, while executing this component you can see that the `console.log` will trigger twice. The reason is the `useEffect` hook will by default trigger on change of either `state` or `props` similar to the `componentDidUpdate` method in our class component.

To overcome this kind of case we need to pass the **Empty array ([])** as the second argument in the useEffect hooks. So updated code will look like this

```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [message, setMessage] = useState('Hi there, how are you?');

  useEffect(() => {
    console.log('trigger use effect hook');

    setTimeout(() => {
      setMessage("I'm fine, thanks for asking.");
    }, 1000)
  }, []);

  return <h1>{message}</h1>
};

export default App;
```

The above code means that hook will never be triggered as we have an empty array there, if we want to trigger the hook on a specific variable change of `props` or `state` we can add that variable in the array.

For eg : `[state.message]` here hook will fire on the update of message variable only.

I have covered the two basic and important hooks in this tutorial, there are many more types of hooks available in React, you can find the [detailed explanation](https://reactjs.org/docs/hooks-custom.html) in the React docs.

### The Rules of Hooks

1. Hooks can only be called at the Top Level, it can't be called **inside the loops or condition or nested functions**.
2. Hooks can only be called in the **React Function** or **Custom Hooks**, never use hooks in the regular javascript function.

> We can use [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) this eslint plugin that ensures the above two rules.

## Conclusion

So, from multiple points of view, we have covered the power of Hooks and seen how we can use controlled state in our Components without utilizing classes. 

I hope you find this article useful, Happy Reading !!!