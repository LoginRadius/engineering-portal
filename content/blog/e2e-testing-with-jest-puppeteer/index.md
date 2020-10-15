---
title: "End-to-End Testing with Jest and Puppeteer."
date: "2020-10-15"
coverImage: "jest-puppeteer.png"
author: "Shreya Sharma"
tags: ["Testing", "Jest", "Puppeteer"]
description: "Learn how to integrate Jest and Puppeteer in your project for End-to-End Testing."
---

Writing a foolproof code is hard, especially with a team collaborating on a single project. Thus it becomes increasingly important to ensure that no new code breaks existing functionality. And for this purpose, automated tests are used. 

## Requirements

1. Basic knowledge of Javascript
2. Familiarity with Node.js

In this blog, we will learn how to integrate Jest and Puppeteer in our project for End-to-End Testing. [Jest] https://github.com/facebook/jest) is a javascript testing framework maintained by Facebook. [Puppeteer](https://github.com/puppeteer/puppeteer) is a Node library created by Google, which provides a high-level API to control headless Chrome. Before we delve deeper into Jest and Puppeteer, let's familiarise ourselves with a few things.

**End-to-End(E2E) Testing:** E2E testing refers to the testing of a complete functionality of some application. It checks that a functionality acts as intended.

**Headless Testing:** Headless testing is a way or running browser UI tests without any browser UI. It is a preferred method mainly due to its performance. It is fast, light-weight, and less resource-intensive. 

## Installation

To install Jest and Puppeteer, open the command line in your project directory and run:

**For npm users:**  
`npm install --save-dev jest puppeteer jest-puppeteer`

**For yarn users:**  
`yarn add --dev jest puppeteer jest-puppeteer.`

Now that we've installed Jest and Puppeteer, it is time to set up the testing environment. Create a file `jest.config.js` in the project root directory and write the following code in it:

```js
module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:8080"
  },
  testMatch: [
    "<path-to-the-tests-folder>/**.test.js"
  ],
  verbose: true
};
```

Defining the preset sets up a puppeteer environment for testing. Test match directs it to the folder where tests are defined, for a piece of more detailed knowledge about running Jest with Puppeteer [check this out](https://jestjs.io/docs/en/puppeteer).

Now create a file `jest-puppeteer.config.js` in the project root directory. Here we define the testing environment further. To begin with you can add the following in this file:

```js
module.exports = {
    launch: {
        headless: process.env.HEADLESS !== 'false',
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
        devtools: true
    }
}
```


## Testing

Now we can begin writing our tests. In this example, we'll start writing a basic test to check the title of the page opened. Now head over to the tests folder defined and create a file `title.test.js`. As you might have noticed, `.test.js` would be the file extension of the jest tests defined. 

This is what a typical `title.test.js` would look like:

```js
// Defining the timeout for the test
const timeout = process.env.SLOWMO ? 6000 : 4000;
const fs = require('fs');

// Go to the specified path and wait for the domcontent to load before running the tests
beforeAll(async () => {
  path = fs.realpathSync('file://<file-path>');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Title of the page', () => {
  test('Title of the page', async () => {
    // Gets page title
    const title = await page.title();
    // Compares it with the intended behaviour
    expect(title).toBe('<title-of-the-page>');

  }, timeout);
});
```

Hurray! You've added Headless UI tests to your project. Now you can similarly define tests for different functionalities using the docs [here](https://devdocs.io/puppeteer/).

## Cons of using jest-puppeteer

1. It is headless and hence fast, light-weight, and less resource-intensive. 
2. It can stimulate keyboard-press and mouse-click akin to manual testing functions.
3. It is simple and easy to use and works out of the box.

## Problems that you might face

It could give a sandbox-ing error if you run it in a container without a defined user. When running headless Chrome in a container without a defined user, the chromeOptions environment property needs a --no-sandbox args (in addition to the other headless args), or Chrome won't be able to startup. The **possible solutions** to this are:

1. Make sure you're not running them as a root user. 
2. If running them as a root user, include `args: ['--no-sandbox']` in jest-puppeteer.config.js (not recommended).
3. Make sure you have all the required dependencies installed. 
For Debian systems that can be installed using:
`sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`  

**Happy coding! =)**
