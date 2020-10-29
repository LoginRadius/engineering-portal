---
title: "Introduction to JAMstack"
date: "2020-10-29"
coverImage: "jamstack_cover.pngjamstack_cover.pngjamstack_cover.pngjamstack_cover.png"
author: "Versha Gupta"
tags: ["Jamstack", "Web"]
description: "You may have heard the term JAMstack before, but you may not have understood what it means. In this article, We will introduce you to JAMstack as to why you need, best practice, and value."
---

## What is JAMstack

JAMstack is not a specific set of tools or any language. Still, it's a new and modern way of building apps and sites that deliver better performance, higher security, lower scaling cost, and better developer experience. It achieves this by retaining most of the client-side functionality and abstracting all other functionality to the third-party API. APIs do all the heavy lifting. It is based on the client-side, and it doesn't depend on the backend server.


JAM stands for **JavaScript**, **APIs** & **Markup**.

**JavaScript**:  Any dynamic programming during the request/response cycle is handled by the JS, running entirely on the client-side. It can be any front-end framework or library or even vanilla JavaScript. 
**APIs**: All server-side processes or database actions are contained in reusable APIs, accessed over HTTPS with JavaScript.  These can be custom-made or leveraged third party services.
**Markup**:   Template markup must be pre-built at the time of deployment, usually using a site generator for content sites or a build tool for web applications.

> Modern web development architecture based on client-side JavaScript, reusable APIs, and pre-built Markup.

The term was introduced by Mathias Biilmann, co-founder of  [Netlify](https://www.netlify.com/).

With the JAMstack, we have no longer talk about specific technologies such as web servers, programming languages, or databases.

Check the following best practices defining a JAMstack project:

-   **Entire site/app on a CDN**
  Jamstack project does not rely on server-side code; they can be distributed instead of on the same server. Directly serve from CDN unlocks speed and performance that cannot be beaten. The more your app can push you over the edge, the better the user experience.
  
-   **Atomic deploys**
As Jamstack projects get big, new changes may require redeploying hundreds of files. Uploading them one at a time can cause an inconsistent situation during the process. You can save this with a system that lets you do "nuclear reflection," where any changes don't go live until all the converted files have been uploaded.

-   **Instant cache invalidation**
  When you do continuous deployment, then you need to know that when the deployment goes live, it is live. Remove any doubt by ensuring that your CDN can handle the cache purge immediately.

-   **Everything lives in Git**
With the Jamstack project, anyone should be able to clone a single clone, install any required dependencies with the standard process (such as npm install), and be prepared to run the full project locally. To clone a database, no complex installs. This contributor reduces friction and also simplifies the staffing and testing workflow.

-   **Automated builds**
Jamstack markup is prefabricated; content changes won't go live until you build another one. Automating this process will make you very frustrated. You can do this with a webhook or use a publishing platform that automatically includes the service.

## Value of JamStack

We can easily understand the JAMstack value when comparing it with a monolithic architecture, today's most common practice in Web development.  In a monolithic project, the frontend is closely coupled with a backend server, e.g., node js.  Each page request to backend server which pulls data from database renders into Html and then send it across the network.  A single page gets regenerated every time the server receives a request for that URL.
In a JAMstack architecture, the page request does not go to the server for Html because it directly fetches Html from CDN, where the Html file has been pre-built, and it's ready to be downloaded; that's why no server is involved here.

##  Workflow comparison (JAMstack vs. traditional)
![jamstack-vs-traditional-workflow](image1.png)

**Traditional workflow**

→ Building and hosting are closely coupled.  
→ Whenever a user requests a page, The file request to the back end and interacts with a database, back-end code, server, browser, and caching layers.  
→ Updated code is pushed to servers often through FTP. The database must be updated again.
→ Updated content is also pushed through CMS like WordPress, Joomla, or drupal.

**JAMstack workflow**

→ Building and hosting are loosely coupled.  
→ Whenever a user requests a page, The file is already pre-built and directly served to the browser from a CDN.  
→ Updated code is pushed through Git; Modern tools like static site generators easily re-built the entire site.
→ Updated content is also pushed through GIt or static site CMS.


##  Why the JAMstack?

A JAMstack architecture can bring all sorts of benefits to the sites and project workflows. Some of the key benefits are:

**Faster performance:** Building JAMstack helps to get pages generated at deploy time since they are mainly stored as Markup and can be served over a CDN.
**Higher security:** JAMstack websites reduce server and database, so we don't need to worry about vulnerabilities anymore.
**Lower cost:** It uses fewer resources, so comparably, it's lower than Others.
**Better developer experience** Frontend developer can focus on frontend development without tied to monolithic architecture. Static site generators remove the need to maintain a separate stack for content and marketing.

## That's A Wrap!

In a JAMStack architecture, however, the frontend and backend are decoupled. A frontend consists of JavaScript, HTML, and CSS. SSG generates these files during the build process and sends it over a CDN.

A JAMStack backend is a content API that returns JSON/XML. This API can be a  hosted datastore, a  headless CMS, serverless functions, or a custom application.
## Useful resources

 - [JAMstack WTF](https://jamstack.wtf/)
 - [Awesome JAMstack](https://github.com/automata/awesome-jamstack)
 - [JAMstack Community Slack](https://jamstack.slack.com/join/shared_invite/enQtNjc4OTI1NDk3NDI1LWIxZjk1YWRjOWVlMzM0MTVlMTg4YmY1OTBjZDc1M2I3N2NhODBlZDNmNjAzMGMwNzI5MTVlMWEwYjBiMTU2NzE)
 - [JAMstack on CSS-Tricks](https://css-tricks.com/tag/jamstack/)
 - [JAMstack_conf](https://jamstackconf.com/)
 - [JAMstack Radio](https://www.heavybit.com/library/podcasts/jamstack-radio/)
 - [JAMstack examples](https://jamstack.org/examples/)
