---
title: "Nim Game, Add Digits, Maximum Depth of Binary Tree"
date: "2015-11-24"
coverImage: "nim-blog-150x150.png"
author: "Lucius Yu"
tags: ["Nim", "JavaScript"]
---

### 1\. Nim Game

[Click to View Original Question](https://leetcode.com/problems/nim-game/)

This question is very easy once you figure out the trick behind the game.
Since each time you can only pick 3 stones at most, if there are 4 stones originally on the table, no matter how many you take ... your hopefully non-stupid friend can easily beat you. The same logic also applies when the number of stones is more than 4.

```js
/**
* @param {number} n
* @return {boolean}
*/
var canWinNim = function(n) {
    return n % 4 === 0 ? false : true;
};
```


###
2\. Add Digits

[Click to View Original Question](https://leetcode.com/problems/add-digits/)

This is a tricky question, the key is trying to find the repetitive pattern of the Digits Sum. If you can't get the pattern by observation then we can do some math to find the pattern.

So assume we have a 4 digit number "abcd" or 1234, and we want to find out the sum of the digits which in expression is:

var digitSum = a + b + c + d

We still can't figure out the answer from this alone, so we need to find something else to help us to get the value. Then we can consider the actual value of "abcd" = 1000a + 100b + 10c + d.

\- If you're familiar with Ring Theory (pretty sure it's Ring Theory.. I could be wrong..) then perfect! Under Ring 9, the actual value of abcd === a + b + c + d.
\- And if you don't know about Ring Theory, think of this as getting the remainder of "abcd" divided by 9

\> (1000a + 100b + 10c + d) % 9 => (999a + a + 99b + b + 9c + c + d) % 9 => a + b + c + d

So whatever the reminder is equals to the sum of the digits and that is more than enough information to solve the question.

**Be careful with the number 0 !!**

```js
/**
* @param {number} num
* @return {number}
*/
var addDigits = function(num) {
    if (num === 0) return num;
    return num % 9 === 0 ? 9 : num % 9;
};
```

###
3\. Maximum Depth of Binary Tree

[Click to View Original Question](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

This is very typical of recursion problems, and recursion is always hard to explain in words

(╯‵□′)╯︵┻━┻

Regardless I will try my very best to describe it.

1. You have a tree node, and check if it is an empty tree, if so return 0
2. If it is not empty, use recursion to find the value
3. The recursion will start with the left node of root, and iterate through the tree, and keep checking the depth of each node till reaching out to the leaves. Each node (small root) records its maximum depth value by a record count called ""currentLength"".
4. Until the whole tree is traversed, the root will compare its leftLength and rightLength and return the answer!

```js
 rightLength ? leftLength : rightLength;
    return rootLength;
}-->
```
