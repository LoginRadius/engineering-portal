---
title: "Understanding React Rendering"
date: "2020-09-23"
coverImage: "index.png"
author: Nathan Nguyen
tags: ["Node.js", "React"]
description: "Learn to optimize React rendering process."
---

Rendering is an essential procedure a programmer has to manage in frontend development. In React, [the render() method is the only required method in a class component](https://reactjs.org/docs/react-component.html#render) and is responsible for describing the view to be rendered to the browser window. Coupled with the clever way React operates around its virtual DOM concept, there are certain subtleties in how this method works. Understanding them will greatly benefit any aspiring React developer. 

Throughout this writing, I will reference [this codepen](https://codepen.io/n-nguyen/pen/WNwYrRG) for a demonstration of discussed behaviors.


### 1. <strong><code>render()</code></strong> 101

First of all, <strong><code>render()</code></strong> is not user callable. It is part of the [React component lifecycle](https://reactjs.org/docs/state-and-lifecycle.html). Generally, it gets called by React at various app stages when the React component instantiates for the first time, or when there is a new update to the component state. Render does not take any arguments and returns a <strong><code>JSX.Element</code></strong> which contains the view hierarchy of the current component. This view hierarchy will later be translated into HTML and displayed in the browser window.

As mentioned before, <strong><code>render()</code></strong> is not user callable as it is an event that happens in the component’s lifecycle. With that said, if it is absolutely necessary to render the view manually, you can instead call the built-in class method <strong><code>[forceUpdate()](https://reactjs.org/docs/react-component.html#forceupdate)</code></strong>. Keep in mind that this is considered an <strong>anti-pattern</strong>. If you were designing sensible React components, its state and props changes should naturally control the render process, and you should never feel the need to make a manual call.

Within the lifecycle, these are the scenarios where render is called: 



*   After the React component is first instantiated, following the <strong><code>constructor()</code></strong> call.
*   After an update to the component’s props
*   After a <strong><code>setState()</code></strong> call

If you have the [Codepen](https://codepen.io/n-nguyen/pen/WNwYrRG) opened at this point, before anything is rendered you will see 2 alert messages from the browser: <code>"render() is called in Parent component!"</code>, and <code>"render() is called in Child component!"</code>. These messages are invoked from the corresponding <strong><code>render()</code></strong> methods of the example's parent and child component. They serve to introduce the first case of <strong><code>render()</code></strong> invocation: when the component is first instantiated.

Once the set of alerts is dismissed, a very simple UI will render:

![Example UI](image1.png)

The dotted border line distinguishes between elements that belong to the Child component of the example (inside the dotted line) versus the Parent component.



*   Clicking button 1 will update the <strong><code>childElementText</code></strong> state of the Parent component, which in turns updates the <strong><code>text</code></strong> prop of the Child component, triggering a render in both Parent and Child.


```JavaScript
  onChildPropChange = () => {
    this.setState({
      childElementText: "I am the child element! I am updated following a prop change."
    })
  }
```


*   Clicking button 2 will update the <strong><code>helloWorldMessage</code></strong> state within Child component, triggering a render following a state change.


```JavaScript
  onTextChange = () => {
    this.setState({
      helloWorldMessage: "Hello React! (state change after setState call)"
    })
  }
```


A visual and interactive reference to the React lifecycle can be found [here](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

It is worth noting that following a props update or <strong><code>setState()</code></strong>, the method <strong><code>shouldComponentUpdate()</code></strong> is invoked to determine whether <strong><code>render()</code></strong> should be called. By default, this method always returns <strong><code>true</code></strong>. But it can be overloaded to implement custom logic. It is the actual way to define custom render behavior in each React component.

The <strong><code>shouldComponentUpdate()</code></strong> provides you with nextProp and nextState as arguments, which allows you to compare the current state and props of the component. For example, this code block will invoke <strong><code>render()</code></strong> only when the <strong><code>text</code></strong> prop changes:


```JavaScript
  shouldComponentUpdate(nextProps: NewComponentProps, nextState: NewComponentState) {
    if (this.props.text !== nextProps.text) {
      return true;
    } else {
      return false;
    }
  }
```


The characteristics and behaviors mentioned above made it imperative that <strong><code>render()</code></strong> is a pure function. That means inside <strong><code>render()</code></strong>, you should not make an update to the component's states or props (no setState() call nor Redux state update). This makes sense because an update to the component will then trigger a new <strong><code>render()</code></strong> call, which can potentially lock you into an infinite render loop.

In terms of return value: <strong><code>render()</code></strong> returns a single JSX element, as mentioned above. This comes with certain implications:



*   If you need to return a collection of sibling elements, you need to wrap them all in a parent <strong><code><div></code></strong>, or a <strong><code><React.Fragment></code></strong>. It is worth noting that once rendered, <strong><code><React.Fragment></code></strong> will vanish from the DOM structure. It is only meant to be a wrapper component and does not appear in the final DOM in the browser. This makes it a more sensible choice over a <div> wrapping to avoid nesting div’s.

     

*   JSX is immutable. The returned JSX element is a constant that represents the state of the DOM to be rendered. Therefore, when thinking about how to write a <strong><code>render()</code></strong> method, it is helpful to think about how the entire UI will look like at a moment in time, instead of thinking about how a certain element updates over time. [“Thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.”](https://reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary)

     



### 2. Notes on reconciliation, and the <strong><code>key</code></strong> prop

The <strong><code>render()</code></strong> method in each React component then feeds into what is called the Reconciliation Algorithm. This is the primary algorithm that dictates how React renders the real DOM in your browser based on a <strong>virtual DOM </strong>maintained internally by React. To intelligently determine what needs to be rendered on every call, React compares the current state of the virtual DOM and the real one and only makes changes to the physical DOM where it recognizes that the UI has been updated.

While not every single detail is known about React’s reconciliation algorithm, the characteristics detailed in the [official documentation](https://reactjs.org/docs/reconciliation.html) are enough for us to start phasing out certain suboptimal rendering patterns, thus writing a more robust <strong><code>render()</code></strong> method.



*   On a UI update: As the DOM tree is parsed top to bottom, if a mismatch of elements is detected, React will [tear down and rebuild the entire subtree](https://reactjs.org/docs/reconciliation.html#elements-of-different-types) starting from that element. If the subtree is complex, this operation can be quite costly. Therefore, if a new element were to be introduced to the DOM tree, it should be appended as the last element in that level if there are no specific requirements of where it should be placed.

For instance, given this DOM subtree:


```HTML
<div>
  <span key="li-1">list item 1</span>

  <span key="li-2">list item 2</span>

  <span key="li-3">list item 3</span>
</div>
```


If a <NewComponent> is then added to the top of the list:

```HTML
<div>
  <!-- previously <span>list item 1</span> - element is detached and <NewComponent /> instantiated -->
  <NewComponent />

  <!-- previously <span>list item 2</span> - content will be updated to "list item 1"  -->
  <span>list item 1</span>

  <!-- previously <span>list item 3</span> - content will be updated to "list item 2"  -->
  <span>list item 2</span>

  <!-- new <span>list item 3</span> is element created  -->
  <span>list item 3</span>
</div>
```


If instead <NewComponent> is added to the bottom: 


```HTML
<div>
  <!-- previously <span>list item 1</span> - no change -->
  <span>list item 1</span>

  <!-- previously <span>list item 2</span> - no change -->
  <span>list item 2</span>

  <!-- previously <span>list item 3</span> - no change -->
  <span>list item 3</span>

  <!-- new instance of <NewComponent /> is added -->
  <NewComponent />
</div>
```


 In the example above, appending <New Component> to the end of the list will result in 1 new instantiation, versus 1 instantiation, 3 updates and 1 tear down. In a larger application scale, this will prove to be a significant performance difference in the long run.



*   If you have ever tried to use the <strong><code>map()</code></strong> method to iterate over an array to render a list of elements, it is likely that you have seen React complaining about a missing <strong><code>key</code></strong> prop to each rendered list item. So what does <strong><code>key</code></strong> actually do?

    A <strong><code>key</code></strong> is React’s way to recognize elements in the DOM tree, comes reconciliation time. When React is parsing all children of an element, it can leverage keys to match elements that were present from the last update. This allows you to shuffle the order of child elements without interfering with the algorithm. As long as the key matches between updates, React will preserve the element configuration.


Coming back to the example above, let’s add keys to all the existing list items:


```HTML
<div>
  <span key="li-1">list item 1</span>

  <span key="li-2">list item 2</span>

  <span key="li-3">list item 3</span>
</div>
```


In this case, if we were to add an extra “list item 4” at the top of the list, it would not come with the same performance penalty:


```HTML
<div>
  <!-- new item - <span> is instantiated -->
  <span key="li-4">list item 4</span>

  <!-- matched with the old "li-1" key - element stays unchanged between renders -->
  <span key="li-1">list item 1</span>

  <!-- matched with the old "li-2" key - element stays unchanged between renders -->
  <span key="li-2">list item 2</span>

  <!-- matched with the old "li-3" key - element stays unchanged between renders -->
  <span key="li-3">list item 3</span>
</div>
```


In case a subtree is generated using a <strong><code>map()</code></strong> or other iterative methods, React requires that keys are provided with the element. However, even in case a DOM subtree is manually added, keys should be provided on subtrees that have complex behaviors regarding conditional rendering.


### 3. Parting words

React is a clever framework that offers performance through its rendering scheme, so it follows that, as developers, we should leverage it in a proper manner to help build performant applications. With that said, it is not a miracle device that optimizes out inefficiencies from the developer’s end, but a tool to be utilized. Understanding the <strong><code>render()</code></strong> method as well as its implication to the reconciliation algorithm is the very first step to making sure we are leveraging the framework instead of working against it, as well as one of the first steps to mastering React.
