---
title: "Testing : processes for QA teams to deliver quality software "
date: "2020-10-28"
coverImage: "Software-testing.png"
author: "Neha Vyas"
tags: ["QA","Processes","Testing"]
---

As a QA person, We have to sign off on the quality of a major release every two weeks. Each major release normally includes many tasks and bug fixes. And in one release normally 8-10 people from development and QA teams work together. So, to avoid having to spend nights and weekends at work, our team should adopt some practices to make the workload manageable while ensuring that the releases we approve maintain the highest standards of quality.



### Take a break from the classical roles and responsibilities of QA

We have penetrated limits in the two ways. In this day and age we are a client confronting unit, and we get with our clients about issues they experience and what highlights they might want to find in our item. On the opposite end, we effectively take an interest in plan conversations, offering the info we get from clients. 

Also, our code testing information and experience encourages us to recognize plans imperfections before anybody invests energy coding, which essentially decreases improvement cycles and causes us to meet client desires as we adaptively release new versions.

### Selection of release criteria

You can't test everything in an endeavor item for each delivery, and luckily, you don't have to. You can at present be sure about the item you favor in the event that you center around areas of your code where the most critical changes were made. Before another delivery cycle starts, our group sits with all the partners to comprehend which parts of the item will be moved by new or refreshed code. We utilize that data to organize our testing efforts. We center around those pieces of the code and utilize existing mechanization tests to deal with different parts. On the off chance that you realize something worked in the last delivery and you're not contacting it in this delivery, at that point you don't have to invest an excess of energy in testing. So base your delivery measures on new code that is being included. 


### Prioritize bug fixes based on usage

Fixing bugs is an extra aspect of any new delivery, and for that bugs ought to be prioritized.For model, on the off chance that we realize that one region of an application is infrequently utilized, a bug in that aspect of the code gets lower need. On the off chance that short of what one percent of our clients are on a specific program, issues explicit to that program get less consideration. However, we additionally tune in to our clients. The exact opposite thing we need is for our clients to encounter bugs. On the off chance that something moved beyond us and clients find bugs, those bugs get need for fixes in the following delivery. 


### Stay close to the relevant environment

Each QA group has heard the designer remark, "...but it works on my machine." How do you avoid that situation?

Our QA and our improvement groups run the very same environment As our builds move through the improvement pipeline, notwithstanding, we should test the code under creation conditions, so we fabricate our organizing climate to reenact our clients' production environments.


### Create a dedicated performance testing team

Have a dedicated performance team run tests when an item is steady, and brief the group about new forms and highlights with the goal that they can assess the performance risks. 

Continuously update performance teams with all the latest information and give them an environment as close to production as you can. 

### Run a regression cycle 
We run our regression cycle in the final phase of product stabilization, and it is that cycle that gives the confirmation for the product delivery. On the off chance that any of the regression test falls flat, QA ought to illuminate the administrators/partners so that appropriate actions can be taken

We also automate our regression cycle, so it just takes a couple of days to run. 


### Verify customer accounts on production 

Since we keep up client information in our databases, we should guarantee that it stays viable with any new versions that we release. At the point when we release a new version, we run updates to check that no data was harmed, and if we find any data-corrupting bugs, those become our highest priority. We likewise go through a day or two on manual in backwards compatibility testing while we take steps towards finding an automated and more efficient approach. In any case, you actually need to do some manual testing, as this is one of the last stages before creation. 


### Perform sanity tests on production

We perform post-release sanity tests post-release sanity tests on our production account to validate that everything works as expected, including all third-party systems. We first perform tests using our existing production account but then create a new account to validate that the process will continue to work correctly as new customers sign up.