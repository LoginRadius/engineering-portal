---
title: Read and Write in a local file with Deno
date: "2020-06-09"
coverImage: "deno_file_system.png"
author: "Puneet Singh"
tags: ["Deno"]
---

In this blog, we will see how we can read and write into a local file with the help of Deno

 - First, we will create a program which will read multiple quotes from a text file and then print a random quote on our screen 
 - Then we will take input from the user in the command line and write those inputs in a text file 
 
## Before You Get Started

This tutorial assumes you have basic knowledge about Deno and you have latest Deno version installed on your system, if you haven't installed Deno on your system or never ran Deno code please look at this great introductory blog - [Hello world with Deno](/hello-world-deno/) 

### Part 1: Read a file and print text out of it

First, add a file called quotes.txt in the folder you want to run the Deno code, We will read these quotes with the help of Deno

```
Don't worry about what anybody else is going to do. The best way to predict the future is to invent it. - Alan Kay
Premature optimization is the root of all evil in programming. - Donald Knuth
Clarity and brevity sometimes are at odds. When they are, I choose clarity.  - Jacob Kaplan-Moss
Optimism is an occupational hazard of programming; feedback is the treatment. - Kent Beck
A lot of times, people don't know what they want until you show it to them.  - Steve Jobs
Nine people can't make a baby in a month. - Fred Brooks
A clever person solves a problem. A wise person avoids it. - Albert Einstein
```

And then create an index.ts file in which we will write Deno code, we can also write Deno code in javascript instead of Typescript, but as Deno is built on TypeScript we are using Typescript here

```Javascript
const getQuotes = async (fileName: string): Promise<Array<string>> => {
 const decoder = new TextDecoder("utf-8");

 const text: string = decoder.decode(await Deno.readFile(fileName));
 return text.split("\n");
};

const quotesArr: Array<string> = await getQuotes("quotes.txt");

const randomQuote: string =  quotesArr[Math.floor(Math.random() * quotesArr.length)];
console.log(randomQuote);
```
In the getQuotes function, we are using  Deno.readFile #readfile to read the contents of a file as an array of bytes and using `TextDecoder` to convert the bytes to string and then splitting it in a string array and return

Then we are just picking a `randomQuote` with `Math.random` and `console.log` that on our screen



To run the above code we need to put `--allow-read` flag in our command as shown below because we need to access the local filesystem to read the file.

```
deno run --allow-read index.ts
```

Deno is secure by default, with no file, network, or environment access unless explicitly enabled. You can run `deno run --help` to see  all the available flags for different permissions

Once your program run initially you will see that Deno is compiling the index.ts file and printing a random quote from quotes.txt, if you run the programme again without changing the code it will not compile it again and will just show another random quote.

```
deno run --allow-read index.ts
Compile file:///C:/Users/PuneetSingh/Documents/deno_fs/index.ts
Premature optimization is the root of all evil in programming. - Donald Knuth


deno run --allow-read index.ts
A lot of times, people don't know what they want until you show it to them.  - Steve Jobs
```
### Part 2: Create a file and write text in it

Let's create another TypeScript file write.ts and put the below code in it

```Javascript
import { readLines } from "https://deno.land/std@v0.52.0/io/bufio.ts";

console.log('Start typing...');

const encoder = new TextEncoder();
await Deno.writeFile("input.txt", new Uint8Array());

// Listen to stdin input by readLines
for await(const line of readLines(Deno.stdin)) {
   const data = encoder.encode(line+"\n");
   await Deno.writeFile("input.txt", data, {append: true});
   console.log("Wrote the above text in input.txt\n") 
}
```
In the above code we are using [readLines](https://github.com/denoland/std/blob/main/README.md) to raed user input line by line, Every time we run the code `Deno.writeFile("input.txt", new Uint8Array())` will create an empty `input.txt` file in the folder.

Then `const line of readLines(Deno.stdin)` in a loop will wait for the user to input any text, as we will give any input  `Deno.writeFile` with `{append: true}` is used to append data in `input.txt`

Let's run the program, Once we run it, whatever text we will give to the program through standard input will be written to input.txt

```
deno run --allow-write write.ts

Start typing...
This is a demo for Deno
Wrote the above text in input.txt

In this demo, we will write some text in a file
Wrote the above text in input.txt
```

If you check the input.txt file you will found the content which was given as input

```
This is a demo for Deno
In this demo, we will write some text in a file
```

Now you know how to read from a text file and how to write in a text file with Deno, You can found the complete source code used in the above blog on our [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/Deno/ReadAndWriteInLocalFile)  