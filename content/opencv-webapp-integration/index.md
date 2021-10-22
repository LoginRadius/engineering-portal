---
title: Create a webapp using opencv and streamlit
date: "2020-06-11"
coverImage: "google_golang.png"
author: "Puneet Singh"
tags: ["Go","SocialLogin","OAuth"]
description: "Learn how to implement Google OAuth2 Authentication in Golang using Goath"
---

In this blog, we are gonna see how easy it is to convert an OpenCV project into a webapp that you can showcase it to the public. We are gonna use a library called streamlit. Using streamlit we can easily build a web user interface using the beautiful language called python. Yes, you heard it right, no html, css, javascript required. Just pure python!.

## Before You Get Started
This tutorial assumes you have:

*   Basic knowlege of what OpenCV is.
*   Basic knowledge about python. 

So lets get started. 
### Step 1: Install necessary packages

Lets install OpenCV and stremlit using pip. 

```py
pip install opencv-python streamlit
```

### Step 2: Lets review a small OpenCV project

```py
import cv2

def brighten_image(image, amount):
    img_bright = cv2.convertScaleAbs(image, beta=amount)
    return img_bright

def blur_image(image, amount):
    img = cv2.cvtColor(image, 1)
    blur_img = cv2.GaussianBlur(img, (11, 11), amount)
    return blur_img

def enhance_details(img):
    hdr = cv2.detailEnhance(img, sigma_s=12, sigma_r=0.15)
    return hdr

img = cv2.imread(filename='tony_stark.jpg')

# do some cool image processing stuffs
img = enhance_details(img)
img = brighten_image(img, amount=25)
img = blur_image(img, amount=0.2)

cv2.imshow('Tony Stark', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

Here we have 3 image processing funtions that accept an image, do some processing on it and return the processed image. 
1. `brighten_image` - increases the brightness of the image.
2. `blur_image` - applies a blur effect on the image.
3. `enhance_details` - apply an effect to enhance the details of the image.

These functions make use of the OpenCV fuctions to do the actual processing. (for eg : cv2.GaussianBlur etc). I am not explaning in depth about them and various parameters that they accept, since this tutorial is more focused on the integration of OpenCV with Streamlit. However feel free to jump to the OpenCV documentation or google them to know more details about them. 


### Step 3: Streamlit Integration

