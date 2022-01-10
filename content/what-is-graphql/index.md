---
type: async
title: "What is GraphQL? - A Basic Guide"
date: "2020-10-01"
coverImage: "graph.png"
author: "Anup Aglawe"
description: "GraphQL is a syntax that specifies how data can be requested and is usually used to load data to a client from a server. Find out why to use it and any other advantages."
tags: ["Engineering", "API", "GraphQL", "Performance"]
---

GraphQL's popularity has skyrocketed since its release in 2015. It is the modern way of developing and querying APIs. GraphQL is an application programming interface (API) query language and server-side runtime that prioritises giving customers precisely the data they request.

GraphQL is designed to make fast, scalable, and [developer-friendly APIs](/what-is-an-api/). GraphQL allows developers to build requests that pull data from multiple data sources in a single API call as an alternative to REST.

## Foundation of GraphQL

It was developed internally by [Facebook in 2012](https://techcrunch.com/2018/11/06/facebooks-graphql-gets-its-own-open-source-foundation/) before being publicly released in 2015. "On 7 November 2018, the GraphQL project was moved from Facebook to the newly-established GraphQL Foundation, hosted by the non-profit Linux Foundation."

## What is GraphQL?

GraphQL is an application-level query language that helps data fetching and serving between client and server runtime by providing a standard protocol for queries. Its strength lies in the fact that it offers a modern, simpler, and efficient way to query and develop APIs. The real deal is its **flexible data fetching** -- the application only loads relevant data from the server. Also, GraphQL is hierarchical in nature; it structures relationships in a simple hierarchical manner to avoid complex queries while fetching data.

## Why to use GraphQL?

GraphQL **offers much power and flexibility** over Traditional APIs. One of the few things GraphQL was designed, was to solve Data Fetching/Loading problems.

Data fetching is one of the most critical factors responsible for the performance of the application. Most of the time, the data provided by the API isn't required to run the application. This problem is termed as **"Over fetching"**, which can be a more significant issue in mobile devices. Since devices with slower network connection are bound to take more load time, it creates a **negative impact on end-users.**

In the current scenario, traditional [REST APIs](/best-practice-guide-for-rest-api-security/) offer no clean way to solve this problem; GraphQL comes to the rescue. It allows **clients to define the structure of the data** required, and the same structure of the data is returned from the server. Therefore preventing fetching loads and loads of data, ultimately increasing performance.

API endpoints generally fetch specific data, hence to load a certain data-rich application, there have to be **multiple requests to the server.** But, applications should fetch relevant data in one round trip to avoid **degrading performance.** The flexibility and richness of the GraphQL, allows us to define all the data to fetch in a single request, avoiding multiple Round trips

![Wrapping a REST API in GraphQL](./wrapper.png)
_Wrapping REST API in graphQL - Source - Joey Ng'ethe | TwigaTech_

## Fundamentals of GraphQL

| Server -> | GraphQL Server -> | Graphql Client -> | Client |
| --------- | ----------------- | ----------------- | ------ |


---

**Schema** - GraphQL follows a type system to define the schema of an API. The syntax for writing schemas is called Schema Definition Language (SDL).

```js
# A simple example to define schema
type Person {
  name: String!
  age: Int!
}
```

**Query** - The data or information that a client needs from a server can be fetched in a request using queries.

```json
# This query fetches all specifically names of all users
{
  users {
    name
  }
}
# This query fetches all names of all friends of user "Anup".
{
  user(name: "Anup") {
    name
    friend {
      name
    }
  }
}
```

**Mutation** - Mutations are the way to modify data to the server; these include creating/updating/deleting data. They have similar syntax as queries, with special keywords ahead of them.

```json
# This mutation adds a user with name "Anup" and age 20.
mutation {
  addUser( name : "Anup", age: 20) {
    name
    age
  }
}
```

Despite its powers, you might not need graphQL in your applications -

- Since it adds unnecessary overhead and complex architecture for simple applications.
- It makes web caching challenging to implement.

## Conclusion

GraphQL is a step forward in the world of applications by providing a significant boost in performance. Another plus point of GraphQL is that it is not meant to replace any existing solution but enhance and co-exist with REST APIs. Simply put, the future of GraphQL looks bright.