---
title: "Upload files using NodeJS + Multer"
date: "2020-10-03"
coverImage: "fb-feat-img-150x150.png" -> Adicionar
author: Gabriel Rabelo
tags: ["NodeJS", "Express", "Multer", "Upload Files"]
---

# Introduction

When building APIs, the need to upload files is common, which can be images, text documents, scripts, pdfs, among others. In the development of this functionality, some problems can be found such as: number of files, valid file types, sizes of these files, and several others. And to solve this problem we have the [Multer](https://github.com/expressjs/multer) library. Multer is a node.js middleware for handling `multipart/form-data` that is used to send files in forms.

# First steps

The first step is to create a NodeJS project on your computer.

# Adding Express

In your terminal, type the following command:

```jsx
yarn add express
```

\* _You can also use NPM for installation_

Create a file named `app.js` inside the `src/` folder. The next step is to start our Express server in our `app.js`

```jsx
const express = require("express")
const app = express()

app.listen(3000 || process.env.PORT, () => {
  console.log("Server on...")
})
```

# Adding Multer

With the project created, configured and with Express installed, we will add the multer to our project.

```jsx
yarn add multer
```

The next step is to import the multer into our `app.js` file

```jsx
const multer = require("multer")
```

We are almost there. Now create a folder called `uploads` where we will store the uploaded files.

# Configuring and validating the upload

Now we are at a very important stage which is the configuration of `diskStorage`. `DiskStorage` is a method made available by multer where we configure the destination of the file, the name of the file and we can also add validations regarding the type of the file. These settings are according to the needs of your project. Below I will leave a very simple example of configuration.

```jsx
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
```

In the configuration above, we indicate the destination for the files received in the upload and the change in the name of this file is also made.

# Providing an upload route

```jsx
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

In the code snippet above we created 2 POST routes for sending files. The first `/upload/single` route receives only a single file, note that the uploadStorage variable receives our diskStorage settings and as a middleware in the route, it calls the `single` method for uploading a single file. The `/upload/multiple` route receives several files, but with a maximum limit of 10 files, note that the uploadStorage variable now calls the ʻarray` method for uploading multiple files.

# The end

With all the settings done, our little API is already able to store the files sent.

```jsx
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

Now it's up to you !
