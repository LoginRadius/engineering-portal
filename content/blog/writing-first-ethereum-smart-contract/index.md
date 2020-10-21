---
title: "Writing your first solidity smart contract"
date: "2020-10-21"
coverImage: "cover.jpg"
author: "Khuzama Shahid"
tags: ["Ethereum", "Solidity", "Smart Contract", "Blockchain"]
description: "Writing your first smart contract in solidity language, and understand some basics of smart contract."
---

In this article, I’ll be giving you an overview of how to write your first solidity smart contract. But before that, you should know what is a smart contract in the world of ethereum.

## What is a Smart Contract?
A “smart contract” is simply a piece of code that is running on Ethereum. It’s called a “contract” because code that runs on Ethereum can control valuable things like ETH or other digital assets.

As defined in the definition of the smart contract it’s just a simple contract which lives inside the Ethereum and controls the contract from there. For Simple understanding, we can think of it like that we wrote a contract in we defined that we have “X” numbers of employees and we need to release their salaries at the end of each month and that contract will simply release their salaries at the end of each month.

Now that we have understood that what is a smart contract lets dive into writing your first solidity smart contract.

## Getting Into Action:

As a beginner, we can start with [Remix](https://remix.ethereum.org/) which is a great IDE which supports solidity, easy to use and have some great features. We will be writing a smart contract for an inbox in which we will set a message and get a message. Now open the Remix and follow the steps,

- On the left side of Remix, you can see a file explorer panel, create a file named as Inbox.sol.
- A new file will be created in which you will write the code, write the following code in your file.

```javascript
pragma solidity ^0.7.3;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
```

## What the heck I’m writing?
Don’t get overwhelmed by seeing all the code I’ll be guiding you through the code as well.

In the first line, we define the version of solidity in which we are going to write our code so that in future if a new version comes our would not break by it. If you’re familiar with javascript you won’t face much problem in understanding the syntax of solidity.

After defining the solidity version we define the contract with the contract keyword following the contract name in our case it’s named as Inbox. After that, we initialized a public variable as string type, which will live inside ethereum storage and whenever we have to change the value of this variable we’ll have to make a transaction which will cost us some fees.

On next line, we have made a constructor function for Inbox contract which will run when we’ll deploy the contract on ethereum. In the constructor function, we have passed the parameter initialMessage as type string. The keyword memory tells solidity to create a chunk of space for the variable at method runtime, guaranteeing its size and structure for future use in that method. The value of parameter initialMessage is then stored to the message variable.

At last, we defined the setMessage function with public access type, having parameter as newMessage as type string which lives in memory. This newMessage is then stored in the message variable. 

That’s all from the code perspective folks, just an extra gotcha that I would like to share with you that we don’t need to write an extra function for getting the value of message variable. Solidity automatically create a function for you with the same name as the variable(only if the variable access type is public). As we have a public variable of message, it’s function will automatically be created which you can use to get its value.