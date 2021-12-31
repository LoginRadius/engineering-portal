---
type: async
title: "Deploying a react app using pm2 and serve"
date: "2020-08-10"
coverImage: "deploy_react_app.png"
author: "Aman Agrawal"
tags: ["React", "PM2", "Deployment"]
descripiton: "Learn how to deploy a react app using pm2 and serve easily"
---

Yes, you have learned React and now you can develop a full-fledged front end application. The `create-react-app` helps you to set up and run a React project, including it code transpiling, basic linting, testing, and build systems.
In short, you can start writing React code with minimal preparation. But once your application is done, it is time to deploy the same on the server, you are stuck and you will seek help from your backend or DevOps mates.

Wait!! Being a front end guy it seems to be difficult, but depolying your application on server is relatively easier than writing state management in redux.

In this post, we will learn how to deploy a React application on an Ubuntu 18.04 server using `Node.js`, `serve`, and [pm2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

> pm2 is a process manager for the JavaScript runtime Node.js. This is an open-source daemon process manager that helps to manage and keep application 24/7

### Prerequisites

To follow this tutorial, you’ll need the following:

- **Latest Node.js version** installed on your computer or the Linux server where are you going to deploy the application.

  ```
  sudo apt-get update
  sudo apt-get install nodejs
  node -v or node –version
  npm -v or npm –version
  ```

- `create-react-app` tool

  ```
  npm install -g create-react-app
  ```

### Deploying the app

1.First of all, create the app using `npx create-react-app`
`npx create-react-app my-app`

2.Now you can run the app by running following command in the project directory root
`npm start`
3.The default react app will run in http://localhost:3000

4.Now install serve and pm2 packages globally on the system/server

      ```
      npm install -g serve
      npm install -g pm2
      ```

5.Since you are in the root directory of your project, run the following command to create a production build of your app.
This will create a directory named `build` in the project root directory

      ```
      npm run build
      ```

6.Now we can run the following command to deploy the app

      ```
        pm2 serve <path> <port> --spa
      ```

In our case, we can run the following command

```
  pm2 serve build 8082 --spa
```

> PM2 can serve static files very easily with the pm2 serve feature. It supports serving raw files from a specified folder or you can serve a SPA (Single Page Application) with it.

Now you can see that your application is running on 8081 port while you have logged out from your ssh terminal of the browser.

- Check the status of the application following command in the shell.

  ```
  pm2 list
  ```

 <!-- ![pm2 List](pm2list.png) -->

**Bonus**: Below are some utility commands to manage the pm2 process

- Specify the app name `pm2 --name <app-name>`
- Delete all pm2 process `pm2 delete all`
- Delete specific process `pm2 delete <app-name>`
- Check the CPU and memory usage `pm2 monit`

Reference links :-

1. [Quick start pm2 ](https://pm2.keymetrics.io/docs/usage/quick-start/)
2. [Process management with pm2](https://pm2.keymetrics.io/docs/usage/process-management/)
