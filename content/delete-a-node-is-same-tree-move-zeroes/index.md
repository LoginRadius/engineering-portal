---
type: async
title: "Delete a Node, Is Same Tree, Move Zeroes"
date: "2015-12-22"
coverImage: "code-js-300x300.png"
author: "Lucius Yu"
tags: ["Data Structure", "JavaScript", "Linked List"]
---

### Delete A Node

[Click to View the Orginal Question](https://leetcode.com/problems/delete-node-in-a-linked-list/)

To remove the given node，which means whoever is asking the value for this node should get the value of the next node. Plus, the next node of this removing one should be the next next node.

In diagram, with the following node list, we want to remove node 2.

1 -> 2 -> 3 -> 4

We update original Node 2 to Node 3 and skip the original Node 3, which gives out the list after removing node 2.

1 -> 3 ------> 4

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 * this.val = val;
 * this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
```

### Is Same Tree

[Click to View the Original Question](https://leetcode.com/problems/same-tree/)

**Note**: My solution is not efficient enough based on the performance, but I think it's fairly clean.

I use recursion to solve the problem, first to define the basic cases, and recursively loop through both trees from left to right. If it hits one `false`, the whole result will be `false`.

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 * this.val = val;
 * this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

var isSameTree = function (p, q) {
  if (p === q) return true
  if (!p || !q || p.val !== q.val) return false
  return isSameTree(p.left, q.left) ? isSameTree(p.right, q.right) : false
}
```

### Move Zeroes

[Click to View the Original Question](https://leetcode.com/problems/move-zeroes/)

Here I have create two indices one called `z` to index the position for zeroes, another is `i` to loop through the nums array. They both increment by one when they see a non-zero value, but when it is zero, z stays at position and get ready to swap the position with next non-zero value `i` meets. By keep doing it, it will fill a consecutive row of zeroes, till the end.

```javascript
<!--/**
* @param {number[]} nums
* @return {void} Do not return anything, modify nums in-place instead.
*/
var moveZeroes = function(nums) {
    var z = 0;
    for(var i = 0; i
```
