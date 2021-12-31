---
type: async
title: Environment variables in Golang
date: "2020-09-28"
coverImage: "goenv.png"
author: "Puneet Singh"
tags: ["Go","Environment variables"]
description: "Learn about environment variables and different ways to use them in your Golang application."
---

## Before You Get Started
This tutorial assumes you have:

*   A basic understanding of Go Language
*   Latest Golang version installed on your system
*   A few minutes of your time.

In this article, we will know about environment variables and why to use them. And will access them in a Go application using inbuilt and third-party packages.

## What are environment variables?

Environment variables are key-value pair on a system-wide level, and running processes can access that. These are often used to make the same program behave differently in different deployment environments like PROD, DEV, or TEST. 
Storing configuration in the environment is one of the principles of a twelve-factor app. It enables applications to be portable.

## Why should you use environment variables

- If you are using the sensitive information in the code, then all the unauthorized users who have access to the code will have sensitive data, you might not want that.

- If you are using the code versioning tool like `git`, you may push your DB credentials with the code, and it will become public.

- If you are managing variables in one place, in case of any changes, you don't have to change it in all the places in application code.
 
- You can manage multiple deployment environments like PROD, DEV, or TEST. Environment variables are easy to change between deploys without changing any application code.

> Never forget to include your environment variable files in the .gitignore

## Inbuilt OS package

You don't need any external package to access the environment variables in Golang, and you can do that with the standard `os` package. Below is the list of functions related to environment variables and there uses.


- `os.Setenv()` sets the value of an environment value.

- `os.Getenv()` gets the value environment variable named by the key.

- `os.Unsetenv()` delete a single environment value named by the key, if we try to get that environment value using `os.Getenv()` it will return an empty value.

- `os.ExpandEnv` replaces ${var} or $var in the string as per the values of environment variables. If any environment variable is not present an empty string will replace it.

- `os.LookupEnv()` gets the value environment variable named by the key. If the variable is not present in the system, the returned value will be empty, and the boolean will be false. Otherwise, it returns the value (which can be empty), and the boolean is true.

> os.Getenv() will return an empty string if the environment variable is not present, to distinguish between an empty value and an unset value, use LookupEnv.

Now let's use all the above functions in our code. Create a main.go file in an empty folder.

```go
package main

import (
  "fmt"
  "os"
)

func main() {
  // Set Environment Variables
  os.Setenv("SITE_TITLE", "Test Site")
  os.Setenv("DB_HOST", "localhost")
  os.Setenv("DB_PORT", "27017")
  os.Setenv("DB_USERNAME", "admin")
  os.Setenv("DB_PASSWORD", "password")
  os.Setenv("DB_NAME", "testdb")

  // Get the value of an Environment Variable
  host := os.Getenv("SITE_TITLE")
  port := os.Getenv("DB_HOST")
  fmt.Printf("Site Title: %s, Host: %s\n", host, port)

  // Unset an Environment Variable
  os.Unsetenv("SITE_TITLE")
  fmt.Printf("After unset, Site Title: %s\n", os.Getenv("SITE_TITLE"))

  //Checking that an environment variable is present or not.
  redisHost, ok := os.LookupEnv("REDIS_HOST")
  if !ok {
    fmt.Println("REDIS_HOST is not present")
  } else {
    fmt.Printf("Redis Host: %s\n", redisHost)
  }

  // Expand a string containing environment variables in the form of $var or ${var}
  dbURL := os.ExpandEnv("mongodb://${DB_USERNAME}:${DB_PASSWORD}@$DB_HOST:$DB_PORT/$DB_NAME")
  fmt.Println("DB URL: ", dbURL)
}
```
Below is the output when we run `go run main.go` in our terminal

```go
go run main.go

//output
Site Title: Test Site, Host: localhost
After unset, Site Title: 27017
REDIS_HOST is not present
DB URL:  mongodb://admin:password@localhost:27017/testdb
```

There are two more functions `os.Clearenv` and `os.Environ()` let's use them also in a separate program.

- `os.Clearenv` deletes all environment variables, It can be useful to clean up the environment for tests

- `os.Environ()` returns a slice of the string containing all the environment variables in the form of key=value.


```go
package main

import (
  "fmt"
  "os"
  "strings"
)

func main() {

  // Environ returns a slice of string containing all the environment variables in the form of key=value.
  for _, env := range os.Environ() {
    // env is
    envPair := strings.SplitN(env, "=", 2)
    key := envPair[0]
    value := envPair[1]

    fmt.Printf("%s : %s\n", key, value)
  }

  // Delete all environment variables
  os.Clearenv()

  fmt.Println("Number of environment variables: ", len(os.Environ()))
}
```
The above function will list all the environment variables available in the system, including `NAME` and `DB_HOST`. Once we run `os.Clearenv()` it will clear all the environment variables for the running process.

## godotenv package

The Ruby dotenv project inspires [GoDotEnv](https://github.com/joho/godotenv) package, it loads the environment variables from a .env file

Let's create a .env file in which we will have all our configurations.

```go
# .env file
# This is a sample config file

SITE_TITLE=Test Site 

DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=admin
DB_PASSWORD=password
DB_NAME=testdb
```


Then in the main.go file we will use godotenv to load the environment variables.

> we can load multiple env files at once also. godotenv also supports YAML.

```go
// main.go
package main

import (
  "fmt"
  "log"
  "os"

  "github.com/joho/godotenv"
)

func main() {

  // load .env file from given path
  // we keep it empty it will load .env from current directory
  err := godotenv.Load(".env")

  if err != nil {
    log.Fatalf("Error loading .env file")
  }

  // getting env variables SITE_TITLE and DB_HOST
  siteTitle := os.Getenv("SITE_TITLE")
  dbHost := os.Getenv("DB_HOST")

  fmt.Printf("godotenv : %s = %s \n", "Site Title", siteTitle)
  fmt.Printf("godotenv : %s = %s \n", "DB Host", dbHost)
}
```

Open the terminal and run the `main.go`

```go
go run main.go

// output
godotenv : Site Title = Test Site
godotenv : DB Host = localhost
```



## Viper package

> Viper is a complete configuration solution for Go applications including twelve-factor apps. It is designed to work within an application and can handle all types of configuration needs and formats.

[Viper](https://github.com/spf13/viper) supports many file formats to load environment variables, e.g., Reading from JSON, TOML, YAML, HCL, envfile and Java properties config files. So in this example, we will look at how to load environment variables from a YAML file.

> YAML is a human-readable data-serialization language. It is commonly used for configuration files and in applications where data is being stored or transmitted.

Let's create our config.yaml and main.go in an empty folder. 

```yaml
# config.yaml
SITE:
  TITLE: Test Site

DB:
  HOST: "localhost"
  PORT: "27017"
  USERNAME: "admin"
  PASWORD: "password"
  NAME: "testdb"
```

In the below code, we are using Viper to load environment variables from a config.yaml. We can load the config file from any path we want. We can also set the default values for any environment variable if any environment variable is not available in the config file.

```go
// main.go
package main

import (
  "fmt"
  "log"
  "os"

  "github.com/spf13/viper"
)

func main() {

  // Set the file name of the configurations file
  viper.SetConfigName("config")

  // Set the path to look for the configurations file
  viper.AddConfigPath(".")

  // Enable VIPER to read Environment Variables
  viper.AutomaticEnv()

  viper.SetConfigType("yml")

  if err := viper.ReadInConfig(); err != nil {
    fmt.Printf("Error reading config file, %s", err)
  }

  // Set undefined variables
  viper.SetDefault("DB.HOST", "127.0.0.1")

  // getting env variables DB.PORT
  // viper.Get() returns an empty interface{}
  // so we have to do the type assertion, to get the value
  DBPort, ok := viper.Get("DB.PORT").(string)

  // if type assert is not valid it will throw an error
  if !ok {
    log.Fatalf("Invalid type assertion")
  }

  fmt.Printf("viper : %s = %s \n", "Database Port", DBPort)
}
```

Open the terminal and run the `main.go`

```go
go run main.go

// output
viper : Database Port = 27017
```

## Conclusion

Using environment variables is an excellent way to handle configuration in our application. Overall, it provides you with easy configuration, better security, multiple deployment environments and fewer production mistakes.

Now you can manage environment variables in your go application, and You can found the complete code used in this tutorial on our [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/GoLang/EnvironmentVariables)



