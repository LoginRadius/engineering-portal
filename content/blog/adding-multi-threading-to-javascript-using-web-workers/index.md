---
title: "Web Workers: Adding Multi-threading to JavaScript"
date: "2020-09-07"
coverImage: "cover.jpg"
author: "Hridayesh Sharma"
tags: ["JavaScript", "Web"]
description: "Web workers have been around for a long time and add multi-threading capability to JavaScript. Let's dive in and see how they work."
---

Once upon a time, me and my friend Hriday went to a club called **JavaScripters**. The club had some rules, that in order to enter you need to be a member of the club. There was this guy at the door who was checking for membership and if you are not a member, he would register you right there and give you a membership card. Hriday was a long time member and went in, and me, it was just my first time to any club. 😅 So, I got stuck in the registration process and so did everyone else after me. After 2-3 minutes I went in and everyone else after me.

While coming back, I thought why don't these guys add one more person who would be in charge of registring people and once registred can be allowed entry, so that others don't get stuck and someone like me doesn't get yelled at for no reason.😏
It appears that like JavaScript they are single-threaded too and don't know about web workers yet.🤔

##### Well, let's teach them some basics about web workers. 😎

## Web Workers: Adding Multi-threading to JavaScript

### What are web workers ?

_From MDN_:

> Web Workers makes it possible to run a script operation in a background thread separate from the main execution thread of a web application. The advantage of this is that laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.

In short, web workers let's you do multi-threading in JavaScript which is a single-threaded language.

Let's create our own virtual **JavaScripters** and we are going to make sure that someone innocent doesn't gets yelled at by adding multi-threading to our JavaScript using web workers. 🤩

### Let's get the party started. 🕺

#### Step 1: Create a project folder and add index.html in the root of it.

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

#### Step 2: Let's add our JavaScript code in two separate files, `main.js` and `worker.js` in the same folder.

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
const club = document.getElementById("root")
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
        if (e.data) {
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
  let person = e.data
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

#### Step3: On to some Explanations about what just happened.

Now, the problem I faced when I went to the club with Hriday was that I (and everyone else after me) had to wait for my registration process to complete. We don't want that to happen to our virtual club and therefore we added one more person (thread) who is in charge of the whole registration process. Once registration is done, he will tell the main guy(thread) to let the new person in.

#### Here's what we did to solve it our code.

1. First of all we check for each person if they are a member or not. If they are, we let them in.
2. If someone is not a member of the club yet, we create a worker thread for it using `new Worker('path to worker code')` and pass that person to the worker thread using `worker.postMessage()` and add the person as a member after registering them.
3. To simulate the registration process we are doing some processing using a long `while` loop. In real life this could be some cryptographic code, image processing or anything that is CPU intensive and might block the main thread and makes page unresponsive.
4. Once registered, the worker thread let's the main thread know about it by sending data using `postMessage` and the main thread listens for it using `onmessage handler` and let's the person in the club i.e add to DOM.
5. Once we get the result from the worker thread, then we close it using `close()`.

#### Let's understand more about web workers.

##### How do the main thread and worker threads talk to each other?

They talk to each other by message passing. Both workers and the main thread use `postMessage` to send data to each other and `onmessage` event handler to get data. The data is available inside the event's data property.
You can only pass one argument to `postMessage`. If you wish to pass multiple arguments use an `object` instead.

##### Can I update DOM in a worker thread or access window object?

No you can not update DOM in a worker thread as worker threads run in a separate context from the main window and don't have access to `window` object and `document` object but they do have access to some of the `window` object's capabilities like `Websockets` and `indexedDB`.

##### Why did you add worker code in a separate file?

It's important that the worker code must be in a separate file, which we can use to create a separate worker thread by using the `Worker` constructor and passing it the path of the file.

##### Why did you add that button? I can easily click it. 🤔

You were able to click that button because we did not block the main thread. 😃
To see the difference add the following code to `main.js` and see the difference. 😬

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
const club = document.getElementById("root")
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

##### Could you still click the button? 😉

To get the full code go to [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/JavaScript/WebWorkers)