---
title: "Web Workers in JS - An Introductory Guide"
date: "2020-12-28"
coverImage: "unsplash.png"
author: "Nick Chim"
tags: ["Web Workers"]
description: "Learn how to use JavaScript web workers to create parallel programming and execute multiple operations concurrently rather than interconnecting them."
---

In JavaScript, web workers allow developers to benefit from parallel programming. Parallel programming enables various computations to be performed at the same time by applications. 

Web Workers are a browser feature that allows scripts to be executed on a separate thread from the main execution thread of your web application. This allows the main thread of your web application to run without being blocked by slow scripts in your application.

### Isn't JavaScript already asynchronous?

Well, sort of. This has been something that had confused me many a time when I was initially learning about JavaScript. JavaScript a synchronous, single-threaded language. However, JavaScript has features that allow you to execute asynchronous code, which is handled by browser engines (on your client) or by your OS (in NodeJS), which are capable of executing code in multiple threads.

We work with asynchronous methods in JavaScript by either using callbacks, [Promises or async/await](https://compile7.org/decompile/callback-vs-promises-vs-async-await/). We'll use Promises as an example for exploring asynchronicity in JavaScript.

Promises are proxies for values that are not yet available when the Promise is created. This lets you organize parts of your code to run when the value becomes available or if something goes wrong.

This does not mean that your code is running asynchronously. As I mentioned before, JavaScript code is executed on a single thread. The callback that processes the response from your created Promises still runs on your single main thread. Promises do, however, allow you to spawn asynchronous tasks, such as file I/O or making an HTTP request which runs outside of your code. This allows your main thread to work on something else while waiting for these tasks to return a response. This means that the callback functions which run after a response is received are called asynchronously.

I feel that the distinction between your code running asynchronously vs. being called asynchronously is important, as you will see that you are not able to perform computationally expensive tasks without blocking your main thread, even when using Promises.

Here is an example of using an expensive function (finding prime numbers) wrapped in a Promise.

```javascript
function findPrimeNumbers(max) {
    return new Promise((resolve) => {
        console.log("starting findPrimeNumbers");
        let primes = [];
        for (let i = 0; i < max; i++) {
            if (i === 0 || i === 1) {
                continue;
            }
            let isPrime = true;
            for (let y = 2; y < i; ++y) {
                if (i % y === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(i);
            }
        }
        console.log("prime numbers found");
        resolve(primes);
    });
}

console.log("a");
findPrimeNumbers(100000).then(() => {
  console.log("b");
});
console.log("c");
```

You'll find that the above program will print the following:

```javascript
a
starting findPrimeNumbers
prime numbers found
c
b
```

The ordering of `a`, `b`, and `c` is not particularly noteworthy, as we already know that the callback for the `findPrimeNumbers` function will only execute after the main thread has nothing left to do, after printing `c`.

What I did find interesting was that the statement printing `c` waits until the `findPrimeNumbers` function completes before being executed. To prevent functions like this from blocking the main thread, we'll have to use Web Workers.

Web Workers run in a separate thread altogether, with no access to the context of the main thread. Data is sent between the worker and the main thread using a system of messages: the `postMessage()` method is used to send a message from one to the other, and the `onmessage` event handler is used to receive and respond to messages.

First we need to create the script (we'll just call it `find-prime-numbers.js`) that the Web Worker will run:

```javascript
onmessage = (event) => {
  const { data } = event;
  const primes = findPrimeNumbers(parseInt(data));
  postMessage(primes);
};

function findPrimeNumbers(max) {
    console.log("starting findPrimeNumbers");
    let primes = [];
    for (let i = 0; i < max; i++) {
        if (i === 0 || i === 1) {
            continue;
        }
        let isPrime = true;
        for (let y = 2; y < i; ++y) {
            if (i % y === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    console.log("prime numbers found");
    return primes;
}  
```

The `onmessage` handler receives an event with the message itself contained in the event's `data` attribute. Here we execute the `findPrimeNumbers()` function again, and use `postMessage()` function to send the result back to the main thread.

Over in your main script, we'll create a worker object using the constructor `new Worker()`, which runs the named JavaScript file containing the code that we just wrote, which will run in the worker thread.

```javascript
const primeNumberWorker = new Worker("./find-prime-numbers.js");
primeNumberWorker.onmessage = (event) => {
    console.log("b");
};

console.log("a");
primeNumberWorker.postMessage("100000");
console.log("c");
```

Running this script will print the following:

```
a
c
starting findPrimeNumbers
prime numbers found
b
```

You can see that this time, the prime numbers function is actually running on a thread separate from our main one, which allows the main thread to continue printing the statement `c` while the worker thread works out its own response.

### When should you use JavaScript Web Worker

To reiterate, Web Workers allow you to run your own [code on a separate thread](https://www.loginradius.com/blog/engineering/adding-multi-threading-to-javascript-using-web-workers/), which allows your main thread to continue rendering the UI, receive user input, etc., while your worker thread processes a response. 

For most web applications, the most expensive operations in your code will often be I/O, interacting with resources in your network. Thanks to [JavaScript's Event Loop](https://www.loginradius.com/blog/engineering/understanding-event-loop/), these are already offloaded from your main thread to your system's operating system. As such, there is no need for Web Workers when making these kinds of operations. 

If you need to process large sets of data, there is a decent chance that you will be able to perform this on your server-side before sending it to your front end client for display to the user. This will allow you to rely on JavaScript's event loop to prevent these expensive operations from blocking your main thread.

However, if your scenario must have these long-running tasks running on your client end, Web Workers would be an ideal solution for your needs. Some examples of these could be:

- As-you-type string validation, in situations where your validation logic is complex, such as a spell checker.
- Encrypting and decrypting data within your client, especially in cases where data is being exchanged frequently and cannot be exposed to your server.
- Client-side workspaces to allow your users to process and manipulate data before sending it to your server.

### Javascripty Web Worker Limitations

As Web Workers work on a separate thread, it has no access to the parent page, which calls it. This means that the worker itself cannot manipulate the DOM nor access any data stored within it. It is not able to access the browser's localStorage and sessionStorage either. You are limited to the data sent directly via `postMessage` or IndexedDB for accessing stored client data.

As with anything multithreaded, adding Web Workers into your application will add complexity to your application. Natively, `postMessage` is the only direct line of communication between threads. You will need to define how more complex workflows will be managed between your main thread and worker thread (such as error handling).

If your worker can be triggered multiple times, each request will simply be queued and will run when the previous has been completed. For more complex queuing mechanisms, you would have to define this yourself.

### Conclusion

With discussions dating back a decade, Web Workers are not a new feature. Despite their powerful potential, they haven't been widely adopted. Client side applications, for the most part, just haven't needed to perform intensive tasks where Web Workers would have been a solution. In addition, with a lack of widespread use, finding relatable examples to reference when implementing them is an extra barrier for adoption. 
