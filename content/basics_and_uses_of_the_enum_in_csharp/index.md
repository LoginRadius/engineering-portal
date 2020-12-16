---
title: "Basics and uses of the Enum in C#"
date: "2020-12-16"
coverImage: "coverimage.jpg"
author: "Hemant Manwani"
tags: ["C#","Enum"]
description: "In this article, we will learn some basics and uses of the Enum in C#."
---
## Introduction
 
Sometimes we require to use the constant variable in our application so that its values should not be changed throughout the application. One of the methods to declare the constant variables are `Enum`. Let's discuss it
 
## What is Enum?
 
Enum is the short form of Enumeration. They are used to defining the constant values such that it is more readable and easy to use. Enum consumes less memory and space because they are value types that mean they store the value in memory. Also, Enums are strongly typed named constants. 
 
Enums are of two types in C#
 
**Simple Enum** - The members of this enum contains a single value.
 
**Flags Enum** - The members of this enum contain multiple values or multiple values that are combined using a bitwise OR operator. These enums are often used for bitwise operators.
 
Here we will talk about the Simple Enum only.
 
## How to declare an Enum
 
Enum is declared by the **enum** keyword followed by the enum name and then its enum members. Like an example below
 
```c#
public enum Vehicle
{
    Car,
    Bike=3,
    Truck,
    Taxi,
}
```
 
In the above code, an enum for the Vehicle is created. The enum values are started from `0` by default if we do not assign them the values and incremented by 1 for the next enum member. 
 
That means the `Car` enum has the value `0` and the `Bike` enum assigned the value `3` that means the `Bike` enum now has the value `3` and the next enums are incremented by 1 means `Truck` and `Taxi` enum have the value `4` and `5` respectively.
 
By default, the type for enum elements is **int**. We can set different type by adding a colon like the example below. 
```c#
public enum Vehicle: byte
{
    Car,
    Bike=3,
    Truck,
    Taxi,
}
```
The different types which can be set are sbyte, byte, short, ushort, uint, ulong, and long.
 
## Get the value of an Enum
 
To get the value of enum we can simply typecast it to its type. In the first example, the default type is int so we have to typecast it to int. Also, we can get the string value of that enum by using the `ToString()` method as below.
 
```c#
Console.WriteLine((int)VehicleEnum.Car);
string vehicle = Vehicle.Bike.ToString();
Console.WriteLine(vehicle);
```
 
Output: 
```
0
Bike
```
 
## Parse the string value into an Enum
 
For parsing the string value into enum we have 2 methods
 
1. *Enum.Parse(Type enumType,string value)* - This method directly parses the string representation of the name or numeric value of enum member into enumType object. If the string representation of the name is not found then it will give the exception.
 
```c#
Console.WriteLine(Enum.Parse(typeof(Vehicle),"Car"));
```
Output:
```
Car
```
2. *Enum.TryParse(string? value,out enumType result)* - This method gives the result in bool value. if the string representation of the name or numeric value of enum member into enumType object is parsed then the result will be true and the parsed value will be in the out variable. If the string value is not parsed then the result will be false.
 
 
```c#
Enum.TryParse("0",out Vehicle value);
Console.WriteLine(value);
```
Output:
```
Car
```
 
**Note** - Both the methods also have overload methods.
 
## Check if a string value is defined in the Enum
 
We can check if a given integral value, or its name as a string, exists in a specified enum.
 
```c#
Console.WriteLine(Enum.IsDefined(typeof(Vehicle), 0));
```
OR
```c#
Console.WriteLine(Enum.IsDefined(typeof(Vehicle), "car"));
```
Output:
```
True
```
## Loop through all the Enum
 
For looping through the enums you can write the below code -
 
```c#
foreach (var data in Enum.GetNames(typeof(Vehicle)))
{
    Console.WriteLine(data+" - "+ (int)Enum.Parse(typeof(Vehicle), data));
}
```
Here *Enum.GetNames(Type enumType)* method is used which retrieves an array of the names from the specified enum.
 
Output:
```
Car - 0
Bike - 3
Truck - 4
Taxi - 5
```
 
## Call an enum by the integral value
 
We can call the enum member by its integral value. If there is no corresponding value related to that integral value then it will print that integral value.
 
```c#
 Console.WriteLine((Vehicle)3);
```
 
Output
```
Bike
```
 
## Conclusion
 
The advantages of using enums are that they are very easy to use and represented as strings but processed as integers. Enums are easy to maintain and improves the readability of code because they provide symbolic named constants that means you need to just remember the names, not the integer values.
