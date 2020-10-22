---
title: "JAMstack Introduction"
date: "2020-10-21"
coverImage: "title-image.jpg"
author: "Versha Gupta"
tags: ["JAMStack", "SSG"]
pinned: true
---

# JAMstack Introduction

I am sure you have heard the word JAMstack before but you might not have understood what it really meant. In this article, I’ll introduce you to what JAMstack means, why you should care, best practices, and value of JAMstack.

## What is JAMstack


JAMstack isn’t a specific set of tools, but a new, modern way of building websites & apps that delivers better performance, higher security, lower cost of scaling, and a more streamlined developer experience. It stands for JavaScript, API & Markup.

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.

The term was coined by Mathias Biilmann, co-founder of  [Netlify](https://www.netlify.com/).

With the JAMstack, we have no longer talk about specific technologies such as web servers, programming languages, or databases.

Here are the best practices defining a JAMstack project:

-   Entire site/app on a CDN
-   Atomic deploys
-   Instant cache invalidation
-   Everything lives in Git
-   Automated builds

## Value of JamStack

The value of JAMstack is much easier to understand when we compare it with monolithic architecture, today’s most common practice in Web development. In a monolithic project, the frontend is closely coupled with server, e.g. node.js. Each page request must go through server, which pulls data from database, renders into html, and sends it across network. A single page gets regenerated each time the server receives a request for that URL.

In a JAMstack architecture, a page request does not hit a server for html. Instead, it fetches html from CDN, where an html file has been pre-built and is ready to be downloaded. No server is involved in the process.

##  Workflow comparison (JAMstack vs. traditional)
![jamstack-vs-traditional-workflow](image1.png)

**Traditional workflow**

→ Building and hosting are coupled.  
→ A user requests a page. The file gets processed and served following a (long) series of interaction between a database, backend code, server, browser, and layers of caching.  
→ Core updates are pushed to production servers, often through FTP. Database must be maintained or updated.  
→ Content updates are pushed through traditional CMS, like WordPress or Drupal.  

**JAMstack workflow**

→ Building and hosting are  coupled.  
→ A user requests a page. The file is already compiled and gets directly served to the browser from a CDN.  
→ Core updates are pushed through Git; the site gets re-built entirely via modern build tools like static site generators.  
→ Content updates are pushed through Git or a static site CMS.

##  Why the JAMstack?

A JAMstack architecture can bring all sorts of benefits to the sites and to project workflows. Some of the key benefits are:

**Faster performance:** Because a JAMstack website is pre-built HTML and assets, it can be served over a CDN.
**Higher security:** JAMstack websites reduce server and database surface area vulnerabilities.
**Lower cost:** It uses fewer resources so comparably its lower than Others.
**Better developer experience** Front end developers can focus on the front end, without being tied to a monolithic architecture. This usually means quicker and more focused development

##  That’s A Wrap!

In a JAMStack architecture, however, the frontend and backend are decoupled. A JAMStack frontend consists of JavaScript, HTML, and CSS. SSG generates these files during the build  process.

A JAMStack backend is a content API that returns JSON or XML. This API can be a  hosted datastore, a  headless CMS, serverless functions or a custom application.
