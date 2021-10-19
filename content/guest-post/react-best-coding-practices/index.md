---
title: React best coding practices to follow
date: "2021-10-18"
coverImage: "https://iotvnaw69daj.i.optimole.com/AXVzL2w.n2y9~6666f/w:auto/h:auto/q:90/https://www.codeinwp.com/wp-content/uploads/2019/09/react-best-practices.jpg"
author: "Anjali Rohira"
tags: ["clean-code", "react-best-practices","scalable-code"]
description: "This blog will cover most of the best practices of react which will help you write clean code and maintain your codebase for future use. More on the blog."
---

# Why to follow best practices while coding?

Writing code to create apps isn't enough, the code ought to be as stunning as your app. Before starting with what are the good practices to follow while coding in react, it's important for us to realize the reasons behind the same. It becomes crucial for software developers to understand coding conventions because of the following reasons:-

1. As a developer, we need to understand that writing code to build apps is not enough, but the code should be ```Reliable```, ```Scalable```, and ```Maintainable``` always. It would be great for you to know that 40% - 80% of the total cost of software is spent on its maintenance.
2. **Readability is the priority**: Any software is almost never fully supported by one single developer, There is a whole team or group of people working on it. And further on, new developers always join the project team. Thus,  maintaining Coding standards improves the product's readability  which lets developer easily understand the codebse even faster. 
3. **Clean code**: Following best coding practices helps us write clean code throughout the codebase by ensuring consistency and like any other0 product, the software must be "well packaged" and clean.

# Starting with React Best Practices

## Code Structure

There's basically no defined structure but you should have one style to follow throughout the codebase. Thus, this will give you an idea on how you can structure your app for medium to large-sized apps.

1. Put all your imports in order at the very top of the code file. It would be good if you follow this priority:-
`React imports` <> `Library imports` <> `import * as` <> `import ./<some file>`.
Make sure all your imports statements are on new lines as this will make your imports clean and easy to understand for all the components, 3rd-party libraries, etc.
2. Use `index.js` for each folder to export so that all the imports are referenced on the `index.js` file and you do not have to write import statements again and again for every file.
3. I see people getting confused between "whether to use double quotes ("") or single quotes ('') while working with react. The simple answer to that is -> `maintain consistency` whatever you're using, but also a good to consider is that you use double quotes (" ") for `JSX` attributes but single quotes (' ') for other `JS` (Follow the standard way or maintain consistency)
4. Most of the time, beginners merge two-three components inside a single file and play around with that. However, that's a wrong practice to follow. Dividing the whole app into components and then working upon it on a separate file is a good practice to follow to maintain clean code.
5. Do you also sometimes use CSS styles with jsx? However, that's a bad practice to do. Always make → `classNames` for each element and put all the styling under respective CSS files only.

## Naming Conventions

1. Your filenames should always have consistent casing and extension. Either use `.js` or `.jsx` as explained in code structure for extensions. And `PascalCase` or `camelCase` for filenames.
2. In React, name the file the same as the React component in that file (without a hyphen in the filename) for example: `Registration-Form` → ❌. `RegistrationForm` → ✔️.
3. Not only filename but also make sure that your `variables/functions/modules` filenames are also consistent in the casing.
4. Use well-descriptive names for `variables/functions/modules/Actions` keeping in mind that it is application-specific, so that, even if a third party or new developer reading your code shouldn't face any difficulty in understanding.
5. Do not use the underscore prefix for internal methods of a React component → Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in→ JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not → actually make them private `_onClickSubmit() → ❌`
6. Write `Action` Types as domain/eventName → `ADD_TODO` and `INCREMENT` (CAPITALS) → This matches typical conventions in most programming languages for declaring constant values.
7. Use `PascalCase`for react components and `camelCase` for their instances for example:-

```
const loginForm = <LoginForm />;
import LoginForm from './loginForm';

```

## Files and folders

1. Your App's directory structure should be in the following format:-

```
└── /src
  ├── /assets - Contains static assets such as  images, svgs, company logo etc.
  ├── /components - reusable components like navigation bar, buttons, forms
  ├── /services - JavaSript modules
  ├── /store - redux store
  ├── /utils - utilities, helpers, constants.
  ├── /views/pages - majority of the app pages would be here
  ├── index.js
  └── App.js

```

1. Each component folder should have its respective files grouped under the same. We do this to maintain the hierarchy throughout the codebase. The necessary file includes:-
`Component.js` , `Component.css`, `Component.test.js`

## Code

1. *Play the game of HOOKS by following all its rules*. You can read more about the rules from [here](https://www.smashingmagazine.com/2020/04/react-hooks-best-practices/).
Either manually follow these rules, or make use of → an ESLint plugin called `eslint-plugin-react-hooks` which enforces these rules. So, add these rules while working on any project
2. Remove the `console. logs` ﴾unless you have got robust motivation why you would like it.
3. avoid multiple `if-else blocks` , instead use `ternary` -> Best for clean code practice
4. Remove all `commented-out codes`. The biggest motivation for writing comments is the bad code that you write. It would be good if you spend more time writing descriptive function/method/file names which are self-explanatory instead of writing comments to explain the code mess.
5. Write `Tests` for Each Component -> It is considered a good practice to write test cases for each component developed as it reduces the chances of getting errors when code is deployed. You can check all the possible scenarios through unit testing and for that some of the most commonly used react test frameworks which you can use are `JEST` and `ENZYMES`.

## Good-Commenting practices

1. Use comments to → explain `why you did something`, not `how you did it` If you find yourself explaining → how you did something, then it's time to make your code self-explanatory
2. Another piece of advice would be to → not write comments which are obvious and are redundant by nature. For example, writing comments for obvious things is never a good practice.

```
// Prints out the sum of two numbers
console.log(sum);
```

1. Write comments that are legal, informative, explanation of intent, clarification, TO-DO comments, etc

## ES6

1. Always destructure your props- destructuring your props is a good way → helps make your coder cleaner and more maintainable → also it makes assigning object properties to variables feels like much less of a chore.
2. Know where to use Spread/rest operators. Read about it before actually using it.
3. Try using `optional chaining` if possible -> Clean code practice.
4. Use `const` instead of `var` or `let` . `const` lets us check that a variable should always stay constant. `let` informs us that the values of the variables can be changed.
5. Start preferring ` arrow functions` (= >) → to get a little bit of cleaner code. Arrow functions allow us to → simplify our code to a single line.

## Basics

1. Always make sure that your app is `responsive`.
2. Your app should contain a proper `Readme.md` file which should store every minute detail about your app. The features, functionalities, contributions guidelines, installation process, guide, etc (everything should be mentioned).
3. Do check that your app runs without any errors.
4. Use `EsLint` throughout your codebase and other automation tools, so that most of the best practices are maintained.
5. Consolidate duplicate code throughout the codebase -> `DRY your code`.

Please note that I haven't talked about some automation extension and tools which can help you maintain most of the best practices easily without having to look into separately. But, I wanted to bring this into consideration. Anyhow, you can use some extensions as well like `prettier`, `EsLint`, `EditorConfig`, `PLOP` etc...

These are some of the practices that i have learned over time by working in a team, reviewing my mates codebase, observing some open-source projects repositories, and reading some great resources such as ```smashing-magazines```, ```react-official-docs``` etc. 

That was it about this blog. I hope you gained some valuable insights. If you have more suggestions or more practices that the react/dev community can follow. Feel free to let us know

Until next time, Keep learning, build awesome stuff and up-lift the community.
