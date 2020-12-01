---
title: "Upload files using NodeJS + Multer"
date: "2020-10-12"
coverImage: "node-multer-upload.png"
author: Gabriel Rabelo
description: "Learn how to upload files in a NodeJS application using Multer, Multer is a middleware for handling multipart/form-data that is used to send files in forms."
tags: ["NodeJs", "Express", "Multer"]
---

# Introduction

When building APIs, the need to upload files is expected, which can be images, text documents, scripts, pdfs, among others. In the development of this functionality, some problems can be found, such as the number of files, valid file types, sizes of these files, and several others. And to save us from these problems we have the [Multer](https://github.com/expressjs/multer) library. Multer is a node.js middleware for handling `multipart/form-data` that is used to send files in forms.

# First steps

The first step is to create a NodeJS project on your computer.

# Adding Express

In your terminal, type the following command:

```jsx
yarn add express
```

\* _You can also use NPM for installation_

Create a file named `app.js` inside the `src/` folder. The next step is to start our Express server in our `app.js`

```js
const express = require("express")
const app = express()

app.listen(3000 || process.env.PORT, () => {
  console.log("Server on...")
})
```

# Adding Multer

With the project created, configured and with Express installed, we will add the multer to our project.

```js
yarn add multer
```

The next step is to import the multer into our `app.js` file.

```jsx
const multer = require("multer")
```

We are almost there. Now create a folder called `uploads` where we will store the uploaded files.

# Configuring and validating the upload

Now we are at a very important stage which is the configuration of `diskStorage`. `DiskStorage` is a method made available by multer where we configure the destination of the file, the name of the file and we can also add validations regarding the type of the file. These settings are according to the needs of your project. Below I will leave an elementary example of the configuration.

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
```

In the configuration above, we mentioned the destination for the uploaded files and also change the name of the file .

# Providing an upload route

```js
const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})

//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
  console.log(req.files)
  return res.send("Multiple files")
})
```

In the code snippet above, we created 2 POST routes for sending files. The first `/upload/single` route receives only a single file, note that the uploadStorage variable receives our diskStorage settings. As a middleware in the route, it calls the `single` method for uploading a single file. The `/upload/multiple` route receives several files, but with a maximum limit of 10 files, note that the uploadStorage variable now calls the ʻarray` method for uploading multiple files.

# The end

With all the settings done, our little API is already able to store the files sent.

```js
const express = require("express")
const multer = require("multer")

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})
//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
  console.log(req.files)
  return res.send("Multiple files")
})

app.listen(3000 || process.env.PORT, () => {
  console.log("Server on...")
})
```

Now it's up to you!
