---
title: "API Debugging Tools"
date: "2015-05-26"
coverImage: "api_debugging-tools-300x300.png"
author: "Karl Wittig"
tags: ["Engineering", "GoogleChorme", "MozilaFirefox", "SoupUI", "RunScope"]
type: "async"
---

**Are you having trouble with accessing API endpoint?** **Unsure why your API is not returning data?** Most modern browsers have tools or plugins that allows you to quickly and easily test your API calls and see the sample returned data. In this post we go through some tools available for common browsers and web tools that will cut down the total troubleshooting time.

## Google Chrome

Chrome offers a wide variety of apps that are quick and easy to install through the [Chrome app webstore](https://chrome.google.com/webstore/). [Postman](http://www.getpostman.com/) is one of those app and it offers a very robust REST API testing solution. It allows you to quickly create and format a wide range of API calls, and keeps a record of previously accessed APIs for easy reference and reuse. Postman have an easy to understand interface that allows you to quickly reformat the included parameters, headers, and form data. Returned data can be viewed in multiple different formats depending on your preferences.

Another added benefit of Postman is its built-in support for common authentication procedures like: Basic Auth, Digest Auth, and OAuth 1.0/2.0. These "helpers" allow you to bypass some of the common tasks that can be troublesome in the mentioned protocols such as signing your request(OAuth 1.0) or requesting an Access token(OAuth 2.0).

## Mozilla Firefox

Poster or RestClient are both useful tools that allow you to test out your API calls within Mozilla Firefox. They offer many similar systems as Postman, allowing you to set various parts of your API quickly and easily. With built in features to set such as Base URL, Auth method, Timeout, Action, Content, headers, and query parameters; It returns a complete response object allowing you to troubleshoot APIs before integrating them into your systems. Both RestClient and Poster allow you to save your requests for future use.

## Other Systems

**Runscope:** This is a powerful tool that allows you to set up test cases for your APIs. Which makes it easy for you to not only handle many of the features as described in the above two systems, but to also schedule these requests to perform periodically. This allows you to monitor your APIs and have email notifications sent out when specific conditions are met. You can also mask the API requests to run them from different locations worldwide allowing you to test user cases from a global audience.

**SoapUI:** This is an extremely robust solution that can handle your entire testing environment. It also have built in features to test out RESTful API calls, as well as SOAP calls. This solution is very extensive and has many options that cover the full suite of features detailed in the above technologies. On top of that, they have a well formatted instructions available on their site, detailing how to setup and configure the program.
