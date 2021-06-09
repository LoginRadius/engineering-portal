---
title: "React's Context API Guide with Example"
date: "2021-06-09"
coverImage: "title-image.png"
author: "Versha Gupta"
tags: ["React", "Redux", "Hooks"]
description: "Deep Dive into React's Context API with example"
---

# React's Context API Guide with Example

In this blog, You will learn What React's Context API is and how to use React's Context API. It is very much used as a state management tool, oftentimes replacing Redux.  
According to the React doc: 

> Context provides a way to pass data through the component tree
>        without having to pass props down manually at every level.

To be more clear, this provides a way for you to make values available to all components of your application, no matter how complicated your application is.

## When to use context

```JS
const App = () => {
  return(
    <ParentClass color= "blue"/>
  );
}

const ParentClass = (props) => (
  <ChildClass color= {props.color} />
)

const ChildClass = (props) => (
  <GrandChildClass color= {props.color} />
)

const GrandChildClass = (props) => (
  <p>Color: {props.color}</p>
)
```

In the above code, we designed the application in which used color props in the ParentClass and passed that props to all component (top to down) without checking that it is required by the child class or not and another issue also here that in case if GrandChildClass component was more deeply nested than it was very difficult to manage. This is the problem that `Context` solves. Context is designed the share values that can be considered "global" such as preferred language, current user, or theme. 

Using context, we can avoid passing props. Let's create the above example code using context:

We will create a separate component for context that we can use throughout the components.
Once you have initialized your project, create a file called ColorContext.js in your `/src` folder.

###  Create Context

Using React.createContext, we can create context and pass anything as an argument to `React.createContext`. In our case, we are passing "white" color to provide a light theme.

This will also give me  `ColorContext.Provider`  and  `ColorContext.Consumer`. What these two components do is straightforward:

-   **Provider**  - The component that provides the value
-   **Consumer**  - A component that is consuming the value
- 

    import React from "react";
    
    const ColorContext = React.createContext("white");
    export default ColorContext;

To use this context all over the components, we have to use the provider. According to React document, every context object comes with a Provider React component that allows consuming components to subscribe to context changes.

### Providing Context

After successfully creating context, we can import context and use it to create our provider.
As we want to access context in the entire application, we need to wrap our app in `ColorContext.Provider`.

```JS
import ColorContext from './ColorContext';
    function App() {
      const color= "white";
      return (
        <ColorContext.Provider value = {color}>
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to my web page</h1>
              </header>
                </div>
          </ColorContext.Provider>
      );
    }
```

###  Consuming the context

The approach to providing context is the same for class and functional components but consuming is a little different for both.

#### class component
Mainly used way to accessing context in class component using static `contextType`. After that, you can access the context value using `this.context`.  You can refer to it in any lifecycle method and even in the render method.

```
import ColorContext from './ColorContext'

class Page extends Component {
  static contextType = ColorContext;

  componentDidMount() {
    const colorValue= this.context

    console.log(colorValue) //  "white" 
  }

  render() {
    return <div>Color Value is {colorValue} </div>
  }
}
```


The traditional way to accessing context values is by wrapping the child component in `Consumer`. From there, You can access values as props.

```JS
import { ColorContext} from './ColorContext'

class Page extends Component {
  render() {
    return (
      <ColorContext.Consumer>
        {(props) => {
          return <div>{props}</div>
        }}
      </ColorContext.Consumer>
    )
  }
}
```

 ####  Functional component and Hooks
 You can use `useContext`in functional components and its equivalent of `static contextType`. 	

```JS
import React, { useContext } from 'react'
import ColorContextfrom './ColorContext'

export const HomePage = () => {
  const colorValue= useContext(ColorContext)

  return <div>{ColorContext}</div>
}
```

### Updating Context
We can update the context by updating the normal state. We just need to create a wrapper class that contains the state of context and the method to update it. 
Example code with file `ColorContext.js`

```JS
import React, { Component } from 'react'

const ColorContext = React.createContext()

class ColorContextProvider extends Component {
  // Context state
  state = {
    color:""
  }

  // Method to update state
  setColor = (color) => {
    this.setState((prevState) => ({ color}))
  }

  render() {
    const { children } = this.props
    const { color } = this.state


    return (
      <ColorContext.Provider
        value={{
          color,
          this.setColor,
        }}
      >
        {children}
      </ColorContext.Provider>
    )
  }
}

export default ColorContext

export { ColorContextProvider }
```

Now you can update and view the user from the Context method.

```JS
import ColorContext from './ColorContext'

class Page extends Component {
  static contextType = ColorContext;

  render() {
    const { color, setColor } = this.context

    return (
      <div>
        <button
          onClick={() => {
            const newColorValue= "black";

            setColor (newColorValue)
          }}
        >
          Update Color
        </button>
        <p>{`Current Color Value: ${color}`}</p>
      </div>
    )
  }
}
```
 

In my opinion, It is much easier to use than Redux and requires very little code, so why wouldn't you use it?

The problem with the context is simple: ** Everything that consumes the context re-renders each time the state of that reference changes. **

This means that if you're consuming your context everywhere in your app, or worse, using one context for the state of your entire app, you'll end up re-rendering a ton everywhere.
