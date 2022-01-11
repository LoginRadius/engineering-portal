---
title: "What is an API"
date: "2015-06-23"
coverImage: "whats-an-api-300x300.png"
author: Zoie Carnegie
tags: ["API","Postman"]
---

An API is an acronym for Application Programming Interface. API's include various tools, protocols, and routines. API's are used as a way for applications to communicate with various systems.

But what does this mean? Well let me explain what they are with some examples. I am going to be using various API's for these examples.

**Let's Begin**

Let's start by looking at a favorite website of mine called The Yoda Speak Generator found [here](https://lingojam.com/EnglishtoYoda).

This website allows users to enter text and get a return of that same text formatted the way Yoda might say it. This is done with an API.

Yoda Speak: Fun stuff, api's are! Yes, hmmm.

API’s contain what is called an endpoint to access this API. The endpoint provides the connection to communicate with the API and give it some text to generate into Yoda Speak. The API would then return the generated Yoda Speak to the location of the request.

Another way to think of an API is to think of it like an egg carton. An egg carton holds the eggs, protects them from damage and allows someone who wants to make breakfast a way to open and close the carton to access the eggs inside. The eggs inside would be the data, and the hand reaching into the carton would be much like the communication using an endpoint from a server.

Okay, Let's make breakfast.... Just Kidding!

For those of you who are visual Let's look at some examples of the code. These snippets are in PHP because it is my favorite language. Below is a link to download a small zip file called apidemo.zip.

Demo Link

You can host this directory on your localhost or on a website if you choose.

After you have extracted the zip and have a directory such as localhost/apidemo open a browser and enter http://localhost/apidemo/api.php?request=example&name=yourname where localhost is your domain.

To enter this endpoint in an application that makes API calls try Postman. Here is a [link](http://www.getpostman.com/) for a chrome extension.

Try using a GET and a POST method with parameters request=example for the example function in api.php and name=yourname to output a name

You should now see the output "Your name is yourname" in your browser

explore the files api.php, API.class.php and MyAPI.php to explore how this simple API is taking in the parameters and outputting a name

Hopefully, I have explained API's so you have a basic understanding of what they are. There are many types of API's, one that you may see often is RESTful API's, these unlike this example must abide by constraints that have been defined by the REST architecture.
