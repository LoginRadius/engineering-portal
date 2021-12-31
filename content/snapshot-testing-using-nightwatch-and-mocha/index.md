---
type: async
title: "Snapshot testing using Nightwatch and mocha"
date: "2020-07-29"
coverImage: "snapshot_nightwatch.png"
author: "Nitesh Jain"
tags: ["QA", "Nightwatch","snapshot-testing"]
description: "Snapshot testing is one of many different testing tools, which compares the previous and current snapshot. Unlike TDD, snapshot testing relies on the fact that your component renders correctly already. "
---

### Snapshot Testing

**Snapshot tests** as the name implies, is a very powerful tool to test whether you the UI has change or not. A typical **snapshot test** case for a website/mobile app renders a UI component, takes a **snapshot**, then compares it to a reference **snapshot** file stored alongside the **test**.

### Snapshot Testing  Benefits

#### For QA Manual And Automation

- Easy to identify any change in the DOM element.
- Help to automation to check element id as same as previous.
- Help to check integration testing will be in right.

#### For Developer Unit Testing

- The developer can compare snapshot dom on every movement when the dynamic change happened on DOM.
- Get changes in DOM and update QA for update automation testing products.

Need to install **NPM**

1.  npm i mocha
2.  npm i clean-html
3.  npm i snap-shot
4.  npm i jsdom
5.  npm i jsdom-global

>  **NightWatch** does not have snapshot feature. So, We will use **mocha** to take snapshots. But **Mocha will be run by NightWatch.**

### Directory Structure

As per over automation project. We have created a "snapshot" folder under the "test" folder and we will be following the same structure as per the below project menu bar. 


[![N|Solid](https://cdn.filestackcontent.com/solmjUZXTPWZgTNppBmW)](https://cdn.filestackcontent.com/solmjUZXTPWZgTNppBmW)

We also need to add Mocha test files, which will use to take snapshot and store under the root folder "\_\_snapshots\_\_".

![(https://cdn.filestackcontent.com/XGkI0wDrQoGDSp2djINg)](https://cdn.filestackcontent.com/XGkI0wDrQoGDSp2djINg)

If you are running automation code via visual code editor, then you can setup a launch.json file which helps you to debug your test code with all file/individual file.

You can see the settings below of the launch.json file.

![(https://cdn.filestackcontent.com/qDjAHwHIQtKp2hmBdaEn)](https://cdn.filestackcontent.com/qDjAHwHIQtKp2hmBdaEn)

* * *

#### Update Snapshot

After creating a snapshot, sometimes we need to update snapshot due to improvement, customer requirements, and any valid changes on UI. So here, we can have some other settings which  will help us.

1.  If we want to update all snapshots by single command then we need to follow below instruction.

    Create a root folder file(update\_snapshot.js) and paste code on it.

    ```javascript
    (function(){
          process.env.UPDATE\=1;
    })()
    ```
    Add in package.json

      ![(https://cdn.filestackcontent.com/TTvchMDTW6F5x87J0688)](https://cdn.filestackcontent.com/TTvchMDTW6F5x87J0688) 

> We can update all snapshot by using → `npm run snapshot-u`

2. If we want to update the single snapshot then we can use the above technique but we just need to update the file name against "test/snapshot".
3. If we use vscode, then we need to update launch.json as per above information 

      ![(https://cdn.filestackcontent.com/uWX0pIUaSzKFyVKJGIYB)](https://cdn.filestackcontent.com/uWX0pIUaSzKFyVKJGIYB)

      and need to create a file("snapshot.config.js") in the root folder and paste the below code.

      ![(https://cdn.filestackcontent.com/Hh3PNxKmSo2pSFRA9YeM)](https://cdn.filestackcontent.com/Hh3PNxKmSo2pSFRA9YeM)

> Important-: If we want to run only a snapshot test then we will need a small change in the nightwatch.json file.

![(https://cdn.filestackcontent.com/EkBrPZffRv2ElZ0Qez36)](https://cdn.filestackcontent.com/EkBrPZffRv2ElZ0Qez36)

You can find the complete reposrtory link [here](https://github.com/niteshjain1987/NightWatch-Snapshot)
