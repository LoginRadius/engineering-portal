---
title: "How to publish a react component(s) to npm and solutions to problems you'll face"
date: "2020-10-01"
coverImage: "react-to-npm-940x788.png"
author: "Wassim Ben Jdida"
tags: ["React", "NPM", "publish"]
descripiton: "In this article we will see how i published my first React package, the problems that i've faced and the solutions"
---

## Before You Get Started
This tutorial assumes you have:

*   A basic understanding of Javascript and React.js
*   Nodejs installed on your system
*   Passion 😁 !

well, yesterday i've successfully published my first React.js component to npm after a lot of tries, with a working demo, its a time slot picker, you can check it out [here](https://github.com/wassimbj/slotpicker). yea i know thats cool right ? 🥳

In this article we will see how i did it, the problems that ive faced and the solutions, its really simple. here, take this ☕  and stay focus ! 

## Let's get started
### ***Step 0*** 💧
Lets see the big picture, my folder structure, and then we will see whats the role of each file and folder.

![Folder structure](folder-structure.png)

Go ahead and create the folder (the wrapper), that will host all of that, then create a ***/src*** folder that will have all of your code and assets / styles

> **Note** that your ***/src*** folder should include one file for now, later on the problems and solutions section you will see how can we add mutilple files and components to our package

#### ***Step 1*** 🍀
Now after creating the folders, open your command line, cd into the wrapper folder and run
```bash 
npm init -y
```
this will create a package.json file, well we dont much need its content, thats why i will show you how it should look like,

the package.json file must have one file only, wich is the main file, so if you are planning lets say to create a Tailwind's React.js components, what you want to do is create the components, and then create a main file, that will export all of the components.

**please replace all the text between "<>" with yours**

```json
{
    "name": "<yourPackageName>",
    "version": "1.0.0",
    "description": "",
    "main": "./dist/<yourPackageFile>.js",
    "license": "MIT",
    "scripts": {
        "build": "webpack",
        "devpack": "npm run build && npm pack && cd demo && npm i ../<yourPackageName>-<VERSION>.tgz && npm start"
    },
    "keywords": [
        "React.js",
        "<Some key work>",
        "<Another key work>",
    ],
    "repository": {
        "type": "git",
        "url": " https://github.com/<YourUserName>/<YourRepoName>.git"
    },
    "author": "wassimbj",
    "peerDependencies": {
        "prop-types": "^15.6.0",
        "react": "^16.0.0",
        "react-dom": "^16.0.0"
    },
    "devDependencies": {
        "babel-core": "^6.21.0",
        "babel-loader": "^7.1.4",
        "babel-preset-env": "^1.6.1",
        "babel-preset-react": "^6.16.0",
        "babel-preset-stage-0": "^6.24.1",
        "copy-webpack-plugin": "^6.1.1",
        "css-loader": "^3.5.1",
        "path": "^0.12.7",
        "prop-types": "^15.6.0",
        "react": "^16.0.0",
        "react-dom": "^16.0.0",
        "style-loader": "^1.1.3",
        "webpack": "^4.5.0",
        "webpack-cli": "^3.2.1"
    },
    "dependencies": {}
}
```

let me the "devpack" command, what its gonna do is run the build command, wich will bundle our code in the src folder and place it in a new folder called dist, as you will see in the next step how to do it !

the npm pack, is a really great command for testing, it will create a pack/folder with name of "**{YourPackageName}-{VERSION}.tgz**" that has the exact same code that you will publish to npm, and you can install it just like any other package on npm now, yea thats cool !! 
just run this cmd in any react project you have in your computer 
***``` npm i /path/to/pack/{YourPackageName}-{VERSION}.tgz ```***


#### ***Step 2*** ☘️
second is creating a webpack.config.js file, cd into the wrapper folder, not your source code folder. 
this is the content that you will need if you have only one file in your source code, and then in the problems sections i will tell you what you gotta do if you have more then 1 file
**Don't forget to replace whats between the "<>"**

```js

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src'); // your source code, with the assets and code
const distPath = path.resolve(__dirname, 'dist'); // the output folder

module.exports = [
  {
    mode: 'production',
    context: srcPath,
    entry: './<YourPackageFile>.js',
    output: {
      path: distPath,
      filename: '<YourPackageFile>.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ],
    },
    resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      }
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './assets', to: 'assets' },
        ],
      }),
    ],
    externals: {
      // Don't bundle react or react-dom      
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
      }
    }
  },
]
```

> so this important file, will bundle our code and take it to a different folder in the same level of our code folder that you named it "src" or whatever..., and put it in there, in our case i named it ***dist***.
**if you are fimiliar with webpack and js objects, copy and paste this in your webpack.config.js file, else lets learn something new**

so we are exporting an array of object, the ***context*** property, is the path to our source code, to our package code, with the styles and all of the components, the ***entry*** property is what will webpack get and bundle, as i said before webpack will bundle everything and take it to a new folder, and thats what we are saying in the ***output*** property, the path where it will put our bundled code, the filename that will inject our code into, **please keep in mind that the filename must be the exact same name in the main property in your package.json file** and libraryTarget (dont worry about it)
the ***plugins*** has only one wich is the CopyPlugin, it will copy our assets folder into the dist folder with the same name "assets"

#### ***Step 3*** 🌿
create a ***.babelrc*** file and put this into it
```json
{
	"presets": [
		"react",
		"env",
		"stage-0"
	]
}
```

that was easy right ? 😅

now thats all you need for now. try running in the wrapper folder (where you have the package.json file)
```bash
npm i
```
and then run
```bash
npm run build
```
and you should see a **/dist** folder, thats the folder that we will need to publish to npm

## Problems and solutions
if you are building a components that depends on other components in your code, you will run into some problems cause we didnt configure webpack to bundle other files except one file wich is the "YourPackagFile.js".

thats why we need to add the other files too, its easy just add another object to the array with the right configs like so,

```js
{
  mode: 'production',
  context: srcPath,
  entry: './<OtherFile>.js',
  output: {
    path: distPath,
    filename: '<OtherFile>.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
},

```

if you have another file ? just add another object with file path and everything...



## What about the Demo ?

just cd into the wrapper folder and run
```bash
npx create-react-app demo
```
it will create a new react app to test your package on it.

now try running
```bash
npm run devpack
```

and you should see the react app running. go play with it, import your created package and test it.

if you faced some problems about package dependency, just create a .env file in the demo root folder and paste this ***SKIP_PREFLIGHT_CHECK=true*** in it



## Publishing
Yeee, what we have been waiting for. so after testing your package locally, its the time to give it to the world.

run 
```bash 
npm login
```

before publishing to npm, we dont want to publish every single folder and file in our wrapper folder, we just need to publish what the developer needs, to keep it small and lightweight.

so create a ***.npmignore*** file and paste this in it
```bash
node_modules
demo
src
webpack.config.js
.babelrc
<YourPackageName>-<Version>.tgz
.gitignore
```

Now run
```bash
npm publish
```

and you should see a success message 🥳

**Thats it**, i hope you enjoyed this article and you got your first React component live !

