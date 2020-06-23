---
title: "Index in MongoDB"
date: "2015-09-01"
coverImage: "mongo-db-index1.png"
author: "Mark Duan"
tags: ["MongoDB", "Database"]
---

 Index is a typical way to speed-up queries in normal database system. There is no difference between MongoDB and a document-based database system. This article gives insight about the index in MongoDB, for query optimization.

### Index in Mongo:

#### Default

\_id is an ObjectId object, 12-byte BSON type that guarantees uniqueness within the collection. The ObjectId is generated based on timestamp, machine ID, process ID, and a process-local incremental counter.

#### Single Field

For a single-field index and sort operations, the sort order (i.e. ascending or descending) of the index key does not matter because MongoDB can traverse the index in either direction. The value of index is the type of index. For example, 1 indicates ascending order and -1 specifies the descending order.

```
db.friends.createIndex( { "name" : 1 } )
```
####   
Compound Field

The order of fields listed in a compound index has significance. For instance, if a compound index consists of { userid: 1, score: -1 }, the index sorts first by userid and then, within each userid value, sorts by score.

```
db.products.createIndex( { "item": 1, "stock": 1 } )
```

####   
Multiple Key

MongoDB uses multiple index to index the content in an array. MongoDB creates separate index entries for every element of the array. You do not need explicitly create multiple key.

#### Text Index

A collection can have at most one text index.  
Performance cost for text index:  
text indexes can be large. They contain one index entry for each unique post-stemmed word in each indexed field for each document inserted.  
text indexes will impact insertion throughput because MongoDB must add an index entry for each unique post-stemmed word in each indexed field of each new source document.

```
db.reviews.createIndex( { comments: "text" } )
```
#### Hash index

Query content by its hashed value. The hash is a function to computed by its value. The hashed value is designed to be distinct value. The one advantage is it is so quick, which take O(1) at most but by contract the normal binary search tree will take O(Log(N)). Hash will be theoretically quicker than normal binary search tree implementation. But the disadvantage is hash index performing range search will be extremely slowly than normal index.

This an example in python to build a hash index

```
db.active.createIndex( { a: "hashed" } )
```
