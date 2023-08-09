---
title: "Why Did We Migrate to AWS ElastiCache From Redis Cloud?"
date: "2022-08-08"
coverImage: "migrating-to-aws-elasticache-for-redis.jpg"
author: "Deepak Gupta"
tags: ["Cache", "AWS", "Redis", "LoginRadius"]
description: "ElastiCache’s capabilities are better suited than Redis Cloud for our technical requirements and use cases, especially better scalability and pricing."
---

LoginRadius is one of the leading and technologically advanced Customer Identity and Access Management (CIAM) solutions. Enterprise customers rely on our CIAM to manage end-user authentication and authorization. They typically serve hundreds of thousands to millions of end-users, making our CIAM a critical part of their IT infrastructure and value delivery.

Our backend consists of multiple microservices handling various identity and access management functions and workflows through APIs. And we use MongoDB as persistent storage for configuration data. For faster access and availability of this data, we deployed Redis in-memory cache through Redis Enterprise Cloud.

## Challenges with Cache Updates
We had our configuration cache set up in Redis Cloud. And to reduce the Redis Cloud latency, we kept the configuration cache at the application level in memory — but we ran into problems.

Generally, customers don’t update their configurations so frequently. But when a customer updates their configuration, it doesn’t propagate in the backend until the server memory cache is purged — sometimes even taking several hours.

_This is bad for business:_ A customer updates configurations in response to a new requirement or rapidly changing business environment. If these changes take so much time for a digital identity process, it can affect end-users and, in turn, business outcomes. Simply imagine that a customer updated app configuration to accommodate a one-time flash sale, and end-users can’t place orders properly due to configuration update issues!

So, we started evaluating various options to address these issues. We considered running multiple instances in the Redis Cloud and synchronizing them to minimize latency for all regions while ensuring customer configuration updates go live immediately. But this proved to be technically cumbersome and costly.

We continued our research with various solutions and concluded that AWS ElastiCache for Redis best serves our needs.

## Migrating to AWS ElastiCache for Redis
AWS provides ElastiCache for Redis as a Redis Cloud alternative with all necessary capabilities. Also, we were already using AWS Cloud for some of our IT infrastructure needs. 
So, we can deploy ElastiCache alongside the same infrastructure to solve the latency issues.

Accordingly, we have created ElastiCache instances in multiple AWS regions and set up the primary ElastiCache DB to quickly sync configuration updates in the secondary ElastiCache instances. Also, we deployed ElastiCache instances in multiple locations as needed.

For migration, we updated the old Redis and ElastiCache primary instances simultaneously. Once we reached a sufficient confidence level with the new setup, we completely switched over to ElastiCache.

## Conclusion
Our applications and cache are deployed in AWS, so our API response latency is no longer problematic. Ultimately, we can reduce application in memory cache updates to a few minutes or seconds as required.

Now customers get updated configurations deployed rapidly, solving our primary challenge!
