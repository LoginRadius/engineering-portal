---
title: "Working with Go Maps"
date: "2020-09-21"
coverImage: "index.png"
author: "Chris Yee"
tags: ["Go", "dictionaries", "maps"]
description: "Explore and learn about the usage of maps in Go."
---

## Introduction

Maps (also called dictionaries) are a very useful tool in helping to store and organize objects to be accessed in an efficient method. Most basic implementations of a map involve using a key to access a value in the map, resulting in key-value pairs, in which one key is associated with a specific value in the map. Within Go, maps follow this definition. This blog will cover the basic use cases of maps in Go, and how a newcomer to the language may utilize them for their applications.

![Dictionary](dictionary.jpg)

## Initialization

Initialization of a map can be done using the `make` command. This is similar to the initialization of a slice:

```Go
mapObject := make(map[string]string)
```

In this case, `mapObject` is a map that uses strings as a key to map to another string. When creating a map, the key type must be a type that is `Comparable`, or more specifically types that can be compared using the `==` operator. Examples of valid key types include booleans, numbers, strings and several other primitives can be used as keys. For reference on types, check out this link. One extra thing to note is that structs can be used as a key, provided that all the properties of the struct are `Comparable`.

Maps can also be created using a map literal. For an empty map:

```Go
mapObject := map[string]string{}
```

Or for a map with initial data:

```Go
mapObject := map[string]string{
	“Key1”: “Value1”,
	“Key2”: “Value2”,
	“Key3”: “Value3”,
}
```

## Use Cases

### Setting

Interaction with Go maps are similar to the dictionaries and maps of other languages. A simple way to return a value associated with the key is to use bracket notation. For example, to set a string value mapped to a string key:

```Go
mapObject[“test”] = “test_value”
```

### Fetching

![Fetching](fetching.jpg)

Retrieving a value uses the same format.

```Go
result := mapObject[“test”]
```

The value of `result` will be the value assigned to `“test”` in the map. In the case where no key is found, the zero value of the type is returned instead. In this case, if there is no associated value with `“test”`, an empty string is returned.

A boolean that returns the key’s existence can also be returned if two arguments are assigned from the retrieval. For example:

```Go
result, exists := mapObject[“test”]
```

If `“test”` exists in the map, `result` will be the value associated with `“test”` and `exists` will be true. If `“test”` does not exist, `result` will be an empty string and `exists` will be false. This is useful when the map being used contains zero-values to distinguish between existence or whether the value is just zero.

### Deleting

Using Go’s built in delete method, key-value pairs can be deleted off the map. To delete the previous `“test”` key from the map, the following can be called:

```Go
delete(mapObject, "test")
```

The delete method does not have a return value, so if the key does not exist in the map, nothing will happen.
Length

The number of key-value pairs of a map can be found using the len method:

```Go
length := len(mapObject)
```

### Iterating

Using Go’s range keyword, a map can be iterated through.

```Go
for key, value := range m {
    fmt.Println("Key:", key, "Value:", value)
}
```

There is no specific order in which the map is iterated. If a specific order is needed, a slice or other data structure can be used to store or hold data which can then be sorted and iterated through.

### Concurrency

Although Go has a lot of support for concurrency through the use of goroutines and channels, maps alone are not a reliable approach to handling data in a concurrent setting. To work with maps that support concurrency, a separate synchronization method should be used, like `sync.RWMutex`. Alternatively, an open source map package which implements the synchronizations can be used.

### Conclusion

With the market space and number of applications being created by Go increasing, hopefully this blog will help touch onto the basics of one of the major structures in Go. Although, it doesn’t support concurrency, maps in Go are still a useful tool in most applications developed in Go, to reliably access and manage data.
