---
title: How to do Full-Text Search in MongoDB
date: "2021-02-16"
coverImage: "coverImage.png"
author: "Anil Gupta"
description: MongoDB full text search tutorial. In this blog, we will learn how to perform a full-text search in MongoDB using text index.
tags: ["MongoDB"]
---

One of the leading NoSQL databases, MongoDB is well known for its fast performance, versatile schema, scalability and great [capabilities for indexing](https://www.loginradius.com/blog/async/index-in-mongodb/). Let us look at some context before we get into some details. Full-text search is an essential feature when we talk about finding content on the internet. A google search is the best example for this when we see the content using the phrases or keywords. In this article, we will learn about full-text search capabilities in MongoDB based on text index.

## Create a Sample Database

Before we begin, we will create a sample database that will be used during the tutorial.

We will create a database with the name _myDB_ and create a collection with the name _books_. For this, the statement would be as follows.


```
> use myDB
> db.createCollection("books")
>
```

Let's insert some documents by using the following statement.

```
> db.books.insert([
	{
      "title": "Eloquent JavaScript, Second Edition",
      "subtitle": "A Modern Introduction to Programming",
      "author": "Marijn Haverbeke",
      "publisher": "No Starch Press",
      "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
    },
    {
      "title": "Learning JavaScript Design Patterns",
      "subtitle": "A JavaScript and jQuery Developer's Guide",
      "author": "Addy Osmani",
      "publisher": "O'Reilly Media",
      "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
    },
    {
      "title": "Speaking JavaScript",
      "subtitle": "An In-Depth Guide for Programmers",
      "author": "Axel Rauschmayer",
      "publisher": "O'Reilly Media",
      "description": "Like it or not, JavaScript is everywhere these days, from browser to server to mobile and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
    },
    {
      "title": "Programming JavaScript Applications",
      "subtitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      "author": "Eric Elliott",
      "publisher": "O'Reilly Media",
      "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your codebase grows."
    },
    {
      "title": "Understanding ECMAScript 6",
      "subtitle": "The Definitive Guide for JavaScript Developers",
      "author": "Nicholas C. Zakas",
      "publisher": "No Starch Press",
      "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript."
    }
])
```

## Creating a Text Index

We need to create a text index on the fields to perform the text search. We can create this on single or multiple fields. The following statement will create a text index on a single field.

```
>db.books.createIndex({"description":"text"})
```

We will create a text index on the _description_ and _subtitle_ fields for this tutorial. We can create only one text index per collection in MongoDB. So We will create a compound text index using the following statement.
```
>db.books.createIndex({"subtitle":"text","description":"text"})
```

## $search
Now we will try to search documents that have the keywords 'ECMAScript' in the _description_ and _subtitle_ fields. For this, we can use the below statement.

```
db.books.find({$text: {$search: "ECMAScript"}})
```
**Example**

```
>db.books.find({$text: {$search: "ECMAScript"}},{ subtitle: 1, description: 1 })
	{
    "_id" : ObjectId("602b09cb3cb6144ada1c62fe"),
    "subtitle" : "The Definitive Guide for JavaScript Developers",
    "description" : "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript."
	}
>
```

### Phrases

You can search for phrases using the text index. By default, text search performs an OR search for all words in the phrase. If you want to search 'modern design patterns', it will search for documents with the keywords either modern, design, or patterns.

**Example**

```
>db.books.find({$text: {$search: "modern design patterns"}},{ subtitle: 1, description: 1 })
	{
    "_id" : ObjectId("602b098f3cb6144ada1c2ea1"),
    "subtitle" : "A JavaScript and jQuery Developer's Guide",
    "description" : "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
	},
	{
    "_id" : ObjectId("602b09b93cb6144ada1c4bca"),
    "subtitle" : "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
	},
	{
    "_id" : ObjectId("602b095c3cb6144ada1c1028"),
    "subtitle" : "A Modern Introduction to Programming",
    "description" : "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
	}
>
```

If you want to search for exact phrases like documents with 'modern design patterns' together, you can do so by specifying double quotes in the search text.
 
**Example**
```
>db.books.find({$text: {$search: "\"modern design patterns\""}},{ subtitle: 1, description: 1 })
	{
    "_id" : ObjectId("602b098f3cb6144ada1c2ea1"),
    "subtitle" : "A JavaScript and jQuery Developer's Guide",
    "description" : "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
}

```
### Negations
If you want to exclude the documents containing a particular word, you can use a negation search. For example if you're going to search all documents with the 'JavaScript' but not 'HTML5' or 'ECMAScript', you can search as the below example.

**Example**

```
>db.books.find({$text: {$search: "JavaScript -HTML5 -ECMAScript"}},{ subtitle: 1, description: 1 })
	{
    "_id" : ObjectId("602b098f3cb6144ada1c2ea1"),
    "subtitle" : "A JavaScript and jQuery Developer's Guide",
    "description" : "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
	},
	{
    "_id" : ObjectId("602b09a83cb6144ada1c4973"),
    "subtitle" : "An In-Depth Guide for Programmers",
    "description" : "Like it or not, JavaScript is everywhere these days, from browser to server to mobile and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
	},
	{
    "_id" : ObjectId("602b095c3cb6144ada1c1028"),
    "subtitle" : "A Modern Introduction to Programming",
    "description" : "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
	}
```

### Text Search Score
The text search provides a score to each document representing the relevancy of the document with the search query. This score can be used to sort all the records returned in the search result. A higher score will indicate a most relevant match.
 
**Example**
```
>db.books.find({$text: {$search: "JavaScript "}},{score: {$meta: "textScore"}, subtitle: 1, description: 1 }).sort({score:{$meta:"textScore"}})
	{
    "_id" : ObjectId("602b098f3cb6144ada1c2ea1"),
    "subtitle" : "A JavaScript and jQuery Developer's Guide",
    "description" : "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    "score" : 1.43269230769231
	},
	{
    "_id" : ObjectId("602b09cb3cb6144ada1c62fe"),
    "subtitle" : "The Definitive Guide for JavaScript Developers",
    "description" : "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
    "score" : 1.42672413793103
	},
	{
    "_id" : ObjectId("602b09a83cb6144ada1c4973"),
    "subtitle" : "An In-Depth Guide for Programmers",
    "description" : "Like it or not, JavaScript is everywhere these days, from browser to server to mobile and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    "score" : 0.818181818181818
	},
	{
    "_id" : ObjectId("602b095c3cb6144ada1c1028"),
    "subtitle" : "A Modern Introduction to Programming",
    "description" : "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "score" : 0.801724137931034
	},
	{
    "_id" : ObjectId("602b09b93cb6144ada1c4bca"),
    "subtitle" : "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your codebase grows.",
    "score" : 0.792857142857143
	}

```

### Stop Words
The $text operator filters out the language-specific stop words, such as a, an, the and in English. The below search will not return any document in the result.

**Example**
```
>db.books.find({$text: {$search: "is"}},{subtitle: 1, description: 1 })
	Fetched 0 record(s)

```

### Stemmed Words
The $text operator matches on the complete stemmed word. So if some document field contains the word learning or learn, a search on the term learning or learn would result in the same.

**Example**

```
>db.books.find({$text: {$search: " learn"}},{subtitle: 1, description: 1 }) or >db.books.find({$text: {$search: " learning"}},{subtitle: 1, description: 1 })
	{
    "_id" : ObjectId("602b098f3cb6144ada1c2ea1"),
    "subtitle" : "A JavaScript and jQuery Developer's Guide",
    "description" : "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
	},
	{
    "_id" : ObjectId("602b09a83cb6144ada1c4973"),
    "subtitle" : "An In-Depth Guide for Programmers",
    "description" : "Like it or not, JavaScript is everywhere these days, from browser to server to mobile and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
	},
	{
    "_id" : ObjectId("602b09b93cb6144ada1c4bca"),
    "subtitle" : "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your codebase grows."
	}
```

## Conclusion

I hope you learned something new today. Here is an interesting article on [Self-Hosted MongoDB](https://www.loginradius.com/blog/async/self-hosted-mongo/). I also invite you to try stuff on your own and share your experience in the comment section. Furthermore, if you face any problems with any of the above definitions, please feel free to ask me in the comments section below.
