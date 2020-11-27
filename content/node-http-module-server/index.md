---
title: "NodeJS Server using Core HTTP Module"
date: "2020-11-27"
coverImage: "coverImage.jpg"
author: "Hridayesh Sharma"
tags: ["NodeJS", "JavaScript"]
description: "Let us understand the core http module in NodeJS, which is the basic building block of frameworks like ExpressJS etc."
---

### Introduction

In this blog, I will show you how to create a NodeJS server using [core http](https://nodejs.org/api/http.html) module.  We will create a simple server that will serve static assets and a simple API to return some JSON data. 

In the process, you will also learn about the request and response objects provided by NodeJS, which are used by every other framework built on top of NodeJS like ExpressJS etc. 

### Prerequisites

1. NodeJS installed on your system. Download from [Here](https://nodejs.org/en/download/)
2. A basic understanding of JavaScript

With that in mind, let's begin.


### Step 1: Initialize the project

- Create a folder by any name and initialize a node project in it using `npm init -y`
  - By this time, you will have a `package.json` file in your directory.
- Create a file called `server.js` in your directory.

### Step 2: Add some static content
- Create a directory called `public` at the root of your project.
- Add a file named `index.html` with the following content
  `index.html`
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Demo</title>
    </head>
    <body>
      <h1>Coming from the Root </h1>
    </body>
    </html>
  ```
### Step 3: Add our server code to serve the static assets

Now we will create a node server that will serve our `index.html` file when a request is sent to `/`.

`server.js`
  ```javascript
    const http = require('http');
    const path = require('path');
    const fs = require('fs');
    const PORT = 3000;
    const hostname = 'localhost';

    // createServer is the http method used to create a web server that takes a callback.
    const server = http.createServer(serverHandler);

    // callback function definition
    function serverHandler(req, res) => {
      if(req.method === 'GET' && req.url === '/') {
        let filePath = path.resolve(__dirname, 'public/index.html')
        let fileExists = fs.existsSync(filePath);
        if (!fileExists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`
            <html>
              <body>
                <h3>Page not found</h3>
              </body>
            </html>`)
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        }
      }
    }

    server.listen(PORT, hostname, () => {
      console.log(`Server running at ${hostname}:${PORT}`);   
    })

  ```

Let's understand what just happened in the above code snippet:

  - First of all, we just created a server using the `createServer` method provided by node `http` module. `createServer` takes a callback which will be called when there is an incoming request with `req` and `res` parameters.

  - In our callback function `serverHandler`, we have used an `if` block to check if the incoming request is a `GET` request and the request `url` is `/` then code inside if statement will be executed.

  - Then, we check if the `index.html` which we want to serve exists or not in our public directory using `existsSync`, which synchronously checks for the file at the given path and returns true if the file exists.

  - Then if the file does not exist, we return a 404 status with an HTML response with a Content-Type header to let the browser know that it's an HTML type response.

  - If the file exists, we create a readable stream from it using `createReadStream` method from `fs` module and pipe it into `res` object which sends it to the browser.

  - Finally, we use `server.listen` to start our server on the PORT 3000.

Now it's time to test our server. Run `node server.js` at the root of the project, and you will see the server running on PORT 3000.
Open your browser and enter `localhost:3000` in the address bar, and you will get the HTML response. 

### Step 4: Add a basic API to return some JSON data

Now we will expand our callback, which we passed to `createServer` to handle one more `GET` request at `/notes`, which will return an array of notes to the browser.

Update the `serverHandler` function with the following code snippet in your `server.js` file

`server.js`
  ```javascript
    ...
      function serverHandler(req, res) {
        if(req.method === 'GET' && req.url === '/') {
          let filePath = path.resolve(__dirname, 'public/index.html')
          let fileExists = fs.existsSync(filePath);
          if (!fileExists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`
              <html>
                <body>
                  <h3>Page not found</h3>
                </body>
              </html>`)
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
          }
        }
        // Newly added code 
        if (req.method === 'GET' && req.url === "/notes") {
          const notes = [
            {
              id: 1,
              title: "Demo Note"
            },
            {
              id: 2,
              title: "Another Note"
            }
          ]

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(notes));
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({message: `${req.method} is not supported for ${req.url}`}))
        } 
    }
    ...
```

- Here, we have added one more `if` statement to handle the request coming at `/notes` .
- We return a notes array in the JSON format, and we are setting the Content-Type header to be of `application/json` for the browser to process it accordingly.
- We have also added an else statement to handle all other requests where we simply return a message to the browser that the request is not supported.
  

With that, we have created a simple node server to serve static content as well a simple API to return JSON data. 


### Conclusion

We saw how we had to handle each request with its method and the URL. With an increasing number of routes, such things become hard to manage as we will have to add multiple if statements. And that's why frameworks like ExpressJS, HapiJS exist, which makes creating servers in NodeJS very easy. But it's important to know what happens under the hood as there is no magic happening in those frameworks.

The complete code for this blog can be found at [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/NodeJs/NodeHTTPServer).
