---
title: "Custom Encoders in the Mongo Go Driver"
date: "2019-12-03"
coverImage: "mongo-drivers.png"
author: "Chris Yee"
tags: ["Go", "Golang", "MongoDriver"]
type: "async"
---

The official supported drivers for Mongo for Go have been officially released for several months now and is slowly seeing more usage. Although many of the features of standard Mongo drivers have been implemented within the supported driver, the documentation for a majority of the features are still in the process of being created. This post will provide some information on how to set up custom JSON encoders so you can change how BSON operators are processed whenever Mongo documents are marshalled into JSON. For this blog, a custom date and object id encoder will be created to handle the BSON operators and transform them into more easily processed JSON.

This blog assumes that you have a basic understanding of Go and how to write some code in the language. If you want to follow along with the guide, you will also require a working Mongo instance, as well as your environment set up for Go.

Before interacting with the database, we can set up a quick Go application that finds data from a Mongo database and outputs it. For this example, the Mongo database is set up with a collection containing documents with a name, a date and the object id. For our blog, the Mongo document that is being worked with is quite simple:

```go
{
    "_id" : ObjectId("5de6b0850f3c7b5cce642529"),
    "Name" : "dateOne",
    "Date" : ISODate("2019-04-08T11:55:02.658Z")
}
```

A simple main function that retrieves data from Mongo and outputs the JSON string is as follows:

```go
func main() {
	var result struct {
		ID   primitive.ObjectID `bson:"_id"`
		Name string             `bson:"Name"`
		Date primitive.DateTime `bson:"Date"`
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, connErr := mongo.Connect(ctx, options.Client().ApplyURI(""))

	if connErr != nil {
		log.Fatal(connErr)
	}

	collection := client.Database("test").Collection("dates")

	filter := bson.M{"Name": "dateOne"}
	findErr := collection.FindOne(ctx, filter).Decode(&result)
	if findErr != nil {
		log.Fatal(findErr)
	}

	fmt.Print(result.Date)

	data, writeErr := bson.MarshalExtJSON(result, false, false)
	if writeErr != nil {
		log.Fatal(writeErr)
	}

	fmt.Print(string(data))
	cancel()
}
```

The function MarshalExtJSON is a part of the bson package that is a part of the driver. It uses a default registry to define the rules when converting Mongo primitive types into JSON. The arguments it takes are the Go struct being passed in, whether the result should be returned in canonical form (For more details, check this link: [https://docs.mongodb.com/manual/reference/mongodb-extended-json/](https://docs.mongodb.com/manual/reference/mongodb-extended-json/)), and whether HTML strings are escaped.

The output of this function when reading our document produces a JSON string with all the BSON operators included.

```go
{
	"_id": {
		"$oid":"5de6b0850f3c7b5cce642529"
	},
	"Name":"dateOne",
	"Date":{
		"$date":"2019-04-08T11:55:02.658Z"
	}
}
```

Using custom encoders, we can change how the bson package marshals the JSON and remove all the BSON operators. The first thing to do is to define package level variables that will hold the types of the Mongo primitives that need to be changed in the JSON response. Outside the main function, include these two lines:

```go
var tOID = reflect.TypeOf(primitive.ObjectID{})
var tDateTime = reflect.TypeOf(primitive.DateTime(0))
```

Next, we can make new functions to customize how these types are handled. For the date encoding, we want to have the Date key matched with the returned date string.

```go
func dateTimeEncodeValue(ec bsoncodec.EncodeContext, vw bsonrw.ValueWriter, val reflect.Value) error {
	const jDateFormat = "2006-01-02T15:04:05.999Z"
	if !val.IsValid() || val.Type() != tDateTime {
		return bsoncodec.ValueEncoderError{Name: "DateTimeEncodeValue", Types: []reflect.Type{tDateTime}, Received: val}
	}

	ints := val.Int()
	t := time.Unix(0, ints*1000000).UTC()

	return vw.WriteString(t.Format(jdateFormat))
}
```

The parameters in this function are pre-defined within the driver package of the driver. This involves passing in the BSON encoding context, the value writer and the value that is being processed. The value writer and the value are the parameters that we use within our function.

First, we check if the value passed in is the correct type. If there is an issue with the value, then an error is thrown during the encoding. Next, we can set the format we want our date string to appear in, and process our value into a Go Time object. After that, we can use the value writer to write the formatted date into our JSON string.

Similar to the custom date encoding, the object id encoding function has the same structure.

```go
func objectIDEncodeValue(ec bsoncodec.EncodeContext, vw bsonrw.ValueWriter, val reflect.Value) error {
	if !val.IsValid() || val.Type() != tOID {
		return bsoncodec.ValueEncoderError{Name: "ObjectIDEncodeValue", Types: []reflect.Type{tOID}, Received: val}
	}
	s := val.Interface().(primitive.ObjectID).Hex()
	return vw.WriteString(s)
}
```

First, we check if the type is valid, and if it is, we simply write out the object id as a hex string. To create the hex string, we first convert the value into an interface, then cast it as an object id to allow the Hex function to be called.

Now that our two functions are created to handle the BSON types, we can create our custom registry.

```go
func createCustomRegistry() *bsoncodec.RegistryBuilder {
	var primitiveCodecs bson.PrimitiveCodecs
	rb := bsoncodec.NewRegistryBuilder()
        bsoncodec.DefaultValueEncoders{}.RegisterDefaultEncoders(rb)
        bsoncodec.DefaultValueDecoders{}.RegisterDefaultDecoders(rb)
	rb.RegisterEncoder(tDateTime, bsoncodec.ValueEncoderFunc(dateTimeEncodeValue))
	rb.RegisterEncoder(tOID, bsoncodec.ValueEncoderFunc(objectIDEncodeValue))
	primitiveCodecs.RegisterPrimitiveCodecs(rb)
	return rb
}
```

In this function, we are setting up our registry to use our custom encoders, while also setting up default encoders for all other types that are being marshalled. Using the bsoncodec package, the NewRegistryBuilder function is called to initialize a new registry. Next, we set up this registry with the default encoders and decoders that are pre-programmed in the driver using RegisterDefaultEncoders. During this step, we can also register encoders and decoders for raw types by calling RegisterPrimitiveCodecs. Finally, we can include our custom encoders by calling RegisterEncoder on the custom registry struct. Our encoder will be called whenever the type defined in the first argument in RegisterEncoder is found in the struct being marshalled.

To ensure our new custom registry is being used, we have to do two things. The first is to build the custom registry. This should be done before the marshalling of the struct.

```go
var customRegistry = createCustomRegistry().Build()
```

Next, we need to change the marshalling method to use the new custom registry instead of the default one. We can do this by changing the method being used to marshal the struct.

```go
customData, writeErr := bson.MarshalExtJSONWithRegistry(customRegistry, result, false, false)
```

The function MarshalExtJSONWithRegistry takes the same parameters as MarshalExtJSON, but also requires a custom registry to be passed in as the first parameter. We pass in the custom registry we created into the method to allow the marshalling to use our custom encoders. As a result, when printing our new JSON string output, we get this:

```go
{"_id":"5de6b0850f3c7b5cce642529","Name":"dateOne","Date":"2019-04-08T11:55:02.658Z"}
```

The Mongo driver for Go is still in active development and new versions continue to be released. Hopefully this blog provides some useful information on how the driver works while new documentation is being created.
