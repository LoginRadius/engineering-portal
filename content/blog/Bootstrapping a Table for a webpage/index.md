---
title: "Bootstrapping a Table for a webpage"
date: "2020-10-31"
coverImage: "Bootstrap Cover.png"
author: "Rutam Prita Mishra"
tags: ["HTML", "CSS", "UI", "Bootstrap"]
---


When we start developing a web application, the very first thing that comes to our mind is its UI. With the developing technologies, it is getting easier day by day to develop the UI for such web applications. But after the introduction of Bootstrap, the entire CSS styling scenario has changed. Instead of dealing with so many class or entity properties, we can simply get an awesome layout by just applying Bootstrap classes to our components.

<br/>

Basically, Bootstrap is a popular framework dealing with HTML, CSS, and JavaScript for developing interactive, responsive, multi-device scalable websites. The basic way to implement Bootstrap is to include the required class type to the webpage component. Yeah, it's that simple. But to get it working, we need to include certain js and css files in our code. The list of mandatory scripts and css files to be included are:

<br/>
 > Latest compiled Bootstrap CSS --> <script rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.css"></script> (Use link instead of Script)<br/><br/>
 > jQuery library --> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.js"></script><br/><br/>
 > Latest compiled Bootstrap JavaScript --> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.js"></script><br/><br/>

After we have added all the cdn, we are good to go with bootstrap. So, in this article we will be dealing with one of the most commonly used entities in a webpage i.e., Tables. Here we will have look on all the basic classes to format a table to look appealing using Bootstrap.<br>

1. The <i>.table</i> class adds simple layout to a table:
    It provides the table with a light padding and only row dividers.
    
2. The <i>.table-bordered</i> class adds borders on all sides of the table.

![Border Table](borderTable.JPG)


3. The <i>.table-hover</i> class adds a hover effect to the table rows i.e., whenever we move the cursor to a row it gets highlighted with grey color.

4. We can also color the rows using different colors to indicate their type of data or context. Find a small snippet of the code below along with its output screenshot.

      
      
      <body>

        <div class="container">
          <h2>Rows based on context</h2><br/>
          <table class="table">
            <thead>
              <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr class="danger">
              <td>Big</td>
              <td>Show</td>
              <td>bigshow@wwe.com</td>
              </tr>
              <tr class="info">
              <td>Stone</td>
              <td>Cold</td>
              <td>stone@wwe.com</td>
              </tr>
              <tr class="success">
              <td>Under</td>
              <td>Taker</td>
              <td>undertaker@wwe.com</td>
              </tr>
           </tbody>
        </table>
      </div>
    </body>
    
![Row Context](RowContext.JPG)
    
5. The <i>.table-responsive</i> class creates a responsive table that re-organizes its size based on the device screen. The table will then resize itself and scroll horizontally on small devices.


Well, that was a brief summary to get you all started with the Bootstrap Tables. You will gradually find out a lot more classes to upscale your UI. So, happy coding folks !
