---
title: Recoiling of  React
date: "2021-04-30"
coverImage: "react.png"
author: "Abhimanyu Singh Rathore"
description: "In this article will talk about recoil.js, and how it is managing state in react."
tags: [javascript,react,recoil]
---

# Recoiling of  React

[Recoil js](https://recoiljs.org/ "Recoil js") is another state management library for React.

Though we already have Redux. Mobx, Context but here we got a new light entry in the community.

why I am saying `light` you will figure it out at the end of this blog.

## Why Recoil 
- Firstly it solves the global state management problems.
- Easy to learn, there are no new major principles n logic to learn.
- Quite Simple, it is similar like react.
- Though I like redux but it will not take that much time to learn.

## Recoil  concepts
There are two major concepts:
1. **Atoms** 
2. **Selectors**

something new? don't worry will understand this quickly.

### Atoms

 this is similar to how we use `useState` hook in react, if you are new to react hooks, checkout [react hooks guide](https://www.loginradius.com/blog/async/react-hooks-guide/ "react hooks guide").

 eg:

```
 const [age, setAge] = useState(0);
```

**age** : this will be used for state variable declaration.
**setAge** :this will be used for state variable updations.

####  1. Lets start with binding root app with Recoil
Now you need to do a few alterations in your app's root level like the below snippet.

`RecoilRoot` will behave like a global context provider, that will share the global state to your app tree.

Now update your older code snippet

```
ReactDOM.render( <AppPage />, document.getElementById("root"))
```
to 
```
import { RecoilRoot } from "recoil";

ReactDOM.render( 
 <RecoilRoot>
    <AppPage />
 </RecoilRoot>, document.getElementById("root"))
```
#### 2. Set the Atom

Recoil calls this part as **atom**, where we set the global key, value.

```
import { atom } from "recoil";

const age = atom({
  key: "age", 
  default: 0  // default global value for age key
});
```
Now this atom will be accessible throughout the app.

#### 3. use the atom


Now update your older code snippet

```
 const [age, setAge] = useState(0);
```
to 

```
import { useRecoilState } from 'recoil'
const [ageState, setAge] = useRecoilState(age);
```

For a Larger view, here is **Full Code**
```
import { atom,useRecoilState } from 'recoil'

const age = atom({
  key: "age", 
  default: 0  // default global value for age key
});

export const AgeCalculator = () => {
const [ageState, setAge] = useRecoilState(age);
}
```


quite easy. isn't it?
Now let's move to another part **selectors**.

### Selectors

This is similar to how Redux manage states.

if a value can be derived/computed from the state, then we can skip re initialize of an another separate state key, for that use selectors.

#### 1. set the selectors

in the below example, we are getting `isChild` value from `age` key then we can directly use **selector** instead of adding a new key or **atom**.

```
import {selector} from 'recoil'

const isChild = selector({
  key: "childage",
  get: ({ get }) => {
    const state = get(age);
    return state < 10 ;
  }
});
```

#### 2. use the selectors

Now will use above-mentioned selector.

below code snippet use `age` value to `isChild`.
```
  const [ageState, setAge] = useRecoilState(age);

  const value = useRecoilValue(isChild);
```

For a larger view, here is **Full Code**
```
import {selector, useRecoilState} from 'recoil' 

const isChild = selector({
  key: "childage",
  get: ({ get }) => {
    const state = get(age);
    return state < 10 ;
  }
});

export const AgeCalculator = () => {
    const [ageState, setAge] = useRecoilState(age);
   const value = useRecoilValue(isChild);
}
```

That's all Milord.

### Conclusion

Hope you got why I am saying this as **`light`**.

Recoil is looking quite easy, promising and early-stage but again this is the next generation and it will take time to get the own space in the community.  
