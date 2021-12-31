---
type: async
title: "React Error Boundaries"
date: "2021-05-20"
coverImage: "error_boundary_cover.png"
author: "Versha Gupta"
tags: ["React", "Error Handling", "JavaScript"]
description: "Error Handling in React using React Error Boundaries"
---

When we develop a project in a react application, we encounter errors such as server-related errors, component/function errors, and so on, which break the application and result in a blank web page, which is not ideal. To resolve this, many methods are created that handle these errors and improve the user and developer experience.

In React, Error Boundaries comes in the picture, which was introduced in React v16 that catch the javascript errors found in UI and handle them efficiently.

React Error Boundaries are React components that catch tricky javascript errors, log those errors and render them into a fallback UI instead of crashing the whole application.

Now let's understand the concept with the code.

### Without Error Boundaries

```JS
class UpdateCount extends Component {
  state = {
    count: 0
  };
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
  const {count} = this.state;
    if (count === 4) {
      // Imitate an error!
      throw new Error('Application crashed!');
    }
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
};
```

When an application encounters an error, the component unmounts completely, leaving the user/developer with a blank web page and no idea what to do next.

React Error Boundaries provides a method to handle these errors efficiently!

### With Error Boundaries

First, let's make an error boundary component. Here is an example:

```JS
class ErrorBoundary extends Component {
  state = {
    error: ''
  }
  static getDerivedStateFromError(error) {
    // will update the state
    return {error: error.toString()}
  }

  render() {
  const {error} =  this.state;
    if (error) {
      return (
      <div>
  <p>Looks like an error occurred!</p>
        <p>
          {error}
        </p>
          <div>
      )
    }
    return <div>{this.props.children}</div>
  }
}
```

In the above example code, you will see a static method `getDerivedStateFromError(error)`. This method is a lifecycle method in which we catch the error and see it as the state. If an error occurs, the state is updated, and instead of a blank web page, a human-friendly error message appears in rendering; if no error occurs, the control is returned to the original element.

Now let’s see how we can use this <ErrorBoundary> class for our <UpdateCount> component.

```JS
function App() {
  return (
    <div>
      <p><b>Error Boundary Example code</b></p>
      <hr />
      <ErrorBoundary>
        <p>Two updatecounts component use same error boundary component.</p>
          <UpdateCount />
          <UpdateCount />
      </ErrorBoundary>
      <hr />
      <p>Two updatecounts component use their own error boundary component.</p>
        <ErrorBoundary><UpdateCount /></ErrorBoundary>
        <ErrorBoundary><UpdateCount /></ErrorBoundary>
    </div>
  );
}
export default App
```

In the above code, when we click on the plus (+) button, it increases the count. The program is programmed to throw an error when the count reaches 4. It simulates a JavaScript error in a component. Here, we have used the error boundary in two ways, which are given below.

First, these two updatecounts are within the same error boundary. If one of the updateCount components crashes, then the error boundary will replace them both.
Second, these two updatecounts are within their individual error limits. So if one crashes, the other component is not affected because both have their own error boundary component.

React Error boundary is a really nice feature in React, and it is comparatively less used.
There are a lot of nice error boundary packages out there; you should look into them. Here is a link [react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme)
