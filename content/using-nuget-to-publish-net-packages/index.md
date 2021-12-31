---
type: async
title: "Using NuGet to publish .NET packages"
date: "2018-06-28"
coverImage: "desdev.png"
author: Hitesh Pamnani
tags: ["NuGet",".NET"]
---

NuGet is a free and open-source package manager for the .NET ecosystem. We can create and install packages using NuGet client tools. All of the .NET packages are hosted for publishing and consumption on a central package repository known as NuGet Gallery.

Prerequisites

- Visual Studio 2017 (with .NET-related workload)
- nuget.exe (add it’s location to PATH environment variable)
- Valid account on nuget.org

**Create a class library project**

For a .NET package to be published in the NuGet Gallery, it should be a valid class library project. The following instructions can be used to create a simple class library project:

- Open Visual Studio, go to File > New > Project, expand the Visual C# > .NET Standard node. Select the "Class Library (.NET Standard)" template and provide a valid name.
- To build the project, right-click on the project file and select Build. A DLL file will be generated in the Debug folder or Release folder (if you build the configuration)

For a real useful NuGet package, you should write necessary code which can be used by others to develop applications. However, a class library from the template is sufficient to create a package.

**Configure Package Properties**

1. Go to Project > Properties, select Package tab.
2. Provide a unique identifier for your package and fill out other required properties. For a description of various properties, please visit [here](https://docs.microsoft.com/en-us/nuget/reference/nuspec). The properties provided at this stage will be defined in .nuspec manifest that is created by Visual Studio for the project.
3. To view the properties directly in the project file, right-click the project in Solution Explorer and select Edit AppLogger.csproj.

**Run the pack command**

1. Set the configuration to Release.
2. Right click the project in Solution Explorer and select the Pack command.
3. Visual Studio builds the project and creates the .nupkg file. Please note that the built package is in bin\\Release\\netstandard2.0 as befits the .NET Standard 2.0 target.

**Acquire API Key**

1. [Sign in to your nuget.org account](https://www.nuget.org/users/account/LogOn?returnUrl=%2F) or create an account if it doesn’t already exist.
2. Select your user name on the top right, then select API Keys.
3. Select Create, provide a name for your key, select Select Scopes > Push.
4. Under API Key, enter \* for Glob pattern, then select Create.
5. After the key is created, select Copy to retrieve the access key needed for publishing the package.

**Important:** Save your key in a secure location because you cannot copy the key again later on. If you return to the API key page, you need to regenerate the key to copy it.

**Publish with nuget push**

1. Open Command Prompt.
2. Change to the folder containing the .nupkg file.
3. Run the following command, specifying your package name and replacing the key value with your API key:
    
    ```powershell
    nuget push &amp;lt;PACKAGE-NAME&amp;gt;.nupkg &amp;lt;API-KEY&amp;gt; -Source https://api.nuget.org/v3/index.json
    ```

4. nuget.exe displays the results of the publishing process.

**Manage the published package**

You can view your published package in your profile on nuget.org. Select Manage Packages to see the one that was just published. It might take a while for your package to be visible in search results.

If you want to unlist the package and hide it from search results, follow the steps listed below:

1. On nuget.org, select your user name on top right, then select Manage Packages.
2. Find the package to be unlisted under Published and select the trash can icon on the right.
3. On the next page, clear the box labeled List (package-name) in search results and select Save.