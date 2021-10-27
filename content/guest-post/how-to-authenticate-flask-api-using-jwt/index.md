---
title: How To Authenticate Flask API Using JWT
date: "2021-10-20"
coverImage: "coverImage.png"
author: "Babatunde Koiki"
tags: ["Flask", "JWT", "API"]
description: "This article is a step-by-step guide to implementing authentication in Flask API using JWT."
---

Authentication is an essential part of any web application. But unfortunately, it is not always easy to implement.

## What is Authentication?
Authentication is a process of verifying that an entity is who they claim to be. For example, a user might authenticate by providing a username and password. If the username and password are valid, the system would check to see if the user can access the resource. After the system checks the user's details against its database and if the details are valid, the user is thus authenticated and can access resources that are available to the user.

## Authentication Factors

The following factors are used to authenticate a user.

### Single-factor Authentication

This authentication is used when a user provides a username/email/phone number and a password. This is the most common and weakest authentication factor. The user simply inputs the email and password, and the system checks if the data is valid; if valid, the user gets authenticated and can access the resource. What happens if another person who is not the legitimate user tries to access the resource? The system denies access to the resource.

### [Multi-factor Authentication](https://www.loginradius.com/multi-factor-authentication/)

This authentication uses more than one factor to authenticate a user. For example, the user tries to log in with, say, email and password; if the data is correct, a code is sent to the user's phone number, and the user is asked to input the code. If the user enters the code, the user gets logged in; otherwise, the user is not authenticated. Some applications even go a step further by not using two factors but using three factors.

## Types of Authentication

There are basically three types of authentication, as follows:

1. **Knowledge Authentication**: The user is asked something that only they can provide or know -- e.g., password. This is the most common type and also the easiest.
2. **Property Authentication**: The user is asked for something they own or possess. For example, they can be asked their pet's name. The idea here is that users will be asked to set a security question and answer when creating an account. This isn’t always used alone; it’s used alongside another authentication type, say, `Knowledge authentication`.
3. **Biological Authentication**: The user is asked to verify their identity using something biologically unique to them -- e.g, a fingerprint or iris scan.

In most applications, knowledge and property authentication are used as an extra layer of the authentication.


## Authentication vs. Authorization

The following are the differences between authentication and authorization:

1. Authentication verifies identity (usually through credential validation)) while authorization grants or denies permissions to a user.

2. Authentication is used to verify that a user is who they say they are. Authorization is used to verify that a user has permission to do something.

## Starter Application

In this tutorial, you'll work on authentication middleware for an existing API built with Flask and PyMongo. The API is a book library API using which users can create books and upload cover images for the books and relevant data. PyMongo is used to connect to the mongo database. You'll use the PyJWT library to generate and verify JWT tokens. 

To get started, clone the repository and set up the application by running the following commands:

```bash 
git clone https://github.com/Babatunde13/loginRadius-flask-auth.git # Clone the repository
cd loginRadius-flask-auth # change directory
git checkout start # check out the start branch
virtualenv venv # create virtual environment
source venv/bin/activate # activate virtual environment
pip install -r requirements.txt # install dependencies
```

The application is now set up and ready to run. You can run the app by using the command `flask run` in the project directory. You can test that all the endpoints are working by testing the app in an API testing tool, like postman.

## Authentication Middleware

As you've noticed, anybody can access the API; you need to restrict access to the API. Create new book data if they have the correct data, then add, delete, and update book data, but you don't want that. To do this, you need to implement an authentication middleware. 

Middlewares are created in Flask by creating a decorator; a function can have multiple middlewares, and the order matters a lot.

To create your auth middleware, you need to install PyJWT -- the library you'll use to generate tokens. You’ll also use Pillow to alter image data before saving them to disk. Run the following command to install the packages:

```bash
pip install pyjwt pillow
```

You need to add a secret key to your application; this is what you should pass to JWT.

Add the following to your `app.py` file below the app declaration.

```python
# app = Flask(__name__)

app.config['SECRET_KEY']='some secret text' # this text should be make secret
```

Let's create a file called `auth_middleware.py` in the root of your application and place the following inside this file:

```python
import jwt
from functools import wraps
from flask import request, abort
from app import app as current_app
import models

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token: 
            return {
                "message": "Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user=models.User().get_by_id(data["user_id"])
            if current_user is None:
                return {
                  "message": "Invalid Token!",
                  "data": None,
                  "error": "Unauthorized"
            }, 401
            if not current_user["active"]:
                abort(403)
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500
        return f(current_user, *args, **kwargs)
    return decorated

```

The function above is simply a decorator function. Inside this function, you check if there is an `Authorization` field in the headers part of the request; if this is missing, you return an authorization error.

Next, you check if it exists but is not valid; if it is not valid, you also return an authorization error. 

If everything goes fine, then the view function is called. As you can see, you return `f(current_user, *args, **kwargs)`, where `f` is the next decorator or function that's being called after this decorator -- in your case, the view function, which means that the first argument of any view function that uses this decorator must be `current_user`.

## Auth Routes

You currently have a route to creating a new user, but you don't have one to log in. From what you have above, you're checking if the token passed as the header is valid, but now the question is -- how do you get to know the token. Basically, the login route is where you fetch the token and send it to the client.

Add the following function below the `add_user` function:

```python
@app.route("/users/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        # validate input
        if not validate_email_and_password(**data):
            return dict(message='Invalid data', data=None), 400
        user = User().login(
            data["email"], 
            data["password"]
        )
        if user:
            try:
                user["token"] = jwt.encode(
                    {"user_id": user["_id"]},
                    app.config["SECRET_KEY"]
                )
                return {
                    "message": "Successfully fetched auth token",
                    "data": user
                }
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        return {
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }, 404
    except Exception as e:
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500

```

## Protecting API Routes in Flask

So far, you've been able to create your auth middleware, but you need to use this middleware to protect routes. All you need to do is to pass this middleware immediately after the `app.route` middleware, then make `current_user` the first argument of the view function, as follows:

```python

@app.route('/')
@token_required
def user(current_user):
  return jsonify(current_user)

@app.route('/<pdt_id>')
@token_required
def product(current_user, pdt_id):
  return jsonify(Product.find({'user_id': pdt_id}))

```

Add this middleware (`@token_required`) to every function you only want the authenticated users to access. In the end, your whole `app.py` file should look as follows.

```python

from bson.objectid import ObjectId
from save_image import save_pic
import jwt
from validate import validate_book, validate_email_and_password, validate_user
from flask import Flask, request, jsonify
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
from models import Books, User
from auth_middleware import token_required

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/users/", methods=["POST"])
def add_user():
    try:
        user = request.json
        if not user:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        if not validate_user(**user):
            return dict(message='Invalid data', data=None, error=""), 400
        user = User().create(**user)
        if not user:
            return {
                "message": "User already exists",
                "error": "Conflict",
                "data": None
            }
        return {
            "message": "Successfully created new user",
            "data": user
        }, 201
    except Exception as e:
        return {
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }, 500

@app.route("/users/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        # validate input
        if not validate_email_and_password(**data):
            return dict(message='Invalid data', data=None), 400
        user = User().login(
            data["email"], 
            data["password"]
        )
        if user:
            try:
                user["token"] = jwt.encode(
                    {"user_id": user["_id"]},
                    app.config["SECRET_KEY"]
                )
                return {
                    "message": "Successfully fetched auth token",
                    "data": user
                }
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        return {
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }, 404
    except Exception as e:
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500

@app.route("/users/", methods=["GET"])
@token_required
def get_current_user(current_user):
    return jsonify({
        "message": "successfully retrieved a user",
        "data": current_user
    })

@app.route("/users/", methods=["PUT"])
@token_required
def update_user(current_user):
    try:
        user = request.json
        if user.get("name"):
            user = User().update(current_user["_id"], user["name"])
            return jsonify({
                "message": "successfully updated account",
                "data": user
            }), 201
        return {
            "message": "Invalid data, you can only update your account name!",
            "data": None,
            "error": "Bad Request"
        }, 400
    except Exception as e:
        return jsonify({
            "message": "failed to update account",
            "error": str(e),
            "data": None
        }), 400

@app.route("/users/", methods=["DELETE"])
@token_required
def disable_user(current_user):
    try:
        User().disable_account(current_user["_id"])
        return jsonify({
            "message": "successfully disabled account",
            "data": None
        }), 204
    except Exception as e:
        return jsonify({
            "message": "failed to disable account",
            "error": str(e),
            "data": None
        }), 400

@app.route("/books/", methods=["POST"])
@token_required
def add_book(current_user):
    try:
        book = dict(request.form)
        if not book:
            return {
                "message": "Invalid data, you need to give the book title, cover image, author id,",
                "data": None,
                "error": "Bad Request"
            }, 400
        if not request.files["cover_image"]:
            return {
                "message": "cover image is required",
                "data": None
            }, 400
        book["image_url"] = request.host_url+"static/books/"+save_pic(request.files["cover_image"])
        if not validate_book(**book, user_id=ObjectId(current_user["_id"])):
            return {
                "message": "Invalid data",
                "data": None,
                "error": "Bad Request"
            }, 400
        book = Books().create(**book, user_id=current_user["_id"])
        if not book:
            return {
                "message": "The book has been created by user",
                "data": None,
                "error": "Conflict"
            }, 400
        return jsonify({
            "message": "successfully created a new book",
            "data": book
        }), 201
    except Exception as e:
        return jsonify({
            "message": "failed to create a new book",
            "error": str(e),
            "data": None
        }), 500

@app.route("/books/", methods=["GET"])
@token_required
def get_books(current_user):
    try:
        books = Books().get_by_user_id(current_user["_id"])
        return jsonify({
            "message": "successfully retrieved all books",
            "data": books
        })
    except Exception as e:
        return jsonify({
            "message": "failed to retrieve all books",
            "error": str(e),
            "data": None
        }), 500

@app.route("/books/<book_id>", methods=["GET"])
@token_required
def get_book(current_user, book_id):
    try:
        book = Books().get_by_id(book_id)
        if not book:
            return {
                "message": "Book not found",
                "data": None,
                "error": "Not Found"
            }, 404
        return jsonify({
            "message": "successfully retrieved a book",
            "data": book
        })
    except Exception as e:
        return jsonify({
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }), 500

@app.route("/books/<book_id>", methods=["PUT"])
@token_required
def update_book(current_user, book_id):
    try:
        book = Books().get_by_id(book_id)
        if not book or book["user_id"] != current_user["_id"]:
            return {
                "message": "Book not found for user",
                "data": None,
                "error": "Not found"
            }, 404
        book = request.form
        if book.get('cover_image'):
            book["image_url"] = request.host_url+"static/books/"+save_pic(request.files["cover_image"])
        book = Books().update(book_id, **book)
        return jsonify({
            "message": "successfully updated a book",
            "data": book
        }), 201
    except Exception as e:
        return jsonify({
            "message": "failed to update a book",
            "error": str(e),
            "data": None
        }), 400

@app.route("/books/<book_id>", methods=["DELETE"])
@token_required
def delete_book(current_user, book_id):
    try:
        book = Books().get_by_id(book_id)
        if not book or book["user_id"] != current_user["_id"]:
            return {
                "message": "Book not found for user",
                "data": None,
                "error": "Not found"
            }, 404
        Books().delete(book_id)
        return jsonify({
            "message": "successfully deleted a book",
            "data": None
        }), 204
    except Exception as e:
        return jsonify({
            "message": "failed to delete a book",
            "error": str(e),
            "data": None
        }), 400

if __name__ == "__main__":
    app.run(debug=True)

```

Before running the application, you need to create the `save_pic` function inside the `save_image.py` file. This is the function responsible for saving uploaded pictures.

```python
from PIL import Image
import secrets, os
from flask import current_app as app

def save_pic(picture):
    file_name = secrets.token_hex(8) +os.path.splitext(picture.filename)[1]
    if not os.path.isdir(os.path.join(app.root_path, 'static')):
        os.mkdir(os.path.join(app.root_path,"static"))
        os.mkdir(os.path.join(app.root_path,"static/images"))
        os.mkdir(os.path.join(app.root_path,"static/images/books"))
    if not os.path.isdir(os.path.join(app.root_path, 'static/images')):
        os.mkdir(os.path.join(app.root_path,"static/images"))
        os.mkdir(os.path.join(app.root_path,"static/images/books"))
    if not os.path.isdir(os.path.join(app.root_path, 'static/images/books')):
        os.mkdir(os.path.join(app.root_path,"static/images/books"))
    file_path = os.path.join(app.root_path, "static/images/books", file_name)
    picture = Image.open(picture)
    picture.thumbnail((150, 150))
    picture.save(file_path)
    return file_name

```

You should also add the following functions as helper methods of the `User` model class.

```python
def disable_account(self, user_id):
    user = db.users.update_one(
        {"_id": bson.ObjectId(user_id)}, 
        {"$set": {"active": False}}
    )
    user = self.get_by_id(user_id)
    return user

def encrypt_password(self, password):
    return generate_password_hash(password)

def login(self, email, password):
    user = self.get_by_email(email)
    if not user or not check_password_hash(user["password"], password):
        return user
    return user

```

Your `models.py` file should look as follows:

```python
import bson
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient("mongodb://localhost:27017/myDatabase")
db = client.myDatabase

class Books:
  def __init__(self):
      return
  
  def create(self, title="", description="", image_url="", category="", user_id=""):
      book = self.get_by_user_id_and_title(user_id, title)
      if book:
          return
      new_book = db.books.insert_one(
          {
              "title": title,
              "description": description,
              "image_url": image_url,
              "category": category,
              "user_id": user_id
          }
      )
      return self.get_by_id(new_book.inserted_id)

    
    def get_all(self):
        books = db.books.find()
        return [{**book, "_id": str(book["_id"])} for book in books]

    def get_by_id(self, book_id):
        book = db.books.find_one({"_id": bson.ObjectId(book_id)})
        if not book:
            return
        book["_id"] = str(book["_id"])
        return book

    def get_by_user_id(self, user_id):
        books = db.books.find({"user_id": user_id})
        return [{**book, "_id": str(book["_id"])} for book in books]

    def get_by_category(self, category):
        books = db.books.find({"category": category})
        return [book for book in books]

    def get_by_user_id_and_category(self, user_id, category):
        books = db.books.find({"user_id": user_id, "category": category})
        return [{**book, "_id": str(book["_id"])} for book in books]

    def get_by_user_id_and_title(self, user_id, title):
        book = db.books.find_one({"user_id": user_id, "title": title})
        if not book:
            return
        book["_id"] = str(book["_id"])
        return book

    def update(self, book_id, title="", description="", image_url="", category="", user_id=""):
        data={}
        if title: data["title"]=title
        if description: data["description"]=description
        if image_url: data["image_url"]=image_url
        if category: data["category"]=category
        book = db.books.update_one(
            {"_id": bson.ObjectId(book_id)},
            {
                "$set": data
            }
        )
        book = self.get_by_id(book_id)
        return book

    def delete(self, book_id):
        book = db.books.delete_one({"_id": bson.ObjectId(book_id)})
        return book

    def delete_by_user_id(self, user_id):
        book = db.books.delete_many({"user_id": bson.ObjectId(user_id)})
        return book

class User:
    def __init__(self):
        return

    def create(self, name="", email="", password=""):
        user = self.get_by_email(email)
        if user:
            return
        new_user = db.users.insert_one(
            {
                "name": name,
                "email": email,
                "password": self.encrypt_password(password),
                "active": True
            }
        )
        return self.get_by_id(new_user.inserted_id)

    def get_all(self):
        users = db.users.find({"active": True})
        return [{**user, "_id": str(user["_id"])} for user in users]

    def get_by_id(self, user_id):
        user = db.users.find_one({"_id": bson.ObjectId(user_id), "active": True})
        if not user:
            return
        user["_id"] = str(user["_id"])
        return user

    def get_by_email(self, email):
        user = db.users.find_one({"email": email, "active": True})
        if not user:
            return
        user["_id"] = str(user["_id"])
        return user

    def update(self, user_id, name=""):
        data = {}
        if name:
            data["name"] = name
        user = db.users.update_one(
            {"_id": bson.ObjectId(user_id)},
            {
                "$set": data
            }
        )
        user = self.get_by_id(user_id)
        return user

    def delete(self, user_id):
        Books().delete_by_user_id(user_id)
        user = db.users.delete_one({"_id": bson.ObjectId(user_id)})
        user = self.get_by_id(user_id)
        return user

    def disable_account(self, user_id):
        user = db.users.update_one(
            {"_id": bson.ObjectId(user_id)}, 
            {"$set": {"active": False}}
        )
        user = self.get_by_id(user_id)
        return user

    def encrypt_password(self, password):
        return generate_password_hash(password)

    def login(self, email, password):
        user = self.get_by_email(email)
        if not user or not check_password_hash(user["password"], password):
            return user
        return user

```

## Conclusion
This article has explained what authentication is and how to authenticate a Flask API with JWT. 

In some cases, handling authentication yourself may not be good enough, and third-party authentication providers like LoginRadius will be what you can use. You can check out this [tutorial](https://www.loginradius.com/docs/developer/tutorial/python/) on connecting LoginRadius to your Flask application.

You can find the full code for this article on [Github](https://github.com/Babatunde13/loginRadius-flask-auth). You can reach out to me on [Twitter](https://twitter.com/bkoiki950) if you've any questions.
