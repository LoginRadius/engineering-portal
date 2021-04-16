---
title: "React with Ref"
date: "2021-04-16"
coverImage: "title-image.png"
author: "Versha Gupta"
tags: ["React","Refs","DOM"]
description: "Learn about manipulation of DOM elements with Ref directly with React"
---


In this article, We will discuss the manipulation of DOM elements with Ref directly with React. 

React Framework builds your components and abstracts your code away from manipulation within the DOM but still leaves the door open for developers to access it. Reason are few cases where it might be necessary. That's why React provides an escape hatch know as `refs`.

Refs are a function that use to access the DOM from components. You only need to attach a `ref` to the element in your application to provide access to it from anywhere within your component without making use of props and all. 

We can also use Refs to direct access to React elements and use callbacks with them.

We should only use `refs` when the required interaction cannot be achieved using state and props.

## Use Refs

We can use `refs` to do anything that needs to be manipulated in the DOM. Some good cases like focus, test selection, media playback, triggering mandatory animations, or integration with the third-party DOM library.

Note: We should avoid using refs because it removes the purpose of using React.   For example, If you want to show and hide a 	`popup` component. We should use a boolean prop for it instead of manipulating dom.
	
### Creating Refs

We can use `React.createRef()`method to create Refs, and then we can attach to a Dom element via the `ref` attribute after that, we can access and modify that element through the ref. 

    class App extends React.Component {
      constructor(props) {  
        super(props);  
        this.myRef = React.createRef();
      }
      render() {
        return <div ref={this.myRef} />; 
      }
    }

In above code, We created ` this.myRef` in the constructor by calling `React.createRef()`  method.

Then in the `render` method , we attached the returned value to ref of the div element,  a reference to the node becomes accessible at the `current` attribute of the ref.

We should not use `ref` attribute on function components because they do not have instances.

React will assign the `current` property with Dom element when component mount and assign null to it when component unmount.  

`ref` updates happen before `componentDidMount` or `componentDidUpdate` methods.

We can pass refs as props to the component. Example:

    function MyCustomTextInput ({ myInputRef }) {  
      return <input ref={myInputRef} />;  
    }
    
    class App extends React.Component {  
      constructor(props) {  
        super(props);  
        this.myInputRef = React.createRef();  
      } 
      
      componentDidMount() {  
        this.myInputRef.current.focus();  
      }
      
      render() {  
        return <MyCustomTextInput inputRef={this.myInputRef} />;  
      }
        
    }
    
    

In above code, `App` passed its ref as props to `MyCustomTextInput` component.

### Callback Refs

We can create ref using another way called `callback refs`; it gives us more fine-grain control over when refs are set and unset within the component.

Instead of passing `ref` returned by `createRef()` method, we will pass a function to `ref` attribute.
The function receives React component instance or DOM element, which can be stored and accessed anywhere.

    class App extends React.Component {  
      componentDidMount() {  
        this.input.focus();  
      } 
      
      render() {  
        return (    
            <input ref={element => (this.input = element)} />;   
        );  
      }  
}


In the above code, React will call the ref callback t store the reference of the input element when the component mounts; then, it will focus the input element automatically and when the component unmounts, call it with null.

We can pass callback refs between components . Example:

    function MyCustomTextInput({ inputRef }) {  
      return <input ref={inputRef} />;  
    }
    
    class App extends React.Component {  
      componentDidMount() {  
        this.myInputElement.focus();  
      } 
      render() {  
        return <MyCustomTextInput inputRef={el => (this.myInputElement = el)} />;  
      } 
       
    }

In the above code, We passed the function to `inputRef` and access it in `App` component so we can call `focus` on it to focus the input element.

### Caveats with callback refs

Callback refs are calling two times during updates if they are defined as an inline function. This is because a new instance of the function is created with each render. We can avoid this by calling it a method of a class.

To understand more about React refs. Read https://reactjs.org/docs/refs-and-the-dom.html
