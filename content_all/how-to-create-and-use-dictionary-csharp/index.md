---
type: async
title: "How to create and use the Dictionary in C#"
date: "2021-05-27"
coverImage: "coverimage.png"
author: "Hemant Manwani"
tags: ["C#","Dictionary"]
description: "In this article, we will talk about how to create and use the Dictionary in C#."
---
## Introduction
 
Dictionaries `Dictionary<TKey, TValue>` is used for storing a key-value pair. It is a generic collection that is defined in the *System.Collection.Generic* namespace and implements the `IDictionary<TKey, TValue>` interface.
 
## Create a dictionary
 
Suppose we want to store the scores of a player in a cricket match, Then we have to save the key as the name of the player and score as value.
 
To create a dictionary of key and value type as a string and int, respectively, we just simply need to initialize as below.
 
```c#
Dictionary<string, int> dict = new Dictionary<string, int>();
Dictionary<string, int> dict1 = new Dictionary<string, int>(5); // Creates a dictionary with default initial capacity of 5
``` 
The first line will create a dictionary with string type of key and int type of value and will have the initial default capacity as well default equality comparer for the key type.
 
The Second line will create the same dictionary as line 1 except for the initial default capacity. It will create a dictionary with an initial default capacity of 5.
 
We can create the dictionary by using the different constructors of the dictionary. Here I have talked about the two constructors only.
 
## Add elements
 
We can add the elements in the dictionary by using add method of it.
 
```c#
dict.Add("Player",42);
dict.Add("Player1",38);
```
It will add the elements in the dictionary. 
 
**Note:** *Keys* can not be `null` or `duplicate`. If we add the duplicate or null as a key, then the application will throw the run time exception, but *Values* can be `null` or `duplicate`.
 
## Traverse
 
To traverse through a dictionary, we can use a foreach loop or a for a loop.
 
### foreach loop
 
```c#
foreach (var item in dict)
{
    Console.WriteLine("Key "+ item.Key +" Value "+ item.Value);
}
```
### for loop
 
```c#
for (int i = 0; i < dict.Count; i++)
{
     Console.WriteLine("Key " + dict.ElementAt(i).Key + " Value " + dict.ElementAt(i).Value);
}
```
In the above code, we are using the 
 
1. **Key** Property of dictionary element which will return the Key of the dictionary element.
 
2. **Value** Property of dictionary element, which will return the value of the dictionary element.
 
3. **Count** Property which will return the number of elements in the dictionary.
 
4. **ElementAt(int index)** method of a dictionary, which will return the element at the specified index.
 
## Get/Update specified key's value
 
To get the specified key's value from the dictionary, we can directly use the key as an index. 
 
```c#
Console.WriteLine(dict["Player"]); // Prints 42
Console.WriteLine(dict["Player1"]); // Prints 38
```
To update the specified key's value of the dictionary, we can set it as below.
 
```c#
dict["Player"]=45;
Console.WriteLine(dict["Player1"]); // Prints 45
```
 
**Note:** 
 
1. It will give the run time exception if the given key is not present in the dictionary, and we try to access the value of that key so we can first check for the key using the **ContainsKey(TKey)** method of the dictionary which will return true/false if the key is present or not in the dictionary.
 
2. Suppose if we want to set the value of a key that is not present in the dictionary, then it will automatically add that element into the dictionary and sets the value of it.
 
## Remove
 
To remove elements from a dictionary, we can use the below methods.
 
### Remove specific key
 
To remove a specific key, we can use the **Remove(TKey)** method of the dictionary.
 
```c#
dict.Remove("Player1"); // Removes Player1 from dictionary
```
### Clear dictionary
 
To clear all the elements of the dictionary, we can use the **Clear()** method of the dictionary.
 
```c#
dict.Clear(); // Clears all the elements and count will be 0
```
 
## Conclusion
 
In this article, We have learned about some of the basics of dictionaries. Dictionaries help to use to manage data in Key-Value pair, which we can easily access and manipulate the data accordingly.
