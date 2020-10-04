---
title: STL Containers & Data Structures in C++
date: "2020-04-10"
coverImage: "cover.jpg"
author: "Aryan Rawlani"
tags: "C++", "STL"
---

## What is STL?
STL stands for Standard Template Library. If you've used C++ even in small projects, you've likely already used STL - which is a great thing! Using STL in C++ makes your code more expressive, simple, and easy to understand. This post will give you an overview of how STL works, some examples, and the basic knowledge you need to get started!

## STL Components
Loosely speaking, the first components you'd typically understand and use of STL are Containers & Algorithms. Then there's also Iterators & Functors, but you should try to take them on one by one, in that order perhaps. This blog will expand a bit on STL Containers.

### Containers
Suppose you are at your favorite cinema hall and it's the launch of a big movie. Since it's the launch, there are likely many people waiting in line to buy their tickets. Naturally, you join the queue at the back and wait for your turn. In the computing world, we have a queue too! This is a popular data structure. If you've had a Data Structures class before, you are most likely familiar with some other data structures as well. These are often used, so the STL provides a great implementation of all these data structures otherwise known as containers.

Take arrays, for example. Arrays are elements with the same type, stored in contiguous blocks of memory. In C++, you can use arrays as you would in C, like this:
```cpp
std::string students[10];
students[0] = "Adam";
```

But wait, STL provides a container for arrays too. It's available in the header `array.h`. Example usage of it would look like this:
```cpp
#include <iostream>
#include <string>

int main() {
    std::array<std::string, 10> students;
    students[0] = "Adam's Friend";
    
    cout << students[0] << endl;
}
```

So, what's the difference? Why should you use the STL Container class? The performance difference is negligible, but what makes the container classes better is that it is a class. A wrapper class around normal arrays, and offers some advantages like passing by values, bounds checking, etc. As a side note, you'd normally want to use an `std::vector` instead - which is a dynamically resizable array.

#### Other examples
Other containers in C++ include:
- Sequence containers: (accessibility in a sequential manner)
  - `std::array`
  - `std::vector`: Dynamically resizable arrays.
  Arrays have a set size, while `std::vector` doesn't. You can keep adding elements in contigious blocks of memory. For example:
  ```cpp
  std::vector<std::string> students;
  students.push_back("Paul");
  students.push_back("Jack");
  ```
  Paul & Jack are stored in contiguous memory blocks, even though we didn't provide a specific limit at the start - as we do with arrays.
  - `std::forward_list`: Singly linked-list.
  ```
  A -> B -> C -> D
  ```
  is a simple example of linked-lists. Once you're at a point, let's say "C" - you can only go forwards.
  - `std::list`: Doubly linked-list.
  ```
  A <-> B <-> C <-> D
  ```
  is a simple example of a doubly linked-list. Unlike Singly linked-lists, if you're at "C", you can go either way. To "B" or "D".
  - `std::deque`: Double-ended queues - insertion and removal possible at both ends.

- Container Adaptors: (different interface of accessibility from sequence containers)
  - `std::queue`: A standard queue, where removals are done from the front, and insertions are done at the end. The queue is a FIFO structure (First in, First out).
  - `std::priority_queue`: A queue in which elements can have a varying level of importance. The ones with the highest importance are at the front, and thus processed first.
  For example, let's say you're at a barbershop. A person arrived after you. If that person would've made a prior appointment to the shop, he would automatically be placed ahead of you with more "importance". Priority queues work similarly.
  - `std::stack`:
  Suppose you have a pile of 10 books. If you need a book from middle - of course, like most people, you would pull it right from the middle in one go. Let's think about how computers would take this problem. A computer needs a step-by-step instruction, so the first thing it would do is remove the book from the top. And continue to do that, until it reaches the book. To keep books as they were again, it would place books one by one at the top of the pile.
  Thus, insertions and removals in a stack are only done at the "top". 

- Associative containers: (sorted in a specific order, these containers boast search speeds of O(log N))
  - `std::set`: Each element inserted into a set is it's own identifier, meaning that unique elements are entered. Each element acts as it's own "key" - which uniquely identifies it. For example, suppose you are a volunteer for entering student information for new students entering into the semester. They are uniquely identified by their roll numbers. Suppose you enter the same student's Roll No (the ID) twice into a set, it will be inserted just once - because a "set" can only have unique values.
  - `std::multiset`: Like a set, but here multiple same elements are allowed. Entering the roll no from before twice into an `std::multiset` will result in it being added twice.
  - `std::map`: Take a literal map for example. When you point to a location on the map, it tells you the details. The "point" is the key, and the details of that location are the "values". The keys are unique, and values can be anything. An `std::map` works the same way. Perhaps an example will help understanding more about it:
  ```cpp
  // This maps a student name to his marks. But is this correct?
  std::map<std::string, int> mapOfStudentNameToMarks;
  // The answer is no. A student's name isn't necessarily unique, multiple students with the same name will have a clash this way.
  // Thus, the correct way would be:
  
  std::map<int, int> mapOfStudentIDToMarks; // This is correct, because StudentIDs are unique!

  mapOfStudentIDToMarks[1] = 100;   // StudentID 1 -> 100 Marks.
  ```
  - `std::multimap`: Can you guess what this might do, based on `std::multiset`?
  Multimap allows multiple elements to have the same key. So, for example, 10 -> 100 & 10 -> 150 are both valid for a multimap.

- Unordered Associative containers: (like associative containers, but implemented as hash-tables. They can be accessed at O(1) i.e constant time.
  - `std::unordered_set`
  - `std::unordered_multiset`
  - `std::unordered_map`
  - `std::unordered_multimap`
-- 

### STL - What next?
Containers aren't the only part of STL. It is huge! You are encouraged to read up more on STL, as it makes your life easier in every manner! You don't need to reinvent the wheel. Next, you could try looking up the various algorithms contained in the STL. They're present in the header file `<algorithm.h>`. Good luck on your journey!

