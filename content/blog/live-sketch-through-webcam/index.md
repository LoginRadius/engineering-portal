---
title: "Live Sketch Through WebCam"
date: "2020-10-15"
coverImage: "Opencv.png"
author: "Sharvari Raut"
tags: ["Technology","OpenCV","Sketch","Computer Vision","Python"]
---

Computer Vision is a field in Computer science which focuses on enabling computers to see, identify, and process images in the same way as the human mind does. OpenCV is a very powerful computer vision library. In, this blog article we will see how we can use this library to implement a Computer Vision model that creates a live video black and white sketch of real-time webcam video.

Before we start make sure you have installed "OpenCV" and "NumPy" libraries in your system. By using the following commands:

```
!pip install opencv
!pip install numpy
```

### Importing Libraries
Importing our OpenCV and NumPy libraries.
```
import cv2
import numpy as np
```

#### Making a sketch generating function
We will make a function in which we will generate our sketch:
```
def sketch(img):
```
#### Converting image into grayscale
Converting an image into grayscale to remove colors that are present in our image.
 ```
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
```
#### Clean up the image using Gaussian Blur
Blurring our image using the Gaussian Blur function provided by OpenCV. There are several other functions which are provided by OpenCV to blur images for eg: ```cv2.blur```, ```cv2.medianBlur```, and ```cv2.bilateralFilter```. Here, I have used ```cv2.GaussianBlur``` as it saves the edges to an extent and blurs the rest of the image whereas also there is more emphasis or weighting on points around the center.
```
img_gray_blur = cv2.GaussianBlur(img_gray, (5,5), 0)
```
#### Extracting edges
Edges can be defined as sudden changes in an image and they can encode just as much information as pixels. OpenCV again provides us with different functions to detect edges like- Sobel, Laplacian, and Canny. Here, we are using Canny as it optimal due to low error rate, well-defined edges, and accurate detection.
```
canny_edges = cv2.Canny(img_gray_blur, 10, 70)
``` 
#### Do an invert binarize the image
Thresholding is the act of converting an image to a binary form. There are different function s provided by OpenCV to apply a threshold on the image for eg: ``` cv2.THRESH_BINARY```, ```cv2.THRESH_BINARY_INV```, ```cv2.THRESH_BINARY_INV```, ```cv2.THRESH_TRUNC```, ```cv2.THRESH_TOZERO```, ```cv2.THRESH_TOZERO_INV```. Here I have used ```cv2.THRESH_BINARY_INV``` is a threshold calculated individually for each pixel. 
```
    ret, mask = cv2.threshold(canny_edges, 70, 255, cv2.THRESH_BINARY_INV)
    return mask
```    
#### Capturing the video
Getting real-time video input through webcam.
```    
cap=cv2.VideoCapture(0)
```
#### Displaying our live sketch
Your live black and white sketch will be displayed on your screen. This code will keep running unless you terminate it. Press 'ESC' to terminate and exit the window.
```
while True:
    ret, frame = cap.read()
    cv2.imshow('Our Live Sketcher', sketch(frame))
    
    k= cv2.waitKey(13)
    if k == 27:
        break
        
cap.release()
cv2.destroyAllWindows()
```
#### Complete Code
```
import cv2
import numpy as np

#Making a sketch generating function
def sketch(img):
    #Converting image into grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    #Clean up image using Gausian Blur
    img_gray_blur = cv2.GaussianBlur(img_gray, (5,5), 0)
    
    #Extracting edges
    canny_edges = cv2.Canny(img_gray_blur, 10, 70)
    
    #Do an invert binarize the image
    ret, mask = cv2.threshold(canny_edges, 70, 255, cv2.THRESH_BINARY_INV)
    return mask
cap=cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    cv2.imshow('Our Live Sketcher', sketch(frame))
    
    k= cv2.waitKey(13)
    if k == 27:
        break
        
cap.release()
cv2.destroyAllWindows()
```

#### Results
Voila! Your Live Sketch!<br>

<img src ="https://github.com/sharur7/engineering-portal/blob/new/content/blog/live-sketch-through-webcam/sketch.gif?raw=true" alt="sketch">
