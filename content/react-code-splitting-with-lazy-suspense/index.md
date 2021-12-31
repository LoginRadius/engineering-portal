---
type: async
title: Code spliting in React via lazy and suspense
date: "2021-05-13"
coverImage: "react.png"
author: "Abhimanyu Singh Rathore"
description: "Load Application faster with code spliting and dynamic loading"
tags: ["React"]
---

Everyone wants their application so fast, but how to achieve that, in that case, **code splitting** comes into the picture, where we split code and set the priority loading of the code snippet.

But how do we set the priority or load them whenever required?

## 1. React.lazy()

Using this we can set code priority to the lower or it will load only whenever required. So how to do that? it's easy, let's understand through an example.

```JS
 //generally approach to import Component
 import Blog from './BlogComponent';
```

```JS
// This component is loaded dynamically or lazy load
const BlogComponent = React.lazy(() => import('./BlogComponent'));
```

## 2. React.Suspense()

Once the component is set for a lazy load then we need to set some kind of fallback option as well, till that code is rendered. This fallback option either could be a loader icon, screen, image, etc.

```JS
// This component is loaded dynamically or lazy load
const BlogComponent = React.lazy(() => import('./BlogComponent'));

function AppComponent() {
  return (
    // Displays <LoaderSpinner> until BlogComponent loads
    <React.Suspense fallback={<LoaderSpinner />}>
      <div>
        <BlogComponent />
      </div>
    </React.Suspense>
  );
}
```
