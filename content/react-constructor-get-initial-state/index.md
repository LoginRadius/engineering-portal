---
type: async
title: "Constructor vs getInitialState in React"
date: "2021-01-05"
coverImage: "index.png"
author: Nathan Nguyen
tags: ["JavaScript", "React"]
description: "No ES6? No problem. getInitialState is the ES5 friendly method to define the initial state of a React component."
---

One fairly popular question that got asked on programming bulletin boards has to do with the similarities and differences between React’s <code>constructor</code> and the built in method <code>getInitialState</code>. While the simple answer to this question is indeed simple: “getInitialState is the ES5 friendly method to define the initial state of a React component,” there are a couple more details around <code>getInitialState</code> as well as React’s ES5 support that are interesting and useful to highlight.

## Constructor vs getInitialState: With or without Classes:

One of the fundamental differences between ES5 and ES6 in regards to React implementation is the new <code>class</code> keyword. It allows definition of React components as classes, which is a familiar data structure for anyone who has had experience with more traditional object-oriented languages such as Java or C++. The class structure also allows for natural organization of the component’s elements like state, props, lifecycle methods and member functions. However, ES5 did not provide the same convenience. So instead of defining a React component as a class:

```JavaScript
class HelloWorld extends React.Component {
  render() {
    return <span>Hello World</span>;
  }
}
```

You would rely on a helper module called `create-react-class`:

```JavaScript
var createReactClass = require('create-react-class');
var HelloWorld = createReactClass({
  render: function() {
    return <span>Hello World</span>;
  }
});
```

And it is within the object passed into `create-react-class` that you could define an initial state by populating the `getInitialState` attribute:

```JavaScript
var HelloWorld = createReactClass({
  getInitialState: function() {
    return {name: this.props.name};
  },
  render: function() {
    return <span>Hello {this.state.name}</span>;
  }
});
```

Which, in ES6 implementation would be the equivalent of:

```JavaScript
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
  }
  render() {
    return <span>Hello {this.state.name}</span>;
  }
}
```

## Autobinding

One difference worth noting is that the `create-react-class` method automatically binds `this` to every attribute method. This no longer holds true if you define React components using the common ES6 class syntax, making it so that you have to manually bind `this` to internal methods:

```JavaScript
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }

    this.changeName = this.changeName.bind(this);
  }
  changeName() {
    this.setState({ name: "World" });
  }
  ...
}
```

Or otherwise use the “arrow function” shorthand which takes care of binding:

```JavaScript
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
  }
  changeName = () => {
    this.setState({ name: "World" });
  }
  ...
}
```

## Parting Words

Since the update to ES6, there have been multiple new React iterations. You could now forgo the `constructor` declaration altogether and just declare `state` inline as a class member, or utilize React Hooks as a new way to initialize states. However, the ES5 support remains useful for legacy systems and adds to the overall flexibility of React as a toolset.

You can read more about React's ES5 support [in the official doc entry here](https://reactjs.org/docs/react-without-es6.html), and [the v0.13.0 beta release blog entry here](https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html), for the respective ES6 changes.
