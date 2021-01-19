---
title: How to Perform Basic Query Operations in MongoDB
date: "2021-01-15"
coverImage: "coverImage.png"
author: "Anil Gupta"
tags: ["MongoDB"]
---

## Overview

MongoDB is an open-source and document-oriented database. It’s also a NoSQL database. I assume that you have a basic understanding of the RDBMS and know the querying data from tables. In this blog, we will learn how to perform the same basic query operations in MongoDB like RDBMS.

## Create a Sample Database

Before the start, we will create a sample DB with some sample data to perform all operations.

We will create a database with name _myDB_ and will create a collection with name _orders_. For this, the statement would be as follows.


```
> use myDB
> db.createCollection("orders")
>
```
_MongoDB doesn't use the rows and columns. It stores the data in a document format. A collection is a group of documents._

You can check all collections in a database by using the following statement.
```
> use myDB
>show collections
orders
system.indexes
>
```

Let's insert some documents by using the following statement.

```
> db.orders.insert([
	{
		Customer: "abc",
		Address:{"City":"Jaipur","Country":"India"},
		PaymentMode":"Card",
		Email:"abc@mail.in",
		OrderTotal: 1000.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":10},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"journal","Price":"200.00","Qty":2},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]		
	},
	{
		Customer: "xyz",
		Address:{"City":"Delhi","Country":"India"},
		PaymentMode":"Cash",
		OrderTotal: 800.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]		
	},
	{
		Customer: "ron",
		Address:{"City":"New York","Country":"USA"},
		PaymentMode":"Card",
		Email:"ron@mail.com",
		OrderTotal: 800.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":00}
		]		
	}
])
```
_A document is the equivalent of an RDBMS row. It doesn't need to have the same schema in each document. It means a document might not have any field that doesn't have any value._

## Query Documents
### find() method
You need to use the find() method to query documents from MongoDB collections. The following statement will retrieve all documents from the collection.
```
> db.orders.find()
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		Address:{"City":"Jaipur","Country":"India"},
		PaymentMode":"Card",
		Email:"abc@mail.com",
		OrderTotal: 1000.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":10},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"journal","Price":"200.00","Qty":2},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]		
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		Address:{"City":"Delhi","Country":"India"},
		PaymentMode":"Cash",
		OrderTotal: 800.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		Address:{"City":"New York","Country":"USA"},
		PaymentMode":"Card",
		Email:"ron@mail.com",
		OrderTotal: 600.00,
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":00}
		]
	}
>
```
### Projection 
If you want to fetch only selected fields then you can use the projection. Following statement will fetch only _Customer_ and _Email_ field.
```
> db.orders.find( { }, { Customer: 1, Email: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		Email:"abc@mail.com"
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz"		
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		Email:"ron@mail.com"		
	}
>
```

### Filter the Documents by Specifying a Condition
Now we will learn how we can fetch the documents that match a specified condition. MongoDB provides many comparison operators for this.

#### 1. $eq Operator
The $eq operator checks the equality of the field value with the specified value. To fetch the order where _PaymentMode_ is 'Card' you can use the following statement

```
>db.orders.find( { PaymentMode: { $eq: "Card" } } )
```
_This query can be written also like below_

```
>db.orders.find( { PaymentMode: "Card" } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE PaymentMode="Card"
```
**Example**
```
>db.orders.find( { PaymentMode: "Card" }, { Customer: 1, PaymentMode: 1 } )
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		PaymentMode":"Card"				
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		PaymentMode":"Card"
	}
>
```
**$eq Operator with embedded document**

You may have noticed that we inserted an embedded document _Address_ in the _Orders_ collection. If you want to fetch the order where _Country_ is 'India' you can use a dot notation like the following statement.
```
>db.Orders.find( { "Address.Country": { $eq: "India" } } )
```
_This query can be written also like below_
```
>db.Orders.find( { "Address.Country":"India" } )
```
**Example**
```
>db.Orders.find( { "Address.Country": { $eq: "India" } } , { Customer: 1, Address: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		Address:{"City":"Jaipur","Country":"India"}
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		Address:{"City":"Delhi","Country":"India"}
	}
>
```
**$eq Operator with array**

$eq operator will retrieve all the documents if the specified condition is true for any item in an array. We have an _OrderItems_ array in the document. If you want to filter the documents where 'paper' were also ordered then the statement would be as follows.
```
>db.Orders.find( { "OrderItems.ItemName": { $eq: "paper" } } )
```
_This query can be written also like below_
```
>db.Orders.find( { "OrderItems.ItemName": "paper"  } )
```
**Example**
```
>db.Orders.find( { "OrderItems.ItemName": { $eq: "paper" } } , { Customer: 1, OrderItems: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":10},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"journal","Price":"200.00","Qty":2},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]		
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]
	}
>
```
#### 2. $gt Operator
You can use the $gt operator to retrieve the documents where a field’s value is greater than the specified value. The following statement will fetch the documents where _OrderTotal_ is greater than 800.
```
>db.orders.find( { OrderTotal: { $gt: 800.00 } } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE OrderTotal>800.00
```
**Example**
```
>db.Orders.find( { "OrderTotal": { $gt: 800.00 } } , { Customer: 1, OrderTotal: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		OrderTotal: 1000.00
	}
>
```
#### 3. $gte Operator
You can use the $gte operator to retrieve the documents where a field’s value is greater than or equal to the specified value. The following statement will fetch the documents where _OrderTotal_ is greater than or equal to 800.
```
>db.orders.find( { OrderTotal: { $gte: 800.00 } } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE OrderTotal>=800.00
```
**Example**
```
>db.Orders.find( { "OrderTotal": { $gte: 800.00 } } , { Customer: 1, OrderTotal: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		OrderTotal: 1000.00
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		OrderTotal: 800.00
	}
>
```
#### 4. $lt Operator
You can use the $lt operator to retrieve the documents where a field’s value is less than the specified value. The following statement will fetch the documents where _OrderTotal_ is less than 800.
```
>db.orders.find( { OrderTotal: { $lt: 800.00 } } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE OrderTotal<800.00
```
**Example**
```
>db.Orders.find( { "OrderTotal": { $lt: 800.00 } } , { Customer: 1, OrderTotal: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		OrderTotal: 600.00
	}
>
```
#### 4. $lte Operator
You can use the $lte operator to retrieve the documents where a field’s value is less than or equal to the specified value. Following statement will fetch the documents where _OrderTotal_ is less than or equal to 800.
```
>db.orders.find( { OrderTotal: { $lte: 800.00 } } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE OrderTotal<=800.00
```
**Example**
```
>db.Orders.find( { "OrderTotal": { $lte: 800.00 } } , { Customer: 1, OrderTotal: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		OrderTotal: 800.00
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		OrderTotal: 600.00
	}
>
```
#### 5. $ne Operator
You can use the $ne operator to retrieve the documents where a field’s value is not equal to the specified value.
```
>db.orders.find( { PaymentMode: { $ne: "Card" } } )
```
_A similar SQL statement would be as follows_
```
SELECT * FROM orders WHERE PaymentMode != "Card"
```
**Example**
```
>db.Orders.find( { "PaymentMode": { $ne: "Card" } } , { Customer: 1, PaymentMode: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		PaymentMode":"Cash"
	}
>
```

#### 6. $in Operator
You can use the $in operator to retrieve the documents where a field’s value is equal to any value in the specified array.
```
>db.orders.find( { OrderItems.ItemName: { $in: ["journal","paper"] } } )
```
**Example**
```
>db.Orders.find( { OrderItems.ItemName: { $in: ["journal","paper"] } } , { Customer: 1, OrderItems: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607534c")
		Customer: "abc",
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":10},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"journal","Price":"200.00","Qty":2},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]		
	},
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607544c"),
		Customer: "xyz",
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"paper","Price":"10.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":500}
		]
	}
>
```
#### 7. $nin Operator
You can use the $nin operator to retrieve the documents where a field’s value is not equal to any value in the specified array. It will also select the documents where the field does not exist.
```
>db.orders.find( { OrderItems.ItemName: { $nin: ["journal","paper"] } } )
```
**Example**
```
>db.Orders.find( { OrderItems.ItemName: { $nin: ["journal","paper"] } } , { Customer: 1, OrderItems: 1 })
	{
		"_id" : ObjectId("5dd4e2cc0821d3b44607644c"),
		Customer: "ron",
		OrderItems:[
			{"ItemName":"notebook","Price":"150.00","Qty":5},
			{"ItemName":"postcard","Price":"10.00","Qty":00}
		]
	}
>
```
### Indexing

We know that indexing is very important if we are performing the queries on a large database. Without indexing execution of a query can be expensive. We can add a simple ascending index on a single field by using the following statement.
```
>db.Orders.createIndex({"Customer":1})
```
MongoDB creates a unique index on ‘_id’ field by default. A unique index will prevent insertion of two documents with the same value for that field. If you want to create a unique index then the statement would be as follows.
```
db.Orders.createIndex( { "OrderId": 1 }, { unique: true } )
```

## Summary
In this blog, we had a look at some basic query operators in MongoDB. We learned how we can perform basic query operations as we do in RDBMS. We also learned about the simple indexing in MongoDB to perform efficient queries. If this article helps you please share in the comment section.

