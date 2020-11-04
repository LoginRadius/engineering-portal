---
title: "Bluetooth Controlled Arduino Car Miniature"
date: "2020-11-04"
coverImage: "Arduinocar.png"
author: "Abhishek Potekar"
tags: ["Arduino","Bluetooth"]
description: "In this blog, you will learn how to make a Bluetooth controlled Arduino Car."
---

A.) Introduction to Arduino and its usage:
Arduino is an open-source community that works on both Hardware and software development. We can say that both the hardware and software help build the new segment automated devices like e.g., 3D printer, IOT based projects, and much more. The Arduino software is used to build the code for every project made using any Arduino boards; it mostly uses the C/C++ language for its coding. Once the code is ready, we have to just compile and upload it on the board to make our project work. There are many types of Arduino boards like  Arduino Uno, Arduino Nano, Arduino USB, etc. In this project, we are going to use the Arduino UNO board (Atmega 328p).

B.)Bluetooth Module HC-05:
Bluetooth HC-05 is a Bluetooth module that is mostly used in the Bluetooth based project. It is easy to operate and can be easily configured with the Arduino.
It has two operating modes: Command mode and Data mode, as we can change these modes by just pressing the push button on the Bluetooth module.
It has Six terminals. Two terminal are Vcc and GROUND for power purpose. The other two are TXD and RXD, the transmitter and receiver; respectively, these are the terminals that send and receive signals from the Arduino board to control the device. The other two terminals are State and Key, which tells the state 
of the module that it is in command mode or data mode.

C.) Motor Driver L298D:
This is an IC made into a Module with a HEAT SINK embedded into it, which helps release heat whenever the L298D IC is heated. Now, this module is used to control the motors connected for the locomotion of the car; these motors work by the command prompted by
the Arduino to move or rotate in a specific direction. It can control Four Gear motors at maximum; also, the speed of the motors can be handled by this IC.


D.) Objective:
1.) This project's main motive is to expand the knowledge for smart micro-controllers like Arduino, which is widely used in the latest IoT technologies.
2.) Making the use of Connectivity Modules like Bluetooth HC-05, to understand the different modes of operating and communications with the micro-controller board.
3.) To get familiar with Codes and programs used for the controlling of the Arduino Uno board.
4.) Introductory project for Every Electronics And Electrical Student, to get the working of the Arduino board and its software.
   

Components Required for the project:

1)	Arduino UNO
2) Bluetooth HC-05 Module
3)	Motor Driver L298
4) Jumper Wires 
5)	Gear Motors (x4)
6)	12 V battery (x3 Lithium-ion cells)
7)	LED
8) 	Motor Wheels 

Pin Connections:

1.) Connect one terminal of each of two motors to the OUT1 (left side) and OUT2(left side) pins and each of the other two motors to the OUT3(right side) and OUT4(right side) of L298N motor driver.
2.)  Connect the  positive wire of batteries to +12V pin and negative to the GND of L298N also +5V(of motor driver) to Vin(in analog pins)
3.) Connect the same GND of a motor driver to GND (in analog) of Arduino.
4.) Pins of HC-05 are connected to Arduino like this: GND(in analog pins) to GND; VCC(in analog) to 5V; RX to TX(in digital pins) and TX to RX(in digital pins).
Connect anode and cathode of LED to Pin 9 (in digital pins) and 3.3V (in analog pins) pins, respectively.
5.) The use of the LED light is the optional parameter in this project.

E.) Here, I want to tell one important point that, The code that will be given should be uploaded before connection of the pins; else you will face an error in uploading the code,
so, just first copy the code provided below and pasted in the Arduino software and upload it to the board before the pin connections.

F.) Software details: Arduino: 1.8.9 (Windows Store 1.8.21.0) (Windows 10), Board: "Arduino/Genuino Uno "
G.) The application used for Controlling the car is `Arduino Car`, which can be found on Playstore.


H.) CODE FOR THE ABOVE PROJECT:

---
ARDUINO BLUETOOTH CAR CODING
---



```
char t;
 
void setup() {
pinMode(13,OUTPUT);   //left motors forward
pinMode(12,OUTPUT);   //left motors reverse
pinMode(11,OUTPUT);   //right motors forward
pinMode(10,OUTPUT);   //right motors reverse
pinMode(9,OUTPUT);   //Led
Serial.begin(9600);
 
}
 
void loop() {
if(Serial.available()){
  t = Serial.read();
  Serial.println(t);
}
 
if(t == 'F'){            //move forward(all motors rotate in forward direction)
  digitalWrite(13,HIGH);
  digitalWrite(11,HIGH);
}
 
else if(t == 'G'){      //move reverse (all motors rotate in reverse direction)
  digitalWrite(12,HIGH);
  digitalWrite(10,HIGH);
}
 
else if(t == 'R'){      //turn right (left side motors rotate in forward direction, right side motors doesn't rotate)
  digitalWrite(11,HIGH);
}
 
else if(t == 'L'){      //turn left (right side motors rotate in forward direction, left side motors doesn't rotate)
  digitalWrite(13,HIGH);
}

else if(t == 'M'){    //turn led on or off)
  digitalWrite(9,HIGH);
}
else if(t == 'm'){
  digitalWrite(9,LOW);
}
 
else if(t == 'S'){      //STOP (all motors stop)
  digitalWrite(13,LOW);
  digitalWrite(12,LOW);
  digitalWrite(11,LOW);
  digitalWrite(10,LOW);
}
else if(t == 'Q'){
   digitalWrite(13,HIGH);
  delay(2000);
    digitalWrite(13,HIGH);
  digitalWrite(11,HIGH);
  delay(2000) ;
  digitalWrite(13,LOW);
  digitalWrite(11,LOW);
}
 else if(t == 'E'){
   digitalWrite(11,HIGH);
  delay(2000);
    digitalWrite(13,HIGH);
  digitalWrite(11,HIGH);
  delay(2000); 
  digitalWrite(13,LOW);
  digitalWrite(11,LOW);
}
 else if(t == 'Z'){
   digitalWrite(13,HIGH);
  delay(2000);
  digitalWrite(12,HIGH);
  digitalWrite(10,HIGH);
  delay(2000) ;
  digitalWrite(12,LOW);
  digitalWrite(10,LOW);
  digitalWrite(13,LOW);
}
 else if(t == 'C'){
   digitalWrite(11,HIGH);
  delay(2000);
    digitalWrite(12,HIGH);
  digitalWrite(10,HIGH);
  delay(2000); 
  digitalWrite(12,LOW);
  digitalWrite(11,LOW);
  digitalWrite(10,LOW);
}
}
```

