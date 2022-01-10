---
type: async
title: "Introduction of Idx-Auto-Tester"
date: "2020-06-22"
coverImage: idx-auto-tester.png
author: Himanshi Sharma
tags: ["Automation", "Idx-Auto-Tester"]
---

[Idx-Auto-Tester](https://github.com/LoginRadius/idx-auto-tester) is LoginRadius Identify Experience Automation Framework which refers to IEF Automation, is an open-source automation framework built-in Nightwatch| Node.js tool with delivering all the standard authentication cases of LoginRadius Identity Experience.
This automation framework has been created for [The LoginRadius Identity Experience Framework](https://www.loginradius.com/docs/libraries/identity-experience-framework/overview/#identity-experience-framework) which is a ready-to-use solution that provides predefined layouts for all necessary authentication actions. It has all of the user accounts flows available, such as login, registration, forgotten password, and profile management.

## Technology used to create Idx-Auto-Tester

We used Nightwatch.js end-to-end testing framework to create our Idx-Auto-Tester. This framework relies on Selenium and provides several commands and assertions within the framework to perform operations on DOM elements. It internally uses the powerful W3C Webdriver API or the Selenium Webdriver and simplifies writing end-to-end automated tests in Node.js and effortlessly sets up for Continuous Integration.

Nightwatch uses JavaScript language (Node.js) and CSS/XPath to identify an element. It has Built-in command-line test runner which can run the tests either sequentially or in parallel, together, by group, tags, or by single.

## Installation

Step 1: [Download and Install Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

Step 2: [Install Node.js](https://nodejs.org/en/).

Step 3: Install Nightwatch. In the command line, navigate to any directory and type

```
  npm install -g nightwatch (here ‘g’ is for installing globally).
```

Step 4: Create a folder structure as shown below where Project is the root.

![](https://lh6.googleusercontent.com/ELzKfQlR5jHkRzeVW_9S0VxLD8vSfo2hJCvQxf37DZjwaod1Me05BzIs2Vk9unKneDda1PpI6TdmhvH7KnqFgCP0cRhIxORM9sfTn9RSTlTC40pwScwLLprVX2uu6sltu3kClQsc)

Step 5. Now it is required to install selenium-server-standalone.jar and chromedriver.exe along with other dependencies to execute test cases.

As all the dependencies are added in nightwatch.json, so by executing below command, these will be added in node_modules folder

```
  npm install
```

## Configuring and Setting up Nightwatch.js

Now we have installed all the dependencies and configuration setup for the automation framework. Nightwatch.js offers an in-built test runner which expects a JSON configuration file to be passed. The default configuration file is nightwatch.json which should be present in the project’s root directory.

Step 6. In the root folder, create “nightwatch.js” file and place the following line:

```javascript
require("nightwatch/bin/runner.js")
```

Step 7. Now create `nightwatch.json` configuration file with the configurations mentioned as below code snippet for testing with Selenium and JavaScript.

```json
{
  "src_folders": ["test"],
  "output_folder": "tests_output",
  "custom_commands_path": "helpers/custom-commands",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "",
  "test_workers": {
    "enabled": false,
    "workers": 3
  },

  "selenium": {
    "start_process": true,
    "server_path": "node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.13.0.jar",
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": "node_modules/chromedriver/lib/chromedriver/chromedriver.exe",
      "webdriver.ie.driver": ""
    }
  },

  "test_settings": {
    "default": {
      "skip_testcases_on_fail": false,
      "launch_url": "http://localhost",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "screenshots": {
        "enabled": true,
        "path": "screenshots"
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": false,
        "acceptSslCerts": false,
        "chromeOptions": {
          "args": ["--headless-none"]
        }
      }
    },
    "firefox": {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "cli_args": {
          "globals": {
            "env": "fire  fox"
          }
        }
      }
    },

    "ie": {
      "desiredCapabilities": {
        "browserName": "internet explorer",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "cli_args": {
          "globals": {
            "env": "ie"
          }
        }
      }
    }
  }
}
```

Step 8. Now its time to design test case of any scenario, same as created in our [Idx-Auto-Tester](https://github.com/LoginRadius/idx-auto-tester) Framework under **test** folder named as **TC_01_UserLogin**

To create functions/methods, we used nightwatch custom commands approach to create commands for all the required functions under custom-commands folder, like as there is command created for **createUser.js** which used to create the user and call it under test case.

> Note: We are using 'Function-style commands' of Nightwatch to create command to resolve the asynchronous queueing system problem while running the test case.

Step 9. The final thing we are required to do is to execute the tests from the base directory of the project using the command:

```
npm test
```

> Important Tip : A script has been added in package.json to define test execution command:

```json
"scripts":
  {
    "test": "node nightwatch.js --reporter html-reporter.js test"
    }
```

This command will validate the tests and dependencies and then execute the test suite, which will open up the mentioned browser and execute the desired test steps.

## Parallel Testing with Nightwatch.js in Selenium WebDriver

It is required to update the configuration to execute the tests in parallel by enabling the test_workers as true. This will enable parallel execution and execute all tests on a defined number of workers.

```json
  "test_workers": {
    "enabled": true,
    "workers": 3
  },
```

## This is all about Idx-Auto-Tester Framework Implementation

In this framework design, we have covered various flows of LoginRadius Identity Experience Automation testing with Selenium Javascript. I hope we are now clear about the approach for an end-to-end automation testing with Selenium JavaScript using Nightwatch.js with the reference of Idx-Auto-Tester. We are aware of all the prerequisites required for setting up Nightwatch.js. It automates the entire test suite quickly with minimal configuration and is readable as well as easy to update. Our framework is also capable to use the best feature provided by Nightwatch.js framework which is the parallel testing of cases that proves to be time-efficient. The test results can directly be read from the terminal and also stored at a specified output folder.
