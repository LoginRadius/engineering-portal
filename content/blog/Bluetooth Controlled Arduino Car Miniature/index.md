---
title: "Bluetooth Controlled Arduino Car Miniature"
date: "2020-10-14""
coverImage: "Arduinocar.jpg"
author: "Abhishek Potekar"
tags:["Arduino","Bluetooth"]
description: "In this blog , you will learn how to make a Bluetooth controlled Arduino Car."
---

A.) Introduction to Arduino and its usage:
Arduino is basically a open source community , that works on both Hardware and software development. we can say that both the hardware and software helps to
build the new segment automated devices like e.g. - 3D printer , IOT based projects and much more. The Arduino software is used to build the code for every 
project that is made using any Arduino boards , it mostly uses the C/C++ language for its coding.Once the Code is ready , we have to just compile and upload 
it on the board to make our project work.There are many types of Arduino boards like  Arduino Uno , Arduino Nano , Arduino USB ,etc. In this project we are 
going to use the Arduino UNO board (Atmega 328p).

B.)Bluetooth Module HC-05:
Bluetooth HC-05 is a blutooth module that is mostly used in the Bluetooth based project. It is easy to operate and can be easily configured with the Arduino.
It basically has two operating modes, that is Command mode and Data mode, as we can change these mode by just pressing the push button on the bluetooth module.
It has Six terminals , in which two terminal are Vcc and GROUND for power purpose and other two are TXD and RXD, that are the transmitter and reciever ,respectively
these are the terminals that send and recieve signals from the Arduino board , for controlling the device .Other two terminal are State and Key , which tells the state 
of the module that it is in commnad mode or data mode.

C.) Motor Driver L298D:
This is actually an IC that is made into an Module with a HEAT SINK embedded into it , which helps to release heat whenever the L298D IC is heated.Now this
module is basically used to control the motors that are connected for the locomotion of the Car, these motors basically work by the commnad prompted by
the Arduino to move or rotate in the specific directon.It can control Four Gear motors at maximum, also speed of the motors can be handles by this IC.


Objective:
•	Many of the wireless-controlled robots use RF modules. But this project make use of Android smartphone and Bluetooth for robotic control.

•	 The control commands available are more than RF modules. For this the android mobile user must install an application on her/his mobile. 
   Then user needs to turn on the Bluetooth in the mobile. 

•	The wireless communication techniques used to control the robot is Bluetooth technology. 
  User can use various commands like move forward, move reverse, move left, move right using these commands which are sent from the Android mobile.

•	 Robot has a Bluetooth receiver unit which receives the commands and give it to the microcontroller circuit to control the motors. 
   The microcontroller then transmits the signal to the motor driver IC’s to operate the motors.
   

Components Required for the project:

1)	Arduino UNO
2) Bluetooth HC-05 Module
3)	Motor Driver L298
4) Jumper Wires 
5)	Gear Motors (x4)
6)	12 V battery (x3 Lithium ion cells)
7)	LED
8) 	Motor Wheels 

Pin Connections:

1.) Connect one terminal of each of two motors to the OUT1 (left side) and OUT2(left side) pins and each of other two motors to the OUT3(right side) and OUT4(right side) of L298N motor driver.
2.)  Connect the  positive wire of batteries to +12V pin and negative to the GND of L298N also +5V(of motor driver) to Vin(in analog pins)
3.) Connect same GND of motor driver  to GND (in analog) of Arduino.
4.) Pins of HC-05 are connected to Arduino like this: GND(in analog pins) to GND; VCC(in analog) to 5V; RX to TX(in digital pins) and TX to RX(in digital pins).
Connect anode and cathode of LED to Pin 9 (in digital pins) and 3.3V (in analog pins) pins respectively.

E.) Here,i want to tell one important point that, The code that will be given , should be uploaded before connection of the pins , else you will face error in uploadind the code,
so, just first copy the code from the file provided in the arduino software and upload it ot the board before the pin connections.

F.) Software details: Arduino: 1.8.9 (Windows Store 1.8.21.0) (Windows 10), Board: "Arduino/Genuino Uno“

G.) Code is given the file named "Arduino car code" file.


