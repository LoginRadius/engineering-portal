---
title: "Splunk - The Data Swiss Army Knife"
date: "2020-10-04"
coverImage: "splunk.jpg"
author: "Eylon Ronen"
tags: ["logging", "security", "IT", "ninja", "data"]
---
## What is a search engine?
A search engine is a technology optimized for querying. Usually it will index the data in the best-suited way according to how it is searched. A good example of a well known search engine is the, billions dollars worth, Elastic Search. What makes Elastic Search so profitable (even though its core is open-source and free) is that because of its inverted-index using lucene for text analysis its a far superior free-text than any of its contestants (maybe only outmatched by Google's own search engine)

## What is Splunk?
If there is no search engine or DB out there faster than Elastic Search then what am I doing talking about Splunk?
Splunk is slower than ES, **however** in some use-cases it is far more useful than ES.
In this blog I'm going to talk about what sets Splunk aside and examples of what it can be used for.
What sets Splunk aside are the following:
1. SPL - The Splunk query langauge
2. Splunk is COMPLETE
3. Extensibility - You need something that Splunk doesn't have (Yes, it happens)? Add it with python

## SPL
In my years of coding I never stumbeld upon a better query langauge. SPL is readable, easy to learn, and can do about pretty much everything - from statistical actions to clustering or anomaly detection. For example let's say we have an index (like a table in sql) containing students grades, I can do the following:
1. Compute the average score per exam
2. Check how every student is compared to the average
3. Find students who either got a lot more or less than expected of them

```
index = student_grades
| eventstats avg(grade) as avg_grade by exam
| eval diff = grade - avg_grade
| eventstats avg(diff) as avg_diff by student
| where diff - avg_diff > 10
| table exam student grade avg_grade
```

Something impossible in any SQL based DB or ES without code is done with 6 simple spl lines.

## Splunk is COMPLETE
Splunk comes with everything you need - be it alerts, dashboards, various data injestion methods, clustering capabilities, and so on and so on

## Extensibility
You need something that isn't shipped with Splunk? Code it!
Splunk lets you add inputs, custom search commands, visualizations, and many more by coding it
Also, in SplunkBase (Splunk add-on market) you can find thousends of add-ons written by the community.

## How to know if you need Splunk
Are you a web or mobile app developer desiring to get insights simply from your logs? Are you a security admin craving to detect shenanigans in your network? A researcher trying to find common info between COVID-19 infected? Do you have any data of any sort that you want to get insights from?
If you answered yes to one of those questions than I'm happy to tell you that you need Splunk

