---
title: Create a webapp using opencv and streamlit
date: "2021-10-23"
coverImage: "coverimage.png"
author: "Dingu Sagar"
tags: ["OpenCV","Webapp","Streamlit"]
description: "Learn how to build a quick webapp using streamlit in python and integrating it with an OpenCV project"
---
# Create a webapp using OpenCV and Streamlit in python

In this blog, we are gonna see how easy it is to convert an OpenCV project into a webapp that you can showcase it to the public. We are gonna use a library called streamlit. Using streamlit we can easily build a web user interface in python. Yes, you heard it right, no html, css or javascript required. Just pure python! :blush:

## Before You Get Started
**This tutorial assumes you have:**
*   You are comfortable with using basic [OpenCV](https://opencv.org/) functions.
*   You are comfortable with coding in python. 

So let's get started. 
### First let's install the dependencies

Let's install OpenCV and stremlit using pip. We would also need Pillow, another image library.

```py
pip install opencv-python streamlit Pillow
```

## Now let's review a small OpenCV project

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

Here we have 3 image processing functions that accept an image, do some processing on it, and return the processed image. 
1. `brighten_image` - increases the brightness of the image.
2. `blur_image` - applies a blur effect on the image.
3. `enhance_details` - apply an effect to enhance the details of the image.

These functions make use of the OpenCV functions to do the actual processing. (for eg : cv2.GaussianBlur etc). I am not explaining in-depth about them and the various parameters that they accept since this tutorial is more focused on the integration of OpenCV with Streamlit. However, feel free to jump to the OpenCV documentation or google them to know more details about them. 

This program reads the image from the filepath using cv2.imread(), after that it passes the image to these functions that do the processing, finally the image is displayed using cv2.imshow(). cv2.waitKey(0) is to wait till the user presses any key after which the program is exited. 



## Let's learn some basics of Streamlit.

Streamlit offers some common UI components out of the box that we can place on our webpage. This makes it super easy to code up something real quick. The way streamlit works is it reruns the python script every time there is a user interaction on the components. They have some caching and optimizations, but this simple design makes it super easy to build interactive webpages using Streamlit.

> As someone said “Talk is cheap. Show me the code.” So let's see some code.

Open an editor and copy-paste this to demo-app.py
```py
import streamlit as st

st.title("OpenCV Demo App")
st.subheader("This app allows you to play with Image filters!")
st.text("We use OpenCV and Streamlit for this demo")
if st.checkbox("Main Checkbox"):
    st.text("Check Box Active")

slider_value = st.slider("Slider", min_value=0.5, max_value=3.5)
st.text(f"Slider value is {slider_value}")

st.sidebar.text("text on side panel")
st.sidebar.checkbox("Side Panel Checkbox")
```
To start a streamlit app, simply run the command `streamlit run` with the filename, for eg.
`streamlit run demo-app.py`

You should see something like this as output. 
```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.1.8:8501
```
Click on this link to open the streamlit app in your browser. you will see something like this. 

![Streamlit basic Screenshot](streamlit-1.png "Streamlit Basic Demo")

So if you see the code, it's very straightforward. We import streamlit as st. The default is a simple linear layout where we can place components on the webpage in a sequential manner. 
For eg `st.title() , st.checkbox(), st.slider()` places the these components on the main page in the order in which they are called.. 

Streamli also offers a side panel. In order to place components in the sidepanel, we can do it like this. 
`st.sidebar.title() , st.sidebar.checkbox(), st.sidebar.slider()`

There are other components also apart from these, you can explore more in the [docs](https://docs.streamlit.io/library/get-started).

## Time to integrate Streamlit to our OpenCV project.

Now let's integrate our OpenCV program to Streamlit. Here is the complete code.

```py
import cv2
import streamlit as st
import numpy as np
from PIL import Image


def brighten_image(image, amount):
    img_bright = cv2.convertScaleAbs(image, beta=amount)
    return img_bright


def blur_image(image, amount):
    blur_img = cv2.GaussianBlur(image, (11, 11), amount)
    return blur_img


def enhance_details(img):
    hdr = cv2.detailEnhance(img, sigma_s=12, sigma_r=0.15)
    return hdr


def main_loop():
    st.title("OpenCV Demo App")
    st.subheader("This app allows you to play with Image filters!")
    st.text("We use OpenCV and Streamlit for this demo")

    blur_rate = st.sidebar.slider("Blurring", min_value=0.5, max_value=3.5)
    brightness_amount = st.sidebar.slider("Brightness", min_value=-50, max_value=50, value=0)
    apply_enhancement_filter = st.sidebar.checkbox('Enhance Details')

    image_file = st.file_uploader("Upload Your Image", type=['jpg', 'png', 'jpeg'])
    if not image_file:
        return None

    original_image = Image.open(image_file)
    original_image = np.array(original_image)

    processed_image = blur_image(original_image, blur_rate)
    processed_image = brighten_image(processed_image, brightness_amount)

    if apply_enhancement_filter:
        processed_image = enhance_details(processed_image)

    st.text("Original Image vs Processed Image")
    st.image([original_image, processed_image])


if __name__ == '__main__':
    main_loop()
```

**Lets Understand what is happening here.**

Apart from the image processing functions, we have a main_loop function where we add the logic for our webpage.

Nothing fancy about `st.title(), st.subheader(), st.text()`, they just print some text in different sizes.

Next, we have two sliders to get the amount by which we need to apply the blur and brightness filters.

Note that `st.sidebar` places these components in the sidebar. 
`slider()` takes in some arguments - name of the slider, min value, max value, and the default value of the slider. This function returns the current value of the slider.

Next, we have a checkbox component.
`checkbox()` returns True if the checkbox is checked else it would return False.

Next, we place a file_uploader component, through which users can upload files of different types specified by the `type` parameter. We restrict it to the image file types for our usecase.  

When the program starts, there are no files selected by the user. At this time, this component returns None. When a file is uploaded from the UI, this component returns the path of the file. 

This is why we have an if-check on the return value of this component. If there are no files selected, we can skip the rest of the program by returning from the main_loop() function.
Remember the entire program is rerun whenever there is user interaction on any components of the page. So when a user uploads a file, the whole program is executed again and this if-check fails so that the rest of the program for image processing logic gets executed.  

We use `Pillow.Image()` to open this file, then we convert it to a numpy array using `np.array()` so that OpenCV can process it.

Now we pass it to the different processing functions along with the `amount` parameter. 

Finally we display the original image and processed image using the `st.image()` component.

Our webapp is ready! :rocket: To start the app, simply run
```
streamlit run demo-app.py
```
Now we can play with the filters. Of course, these are some basic filters, but we can definitely extend it to more interesting filters like cartoonify filters, etc using the rich features of OpenCV.

![Streamlit final Screenshot](streamlit-final.png "Streamlit OpenCV Webapp")


## This is all working good in my computer. But how do I make it available for the public to see.

To do that, we need to host this program somewhere, There are different hosting providers for complex projects. But for our hobby-project, do we have any simple solution? 

Looks like there is!
We can host our streamlit application in the streamlit-cloud for free. You can host upto 3 apps in an account for free, they get upto 1GB of memory.
Checkout [this tutorial](https://docs.streamlit.io/streamlit-cloud/community) from the community to host this to streamlit-cloud.

**That brings us to the end of this tutorial, Hope you found it useful.**
