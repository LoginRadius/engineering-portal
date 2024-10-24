---
title: "React Context API: What is it and How it works?"
date: "2020-10-07"
coverImage: "react.jpg"
author: "Eylon Ronen"
tags: ["React", "Redux", "Hooks"]
description: "Context API is a (kind of) new feature added in version 16.3 of React that allows one to share state across the entire app (or part of it) lightly and with ease. Let's see how to use it."
---

React context API, In this article you will explore what is Context API, what is react context API and how to use it in your React project. The Context API is a React structure that enables you to exchange unique details and assists in solving prop-drilling from all levels of your application.

## What is Context API?

The React Context API is a way for a React app to effectively produce global variables that can be passed around. This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on. Context is also touted as an easier, lighter approach to state management using Redux.

Talking about the Context APIs, they’re a (kind of) new feature added in version 16.3 of React that allows one to share state across the entire app (or part of it) lightly and with ease.

## React context API: How it works?

React.createContext() is all you need. It returns a consumer and a provider. **Provider** is a component that as it's names suggests provides the state to its children. It will hold the "store" and be the parent of all the components that might need that store. Apart from the react context **Provider**, **Consumer** as it so happens is a component that consumes and uses the state. More information can be found on [React's documentation page](https://reactjs.org/docs/context.html)

## Context API will replace redux?

No. Well, not entirely.  

Redux is great and came perfectly to answer the need for state management. Actually, it answered this need so well that it came to be known that you can't be a "true" React developer if you don't know your way around Redux.
However, Redux has its disadvantages, and that's why it's important to know what Context API gives us that Redux doesn't:

- Simplicity - When using redux people tend to manage almost all of their state in redux and it causes 2 problems:  
  1. Overhead - Why should I create/update 3 files just to add one tiny feature? 
   
  2. One of the significant advantages of React's one-way data binding is that it's easy to understand - A component passes state to its children. Using Redux takes it away from us.
   
- Using Context API we can define several unrelated contexts (stores) and use each in its proper place in the app.  
  
### Important Note

Redux is just a concept. If you are comfortable with using reducers and actions and don't find hindering than you may also create reducers and actions that wrap Context API as the store as Redux's author **Dan Abramov** explained in [his medium article about whether Redux is always required](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

## How to use Context API?

You might think to yourself: "Well, I'm convinced. How do I implement Context API in react for my app?" First, make sure you need it. Sometimes people use shared state across nested components instead of just passing it as props. And if you do need it you should follow these very few steps:

1. Create a folder under your app root named contexts (not required. just a convention)
2. Create a file named \<your context name\>Context.js, e.g. userContext.js
3. import and create a context like so:

```js
import React, { createContext } from "react";
const UserContext = createContext();
```

4. Create a component that will wrap the provider named <your context name>Provider e.g. UserProvider  
Example using React Hooks:

```js
const UserProvider = ({ children }) => {
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(1);
  const happyBirthday = () => setAge(age + 1);
  return (
    <UserContext.Provider value={{ name, age, happyBirthday }}>
      {children}
    </UserContext.Provider>
  );
};
```

5. Create a higher order component to consume the context named: with<your context name> e.g. withUser  
Example using React Hooks:

```js
const withUser = (Child) => (props) => (
  <UserContext.Consumer>
    {(context) => <Child {...props} {...context} />}
    {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
  </UserContext.Consumer>
);
```
The difference between the two options above is if you want the context to be a single nested property by this name, to explode it to its properties (which in my opinion is more convenient).

6. Finally export them

```js
export { UserProvider, withUser };
```

7. And use them however you like  
For example:

```js
ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
```
```js
export default withUser(LoginForm);
```

You'll also be able to notice I used the new "[Hooks](/react-hooks-guide/)" feature that is shipped with React since version 16.8 to make it even neater and easier to create contexts.

### Final piece of advice
I mentioned how people overuse Redux, and it also applies to Context API. Use it only when you need to share state between lot's of components with a lot of nesting.
Most of the time, the data you have in one component will only be relevant to its children, so passing it in props is more indicative and nicer.
