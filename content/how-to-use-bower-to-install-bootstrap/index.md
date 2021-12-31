---
type: async
title: "Install Bootstrap with Bower"
date: "2017-07-05"
coverImage: "bower-logo.png"
author: "Pascal Noel"
tags: ["Bootstrap", "Bower"]
description: "Learn how the Bower package manager helps into quick components  deploy and install Bootstrap using Bower"
---

Bower is a popular package manager to help you quickly deploy components. In this article I'm going to show you how to install Bower and how to use it to install Bootstrap.

Pre-requisites: To install Bower you must first have Node.js and npm (another package manager) installed, your computer may have shipped with these pre-installed. To check if you have npm, open your command-line tool and type:

```shell
npm -v
```

If you do not get a version number, you may need to install npm which comes pre-packaged with Node.js

You can find Node.js along with instructions on how-to install it here: https://nodejs.org/en/

**Windows Users Only**: If you're a Windows user make sure you have Git for Windows installed to work with the Windows Command Prompt with Checkout Windows-Style and commit Unix-style line endings. You can find more information on that here: https://git-for-windows.github.io

## Installation:

Provided that you have both Node.js and npm installed, run the following command in your Command-line tool:

```shell
npm install -g bower
```

## Usage:

Once Bower is installed it's as easy as going to your project folder in Command-line and typing:

```shell
bower install bootstrap
```

  

followed by:

```shell
bower install jquery
```

  

This will install the files required for Bootstrap in the newly created 'bower\_components' folder.

In this folder you will have 2 new folders 'bootstrap' and 'jquery'.

The next step is to include the files for both jQuery and Bootstrap into your project file(s).

...And that's it, you're good to go.

## Updating

If you need to update a project and are unsure which bower packages you have installed that might need an update, you can type

```shell
bower list
```

in your project directory for a listing of packages you installed via Bower and which ones are due for an update.

in this case if we wanted to update our bootstrap install we would do:

```shell
bower update bootstrap
```

## Making your Bower configurations portable

Once you have figured out your configurations and installed all of your desired Bower packages you can use:

```shell
bower init
```

Follow the steps provided in your Command-line.

This will initialize a bower.json file which will store your configurations.

Once you have your Bower.json file you can move it around to other locations or projects and you can get Bower to reinstall all of your packages and configurations by typing:

```shell
bower install
```

This will get Bower to create another 'bower\_components' folder with the same packages and configurations specified in your bower.json file.

For further information on using or configuring Bower [You can checkout the official website](https://bower.io/)
