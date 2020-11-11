---
title: "Password Hashing in NodeJS using Bcrypt"
date: "2020-11-11"
coverImage: "index.jpg"
author: "Hridayesh Sharma"
tags: ["NodeJS", "JavaScript", "Hashing"]
description: "Storing plain text passwords is one of the worst habits of our time. Don't store plain text passwords, use passwords hashing instead."
---

Imagine a scenario where you store all the user passwords in plain text in your database i.e passwords are stored as it is in the database without any modification. Now some hacker gets access to your database and they can see any of the user credentials stored in the database and do whatever they want. Congratulation, all your user data is compromised.

What if we could prevent this from happening? What if there was a way to prevent a hacker to get access to your user passwords even if your database is compromised? Yes, there is one called **Password Hashing**.

### What is password hashing?
Hashing is a one-way ticket to data encryption. Hashing performs a one-way transformation on a password, turning the password into another String, called the hashed password. Hashing is called one way because it's practically impossible to get the original text from a hash.

### Prerequisites
Before moving on I am assuming you have some idea about the following:
  - Working with Node Ecosystem
  - A brief idea about MongoDB
  - and Some JavaScript Knowledge
  
Make sure you have the following installed on your system to move forward with the blog
  - [NodeJS](https://nodejs.org/en/) and npm
  - [MongoDB](mongodb.com)


### Let's implement passwords hashing in our node application!

**Step 1**: Create a new directory and initialize a new project in it using.
```bash
  npm init -y
```

**Step 2**: Installing some of the project dependencies.

We will be using `expressjs` to create a new server and `mongoose` to interact with mongodb in our node application. 

```bash
  npm install --save mongoose express
```


**Step 3**: Let's write our server using express and connect it to mongodb using mongoose.

  - create a new file called server.js in the root of the project.
  
  `server.js`
  ```js
    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    // to parse json data from request object
    app.use(express.json())


    mongoose.connect("mongodb://localhost:27010/demo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log("Connected to DB"))
      .catch (console.error);

    app.listen(3000, () => console.log("Running on port 3000"))
  ```

Run your server using `node server.js`. This is a simple server running on port 3000. Here we are using express' json middleware to parse form data.

Note: In order to see updated changes after every step you need to run your server multiple times or you can use a package like [nodemon](https://www.npmjs.com/package/nodemon) which will watch for any file changes.

**Step 4** Now we will create our user schema
  - create a file called `userModel.js` in the root of the project and add the following code to it.
  
  `userModel.js`
  ```js
    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
      email: String,
      password: String,
    })

    module.exports = mongoose.model('user', UserSchema)
  ```

  Here we created a simple user model with email and password and exported it. I am not using any validations here as this is not a tutorial on mongoose. You must use data validations in a real application.
  
**Step 5** Create our routes for login and singup

  - Install the bcrypt module in our project: `npm i --save bcrypt`.
  - create a separate file called `userRoutes.js` in the root of the project and add the following code in it
  
  `userRoutes.js`
  ```js
    const bcrypt = require("bcrypt");
    const express = require("express");
    const User = require("./userModel");
    const router = express.Router();
    // signup route
    router.post("/signup", async (req, res) => {
      const body = req.body;

      if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
      }

      // createing a new mongoose doc from user data
      const user = new User(body);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      user.save().then((doc) => res.status(201).send(doc));
    });

    // login route
    router.post("/login", async (req, res) => {
      const body = req.body;
      const user = await User.findOne({ email: body.email });
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          res.status(200).json({ message: "Valid password" });
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
    });

    module.exports = router;
  ```
  Here we used express Router to create our routes in a separate file so that we can keep our `server.js` as clean as possible.

  We are using `bcrypt` to hash user password and then store them in the database. This way we are not storing the plain text passwords in the database and even if someone can get access to hashed password they won't be able to login.

  - Import the user routes in the server.js. See upadted code below.
  
  `server.js`
  ```js
    const express = require("express");
    const mongoose = require("mongoose");
    const userRoutes = require("./userRoutes");

    const app = express();

    mongoose
      .connect("mongodb://localhost:27017/demo", { useNewUrlParser: true })
      .then((_) => console.log("Connected to DB"))
      .catch((err) => console.error("error", err));

    app.use(express.json());
    // here we want express to use userRoutes for all requests coming at /auth like /auth/login
    app.use("/auth", userRoutes);

    app.listen(3000, () => console.log("Running on port 3000"));
  ```
  Now we want express to use our userRoutes for all incoming request at `/auth/something`, like `/auth/login` and `/auth/signup`.


With everything in place we have finally got a node server up and running with hashing the passwords instead of storing in plain texts. We have created two routes, one for login and one for signup. We are using hashing while storing the user passwords using `bcrypt.hash` method and later on we compare the origina passwords with hashed password using `bcrypt.comapre` when user logs in.

**Step 6**: Let's test our server now.

Now we will test our server using [Postman](https://www.postman.com/). 
- Creating a new user
  - Create a new user with a random email and password in the request body by sending a `post` request at `http://localhost:3000/auth/signup`. Notice you will get the hashed password in the response. You can also check in the database locally how password is stored. We named our database to be `demo` here.
- Login using above credentials.
  - Similary send a post request at `http://localhost:3000/auth/login` and you will get a message as valid password in the reponse.
  
### Conclusion

Finally we have created a basic node server and implemented password hashing to prevent any attacker to get access to original passwords. Hashing user passwords is really important as user data is very crucial for any organization. You can read more about hashing and encryption at [Encryption and Hashing](https://www.loginradius.com/engineering/blog/encryption-and-hashing/).
The complete code for this blog can be found at [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/NodeJs/BcryptPasswordHasing)


  