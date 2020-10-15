---
title: Speed Up Python Code
date: "2020-10-15"
coverImage: "speed-up-python-code-1.jpg"
author: "Md. Tahmid Hossain"
tags: ["python", "performance"]
description: "Learn a few ways to speed up your python code."
---

# A Few Ways to Speed Up Your Python Code

Python is one of the most popular languages all over the world. Nowadays it is being used in competitive programming also because of its simple syntax and rich libraries. Most of us probably started coding with python. At first, everything goes simple and easy. But while solving a hard algorithmic problem, most of us suffer from `Time Limit  Exceeded`. However, it is not a problem of python; it is the programmer's problem. I am not saying that language is not slow, but if a programmer writes an efficient programme, it will get `Accepted` for sure. Here are some tips to speed up your python programme.

## Use proper data structure

Use of proper data structure has a significant effect on runtime. Python has list, tuple, set and dictionary as the built-in data structures. However, most of the people use the list in all cases. But it is not a right choice. Use proper data structures depending on your task. Especially use a tuple instead of a list. Because iterating over tuple is easier than iterating over a list.

## Decrease the use of for loop

As for loop is dynamic in python, it takes more time than while loop. So, use while loop instead of for loop.

## Use list comprehension

Do not use any other technique if you can use list comprehension. For example, here is a code to list all the numbers between 1 and 1000 that is the multiplier of 3:

```python
L = []
for i in range (1, 1000):
    if i%3 == 0:
        L.append (i)
```

Using list comprehension, it would be:

```python
L = [i for i in range (1, 1000) if i%3 == 0]
```

List comprehension works faster than using the append method.

## Use multiple assignments

Do not assaign variables like this:
```python
a = 2
b = 3
c = 5
d = 7
```

Instead, assign variables like this:
```python
a, b, c, d = 2, 3, 5, 7
```

## Do not use global variables

Python has `global` keyword to declare global variables. But global variables take higher time during operation than a local variable. So, do not use global variables if it is not necessary.

## Use library function

Do not write your function (manually) if it is already in the library. Library functions are highly efficient, and you will probably won't be able to code with that efficiency.

## Concatenate strings with join

In python, you can concatenate strings with `+` operation.

```python
concatenatedString = "Programming " + "is " + "fun."
```

It can also be done with `join()` method.

```python
concatenatedString = " ".join (["Programming", "is", "fun."])
```

`join()` concatenates strings faster than `+` operation because `+` operators create a new string and then copies the old content at each step. But `join()` doesn't work that way.

## Use generators

If you have a large amount of data in your list and you need to use one data at a time and for once then use `generator`s. It will save you time.

## It may seem efficient, but it's not

See the below code:
```python
L = []
for element in set(L):
    ...
```

The above code may seem efficient because it used set to delete duplicate data. But the reality is that the code is not efficient. Do not forget that converting a list into set takes time. So this code will work better than the previous:

```python
for element in L:
    ...
```

## Do not use dot operation

Try to avoid dot operation. See the below programme.
```python
import math
val = math.sqrt(60)
```

Instead of the above style write code like this:

```python
from math import sqrt
val = sqrt(60)
```
Because when you call a function using `.` (dot) it first calls `__getattribute()__` or `__getattr()__` which then use dictionary operation which costs time. So, try using `from module import function`.

## Use 1 for infinity loops

Use `while 1` instead of `while True`. It will reduce some runtime.

## Try a different approach

Try new ways to write your code efficiently. See the below code.
```python
if a_condition:
    if another_condition:
        do_something
else:
    raise exception
```
Instead of the above code you can write:
```python
if (not a_condition) or (not another_condition):
    raise exception
do_something
```

## Use speed up applications

For python's slow speed, some projects have been taken to decrease runtime. Pypy and Numba two of them. In most of the programming contests, you will see pypy if it allows python. These applications will reduce the runtime of your programme.

## Use special libraries to process large datasets

C/C++ is faster than python. So, many packages and modules have been written in C/C++ that you can use in your python programme. `Numpy`, `Scipy` and `Pandas` are three of them and are popular for processing large datasets.

## Use the latest release of python

Python is updated and upgraded regularly, and every release is faster and more optimized. So always use the latest version of python.

 

These were some of the tips to decrease the runtime of python code. There are a few more techniques that you can use. Use a search engine to find those and write efficient code!
