---
title: Using MongoDB as Datasource in GoLang
date: "2020-09-21"
coverImage: "gomongo.png"
author: "Puneet Singh"
tags: ["Go","MongoDB"]
description: "In this tutorial, we will use the official MongoDB Go Driver to manage our MongoDB database. In the due process, we will write a program to learn how to install the MongoDB Go Driver and perform CRUD operations with it."
---

## Before You Get Started
This tutorial assumes you have:

*   A basic understanding of Go Language
*   Latest GoLang version installed on your system
*   Latest MongoDB version installed on your system

In this tutorial, we will use the official **[MongoDB Go Driver](https://github.com/mongodb/mongo-go-driver/)** to manage our MongoDB database. In the due process, we will write a program to learn how to install the MongoDB Go Driver and perform CRUD operations with it.

## Installation

First in an empty folder run the below command

```
go mod init gomongo
```
`go mod init` creates a new go.mod file and automatically imports dependencies when you will run go program. Then create the file main.go and write the below code, We will explain what this code will do in a min.

```go
package main

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// Book - We will be using this Book type to perform crud operations
type Book struct {
  Title     string
  Author    string
  ISBN      string
  Publisher string
  Copies     int
}

func main() {
    
  // Set client options
  clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

  // Connect to MongoDB
  client, err := mongo.Connect(context.TODO(), clientOptions)

  if err != nil {
    log.Fatal(err)
  }

  // Check the connection
  err = client.Ping(context.TODO(), nil)

  if err != nil {
    log.Fatal(err)
  }

  fmt.Println("Connected to MongoDB!")
  booksCollection := client.Database("testdb").Collection("books")
}
```
In the above code, we have imported the bson, mongo, and mongo/options packages of mongo-driver and defined a `Book` type which will be used in this tutorial

In the main function first, we created clientOptions with MongoDB URL and credentials and pass it to `mongo.Connect` function, Once connected we can check our connection by `client.Ping` function.

The following code will use `booksCollection` variable to query the `books` collection from testdb.

```go
booksCollection := client.Database("testdb").Collection("books")
```

## Insert Documents

First Lets create a Book struct to insert into the collection, in below code we are using `collection.InsertOne` function to insert a single document in the collection

```go
// Insert One document
book1 := Book{"Animal Farm", "George Orwell", "0451526341", "Signet Classics", 100}
insertResult, err := booksCollection.InsertOne(context.TODO(), book1)
if err != nil {
    log.Fatal(err)
}

fmt.Println("Inserted a single document: ", insertResult.InsertedID)
```

To insert multiple documents at once we need to create a slice of `Book` object and pass it to `collection.InsertMany`

```go
// Insert multiple documents
book2 := Book{"Super Freakonomics", "Steven D. Levitt", "0062312871", "HARPER COLLINS USA", 100}
book3 := Book{"The Alchemist", "Paulo Coelho", "0062315005", "HarperOne", 100}
multipleBooks := []interface{}{book2, book3}

insertManyResult, err := booksCollection.InsertMany(context.TODO(), multipleBooks)
if err != nil {
    log.Fatal(err)
}

fmt.Println("Inserted multiple documents: ", insertManyResult.InsertedIDs)
```

## Update Documents

We can update a single document by function  `collection.UpdateOne`. It requires a filter document to match documents in the collection and an updated document to describe the update operation. You can build these using bson.D types. The below code will match the book with *ISBN* *0451526341* and increment the copies field by *10*

```go
//Update one document
filter := bson.D{{"isbn", "0451526341"}}

update := bson.D{
    {"$inc", bson.D{
        {"copies", 10},
    }},
}

updateResult, err := booksCollection.UpdateOne(context.TODO(), filter, update)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Matched %v documents and updated %v documents.\n", updateResult.MatchedCount, updateResult.ModifiedCount)
```
> You can also update more than one documents at once in a single collection by function `collection.UpdateMany`, In it, we need to pass filter document and update document same as `collection.UpdateOne`

## Find Documents

To find a single document, we can use function `collection.FindOne()`, we will pass a filter document and decode the result in the `Book` type variable

```go
// A variable in which result will be decoded
var result Book

err = booksCollection.FindOne(context.TODO(), filter).Decode(&result)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("Found a single document: %+v\n", result)
```

To find multiple documents, we use function `collection.Find()`. This method returns a Cursor, It provides a stream of documents on which we can iterate or we can get all the docs by function `cursor.All()` in a slice of `Book` type. 

```go
cursor, err := booksCollection.Find(context.TODO(), bson.D{{}})
if err != nil {
  log.Fatal(err)
}
var books []Book
if err = cursor.All(context.TODO(), &books); err != nil {
  log.Fatal(err)
}
fmt.Printf("Found multiple documents: %+v\n", books)
```

## Delete Documents

We can delete documents from a collection using functions `collection.DeleteOne()` or `collection.DeleteMany()`. Here you pass bson.D{{}} as the filter argument, which will match all documents in the collection.

```go
deleteCollection, err := booksCollection.DeleteMany(context.TODO(), bson.D{{}})
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Deleted %v documents in the books collection\n", deleteCollection.DeletedCount)
```
> Entire collection can be dropped using the collection.Drop() function, it will remove all documents and metadata, such as indexes from the collection

Once you have done all the operation, don't forget to close the MongoDB connection

```go
err = client.Disconnect(context.TODO())

if err != nil {
    log.Fatal(err)
}

fmt.Println("Connection to MongoDB closed.")
```
Now you can easily use MongoDB as Datasource in your go application, You can found the complete code used in this tutorial on our [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/GoLang/MongoDriverForGolang)