---
title: Run multiple node js version on the same machine
date: "2021-04-30"
coverImage: "index.jpg"
author: "Mayank Agarwal"
tags: ["Nodejs", "NVM"]
description: "In this blog, we will get to know about running multiple node js version on the same machine."
---
# Overview
While working on the multiple projects of NodeJs, we you might required to run different projects on the different node js version or for the legacy node js projects you might required old version of the nodejs version ,and the others required new version of node js, or to checkout the new feature of nodejs, you need to installed latest version of node js 

As on the same machine we can only install one version of the nodejs, so its very painful to uninstall and install new node version as per your project required.

To overcome this problem, we can use the Node Version Manager (NVM). NVM allow to install multiple node js version on the same machine and we can switch between the required node js version.


# Installation
## Windows

Download the latest version of NVM

https://github.com/coreybutler/nvm-windows/releases/latest

Download nvm-setup.zip and install on the windows

### Verify Installation
```
nvm version
```

## MacOs/Linux

Using curl
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
Using Wget
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
### Verify Installation
```
command -v nvm
```

# Usage

##  Get List of all available NodeJs versions
```
nvm  ls available //windows

nvm ls-remote //MacOs/Linux
```

## Install the multiple NodeJs version
### Install latest NodeJs version
```
nvm install node
```
### Install latest LTS Release 
```
nvm install --lts
```
### Install particular NodeJs version
Multiple NodeJs version can be installed using below command
```
nvm install 8.11.1 // to install the 8.11.1 version

nvm install 12.13.1 //to install the 12.13.1 version
```
## UnInstall the multiple NodeJs version
```
nvm uninstall 8.11.1
```

## Switching the NodeJs version
### Get List of installed NodeJs version
```
nvm list  //for windows

nvm ls //for MacOs/linux
```
![nvm list](./images/nvm-list.png)

### Switching Between installed NodeJs Versions
```
nvm use 8.11.1  //To enable 8.11.1

nvm use 12.13.1 //To enable 12.13.1

```
![nvm use](./images/nvm-use.png)

### Use Custom alias for installed NodeJs versions
We can create alias as per the Project basis or the group of projects using same NodeJs version.
```
nvm alias awesome-project 12.13.1
```
After creating Alias, then switch to Alias
```
nvm use awesome-project
```
Remove the Alias
```
nvm unalias awesome-project
```

### Run to specific NodeJs version, without switching
```
nvm run 8.11.1 app.js
```
or can be used below command
```
nvm exec 8.11.1 node app.js
```

### Other Commands
To use installed nodeJs verion in the system
```
nvm use system
```
To complete remove of nvm from the system
```
nvm unload 
```
# Conclusion
Node Version Manager (NVM) is great tool and easy to switch between multiple node version while working on the projects that required different NodeJs versions. It saves lot of the development time by just switching to the required NodeJs version