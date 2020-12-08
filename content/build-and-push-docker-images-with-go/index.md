---
title: "Build and Push Docker Images with Go"
date: "2020-12-08"
coverImage: "cover.png"
author: "Andy Yeung"
tags: ["Docker", "Go"]
description: "Guide on how to build and push Docker images programmatically using Go."
---

## Introduction

Let's walk through how to build and push Docker images programmatically using Go. To do this, we need to talk to the Docker daemon via the [Docker Engine API](https://docs.docker.com/engine/api/). This is similar to how the Docker CLI works, but instead of entering commands through a CLI, we'll be writing code with Docker's Go SDK.

At the time of writing, the official Docker Go SDK [docs](https://docs.docker.com/engine/api/sdk/examples/) provide great examples of running basic Docker commands with Go. However, it's missing examples on building and pushing Docker images, so we'll go over those in this blog.

Before we begin, this blog assumes you have a working knowledge of Docker and Go.

## Examples in Go

We'll go over the following:
- Building an image from local source code
- Pushing an image to a remote registry

### Set Up

First, we need to set up the environment. Create a project and include the app we want to containerize:
```
mkdir docker-go-tutorial && cd docker-go-tutorial && mkdir node-hello
```

We'll add a simple Node.js app:
```
// node-hello/app.js
console.log("Hello From LoginRadius");
```

with the Dockerfile:
```
// node-hello/Dockerfile
FROM node:12
WORKDIR /src
COPY . .
CMD [ "node", "app.js" ]
```

Next, install the [Go SDK](https://docs.docker.com/engine/api/sdk/). These are the Docker related imports we will be using:
```
"github.com/docker/docker/api/types"
"github.com/docker/docker/client"
"github.com/docker/docker/pkg/archive"
```

### Build an Image

One way to build a Docker image from our local files is to compress those files into a tar archive first.

We use the archive package provided by Docker:
```
"github.com/docker/docker/pkg/archive"
```

```
tar, err := archive.TarWithOptions("node-hello/", &archive.TarOptions{})
if err != nil {
    return err
}
```

Now, we can call the ImageBuild function using the Go SDK:
- Note that the image tag includes our Docker registry user ID, so we can push this image to our registry later.
```
opts := types.ImageBuildOptions{
    Dockerfile:  "Dockerfile",
    Tags:        []string{dockerRegistryUserID + "/node-hello"},
    Remove:      true,
}
res, err := dockerClient.ImageBuild(ctx, tar, opts)
if err != nil {
    return err
}
```

To print the response, we use a scanner to go through line by line:
```
scanner := bufio.NewScanner(res.Body)
for scanner.Scan() {
    lastLine = scanner.Text()
    fmt.Println(scanner.Text())
}
```

This prints the following:
```
{"stream":"Step 1/4 : FROM node:12"}
{"stream":"\n"}
{"stream":" ---\u003e e4f1e16b3633\n"}
{"stream":"Step 2/4 : WORKDIR /src"}
{"stream":"\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e b298b8519669\n"}
{"stream":"Step 3/4 : COPY . ."}
{"stream":"\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 1ff6a87e79d9\n"}
{"stream":"Step 4/4 : CMD [ \"node\", \"app.js\" ]"}
{"stream":"\n"}
{"stream":" ---\u003e Using cache\n"}
{"stream":" ---\u003e 6ca44f72b68d\n"}
{"aux":{"ID":"sha256:238a923459uf28h80103eb089804a2ff2c1f68f8c"}}
{"stream":"Successfully built 6ca44f72b68d\n"}
{"stream":"Successfully tagged lrblake/node-hello:latest\n"}
```

The last step would be checking the response for errors, so if something went wrong during the build, we could handle it.

```
errLine := &ErrorLine{}
json.Unmarshal([]byte(lastLine), errLine)
if errLine.Error != "" {
    return errors.New(errLine.Error)
}
```

For example, the following error can occur during build:

```
{"errorDetail":{"message":"COPY failed: stat /var/lib/docker/tmp/docker-builder887191115/z: no such file or directory"},"error":"COPY failed: stat /var/lib/docker/tmp/docker-builder887191115/z: no such file or directory"}
```

All together, the file looks like this:

```go
package main

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
)

var dockerRegistryUserID = ""

type ErrorLine struct {
	Error       string      `json:"error"`
	ErrorDetail ErrorDetail `json:"errorDetail"`
}

type ErrorDetail struct {
	Message string `json:"message"`
}

func main() {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	err = imageBuild(cli)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
}

func imageBuild(dockerClient *client.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*120)
	defer cancel()

	tar, err := archive.TarWithOptions("node-hello/", &archive.TarOptions{})
	if err != nil {
		return err
	}

	opts := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		Tags:       []string{dockerRegistryUserID + "/node-hello"},
		Remove:     true,
	}
	res, err := dockerClient.ImageBuild(ctx, tar, opts)
	if err != nil {
		return err
	}

	defer res.Body.Close()

	err = print(res.Body)
	if err != nil {
		return err
	}

	return nil
}

func print(rd io.Reader) error {
	var lastLine string

	scanner := bufio.NewScanner(rd)
	for scanner.Scan() {
		lastLine = scanner.Text()
		fmt.Println(scanner.Text())
	}

	errLine := &ErrorLine{}
	json.Unmarshal([]byte(lastLine), errLine)
	if errLine.Error != "" {
		return errors.New(errLine.Error)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}
```

The equivalent Docker CLI command would be:
```
docker build -t <dockerRegistryUserID>/node-hello .
```

### Push an Image

We'll push the Docker image we created to Docker Hub. But, we need to authenticate with Docker Hub by providing credentials encoded in base64.
- In practice, don't hardcode your credentials in your source code.
- If you don't want to use your Docker Hub password, you can set up an access token and provide that in the Password field instead.
```
var authConfig = types.AuthConfig{
	Username:      "Your Docker Hub Username",
	Password:      "Your Docker Hub Password or Access Token",
	ServerAddress: "https://index.docker.io/v1/",
}
authConfigBytes, _ := json.Marshal(authConfig)
authConfigEncoded := base64.URLEncoding.EncodeToString(authConfigBytes)
```

Now, call the ImagePush function in the Go SDK, along with your encoded credentials:
```
opts := types.ImagePushOptions{RegistryAuth: authConfigEncoded}
rd, err := dockerClient.ImagePush(ctx, dockerRegistryUserID + "/node-hello", opts)
```

Together, this looks like:
```
func imagePush(dockerClient *client.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*120)
	defer cancel()

	authConfigBytes, _ := json.Marshal(authConfig)
	authConfigEncoded := base64.URLEncoding.EncodeToString(authConfigBytes)

	tag := dockerRegistryUserID + "/node-hello"
	opts := types.ImagePushOptions{RegistryAuth: authConfigEncoded}
	rd, err := dockerClient.ImagePush(ctx, tag, opts)
	if err != nil {
		return err
	}

	defer rd.Close()

	err = print(rd)
	if err != nil {
		return err
	}

	return nil
}
```

The equivalent Docker CLI command (after docker login) would be:

```
docker push <dockerRegistryUserID>/node-hello
```
