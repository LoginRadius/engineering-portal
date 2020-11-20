---
title: "How does bitwise ^ (XOR) work?"
date: "2020-11-20"
coverImage: "xor.png"
author: Kheenvraj Lomror
tags: ["bitwise operator", "XOR"]
description: "Everything know about bitwise ^ xor operator."
---
## How does bitwise ^ (XOR) work?
XOR is a bitwise operator and it stands for "exclusive or". It performs **logical** operation, if input bits are the same then output will be false(0) else true(1).

XOR table:

|       X         |Y|X^Y|
|----------------|-------------------------------|-----------------------------|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|0|
				
									
Example:  `4^3 = 7`
``` javascript
In binary: 
	     1000
	   ^ 0011
	    ------
 Result:     1011  => (7)
```
#### XOR with negative numbers
Lets understand with an example `-4^-2 = 2`
In the above example, we can see `-4^-2 `output will be `2`
but the question arises how? because if we represent both inputs in the binary form then we do XOR of bits then the output will be `0000 0110` and in decimal, it will be `6` but as we know output should be `2`.
```javascript
  1000 0100 (-4)
^ 1000 0010 (-2)
------------------
  0000 0110 => (6) // incorrect output
```

> Note : Here, leftmost bit position is reserved for the sign of the
> value (positive or negative) and doesn't contribute towards the value of number.



 Lets undertand how XOR operation works with negative numbers.
##### How XOR operation works with negative numbers?
First, the XOR operation is to XOR each bit (the same is 0, the difference is 1), but you need to convert the number into a complement first.

1. The complement of a positive number is itself

2. The complement of the negative number is reversed for each bit and then incremented by 1 (the highest is kept at 1)
```javascript
// Lets take -4
In binary: 			1000 0100
Reverse: 			1111 1011
complement (Increment by 1): 	1111 1100

// Now -2
In binary: 			1000 0010
Reverse: 			1111 1101
complement (Increment by 1): 	1111 1110
```
Final result:
```javascript
complement of -4 : 1111 1100
complement of -2 : 1111 1110
                  -----------
Result:            0000 0010 	=> 2
```

*Here the  MSB bit of result will denote the sign and the  rest of the bits will denote the value of the final result.*
XOR sign table could be useful to understand the sign of result:
|       X         |Y|X^Y|
|----------------|-------------------------------|-----------------------------|
|+|+|+|
|+|-|-|
|-|+|-|
|-|-|+|


Above approch will work with negative inputs but if we have positive and negative then? 
##### How XOR operation works with positive and negative numbers?
Lets performs `-5 ^ 2`
Follow the same above approch to get complement code of `-5`.

```javascript
complement of -5 :          1111 1011
// Note: complement of a positive number is itself
complement of 2 :           0000 0010  
complement result:          1111 1001

Now, complement result -1 : 1111 1000
                           -----------
Final result(inverse code): 1000 0111   => -7
```


#### Some interesting use cases of XOR operator 
- Swap two number without the third variable
Example:
    ```javascript
    function swapWithXOR (a, b) {
        a = a^b;
        b = a^b;
        a=a^b;
        console.log("result => a: " + a + ", b: " + b)
    }

    swapWithXOR(4, 1); // result => a: 1, b: 4
    ```

- RAID Drive Backups (Systems)
- Cryptography (XOR cipher)
- Array operations

