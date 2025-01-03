---
title: "Getting Started with Phonegap"
date: "2015-03-31"
coverImage: "dev-sprites2.png"
author: "Team LoginRadius"
tags: ["Engineering","PhoneGap","Mobile"]
---

PhoneGap now also known as Apache Cordova, is a powerful tool for mobile development which allows you to develop in HTML/JS markup and quickly generate out various mobile compatible apps. This prevents your developers from having to learn and understand multiple platform specific languages and instead use the PhoneGap framework which is based in HTML to create the app and then generate it into any one of the following platforms:

1. iOS
2. Android
3. Windows Phone
4. Windows
5. Firefox OS
6. Amazon Fire OS
7. Blackberry

With time saved on learning development languages for the above platforms your team can focus on the features of your app.

## **Setting up your Environment**

1. Download and install [node.js](http://nodejs.org/download/), This will be used to install the Cordova/PhoneGap framework.
2. Download and install a [Git Client](http://git-scm.com/downloads), This is used by the Cordova/PhoneGap framework when creating projects.
3. Open command prompt and verify that both of the above systems have been installed by running _npm_ and _git._
4. Install the Cordova/PhoneGap system by running the following command in your command prompt (Note: this may take a few minutes)

```
C:\>npm install -g cordova
```

Verify your installation of Cordova/PhoneGap by running _cordova_ in command prompt. This should display a list of the available Cordova commands.

## **Setting up your Project**

1. Create a directory which will contain your PhoneGap/Cordova project code.
2. Open the created directory in command line and create a project with the command __cordova create < sitename >__

```
C:\>rootdir\cordova create FirstSite
```
    
3. This will create a project in the root folder with the specified site-name. This project will contain:
    1. "hooks" directory- Contains special scripts that can be used to customize Cordova commands.
    2. "platforms" directory- This contains the app specific projects that you will include below.
    3. "plugins" directory- Contains add-on code for interfacing with native features. You can create your own custom interface or use one of pre-compiled plugins.
    4. "www" directory- Contains the PhoneGap/Cordova structure and some standard js and css files.
    5. config.xml file- This file contains meta data for controlling common features of your apps like the app title, description and author.
4. Add platforms to the project with the _cordova platform add <platform>_ command. **Note:** adding platforms requires that the relevant dependencies are installed in your system for example adding android requires that you have installed the Android SDK. Available platforms for a windows environment are:
    
    - wp7
    - wp8
    - windows8
    - amazon-fireos
    - android
    - blackberry10
    - firefoxos
    
    And for Mac:
    
    - ios
    - amazon-fireos
    - android
    - blacberry10
    - firefoxos
    
    ```
    C:\>rootdir\cordova platform add android
    ```
5.  You can now get a list of the added platforms by running the following command:
```
C:\>rootdir\cordova platform ls
```
6. You can remove a specific platform from the list with the following command:
```
C:\>rootdir\cordova platform remove android
```    
7. Once you have added in the desired platforms build the platform specific apps by running the following command: 

**Note:** Building platforms requires that the relevant dependencies are installed in your system for example building android requires that you have installed the Android SDK

```
C:\>rootdir\cordova build
```
    
8. You can use these built projects found in the "platforms" directory in platform specific IDEs or emulate the projects directly with the following command:

```
C:\>rootdir\cordova emulate android
```

At this point you have a basic PhoneGap project configured and your desired platforms added and you can get started with adding or building out additional features and content in the "www" directory and run the command in step 7 above to create the platform specific projects. You can find detailed instructions on setting up additional features and implementing PhoneGap on the PhoneGap site.
