---
Title: IMPORTANCE OF TYPESCRIPT TODAY
Date:2020-10-12
coverImage:ts.jpg
author:"Pratyay Banerjee"
description:Sense the mighty power of TypeScript in 2020
---

# IMPORTANCE OF TYPESCRIPT TODAY

## Why do types exist in the first place?

Classic programming languages like Pascal, C, C++ and others have been well known as _strong typed_ languages. This means that in those languages stricter typing rules had to be set at compile time.

Every time you declared a variable or a function argument you had to clearly state their type before using them. The reason behind this concept goes way back in time, with the so called _type theory_ seeking to ensure that programs have meaning.

The hardware is unable to discern types. These could be considered more as a human abstraction that enable programmers to think at a higher level, at the time it makes code more expressive and clear.

In addition, it offers advantages from a compiler's perspective such as _optimization_. Type checking at compile time helps the compiler to use machine instructions in a more efficient way. _Safety_ is another important aspect to take into account, since a strong type system help the compiler to detect errros in advance.

With the advent of new interpreted languages like Basic, JavaScript, PHP, Python where type checking was done at runtime, programmers got used to avoid compiling their code. Then, languages became smarter at detecting types based on context and data.

## Back to the roots

Far from starting a new debate about _strong typing_ vs _loose typing_, we must understand that every language has been created with one specific purpose in mind and no one could forsee that a scripting language like JavaScript would become so popular that it would be extensively used for developing business applications.

Therefore, adding strong typing capabilities to a _loosely-typed_ language like JavaScript, not only helps development teams to produce cleaner and better documented code but also solves a fundamental problem: **catching type errors at compile time rather than at run time**.

## What is TypeScript?

JavaScript is a interpreted or dynamic compiled language, so there is no need for the developer to actually compile the code before running the program. Therefore, when we describe TypeScript as a _Typed Superset of Javascript_, it means that it provides developers with a new set of statements that enable them to add types to a _loosely-typed_ language like JavaScript.

For instance, when we declare a variable in JavaScript there is no need to determine what type it is. When using TypeScript you must add the type when declaring it, although you could opt-out to set the type if you assign a value to it.

```typescript
let isDone: boolean
let decimal: number
let big: bigint
let color: string
let name = "Pratyay"
```

Unlike Javascript (_.js_), TypeScript files use the _.ts_ extension. Browsers are unaware of the existence of TypeScript, therefore it is necessary to pre-process TS code to turn it into Javascript code. This conversion process is called **transpilation**.
Let's point out this subtle distinction:

- When _compiling_, the source code is transformed into another language
- When _transpiling_, the source code is transformed into another language with a similar level of abstraction

Truth to be told, I had to clarify this concept because I have bumped into this term several times and purists make this distinction. However, at this post, as well as in the TypeScript official documentation, for the sake of reading clarity we may equally use either _compile_ or _transpile_ terms to refer to _transpilation_.

## Installation

In order to use TypeScript we can use either `npm` or `yarn`

```bash
yarn add typescript
```

or

```bash
npm install typescript
```

Then, once we create our TS file, we can compile it by using the `tsc` command

```bash
npx tsc
```

## Configuration

We could create TS files in our project and then compile it through the `tsc` command at the terminal. Let's say we create a file called: `app.ts`

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}
```

Then, from the command line we execute:

```bash
npx tsc app.ts
```

a new file called app.js will be generated with the following content:

```javascript
function add(num1, num2) {
  return num1 + num2
}
```

However, there are simpler ways to go. The easiest one is to create a `tsconfig.json` file at the root of your JS project and let the compiler to take decisions based on this configuration.

```json
{
  "compilerOptions": {
    "target": "es6",
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "removeComments": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

This configuration file is divided by sections. As we can see this is a basic sample configuration file where we use the following options:

- _target_: It determines the JS version it supports: _ES3, ES5, ES6 ..._
- _rootDir_: It determines the root dir for your source code (.ts files)
- _outDir_: It determines the output dir for _compiled_ JS files
- _module_: It sets the module system for the program: _common.js, UMD, AMD, ..._
- _removeCommments_: It removes comments from the compiled code, it is considered a _best practice_
- _include_: It determines the folders where the source code resides
- _exclude_: It determines what folders or files to exclude from the compilation process

After defining a new configuration file for TypeScript, we are ready to move on and work on multiple TypeScript files located in our `src` folder. Then, all we need to do is run `npx tsc` from the command line, so files can be compiled and moved to the distribution folder.

We could also make `tsc` to be called from one of the tasks at the `package.json` and even define `watch` options to automatically run `tsc` every time our code is modified.

Depending on the technolgy you use and your type of project, there are multiple ways to set TypeScript up.
We won´t show every possible configuration scenario in this post, so we encourage the reader to go ahead and read the <a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" target="_blank">Official TypeScript Documentation</a> in order to explore more options.

## How should we use TypeScript?

TypeScript is nothing but a tool that helps developers to use best practices in software development by adding stricter rules to define data types. But this should go hand in hand with other good practices like scoping variables appropriately by using `let` or `const` instead of `var`.

## Conclusion

We may conclude that TypeScript, as a static type checker language, has added a new layer to improve JavaScript robustness as a frontend language.
As mere observers, we could also glimpse how most languages add similar features: _functional programming, lambda functions, strong typing, immutable variables, etc._

This is good because it shows maturity in the software industry. But it is also better for the new software developer and the ones to come.
