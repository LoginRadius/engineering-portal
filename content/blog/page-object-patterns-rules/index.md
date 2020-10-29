---
title: "Page Object Patterns - Rules for High Quality"
date: "2020-10-30"
author: "Sudhey Sharma"
coverImage: "CoverImage.png"
tags: ["AutomationTesting", "PageObjectPatterns", "Selenium"]
description: "This article is about the Page Object Patterns and the rules the automation testers should follow to make effective use of page object patterns in their functional automation projects."
---

## Rules for High-Quality Page Object Patterns

Page object pattern is one of the most important aspects of UI test automation. Let's go deep in understanding what is the page object model and what are the rules one should follow to make effective use of page object patterns in his/her functional automation project. 

**What is Page Object Model?**
The Page Object model is an object design pattern in Selenium, where web pages are represented as classes, and the various elements on the page are defined as variables in the class. All possible user interactions can then be implemented as methods in the class.

The basic idea is to divide the application into modules/pages/panels as needed and abstracts object recognition and actions on those objects from the test level. If implemented efficiently, it improves the maintainability and reusability of code. 

By creating a layer of abstraction between your automated tests and the target web page, page object patterns decrease sources of duplication. In other words, you create a single class for a single web page, then use that class in your automated functional test to interact with the web page in the same way you would manually.

This is a very effective, tried, and tested pattern that works but only when it is properly followed. Most of the test architects use page object patterns all the time; Why?: Because it is a straightforward, effective system that provides results.

So, to use page object patterns well in your automation efforts, you need to follow some basic rules as mentioned below.

**1. Correct/effective naming for your page object class**

Look at the POMDemoLoginPage below, which represents the login page of an app. After reading the class name itself you can easily guess about the methods and properties which would be there inside.

	public class POMDemoLoginPage : BasePage
    	{
    		public POMDemoLoginPage(IWebDriver driver) : base(driver)
    		{
    		}
		
		private readonly By _loginButtonLocatore = By.ClassName("btn_action");
		public bool IsLoaded => new Wait(_driver, _loginButtonLocator).IsVisible();
		private IWebElement PasswordField => _driver.FindElement(By.Id("password"));
		private IWebElement LoginButton => _driver.FindElement(_loginButtonLocator);
		private readonly By _usernameLocatore = By.Id("user-name");
		private IWebElement UsernameField => _driver.FindElement(_usernameLocator);
		
		public POMDemoLoginPage Open()
		{
			_driver.Navigate().GoToUrl(BaseUrl);
			return this;
		}
		
		public MainProductsPage Login(strin username, string password)
		{
			POMJsExecutor.LogMessage($"Start login with user=>{username) and pass=>{password}");
			var usernameField = Wait.UntilIsVisible(_usernameLocator);
			usernameField.SendKeys(username);
			PasswordField.SendKeys(password);
			LoginButton.Click();
			POMJsExecutor.LogMessage($"{MethodBase.GetCurrentMethod().Name} success");
			return new MainProductsPage(_driver);
		}
	}
	


It's unlikely that you'll be surprised by what you find inside the POMDemoLoginPage class. On the other hand, imagine if the class with the same code was called POMPageObject(). Upon reading this you'd have no clue what this class represents—and you could be surprised by what you find inside.

**2. Methods for interacting with the HTML page or component should only be part of the page class**
The only public methods you should allow in your page objects are ones that an end-user can perform to your web application - nothing else. Consider an HTML page in which there are only two actions that the end-user can perform; Open() and Login(). Hence, the implementation of POMDemoLoginPage above.

The end-user of the app doesn't ConnectToSQL(), OpenExcel(), or ReadPDF(). As such, these methods have no place in your automated UI tests. By extension, this means that they cannot be publicly accessible in your page objects.

Imagine if you have 50 tests that call OpenExcel(). As you get more advanced and realize that Excel might not be the best place for your test data, you might start using the data from an API or JSON or CSV.

At that point, you'd need to update these 50 tests to use the new method, but not because the requirements of the application changed. Instead, you need to update them because you've exposed methods in your test that don’t have anything to do with the functionality of the software.

**3. Properties, methods, or objects (that provide access), can be part of the page class**
By using page objects, you can interact with the application through a single interface: the page object. If you want to interact with the login page, you do so through the POMDemoLoginPage class.

For example, you might want to log in to the POMDemoLoginPage by using

    Login("username", "password");

In this case, you need to avoid the locators living in a separate class, since they're not necessary and will just overcomplicate your code.
There are a lot of articles that say that, by separating methods from properties for a page object, you will maintain the single responsibility principle(SRP). But that's not correct. In SRP, the responsibility is derived from an actor whose changing requirements will force you to make an update to your page object. If there is more than one such actor, then the module or page object has more than one responsibility.

Strictly speaking, the developer is the only actor that can force you for a change in your class. No one else would have the requirement to modify HTML elements without also modifying the HTML methods.

Ultimately, you should avoid separating your locators from methods for a page object. It's unnecessary; it's over-optimization. That being said, a page could be composed of multiple components that are relevant to that page object.

**4. The page object is not necessarily to be an entire HTML page, rather it can be a small component**

This is what programmers call "composition". The aim is to push pages toward composition rather than having to use inheritance. Below, you'll see how to use composition to create a cleaner and tighter page objects.


    // A car has an engine, wheels, and so on.
    // Hence, it contains these objects inside of the class.
    
    public class Car
    {
    	Engine engine;
    	Wheels wheels;
    }

 ======================================================================================  
 
    public class Engine
        {
    	    // The Engine.java does stuff related to the engine
    	} 

  

In this example, the Car is composed of an Engine and Wheels, and the Engine is a class that holds operations and properties of a car engine.
Similarly, you can break up your large page objects to be composed of multiple components.

**Conclusion**
Simple page objects are an underrated technique. They are highly effective and easy to use and provide you with code that is easy to read and maintain. Page object patterns are tried and true, and they work well. You just need to know how to use them to get results.

**Thanks for reading and happy testing!**


