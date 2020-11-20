---
title: "React Router Basics: Routing in a Single-page Application"
date: "2020-11-20"
coverImage: "index.png"
author: Nathan Nguyen
tags: ["JavaScript", "Node", "React", "React Router"]
description: "Everything essential you need to know about React Router."
---


React thrives on being one of the premier tools to build single-page applications, which used to be a fairly foreign concept when I started building my first React app. Back then, I was used to the concept of serving separate web pages whenever the user redirects from an URL path to another, and it was rather challenging at first to wrap my head around how React handles https://github.com/nathannguyenn/engineering-portal/wikinavigation.

With that in mind, this blog post aims to lay down and explain the basic aspects of navigation using React Router, one of the most, if not the most, popular solutions for navigation within a React app.

Throughout the first section below, please reference [this CodePen example](https://codepen.io/n-nguyen/pen/XWKwJXM).



1. **Link, Switch and Router**

As hinted at in the preface of this writing, routing in React does not involve replacing the HTML, CSS or JavaScript resources currently being served or reloading the browser content. Instead, using libraries like <code>react-router</code> allows containers to be swapped in and out dynamically based on the current URL location, and this all happens client-side. With that in mind, React Router can more generally be understood as a wrapper that handles conditional rendering based on URL path.

To accomplish this, the basic building blocks that developers get to play with are <code>&lt;Route></code>, <code>&lt;Switch></code> and <code>&lt;Link></code>. Let us look at a basic example making use of these 3 components:

First off, let’s create some simple text components. These components are stand-ins for actual components to be swapped in and out in navigation. HelloBanner will be a div containing the simple message “Hello”, and WorldBanner containing “World!”:



```JavaScript
const HelloBanner: React.FunctionComponent = () => {
  return (
    <div id="banner_hello" className="banner">
      <span>Hello Banner is currently displayed. We are currently in path "/hello"</span>
    </div>
  ) 
}

const WorldBanner: React.FunctionComponent = () => {
  return (
    <div id="banner_world" className="banner">
      <span>Hello Banner is currently displayed. We are currently in path "/world"</span>
    </div>
  ) 
}
```


Now let’s imagine the layout of a conventional web application with a top navigation bar. The navigation bar contains links to each section of the app and the body would show the content of the current webpage. The skeleton code for that container would look something like this in React:



```JavaScript
class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="div_app_container" className="app-container">
        <div id="div_nav" className="nav-bar">
          <span>Navigation bar</span>
          <Link to="/hello">
            <span>Link to /hello</span>
          </Link>
          <Link to="/world">
            <span>Link to /world</span>
          </Link>
          <Link to="/clearlyinvalidpath">
            <span>Link to a clearly invalid path.</span>
          </Link>
        </div>
        <div id="main_container" className="main-container">
          <span>Main Container</span>
          <Switch>
            <Route exact path="/">
              <div>
                <span>
                  Default container. We are in root path
                </span>
              </div>
            </Route>
            <Route path="/hello" component={HelloBanner} />
            <Route path="/world">
              <WorldBanner />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById("app")
);
```


If you are currently looking at the render of this structure from the CodePen, you would see this very simple UI:



![Example UI](image1.png)


Clicking on the <code>&lt;Link></code>’s in the navigation bar will “navigate” you to the corresponding paths. In effect, what this does is twofold:



*   Updating the current path of the browser to the indicated path.
*   Update all <code>&lt;Route></code> components to rerender according to the current path.

This is demonstrated through the example app. Once you click the links to /hello or to /world, the corresponding component will be swapped in under the <code>&lt;Switch></code> container.

A couple of noteworthy things from the code example:



*   <code>&lt;Switch></code> component allows swapping between <code>&lt;Route></code>’s and render the correct component with a given URL path. However, <code>&lt;Route></code> components do not have to be wrapped inside a <code>&lt;Switch></code>. While standalone, a <code>&lt;Route></code> will simply render when the URL path matches its own <code>path</code> prop.
*   The <code>&lt;Redirect></code> component at the end acts as the default route. In case none of the other routes match with the current URL path, it simply redirects the user back to root.
2. **Redirecting programmatically**

The workflow described above is intuitive from the end user’s point of view. However, there are times when the application’s internal logic demands a redirection to be performed following app events. In these occasions, React Router leverages the [<code>history</code>](https://reactrouter.com/web/api/history) object to allow for programmatic redirection:

For a traditional setup, the <code>history</code> object can be accessed through a component’s props through the user of the <code>withRouter</code> higher order component: 



```JavaScript
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface SampleComponentProps extends RouteComponentProps {
  // props go here
}
export interface SampleComponentStateState {
  // states go here
}

class SampleComponent extends React.Component<SampleComponentProps, SampleComponentStateState> {
  constructor(props: any) {
    super(props);
  }

  performRedirect = () => {
    const { history } = this.props;

    history.push("/desired-pathname")
  }

  render() {
    return <div/>
  }
}

export default withRouter<SampleComponentProps>(SampleComponent);
```


In the example above, you can see all the components required to extract the <code>history</code> object, as well as the <code>history.push()</code> call to perform the redirection.

For a more updated approach, React Router introduced the hook [<code>useHistory</code>](https://reactrouter.com/web/api/Hooks/usehistory), which should blend in more naturally when programming with a React Hooks intensive workflow.


3. **Passing states on redirects**

Certain redirects are unique in nature, and/or contain certain information about the previous user activity that you might want to pass on to the new component. In this case, the information can be passed through history states into the new component, which will then perform custom behavior based on these states:

When using <code>&lt;Link></code> component redirect, populate the <code>to</code> prop with an object that contains the new path as well as states, instead of just the string for pathname:



```JavaScript
<Link
  to={{
    pathname: "/desired-pathname",
    state: {
      stateName: "state to be passed."
    }
  }}
>
  Link text here.
</Link>
```


The same object can be used as argument to the <code>history.push()</code> call to achieve similar results:



```JavaScript
history.push({
  pathname: "/desired-pathname",
  state: {
    stateName: "state to be passed."
  }
})
```


Once the state has been included with the redirection, on the receiving end, you can extract the state from the <code>history.location.state</code> object:



```JavaScript
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface ReceivingComponentProps extends RouteComponentProps {
  // props go here
}
export interface ReceivingComponentStateState {
  // states go here
}

class ReceivingComponent extends React.Component<ReceivingComponentProps, ReceivingComponentStateState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.state && history.location.state.stateName) {
      // stateName can be accessed here if it is passed in from a previous redirect action.
      console.log(history.location.state.stateName);
    }
  }

  render() {
    return <div/>
  }
}

export default withRouter<ReceivingComponentProps>(ReceivingComponent);
```


The state access is in <code> componentDidMount</code> in the example above.



4. **Parting Words**

At this point, hopefully, we have covered all the big bullet points to help you get started with navigation using React Router. I hope this write-up has been informative and helpful to your understanding of navigation in React, as well as helping you build your next React application.
