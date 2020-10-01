# How to make a simple calculator with C#
I remember when I was first learning C#, the first program I ever wrote was a calculator console app. It still amazes me today that I was able to finish it as quick as I did...:sweat_smile: 

Let's get to the code:
```c
Console.WriteLine("Number 1?\n");
string str1 = Console.ReadLine();
```
The first thing we want to do is ask the user for a number. Note how the number will be saved as a string variable. This is important later.

```c
Console.WriteLine("Number 2?\n");
string str2 = Console.ReadLine();
```
The same applies for number 2

```c
Console.WriteLine("Add, Sub, Mult, or Div?\n");
string mtype = Console.ReadLine();
```
We are now asking the user what type of math they want to do. All of the operations (except for add) are abbreviated because it gets annoying having to type out the full word every single time you want to do an equation. 
The mtype variable is used to store what type of math the user is wanting to do.

```c
int num1 = Convert.ToInt32(str1);
int num2 = Convert.ToInt32(str2);
```
This is where we convert our numbers into the `int` datatype. The reason we store them as strings first is because `Console.ReadLine()` cannot be used with anything other than the `string` datatype. It's ok though, as converting a `string` to an `int` is not hard at all.

```c
switch (mtype)
            {
                case "Add":
                    Console.WriteLine(num1 + num2);
                    break;
                case "Sub":
                    Console.WriteLine(num1 - num2);
                    break;
                case "Mult":
                    Console.WriteLine(num1 * num2);
                    break;
                case "Div":
                    Console.WriteLine(num1 / num2);
                    break;
            }
```

This is our switch statement. The `switch()` function is used with the `mtype` variable to create something similar to a bunch of `if` statements. `Case` is used as the `if` keyword, so it would be the same as
```c
if (mtype == "Add")
{
	Console.WriteLine(num1 + num2);
}