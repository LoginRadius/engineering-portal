---
title: "How Enum.TryParse() works in C#"
date: "2021-04-28"
coverImage: "coverimage.png"
author: "Hemant Manwani"
tags: ["C#","Enum"]
description: "In this article, I will talk about how Enum.TryParse() works in C# and mistake which we can make while using it."
canonical: https://www.loginradius.com/blog/engineering/enum-csharp/
---
## Introduction
 
As we all know that Enums are very commonly used in the C# program. While using the Enums, we should also be aware of how the values are parsed into the Enums. In my earlier article, I have talked about the [How to Use Enum in C#](https://www.loginradius.com/blog/engineering/enum-csharp/).In this article, I will specifically talk about the mistake we can make while using the **Enum.TryParse()** method.
 
## Let's get started
 
As we know `Enum.Tryparse()` method will give us the parsed Enum. Like in the below example
 
```c#
public enum IdentityProtocols
{
    SAML,
    OAuth,
    OpenID
}
var isEnumParsed=Enum.TryParse("0", true, out IdentityProtocols parsedEnumValue);
Console.WriteLine(isEnumParsed?parsedEnumValue.ToString():"Not Parsed");
``` 

The above code will print the `SAML` because the enum is started by default with the value 0.
 
What happens if we run the below code with the same Enum declaration?
 
```c#
var isEnumParsed=Enum.TryParse("-1", true, out IdentityProtocols parsedEnumValue);
Console.WriteLine(isEnumParsed?parsedEnumValue.ToString():"Not Parsed");
``` 
As per our understanding isEnumParsed variable should be `false`, and the above code should print **Not Parsed** as the value which we are passing in the method is not in the Enum declaration, right?
 
But here is a catch, isEnumParsed variable have the `true` value, and the code will print `-1`.
 
## Why Enum.tryParse() parse int values?
 
The default type of Enum in C# is `int`. That's why any valid integer values are parsed by the Enum.TryParse() method irrespective of those integer values are defined in the Enum or not. 
 
We can define the Enum with types like byte, sbyte, etc. Then the Enum.TryParse() will parse those values which will fall in that defined Enum type.
 
## How to overcome this behavior of Enum.TryParse()
 
To overcome this behavior of Enum.TryParse() we can follow the below approaches.
 
### 1. Using Enum.IsDefined() method with Enum.TryParse() method
 
```c#
var isValidEnum = Enum.TryParse("-1", true, out IdentityProtocols parsedEnumValue) && Enum.IsDefined(typeof(IdentityProtocols), parsedEnumValue);
Console.WriteLine(isValidEnum ? parsedEnumValue.ToString(): "Not Parsed");
```
In the above code **Enum.IsDefined()** will check that the value which we are getting from the Enum.TryParse() method is defined in the Enum declaration or not.
 
That will give us the proper result, and the above code will print `Not Parsed`
 
### 2.Using Enum.GetNames() method
 
```c#
var value = "-1";
var identityProtocolsList = Enum.GetNames(typeof(IdentityProtocols)).ToList();
Console.WriteLine(identityProtocolsList.Contains(value) ? value : "Not Parsed");
```
In this code, checking that value is present or not by getting all the Names from the enum declaration by using **Enum.GetNames()** method.
 
This code will print `Not Parsed`
 
**Note**: Here, we will not be able to parse any of the integer values. It will only check the values which are defined in the Enum declaration.
 
## Conclusion
 
In this article, We have discussed the mistake we can make using the `Enum.TryParse()` method. This mistake can hurt and can abnormally terminate our program/application. We can use the ways I have mentioned in this article to overcome so that our program/application can run smoothly.
