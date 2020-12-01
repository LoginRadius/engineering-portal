---
title: "Node Package Manager (NPM)"
date: "2017-08-04"
coverImage: "the-guide-to-NPM.png"
author: "Eric Chan"
tags: ["NodeJs", "NPM"]
---

##### ![the guide to NPM](./the-guide-to-NPM.png)What is This, and Why Should I Care?

NPM is a package manager for javascript. It is used to share and distribute code amongst the coding community. There are over half a million packages for free developed and shared to help your JavaScript development.

To discover packages click [here](http://www.npmjs.com)

##### How Do I Install NPM?

NPM can easily be installed by going to the node.js website. Just click on the link to download an executable file which will install the package manager for you.

(If you have brew on Mac or Chocolatey on Windows installed, it is even easier just run the command:

\[code\]brew install npm\[/code\]

Or

\[code\]choco install nodejs\[/code\]

##### How Do I Install Packages?

Head over here to search for your package. Once you’ve found it, type in your console:

\[code\]npm install -g\[/code\]

Since NPM packages are open-source, be wary that some of the packages may not be built correctly. A good way to tell would be viewing the top of the page for any errors.

![](./image1.png)

##### How Do I Keep My Packages Up-To-Date?

To update the npm packages, simply run:

\[code\]npm update -g\[/code\]

This will update all your outdated packages to the latest.

##### Some Recommended Packages

- Http-server: [https://www.npmjs.com/package/http-server](https://www.npmjs.com/package/http-server)

Detail: Emulates a web-server for client-side testing

* * *

- Restify: [https://www.npmjs.com/package/restify](https://www.npmjs.com/package/restify)

Detail: Assists in setting up a REST APIs to test on your local server

* * *

- Mocha: [https://www.npmjs.com/package/mocha](https://www.npmjs.com/package/mocha)

Detail: Unit testing for web-development. Very useful in testing “code coverage” (It tells you where your code is not being tested in a nice HTML file)

* * *

- LoginRadius-SDK: [https://www.npmjs.com/package/loginradius-sdk](https://www.npmjs.com/package/loginradius-sdk)

Detail: For existing customers, simplifies calls to our server for easy customizability

* * *
