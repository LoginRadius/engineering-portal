---
title: "9 Awesome Puzzles to Churn your Programming Brain"
date: "2017-05-12"
coverImage: "9-Awesome-Puzzles-to-Churn-your-Programming-Brain.png"
category: ["business","Marketing", "technology"]
featured: false 
author: "Deepak Gupta"
description: "Sharpening your coding skills is no more a boring task when you are dealing with interesting puzzles. Check out these 9 Awesome Puzzles to Churn your Programming Brain."
metatitle: "9 Awesome Puzzles to Churn your Programming Brain"
metadescription: "Sharpening your coding skills is no more a boring task when you are dealing with interesting puzzles. Check out these 9 Awesome Puzzles to Churn your Programming Brain."
---

When it comes to sharpen programming skills, puzzles are fun indeed. Puzzles not only help you to learn a new language in a better way but also make you crave for more difficult problems, Bon Appetit! Go ahead and challenge yourself with these awesome hand-picked puzzles for programmers that will put your brains to test and boost your learning process.

**Some Popular Puzzles**

### **Puzzle 1: Tower of Hanoi puzzle**

The classic [puzzle - tower of hanoi](http://www.i-programmer.info/programmer-puzzles/203-sharpen-your-coding-skills/4892-towers-of-hanoi-mutants.html) is a very famous method to study recursion. The puzzle have three major rules.

- You have to move one disk at one time
- You can only move the top most disk from the tower
- A large disk can never be upon a smaller disk

Well, you can solve the puzzle in 7 simple steps {as 2n\-1 steps where n= number of disks}.

The algorithm for the puzzle is as follows:-

\[code lang="html"\] START Procedure Hanoi(disk, source, dest, aux)

IF disk == 0, THEN move disk from source to dest ELSE Hanoi(disk - 1, source, aux, dest) // Step 1 move disk from source to dest // Step 2 Hanoi(disk - 1, aux, dest, source) // Step 3 END IF END Procedure STOP \[/code\]

 

### **Puzzle 2: The Best Sub-Array Problem**

The [Best Sub-Array Puzzle](http://www.i-programmer.info/programmer-puzzles/203-sharpen-your-coding-skills/4690-the-best-sub-array-problem.html) is may seem ignorable at first sight but it is tougher than it looks. The puzzle is all about finding the sub-array which sums up to be the largest value.

**_Note:-_** _make sure that your array contains negative element because if it contains every element as zero or positive, the sum of all slots will be the best sub array._

**The Process:-**

- Let’s take an example of an array: {1, 1, -5, 1, 1}. You have to always add the first element with the sum of adjacent elements. For example, add 1 with 1and then add 1 with ‘the sum of 1 and -5’, then add 1 with ‘sum of 1, -5, and 1’ and so on.
- After reaching the end point, discard the first element and perform the process with the other adjacent elements till you reach the end point. You will find a subarray to be the best subarray. In this case, there are two slots: \[4,5\] and \[1,2\] with the sum as “2”.

**Here is the code for the process:-**

\[code lang="html"\] BEGIN  best\_sum := 0;  FOR a := 1 TO n   DO FOR b := 1 TO n    DO BEGIN      local\_sum := 0;      FOR i := a TO b DO local\_sum := local\_sum + Slots\[i\]; best\_sum :=       GREATEST (local\_sum, best\_sum); END; END;\[/code\]

### **Puzzle 3: Three Warehouse Puzzles**

The puzzle of [three warehouse](http://www.i-programmer.info/programmer-puzzles/203-sharpen-your-coding-skills/6655-three-warehouses-puzzle-.html) tests your reasoning where you have to shift elements from a warehouse in the number of three where you have two distribute two elements to other warehouses and keep one for yourself (you have to discard that element from the puzzle).

You have to move three clips from a warehouse in such a way that there are at least 0 clip in the warehouse. You have to distribute clips to the other two warehouses by eliminating one clip every time. Continue the process till you reach a point where you do not have three clips to move from a warehouse.

Here I have taken an example of three warehouses A, B and C with the count of 3, 1, 4 clips. I start the process with warehouse A where I have moved 3 clips, distributed it to others (B and C) and eliminated one. The process gives the count of (0, 2, 5). The further processes give results like (1, 3, 2), (2, 0, 3), (3,1, 0), and (0, 2, 1). All warehouses have less than 3 clips. Hence, the process stops.

You can prepare your own warehouse and test your programming skills.

### **Puzzle 4: The Rickety Bridge Problem**

[Four travelers](http://javahungry.blogspot.com/2014/03/java-programming-puzzles-tackling-brainteaser-in-java-interview.html) have to cross a shaky bridge at night. The bridge can only bear the weight of two persons at a given time and a flashlight is needed to cross the bridge. There is only one  flashlight available among the group.

Now, no traveler walks with the same speed: it takes 1 minute for the first traveller to cross the bridge, whereas it takes 2, 5 and 10 minutes for second, third and fourth traveller to perform the same task. Moreover, while crossing the bridge in a set of two, the faster traveller has to match the pace of the slower one. Hence, how much time (least amount) will it take for all travellers to cross the bridge?

It will take **17 minutes** for the travellers to perform the task. How? Let’s find out.

1. The first and the second traveller can cross in 2 minutes - **2 minutes**
2. The second traveller comes back in 2 minutes- **4 minutes**
3. Now, the third and fourth cross in 10 minutes -**14 minutes**
4. The first comes back -**15 minutes**
5. Then, the first and second cross together within 2 minutes, making it a total of **17 minutes**.

### **Puzzle 5: The Lake, the Goblin and You**

You are in the center of a [circular lake and a goblin](https://www.reddit.com/r/puzzles/comments/1k261e/mediumhard_level_logical_puzzle_you_a_goblin_and/) is waiting on the shore to kill you. The goblin never eats, sleeps and cannot swim but has got a great eyesight. He is logical and will do anything which is possible to get you.

Now, you can outrun the goblin on land but he can run four times faster than your boat. How will you escape him?

**Solution**

It’s simple.

r= radius of circular lake

e= very small distance

Paddle r/4 - e away from the center of lake. Maintain the distance and now, paddle around center of the lake as long as you reach the side opposite to goblin. Hence, goblin would have to run faster than his maximum speed which is not possible. Now, paddle in a straight path against the location of goblin towards the nearest shore. Paddle up to the distance of   ¾ \* r + e whereas goblin has to run more than four times faster which is pi \* 4.

### **Puzzle 6: The Perfect Murder**

A person [shoots his](http://javahungry.blogspot.com/2014/03/java-programming-puzzles-tackling-brainteaser-in-java-interview.html) wife. Then holds her under water for 5 minutes. Finally, he hangs her. But after 10 minutes they both go out together and enjoy a wonderful dinner together. How can this be?

The person is a photographer. He takes his wife’s picture (shot her), held her picture in water for 5 minutes (held her in the water) and hanged it to dry (hanged her). After 10 minutes, he went out with her.for dinner.

### **Puzzle 7: The Birthday Cake Problem**

A circular birthday cake has to be divided into [8 equal pieces](http://www.programmerinterview.com/index.php/puzzles/birthday-cake-8-pieces/) within 3 cuts. How can you do it?

Cut the cake in horizontal and vertical direction. Now as your cake is cut into four equal pieces, arrange these pieces in a stack. Afterwards, cut the stack in half. Thus, you will have 8 equal pieces.

### **Puzzle 8: Where Did The Logic Go?**

Here’s a [code](http://www.i-programmer.info/programmer-puzzles/142-php/1542-where-did-the-logic-go.html) in PHP which asks input from the user and checks whether it is in range or not.

\[code lang="html"\] if($max&lt;20 and $min&gt;15){ echo 'in range'; else echo 'out range'; } \[/code\]

Thus, if we pass values 15 and 10, $max=15 and $min=10, which means $max<20 is true and $min>15 is false. It will show true and false.

Now,

\[code lang="html"\] $a=$max&lt;20; $b=$min&gt;15;\[/code\]

then the logical expression:

$inrange = $a and $b; Hence, it can be written as:-

\[code lang="html"\] if($inrange){ echo 'in range'; else{ echo 'out range'; } \[/code\]

 

Now, when you compile the program with the same inputs, it shows $inrange=true whereas it should have shown the expression as false.. How did it happen?

**Reason:-**

Here, $inrange=$a and $b;

is considered as

($inrange=$a) and $b;

Hence, as assignment is evaluated as a high priority operation, it is performed earlier.

Thus, contrary to the expectations, the in range value is shown as true because the in range value is evaluated as $a and not “$a and $b”.

Hence, to solve this problem, you have to replace “$inrange=$a and $b” with “$inrange=($a and $b)”.

### **Puzzle 9: The False String**

Here is a [code](http://www.i-programmer.info/programmer-puzzles/142-php/1656-the-false-string.html) in PHP which says:-

\[code lang="html"\] $string="abcdefg"; $target="a"; if ($result=strpos($string,$target)){ echo("found ".$result); }else echo("not found ".$result); } \[/code\]

The ideal result should have found the target and considered the value as true. But, the result is shown as “not found”. Why?

Let’s find it out:-

Do you remember that all values convert to true except for:-

- SimpleXML objects created from empty tags
- the special type NULL (including unset variables)
- an object with zero member variables (PHP 4 only)
- an array with zero elements
- the empty string, and the string "0"
- the float 0.0 (zero)
- the integer 0 (zero)
- the boolean **FALSE** itself

 

Hence, in this case, as our target is ‘a’ in the above code, hence, the value will get converted in False and strpos will be zero and the message will be ‘not found’.

The solution for this problem is:-

\[code lang="html"\] $string="abcdefg"; $target="a"; if (($result=strpos($string,$target))!==false) echo("found ".$result); }else{ echo("not found ".$result); }\[/code\]

In this code, “!==” checks the type of the value and makes sure that it is not false, thus preventing it from type juggling and converting into false.

Elongate this list by sharing your favorite puzzles or share your experience while solving these puzzles here in the comments. Always remain adventurous.

Happy Coding!
