---
title: "Password hashing with NodeJS"
date: "2020-06-25"
coverImage: "cover.png"
author: "Ashish Sharma"
tags: ["Security", "NodeJs"]
---

In this blog, we’ll be implementing authentication with password hashing in a Node.js web application. For this, we’ll be using **crypto**, a package password hashing for Node.js.

The Crypto module for Node JS helps developers to hash user passwords.

Pre-requisites: 



*   Basic knowledge of HTML/JavaScript
*   Node js should be installed in your system.
*   express module for creating the server.
*   mongoose module for MongoDB connection and queries.
*   Crypto module for hashing.
*   body-parser for parsing JSON data

Step 1. First, create a directory structure as below :


<code>hashApp</code></strong>


```
--model
----user.js
--route
----user.js
--server.js

```



  Step 2. Create **model/user.js** file and add the following code :


```js
// Importing modules 
const mongoose = require('mongoose'); 
var crypto = require('crypto'); 
  
// Creating user schema 
const UserSchema = mongoose.Schema({ 
    name : { 
        type : String, 
        required : true
    }, 
    email : { 
        type : String, 
        required : true
    }, 
    hash : String, 
    salt : String 
}); 
  
// Method to set salt and hash the password for a user 
UserSchema.methods.setPassword = function(password) { 
     
 // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
     
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
  
// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 
  
// Exporting module to allow it to be imported in other files 
const User = module.exports = mongoose.model('User', UserSchema); 


```


Step 3. Create **route/user.js** file and add the following code:


```js
// Importing modules 
const express = require('express'); 
const router = express.Router(); 

// Importing User Schema 
const User = require('../model/user'); 

// User login api 
router.post('/login', (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 
                return res.status(201).send({ 
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}); 

// User signup api 
router.post('/signup', (req, res, next) => { 


// Creating empty user object 
    let newUser = new User(); 

    // Initialize newUser object with request data 
    newUser.name = req.body.name, 

    newUser.email = req.body.email,


    newUser.password=req.body.password

                    // Call setPassword function to hash password 
                    newUser.setPassword(req.body.password); 

    // Save newUser object to database 
    newUser.save((err, User) => { 
        if (err) { 
            return res.status(400).send({ 
                message : "Failed to add user."
            }); 
        } 
        else { 
            return res.status(201).send({ 
                message : "User added successfully."
            }); 
        } 
    }); 
}); 
// Export module to allow it to be imported in other files 
module.exports = router; 
```


Step 4. Create **server.js** file :


```js
// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
  
// Initialize express app
var app = express();
  
// Mongodb connection url
var MONGODB_URI = "mongodb://localhost:27017/hashAppDb";
  
// Connect to MongoDB
mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB @ 27017');
});
  
// Using bodyparser to parse json data
app.use(bodyparser.json());
  
// Importing routes
const user = require('./route/user');
  
// Use user route when url matches /api/user/
app.use('/api/user', user);
  
// Creating server
const port = 3000;
app.listen(port, () => {
    console.log("Server ru
nning at port: " + port);
});
```


Step 5. Run server.js file using command 


```
node server.js
```


Step 6. Open Postman and create a post request to **localhost:3000/api/user/signup** with following body parameter: 


 ```
{
"name" : "test".
"email" : "test@test.com",
"password" : "test1234"
}
```
Run the request and you will get  a success response:

```
{
"message" : "user added sucessfully"
}
```

User data is stored in the database as below:

 



```
    "_id": {
        "$oid": "5ab71ef2afb6db0148052f6f"
    },
    "name": "test",
    "email": "test@test.com",
    "salt": "ddee18ef6a6804fbb919b25f790005e3",
    "hash": "bbf13ae4db87d475ca0ee5f97e397248a23509fc10c82f1e3cf110
     b352c3ca6cc057955ace9d541573929cd7a74a280a02e8cb549136b43df7704caaa555b38a",
    "__v": 0
}
```


If we have sensitive data or information that you need to be protected, ensuring it is secured correctly is important. With the above process, we can now successfully store our hashed password into our database with a bit of additional security.

You can check the code on [Github](https://github.com/LoginRadius/engineering-blog-samples/tree/master/NodeJs/PasswordHasingNodejs).