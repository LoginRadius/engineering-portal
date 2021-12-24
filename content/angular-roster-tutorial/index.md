---
title: "Angular Roster Tutorial"
date: "2016-01-12"
coverImage: "roster-angularjs-1.png"
author: "Zakary Hughes"
tags: ["Engineering", "AngularJS", "PlayersArray", "Array", "Search"]
type: "async"
---

If you're not familiar with Angular I'd highly recommend heading over to the [Angular JS](https://angularjs.org/) resource site and checking out what all the fuss is about. Once you've got a basic understanding of Angular and how to get it up and running this tutorial will show you some of the basic, but awesome features supported by Angular.

Today I'm going to be building out a roster for my fantasy football team. If that's not your cup of tea then by all means feel free to substitute the content for whatever floats your boat.

## Players Array

There might not be an I in team, but there are certainly players, so before we do anything in the HTML we'll have to make all the necessary components in the controller. First up let's make an array of all the players we want to include (initially at least) on our team.

Every player is a special little snowflake, and our player objects should reflect that! With this in mind we will make each player an object with his or her own properties like: name, position and team. Here's an example of what our array might look like.

```js
$scope.players = [
  { name: "Tom Brady", position: "QB", team: "Patriots" },
  { name: "Tony Romo", position: "QB", team: "Cowboys" },
  { name: "Peyton Manning", position: "QB", team: "Broncos" },
  { name: "Rob Gronkowsi", position: "TE", team: "Patriots" },
  { name: "JJ Watt", position: "DE", team: "Texans" },
  { name: "Lavonte David", position: "LB", team: "Buccaneers" },
]
```

## Repetitive department of repetition

Now that we have our roster we can go back to the HTML and make use of Angular's ng-repeat directive. We put the ng-repeat on the element we want to be repeated, keeping in mind that all of its children will also get repeated.

```js
<!--
    {{player.name}} - {{player.position}}
-->
```

Okay so if you're new to Angular there's a couple of things going on here. First like I said we've got the ng-repeat placed on the li (the thing we want repeated) which will create a new li for each player in the players array we defined earlier in the controller. Next up the data binding is being implemented here with each player name as well as position being used as the values for the list item.

While we're on the topic of data binding, let's throw this in just for fun. Pretty simple, it will calculate the length of your roster and keep it updated as any changes are made.

```js
<!--You have {{players.length}} on your roster.-->
```

## Easiest Search Functionality of Your Life

Next let's add some search functionality to our list. Sounds like a lot of work, probably have to iterate over the array elements, match them to the argument being passed in and... just kidding. With Angular it's a breeze.

```js
<!--
...
{{player.name}} - {{player.position}}
-->
```

Donezo.

## The shape of Italy

Let's imagine one of our fantasy players isn't performing too well (ahem Peyton...) and we want to give him the boot (get it now?).

We'll add a little delete button beside each of our players' names, and since we're doing it for each of them guess how we're going to implement it? That's right with ng-repeat we already have on the list items!

```js
<!--{{player.name}} - {{player.position}}
    ×
-->
```

I'll also tack on a little button with an "x" as the content (as a side note, when you want to do this use × instead of "x" it looks much nicer). Then we'll attach an ng-click with a delete function where we pass in \$index.

\$index is a neat little feature available with certain Angular directives, and ng-repeat is one of them. It will be assigned the index value (starting at 0) of the position it holds within the array being used with the ng-repeat.

That's all we need in the HTML, so now back in the controller we create a \$scope function by the same name used in the HTML and give it a parameter of index. The body of the function is a single line which makes use of the array.splice method where we pass in the index of the item we want to delete, and then 1 to denote that it's only 1 item we want removed.

```js
$scope.delete = function (index) {
  $scope.players.splice(index, 1)
}
```

## Acquisitions

Now since we just cut someone from the team, we've gotta find their replacement. Let's chuck a few text inputs in there, give them all a respective ng-model to bind with their value and finally another button with an ng-click but this time calling an addPlayer function.

```js
<!--
    Name:

    Position:

    Team:

    Add Player
-->
```

This one's a lil' different from delete, but still super simple. Working from the inside out, we will create a new player object which gets the name, position and team properties from the ng-models on the HTML and then push that object to the players array. After that we clear those values just for some good housekeeping practice.

```js
$scope.add = function () {
  $scope.players.push({
    name: $scope.new_name,
    position: $scope.new_position,
    team: $scope.new_team,
  })
  $scope.new_name = ""
  $scope.new_position = ""
  $scope.new_team = ""
}
```

## Nothing Lasts Forever

Now since this was all done purely on the front end, and didn't make use of cookies, localstorage, or sessionstorage none of this will persist (aka be saved). For that kind of support you'd need some sort of back end, which is beyond the scope of this article.

This was a very rudimentary example of what's possible with Angular JS, so if this interested you at all please dig a little deeper and play around with Angular some more!

That brings us to the end of this tutorial. Feel free to check out the finished (yet unstyled) product [here on Codepen](https://codepen.io/anon/pen/pgoJwq)
