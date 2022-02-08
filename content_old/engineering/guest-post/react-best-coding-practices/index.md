---
title: "32 React Best Practices That Every Programmer Should Follow"
date: "2021-10-26"
coverImage: "Best-Practices.png"
author: "Anjali Rohira"
tags: ["React"]
description: "Important React best practices every React developer should follow before, during, & after writing the code. To ensure code maintainability, keep these React coding best practices handy."
---

## Why Follow React Coding Best Practices?

Writing code to create apps isn't just enough; the code should be as clean and maintainable as your app. Before jumping into the good practices to follow, it's essential to realize the reasons behind the same. It becomes crucial for you to understand coding conventions because of the following reasons:

1. As a developer, you shall understand that writing code to build apps is not enough, but the code should also be _Reliable_, _Scalable_, and _Maintainable_. Generally, 40% - 80% of the total cost of software is spent on its maintenance.
2. _Readability is the priority_. Any software is seldom fully supported by one single developer; There is a whole team or group of people working on it. Furthermore, new developers always join the project team. Thus,  maintaining coding standards improves the product's readability that lets developers easily understand the codebase even faster.
3. Like any product, the software must be well-packaged and clean. Following best coding practices helps you write clean code throughout the codebase by ensuring consistency.

## Starting with React Best Practices

### Code Structure

There's basically no defined structure, but you should have a style to follow throughout the codebase. Thus, this section explains how you can structure your codebase for medium to large-sized apps.

1. Put all your imports in order at the very top of the code file. You shall ideally prioritize as follows:
    
	`React imports` <> `Library imports` <> `import * as` <> `import ./<some file>`

    Make sure all your imports statements are on new lines, as this will make your imports clean and easy to understand for all the components, third-party libraries, etc.
2. Use `index.js` for each folder to export so that all the imports are referenced on the `index.js` file, and you don't have to write import statements again and again for every file.
3. It's easy to get confused about _whether to use double quotes (" ") or single quotes (' ')_ while working with React. The simple answer is: `maintain consistency` whatever you're using. 

	Also, consider that you use double quotes (" ") for `JSX` attributes and single quotes (' ') for the `JS` code (Follow the standard way or maintain consistency).
4. Most of the time, beginners merge two-three components inside a single file and play around with that. However, that's not a good practice to follow. Dividing the whole app into components and then working on it on a separate file is a good practice to maintain clean code.
5. Do you sometimes use CSS styles with JSX? But it's a bad practice. Always make `classNames` for each element and put all the styling under respective CSS files only.

### Naming Conventions

1. Your filenames should always have consistent casing and extension. Either use `.js` or `.jsx` as explained in code structure for extensions. And `PascalCase` or `camelCase` for filenames.
2. In React, name your file the same as the React component inside that file i.e. without a hyphen in the filename. For example: `Registration-Form` → ❌. `RegistrationForm` → ✔️.
3. Not only filename but also make sure that your `variables/functions/modules` filenames are consistent with cases.
4. Use well-descriptive names for `variables/functions/modules/Actions`, keeping in mind that it is application-specific so that even a third party or new developer can easily understand you code.
5. It's bad to use the underscore prefix ( _ ) for a React component's internal methods because underscore prefixes seem to be used as a convention in other languages to denote private objects or variables. But everything in JavaScript is public. And there is no native support for privacy. So, even if you add underscore prefixes to your properties, It'll not make them private. `_onClickSubmit() → ❌`
6. When making reducer functions, write `Action` types as `domain/eventNames`. For example: `ADD_TODO` and `INCREMENT` (in CAPITALS) as this matches the typical conventions in most programming languges for declaring the constant values.
7. Talking about `cases` in a React component, use `PascalCase` for the same — and for their instances, use `camelCase`. For example:-

```
const loginForm = <LoginForm />;
import LoginForm from './loginForm';

```

### Files and Folders

1. Your app's directory structure shall be as follows:

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

2. Each component folder should have its respective files grouped under the same. It maintains the hierarchy throughout the codebase. The necessary files include:
`Component.js`, `Component.css`, `Component.test.js`

### Code

1. *Play the game of [HOOKS](https://www.loginradius.com/blog/async/react-hooks-guide/) by following all its rules*. You can read more about the rules [here](https://www.smashingmagazine.com/2020/04/react-hooks-best-practices/). Either manually follow these rules or use an ESLint plugin called `eslint-plugin-react-hooks` which enforces these rules. So, add these rules while working on any project
2. Remove `console. logs` — unless you have strong motivation why you would like it.
3. Avoid multiple `if-else blocks`. Instead, use `ternary` — best for clean code practice
4. Remove all `commented-out codes`. The biggest motivation for writing comments is the bad code that you write. It would be good to spend more time writing descriptive functions, methods, and filenames that are self-explanatory.
5. Write `Tests` for each component. It's a good practice to write test cases for each component developed as it reduces the chances of getting errors when deployed. You can check all the possible scenarios through unit testing — and for that, some of the most commonly used React test frameworks you can use are `JEST` and `ENZYMES`.

### Good Commenting Practices

1. Use comments to explain _why you did something_, not _how you did it_. If you find yourself explaining  _how you did something_, then it's time to make your code self-explanatory.
2. Another point is not to write comments that are obvious and redundant — for example:

```
// Prints out the sum of two numbers
console.log(sum);
```

3. Write comments that are legal, informative, explanatory of intent, and offer clarification,

### ES6

1. Always destructure your props. Destructuring your props helps make your code cleaner and more maintainable. It also makes assigning object properties to variables feels like much less of a chore.
2. Know where to use spread/rest operators. You shall read about it before actually using it.
3. Try using `optional chaining` if possible.
4. Use `const` instead of `var` or `let` . `const` lets you check that a variable should always stay constant. `let` indicates that the values of the variables can be changed.
5. Start preferring `arrow functions` (= >) for more cleaner code. Arrow functions allow simplifying your code to a single line.

### Basics

1. Always ensure that your app is responsive.
2. Your app should contain a proper `README.md` file that clearly details or explains your app. Clearly mention the features, functionalities, contributions guidelines, installation process, guide, etc.
3. Do check that your app runs without any errors.
4. Use `EsLint` throughout your codebase and other automation tools so that most of the best practices are maintained automatically for you.
5. Consolidate duplicate code throughout the codebase.

Please note that I haven't talked about automation extension and tools that can help you maintain most of the best practices easily without looking into separately. But, I wanted to bring this into consideration. Anyhow, you can use extensions like `prettier`, `EsLint`, `EditorConfig`, `PLOP` etc., to maintain your codebase efficiently.

These are the best practices that I've learned practically over time by working in a team, reviewing my mates' codebase, observing open-source projects and repositories, and reading great resources, such as the [offical React docs](https://reactjs.org/docs/getting-started.html). 

## Conclusion

I hope you gained valuable insights. If you have more suggestions or practices that the React or dev community can follow, please to let us know.

Until next time, keep learning, build awesome stuff, and uplift the community.

By the way, if you want to [add user registration and authentication to your React apps](https://www.loginradius.com/blog/async/user-authentication-react-application/), you can use LoginRadius. It helps you become more efficient and focus more on the core business features of your React apps.
