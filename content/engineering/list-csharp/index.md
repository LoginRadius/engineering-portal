---
title: "How to Create List in C#"
date: "2021-02-25"
coverImage: "coverimage.jpg"
author: "Hemant Manwani"
tags: ["C#", "List"]
description: "In this article, we will learn how to create lists in C# also how to use the C# list class to add, remove, and search items in a collection of objects."
---

A list is a set of index-accessible objects that provides functionality for searching, sorting, and manipulating list items. C# List class represents a collection of strongly typed objects that can be accessed by using the index. In this article, we learn how to work with lists in C# using the C# List class to add, remove, and search items in a collection of objects using List class methods and properties.
 
## What is List in C#?
 
`List<T>` class in C# cotains a strongly typed list of objects. It provides functionality to create a list of objects, add list items, search, sort and manipulate list items. In `List<T>`, T is the type of objects like int, string, or any user-defined object.
 
`List<T>` is required when we have multiple items with the same object, like data of student's marks or data of various subject's names (string). In that case, we can use `List<T>` to maintain that data into a list.
 
`List<T>` comes under the `System.Collection.Generic` namespace and the index start from `0`.
 
## How to Create a List?
 
We can create a list by calling the `List<T>` constructor; It takes an argument of `int` type that is the list's capacity. If we do not define the capacity, then the list size will be dynamic and every time an element is added, the list size is increased. The list can be created using the below syntax.
 
```c#
List<int> lst=new List<int>(); // list with dynamic capacity
List<int> lstCapacity=new List<int>(10); // list with capacity of 10 elements
```
As we have discussed above, Here T is the type of object for which we have to create the list. The type is `int` in the above code, which means we can store the `int` type of variable's value.
 
**Note**: If we have created the list using the capacity value and when more than the defined capacity elements are added, the list size will automatically increase.
 
## Add elements into a list
 
We can add elements directly into when we have created a list or add elements after creating a list. I will discuss both methods here.
 
1. **Create list**

```c#
List<int> lst = new List<int>
{
    1,2,3,4,5,6
};
```

2. **Add items after creating list**

```c#
List<int> lst = new List<int>();
lst.Add(1);
lst.Add(2);
lst.Add(3);
lst.Add(4);
lst.Add(5);
lst.Add(3);
 ```
 
## Properties of a list
 
The list has mainly two properties.
 
1. **Capacity**- This property tells the capacity of a list, which means how many elements a list can contain.

```c#
List<int> lst = new List<int>();
Console.WriteLine(lst.Capacity); //Prints 0-- Default
List<int> lst1 = new List<int>(5);
Console.WriteLine(lst1.Capacity); // Prints 5
```

2. **Count**- This property tells that how many elements are there in a list

```c#
List<int> lst = new List<int>(5);
Console.WriteLine(lst.Count); // Prints 0
lst.Add(1);
lst.Add(2);
Console.WriteLine(lst.Count); //Prints 2
```
 
## Read all elements of a list
 
To get all the elements of a list, we have to loop through the list. We can use for or foreach loop to get the elements. Below is the code to get all the elements using both the loops and print the element's values.
 
1. ### Using a foreach loop

```c#
foreach (var item in lst)
{
    Console.WriteLine(item);
}
```
2. ### Using for loop

In this method, we have to run the loop till the last element of the list. For that, I have used the **Count** property of the list
```c#
for (int i = 0; i < lst.Count; i++)
{
    Console.WriteLine(lst[i]);
}
```

Both the methods will give the same output. I am taking the above list example so the result will be
 
Output:
```
1
2
3
4
5
3
```
## Remove element from a list
 
To remove items from a list, we can use various list methods.
 
1. Remove(T item)- This method removes the first occurrence of an element from a list. We have to pass the element into this method as a parameter.

```c#
lst.Remove(3); // Removes the fist occurance of element 3
```

2. RemoveAll(`Predicate<T>` match)- This method removes all elements from a list that matches the condition defined by the specified predicate. We have to pass the predicate as a parameter.

```c#
lst.RemoveAll(x=>x==3); // Removes all the elements 3
```

3. RemoveAt(int index)- This method removes the element from the given index. We have to pass the index as a parameter.

```c#
lst.RemoveAt(0); // Removes 0th index element from a list
```

4. RemoveRange(int index, int count)- This method removes the element from the given index to the specified count. We have to pass the starting index and count as a parameter.

```c#
lst.RemoveRange(0,2); // Removes element 1,2 because the starting index is 0 and count is 2
```


5. Clear()- This method clears all the elements from a list.


```c#
lst.Clear(); // Removes all elements from a list
```
 
## Conclusion
 
In this article, we have discussed the basics of `List<T>`, properties, and some methods. The main advantage of using the list is that it is faster and it is more friendly because it gives us many inbuilt methods to use and do the manipulation according to ourselves. If you want to learn more about C# here is an article written by me on [How to Work with Nullable Types in C#](https://www.loginradius.com/blog/engineering/nullable-csharp/)
