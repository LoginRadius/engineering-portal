---
title: How to do full-text search in MongoDB
date: "2021-02-16"
coverImage: "coverImage.png"
author: "Anil Gupta"
Description: In this blog, we will learn how we can full-text search in MongoDB using text index.
tags: ["MongoDB"]
---

Full text search is a very important feature when we talk about finding content on the internet. A google search is the best example for this when we find the content using the phrases or keywords. In this article we will learn about full-text search capabilities in MongoDB based on text index.

## Create a Sample Database

Before the start, we will create a sample Database that we will use for all examples in this tutorial.

We will create a database with name _myDB_ and will create a collection with name _books_. For this, the statement would be as follows.


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
      "description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
    },
    {
      "title": "Programming JavaScript Applications",
      "subtitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      "author": "Eric Elliott",
      "publisher": "O'Reilly Media",
      "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows."
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

We need to create a text index on the fields to perform the text search. Text index can be created on single or multiple fields. The following statement will create a text index on a single field.

```
>db.books.createIndex({"description":"text"})
```
For this tutorial we will create a text index on _description_ and _subtitle_ fields. We can create only one text index per collection in MongoDB. So We will create a compound text index using the following statement.
```
>db.books.createIndex({"subtitle":"text","description":"text"})
```

## $search
Now we will try to search documents that have the keywords 'ECMAScript' in _description_ and _subtitle_ fields. For this we can use the below statement.

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

You can search for phrases using the text index. By default text search performs an OR search for all words in the phrase. If you want to search 'modern design patterns' then it will search for documents that have the keywords either modern, design or patterns.

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
If you want to search for exact phrases like documents that have 'modern design patterns' together, you can do so by specifying double quotes in the search text.
 
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
If you want to exclude the documents that contain a particular word then you can use negation search. For example if you want to search all documents that have the 'JavaScript' but not 'HTML5' or 'ECMAScript', you can do search like below example.

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
    "description" : "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
	},
	{
    "_id" : ObjectId("602b095c3cb6144ada1c1028"),
    "subtitle" : "A Modern Introduction to Programming",
    "description" : "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications."
	}

```

### Text Search Score
The text search provides a score to each document that represents the relevancy of the document with the search query. This score can be used to sort the all documents returned in the search result. A higher score will indicate a most relevant match.
 
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
    "description" : "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
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
    "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
    "score" : 0.792857142857143
	}

```

### Stop Words
The $text operator filters out the language-specific stop words, such as a, an, the and in English. Below search will not return any document in the result.

**Example**
```
>db.books.find({$text: {$search: "is"}},{subtitle: 1, description: 1 })
	Fetched 0 record(s)

```

### Stemmed Words
The $text operator matches on the complete stemmed word. So if some document field contains the word learning or learn, a search on the term learning or learn would result the same.

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
    "description" : "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position."
	},
	{
    "_id" : ObjectId("602b09b93cb6144ada1c4bca"),
    "subtitle" : "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    "description" : "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows."
	}
```

## Conclusion

I hope you learned something new today, If you want to learn few more stuff on MongoDB, here is an interesting article on [Self-Hosted MongoDB](https://www.loginradius.com/blog/async/self-hosted-mongo/) I also invite you to try stuff on your own and share your experience in the comment section. Furthermore, if you face any problems with any of the above definitions, please feel free to ask me in the comments below.
