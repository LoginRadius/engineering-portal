---
title: "C# Init-Only Setters Property"
date: "2021-07-15"
coverImage: "coverimage.png"
author: "Hemant Manwani"
tags: ["C#","Properties","Init"]
description: "In this article, we will talk about Init-Only Setters Property in C#."
---
## Introduction
 
In C# 9.0, there are multiple features introduced. One of them is the **Init-Only setters property** feature. To use this feature, there are two pre-requisite.

1. You should have the .NET 5 SDK installed in your system. If not, you can download and install it from [here](https://dotnet.microsoft.com/download/dotnet/5.0).

2. You should have at least a 16.7 version or the latest version of Visual Studio 2019. If not, then you have to update your Visual Studio 2019 to the latest version.

After this setup, you are ready to go with the Init-Only setters property feature.

Before knowing more about this feature, first, we will understand how we are using properties currently in C#.
 
## How we are using the properties currently

```c#
public int Id { get; set; }
```

This is the way how we are using the properties, but whenever if we don't want to change the value of a property outside of a class and make them readable publicly, then we generally define the property as below.

```c#
public int Id { get; private set; }
```
In that case, the Id property can not be set outside of the class, and to set this property, we have to introduce a constructor or a public method that can set the value of the Id field. Like below

```c#
public class Company
{
    public int Id { get; private set; }

    public Company(int id) // Constructor
    {
        Id = id;
    }
    public void SetId(int id) //Public method
    {
        Id = id;
    }
}
```
Below are the problems which arise by using the above method

1. We are not able to set the property value by using the *object initialization*

2. If we want to set the property as *immutable* (Value can not be changed), then we can not achieve this because any public method can change the value of that property, so here the property is *mutable* (Value can be changed).

To fix those issues, In C# 9.0 Init-Only setters property feature was introduced. Have a look at this.

## Init-Only Setters Property

Init-Only setters property gives us the flexibility to set the value of a property by using the object initializer as well the property is also immutable. So that will resolve the above issues, which were with the *private set* property.

```c#
public class Company
{
    public int Id { get; init; }
}
```

```c#
Company comp=new Company{
    Id=1
}; // It works fine if we initialize here
```
As we can, it is perfectly fine to set the value during object initialization.

```c#
public class Company
{
    public int Id { get; init; }

     public Company(int id)
    {
        this.Id = Id;
    }
}
```
We can define the constructor as well to initialize the Init-Only setters property. 

If we will try to create a method in the class and want to change the value Init-Only setters property, then it will give us the compile-time error.

```c#
public class Company
{
    public int Id { get; init; }

    public void SetId(int Id)
    {
        this.Id = Id; // Compile-time Error
    }
}
```

## Conclusion

In this article, we learned how we are setting the properties in C# currently and the new C# 9.0 feature Init-Only Setters Property. Also, we understood how this feature helps us to set the property value with the object initialization.
