---
title: "How to Work with Nullable Types in C#"
date: "2021-01-29"
coverImage: "coverimage.jpg"
author: "Hemant Manwani"
tags: ["C#","Nullable"]
description: "Nullable is a term in C# that allows an extra value null to be owned by a form. We will learn in this article how to work with Nullable types in C#."
---
 
In C#, We have majorly two types of data types *Value* and *Reference* type. We can not assign a null value directly to the Value data type. In this case, C# 2.0 provides us the Nullable types to assign a value data type to null. 

## What is Nullable types?
 
As described above, The Nullable types used to assign the null value to the value data type. That means we can assign a null value directly to a variable of the value data type. We can declare null value using `Nullable<T>` where `T` is a type like an int, float, bool, etc.

Nullable types represent the Null value as well the actual range of that data type. Like the **int** data type can hold the value from `-2147483648` to `2147483647` but a **Nullable int** can hold the value `null` and range from `-2147483648` to `2147483647`

## How to declare Nullable types

There are two ways to declare Nullable types.

```c#
Nullable<int> example;
```
OR

```c#
int? Example;
```

## Properties of Nullable types

Nullable types have two properties.
1. HasValue
2. Value

**HasValue**: This property returns a bool value based on that if the Nullable variable has some value or not. If the variable has some value, then it will return true; otherwise, it will return false if it doesn’t have value or it’s null.

```c#
Nullable<int> a = null;
Console.WriteLine(a.HasValue); // Print False
Nullable<int> b = 9;
Console.WriteLine(b.HasValue); // Print True
```

**Value**: This property gives the value of the Nullable type variable. If the variable has some value, it will return the value; else, it will give the runtime `InvalidOperationException` [exception when the variable](https://www.loginradius.com/blog/engineering/exception-handling-in-csharp/) value is null.

```c#
Nullable<int> a = null;
Console.WriteLine(a.Value); // Gives run time exception of type 'InvalidOperationException'
```

```c#
Nullable<int> b = 9;
Console.WriteLine(b.Value); // Print 9
```

## Method of Nullable types

**GetValueOrDefault()**: This method returns the actually assigned value of the Nullable type variable if the value is not null, and if the variable value is null, then it will give the default value of that data type. Here is the example code

```c#
Nullable<int> a = 9;
Console.WriteLine(a.GetValueOrDefault()); // Returns 9
```

```c#
Nullable<int> a = null;
Console.WriteLine(a.GetValueOrDefault()); // Returns 0
```

## Rules of using Nullable types:

To use the Nullable type as a local variable, it should be declared first; it will give a compile-time error. This rule is similar to the value data type.

```c#
int? b;
Console.WriteLine(b.Value); //Compile time error 'use of unassigned local variable b'
```

If the Nullable variable is a property in a class and after that, if we are accessing that Nullable variable, then it will not give any error because, in the class variable, it is declared as `null` automatically.

```c#
class Test
{
     public int? B;
}
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(new Test().B); // No compile time error
    }
}
```

## null coalescing operator (??)

We can not assign the Nullable type variable value to the non-nullable type variable directly. As in the example below, if we try to assign the value, it will give the compile-time error.

```c#
int? a = 10;
int b = a;//Compile time error `Cannot implicitly convert type 'int?' to 'int'. An explicit conversion exists (are you missing a cast?)`
```

**Note**: We can use compare operators `==` and `!=` operator with Nullable type variables and non Nullable type variables.

For the Nullable variable, we can use the null coalescing operator (??) to check if the variable value is `null` or not. Then we can assign the non-nullable type variable value according to that. This operator can be used when we are unsure that at run time if that Nullable variable's value is changed according to our logic or not. Here is an example of that

```c#
int? a=null;
int b=a?? 10;
Console.WriteLine(b);  // Prints 10
```
In the above example, if the variable a value is null,, it will assign the value 10 to b variable. In that case, b is assigned with value 10, and the printed value will be 10.
 
## Conclusion

In this article, We have discussed the Nullable types, and it's properties and methods. The main advantage of using the Nullable types is that we can store the Null value in a column of a database using this type. If you want to learn more about C# here is an article written by me on [How to Use Enum in C#](https://www.loginradius.com/blog/engineering/enum-csharp/)
