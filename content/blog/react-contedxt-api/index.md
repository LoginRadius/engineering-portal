---
title: "What Is React Context API and How To Use It Best"
date: "2020-10-05"
coverImage: "react.png"
author: "Eylon Ronen"
tags: ["React", "Redux", "State Management", "React Hooks", "React Higher Order Component"]
---

## What is Context API?
Context API is a (kinda) new feature added in version 16.3 of React that allows one to manage state lightly and with ease

### How it works
React.createContext() is all you need. It returns a consumer and a provider.
**Provider** is a component that as it names suggests provides the state to its children.  
**Consumer** as it so happens is a component that consumes and uses the state.

### **Does it replace Redux?**
No... Well not entirely.  
Redux is great and came perfectly to answer the need for state management. actually it answered this need so well that it came to be known that you can't be a "true" React developer if you don't know your way around Redux.
However Redux has its disadvantages and that's why it's important to know what Context API gives us that Redux doesn't:
* Simplicity - When using redux people tend to manage almost all of their state in redux and it causes 2 problems:  
  1. Overhead - Why should I create/update 3 files just to add one tiny feature? 
  2. One of the great advantages of React's one-way data binding is that it's easy to understand - A component passes state to its children. Using Redux takes it away from us
* Using Context API we can define several unrelated contexts (stores) and use each in it's proper place in the app.

## How to use the best
Well I'm convinced. How am I implementing Context API in my app?
First, make sure you need it. sometimes people use shared state across nested components instead of just passing it as props.
And if you do need it here is how you do it  
1. Create a folder under your app root named contexts
2. Create a file named \<your context name\>Context.js e.g. userContext.js
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

5. Create a higer order component to consume the context named: with<your context name> e.g. withUser  
Example using React Hooks:

```js
const withUser = (Child) => (props) => (
  <UserContext.Consumer>
    {(context) => <Child {...props} {...context} />}
    {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
  </UserContext.Consumer>
);
```

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