---
type: async
title: "Web Workers: How to add multi-threading in JS"
date: "2020-09-09"
coverImage: "cover.jpg"
author: "Hridayesh Sharma"
tags: ["JavaScript", "Web"]
description: " Learn how web workers help with the success of the web app and get started by creating a simple web worker for JavaScript."
---

In JavaScript, web workers allow developers to benefit from parallel programming. Parallel programming enables various computations to be performed at the same time by applications. It is helpful to consider the importance of web staff as an example of how humans benefit from parallel tasks.

Web workers give us the ability to write multi-threaded Javascript that doesn't block the DOM. To some extent, even asynchronous operations block the DOM. On the other hand, Web employees help us solve this problem, escape from the single-threaded world, and achieve higher [performance on our web pages](https://www.loginradius.com/blog/async/16-javascript-hacks-for-optimization/).

## What are web workers in JS?

Web Workers are a simple means of running scripts in background threads for web content. Without interfering with the user interface, the worker thread may perform tasks.

Furthermore, they can use XMLHttpRequest to perform I/O (although the responseXML and channel attributes are always null) or fetch (with no such restrictions). Once created, by posting messages to an event handler defined by that code, a worker can send messages to the JavaScript code that made it (and vice versa).

## Why Use JavaScript Web Workers?

Web workers let you build background threads separate from the main execution thread, where the logic of the user interface is usually executed.

The key benefit of this separation of workload is that inside an isolated thread and without interrupting or impacting the main thread's responsiveness and usability, you can perform costly operations.

When the background thread completes its mission, the main thread is informed of the results seamlessly via an event handled by standard [JavaScript event handling](https://www.loginradius.com/blog/async/understanding-event-loop/).

## Setting Up Web Workers & Multi-threading to JavaScript

### Step 1: Create a project folder and add index.html in the root of it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Club JavaScripters</title>
  </head>
  <body>
    <button>Can you click me?</button>
    <h2>Let's do the party. 👯‍♂️‍</h2>
    <ul id="club"></ul>
    <script src="./main.js"></script>
  </body>
</html>
```

We just created a simple HTML page with a link to our javascript file which we will create in a moment.

### Step 2: Let's add our JavaScript code in two separate files, `main.js` and `worker.js` in the same folder.

`main.js`

```javascript
const persons = [
  {
    name: "Hriday",
    isMember: true,
  },
  {
    name: "Hridayesh",
    isMember: false,
  },
  {
    name: "Bob",
    isMember: true,
  },
  {
    name: "Daisy",
    isMember: true,
  },
]

// Our club container
const club = document.getElementById("club")
let worker

/**
 * Function entry allows entry to people coming to our club
 */
function entry(persons) {
  persons.forEach(person => {
    const { isMember, name } = person
    const listItem = document.createElement("li")
    listItem.textContent = name
    // if a person is not registered, register them first
    if (!isMember) {
      // create a new worker thread
      worker = new Worker("worker.js")
      // pass data to worker thread
      worker.postMessage(name)
      // listen to any data passed from worker thread
      worker.addEventListener("message", event => {
        if (event.data) {
          club.appendChild(listItem)
        }
      })
    } else {
      // if they are registered let them in
      club.appendChild(listItem)
    }
  })
}

entry(persons)
```

`worker.js`

```javascript
// addEventListener is directly accessible in worker file
addEventListener("message", event => {
  // extract person passed from main thread from event object
  let person = event.data
  registerMember(person)
})

function registerMember(member) {
  // generating membership card takes some amount of time
  let i = 0
  while (i < Math.pow(10, 10)) {
    i++
  }
  // send result back to the main thread
  postMessage(true)
  close()
}
```

### Step 3: On to some Explanations about what just happened.

Now, the problem I faced when I went to the club with Hriday was that I (and everyone else after me) had to wait for my registration process to complete. We don't want that to happen to our virtual club and therefore we added one more person (thread) who is in charge of the whole registration process. Once registration is done, he will tell the main guy(thread) to let the new person in.

### Here's what we did to solve it in our code.

1. First of all we check for each person if they are a member or not. If they are, we let them in.
2. If someone is not a member of the club yet, we create a worker thread for it using `new Worker('path to worker code')` and pass that person to the worker thread using `worker.postMessage()` and add the person as a member after registering them.
3. To simulate the registration process we are doing some processing using a long `while` loop. In real life this could be some cryptographic code, image processing or anything that is CPU intensive and might block the main thread and make the page unresponsive.
4. Once registered, the worker thread let's the main thread know about it by sending data using `postMessage` and the main thread listens for it using `onmessage handler` and lets the person in the club i.e add to DOM.
5. Once we get the result from the worker thread, we close it using `close()`.

## Web Workers FAQs

### How do the main thread and worker threads talk to each other?

They talk to each other by message passing. Both workers and the main thread use `postMessage` to send data to each other and `onmessage` event handler to get data. The data is available inside the event's data property.
You can only pass one argument to `postMessage`. If you wish to pass multiple arguments use an `object` instead.

### Can I update DOM in a worker thread or access window object?

No you can not update DOM in a worker thread as worker threads run in a separate context from the main window and don't have access to `window` object and `document` object but they do have access to some of the `window` object's capabilities like `Websockets` and `indexedDB`.

### Why did you add worker code in a separate file?

It's important that the worker code must be in a separate file, which we can use to create a separate worker thread by using the `Worker` constructor and passing it the path of the file.

### Why did you add that button? I can easily click it.

You were able to click that button because we did not block the main thread.
To see the difference add the following code to `main.js` and see the difference.

```javascript
const persons = [
  {
    name: "Joe",
    isMember: true,
  },
  {
    name: "Hriday",
    isMember: true,
  },
  {
    name: "Hridayesh",
    isMember: false,
  },
  {
    name: "Bob",
    isMember: true,
  },
  {
    name: "Daisy",
    isMember: true,
  },
]

// Our club container
const club = document.getElementById("club")
let worker

function entry() {
  persons.forEach(person => {
    const { isMember, name } = person
    const listItem = document.createElement("li")
    listItem.textContent = name
    if (!isMember) {
      let memeberAdded = registerMember(person)
      if (memeberAdded) club.appendChild(listItem)
    } else {
      club.appendChild(listItem)
    }
  })
}

entry()

function registerMember(member) {
  let i = 0
  while (i < Math.pow(10, 10)) {
    i++
  }
  return true
  close()
}
```

### Could you still click the button?

You can share that answer in the comment section 😉 To get the full code you can visit to [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/JavaScript/WebWorkers)

## Conclusion

We introduced web workers in this article, a technology that helps the web industry keep up with demanding web applications. This is achieved by providing web apps with a way to exploit multiprocessor and multi-threaded machines by granting JavaScript some multi-threaded superpowers.

Do you have any tips on web workers and the web as a forum for programming? Let us know in the comment section below.
