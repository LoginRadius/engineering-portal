---
title: "Testing : processes for QA teams to deliver quality software "
date: "2020-10-30"
coverImage: "software-testing.png"
author: "Neha Vyas"
tags: ["QA","Processes","Testing"]
---


Being a Quality Analyst, it’s our responsibility to run test cycles on the system and push releases every two weeks to make sure the system is also updated with the latest fixes and everything is bug free on the live platform. Normally every release includes amendments as well as fixes done. If we talk about the resources then normally the team has 8-10 resources including developers and QA team.

Therefore, we should always be pre-active about every release and to avoid any stress during the release everything has to be managed properly when it comes to execution from development end or testing from QA end. For that purpose we have to follow proper strategies to ensure that everything is being tested properly and the release which we approve met the expected quality standards.
  

### Break away from the conventional roles and obligations of QA

We have breached boundaries in both directions. In today’s world we are a customer-facing unit, as we hear from our customers directly about their issues which they experience over the system or what are the features which they want to incorporate on the platform. Also We are actively participating in the design discussions, or if any inputs required from our end which we receive from clients’ end to make sure we are going in the right direction as per client’s vision.

Along with, our experience of testing always helps to detect any flaw or defects before doing any coding work which helps to reduce additional efforts and minimize the work. This way we can ensure to have everything done based on the client given timeline and a quality outcome.

### Opt for releases very carefully

As it's not possible to test everything every time whenever you push any release. For that purpose you just have to target the part of code which has been worked on, this way you can actually test the main piece of work without delaying things and then run a complete test cycle to make sure no other part has been conflicted by the changes. For this purpose, whenever there is a new release check with the team which part of code has been updated and what are the outcomes, and mostly focus on that part to run tests. This way you can prioritize the work and efforts which need to be put. We focus on those parts of the code and use existing automation tests to handle other parts. If you know something worked in the last release and you're not touching it in this release, then you don't need to spend too much time testing. So base your release criteria on new code that is being added.

### Always have a proper plan based on priorities

QA has to make sure that whatever work needs to be done, is properly prioritized. For instance, if a particular area of a platform is not affecting things much and can be taken care of at later stage then it should be on the lowest priority; If less than one percent of our users are on a particular browser, issues specific to that browser get less attention. And the area which is affecting the whole system should be done on the very first priority. There should be priorities defined like – Blocker, Emergency, Highest, High, Normal, and Low! So always work as per the required attention on specific areas of feature, also need to consider the target user demands. What is their feedback or issues which they want to have access on. If something did get past us and users discover bugs, those bugs get priority for fixes in the next release.
  

### Always make sure to have proper environments ready!

You will often hear from the development team that, “…. It works fine with me; there must be some network issue or system issue on your end”. We have to make sure not to have such conflicts in between, because at the end our goal has to be – Delivering bug free solutions!

For that purpose, Our QA and our development teams run exactly the same environment.

As our builds move through the development pipeline, however, we must test the code under production conditions, so we build our staging environment to simulate our customers' production environments.

  
### The importance of having a dedicated team for performance testing:

Always plan to arrange for a dedicated performance team who can run tests as soon as a product is stable, and brief the team about new versions and features so that they can assess the performance risks.

And to update performance teams with all latest information and provide them with an environment as close to production as you can. To make sure that there shouldn’t be any gaps in between and the product can be tested properly.

### Run a regression cycle

The QA team runs a regression cycle in the last phase of product stabilization, and it is that process that gives the confirmation for the product delivery. If any of the regression tests fails, QA informs the managers / stakeholders so that appropriate actions can be taken for further release.

As it’s never acceptable to deliver the product if any of the test fails which might end up in bigger problems for the team as well as client. So the QA team always makes sure to run regression tests to properly verify everything.

We also automate our regression cycle, so it only takes a few days to run.

### Production environment testing on customer accounts is necessary 

As we maintain customer data in our databases, we have to ensure that it should remain attuned with any new versions that have been released or about to release. Whenever we release a new version, we run several updates to check that no data was harmed, and in case we find any data-corrupting bugs, those become our highest priority. We also spend a day or two on manual backwards compatibility testing while we take steps towards finding an automated and more efficient approach. However, you still need to do some manual testing, as this is one of the last phases before production.

### Sanity testing on production environment 

We perform post-release sanity tests on our production account to authorize that everything works as projected, including all third-party systems. We first perform tests using our existing production account but then create a new account to validate that the process will continue to work correctly as new customers sign up.  

### In a nutshell:

The best testing practices should inculcate all other processes in general and risk management processes in particular in them. The focus should be to improve the overall quality of the software while aiming for reducing the cost with continuous monitoring during and after the release of the software. While doing quality assurance testing, the tester should ensure to comply with all the fundamental principles and industry practices; along with looking at the product from the end-users’ perspective.