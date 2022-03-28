---
title: "Python basics in minutes"
date: "2020-11-06"
coverImage: "python.png"
author: "Sara Lins"
description: "Learn the basics of Python programming lanuage (For Beginners)"
tags: ["Python"]
---

Python is a general-purpose programming language and has overtaken Java in popularity according to a recent Stackoverflow survey. 

People who have never programmed before are tempted to try due to the simplicity to learn and use it. Well, let's get down to business.

## Before we get started

Before we get started, there are a few things you should know about python:

- Python is a high-level programming language, which means it has a strong abstraction from the computer's details (that's why it's so easy and understandable). Because of that, it may be not so efficient as other languages like assembly, C, or C++;
- Python is an interpreted language. Its syntax is read and then executed directly. The interpreter reads each program statement, following the program flow, then decides what to do and does it. That's why you should test all your programs, even if everything seems to be working correctly. If there is an error within a loop, for example, it will only be shown if the loop is executed;
- Python has excellent documentation [that you can access here](https://docs.python.org/3/) and an incredible community. Use them.

## Print function

*We are assuming that you have already installed python. If you do not, please click [here](https://www.python.org/downloads/).*

To write your first Python code, open your text editor and type: 
```
print("Hello world, this is my first python code")
```
Save the file as `helloworld.py` and put it into the python interpreter to be executed.
You also can run your code on the command line:
```
C:\Users\Your Name>python helloworld.py
```
If everything went well, you should see something like this:
```
> Hello world, this is my first python code
```
You can also use the print function to show integers, variables, lists, etc. Try it!

```python
#show the sum of two integers
number1 = 5
number2 = 7
print(number1+number2)
```

```python
#dividing two decimals
number1 = float(12.1)
number2 = float(4)
```

```python
#concatenating strings
name = "Python"
phrase = str("I hate ")
print("I love ", name)
print(phrase+name)
```

## Data Types

Python has the following data types built-in by default, in these categories:

- Text Type:	`str` *(string)*
- Numeric Types:	`int` *(integer)*, `float` *(decimal)*, `complex`
- Sequence Types:	`list`, `tuple`, `range`
- Mapping Type:	`dict`
- Set Types:	`set`, `frozenset`
- Boolean Type:	`bool`
- Binary Types:	`bytes`, `bytearray`, `memoryview`

>**Note:** Variables in Python are interpreted as integers by default. Is a good practice to declare them as another type *explicitly* (if they aren't integers). You can see the kind of a variable using the function `type()`.

## Python Operators
Operators are used to performing operations on variables and values.
The main groups are:

- Arithmetic operators
- Comparison operators
- Logical operators

### Arithmetic operators
*Arithmetic operators are used with numeric values to perform common mathematical operations.*

- **Addition**:	`x + y`
- **Subtraction:** `x - y`
- **Multiplication:** `x * y`
- **Division:** `x / y`
- **Modulus:** `x % y`	
- **Exponentiation:** `x ** y`	
- **Floor division:** `x // y`

### Comparison operators
*Comparison operators are used to compare two values.*

- **Equal:** `x == y`
- **Not equal:** `x != y`
- **Greater than:** `x > y`
- **Less than:** `x < y`	
- **Greater than or equal to:** `x >= y`
- **Less than or equal to:**	`x <= y`

### Logical operators
*Logical operators are used to combine conditional statements.*
- **and** -> Returns True if both statements are true
`x < 2 and  x < 4	`
- **or** ->	Returns True if one of the statements is true	
`x < 10 or x < 9`
- **not** -> Reverse the result, returns False if the result is true	
`not(x < 2 and x < 4)`

## If statement

Look to the code below:

```python
age = 18
if (age<21):
    print("The student is underage!")
elif (age==21):
    print("The student is 21!")
else:
    print("The student isn't underage!")
```

In programming, we often have to choose what to do depending on the situation. It is essential to know how to use conditional arguments like `if`and `else`.
The code above print a different message according to a condition.

Try to write a code that asks for two test scores. If the average is less than 7, the user should see "I'm sorry, you didn't do well on the tests". If the average is exactly 7, the user should see "You did it!". And if it is greater than 7, the user should see "Congratulations!! You're a great student.".
>**Note:** to request a response from the user, you need to use the `input()` function. For example:

```python
name = str(input("What's your name?"))
age = int(input("How old are you? "))
print("I'm %s and I'm %d"% (name, age))

```
## Loops
Python has two primitive loop commands: `while` and `for`.

### While loop

*With the while loop, we can execute a set of statements as long as a condition is true.*

```python
count = 0
while count < 10:
    print(count)
    count += 1    #this line is the same as    count = count+1
```
The code above will print count as long as count is less than 10.

### For loop

A for loop is used for iterating over a sequence. Using it, we can execute a set of statements, once for each item in a list, tuple, set, string, etc. For example:

```python
#loop through a string
for x in "banana":
    print(x)
```
```python
#loop through a list of fruits
fruits = ["apple", "banana", "melon"]
for x in fruits:
    print("I like", x)
```

## Conclusion

Did you understand why python became so popular? In a few minutes, you were able to learn the main concepts of this fantastic language.

Please comment and share this article!
