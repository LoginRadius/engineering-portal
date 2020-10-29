---
title: "Image processing in medical healthcare"
date: "2020-10-29"
coverImage: "image.jpg"
author: "Sumindar Kaur Saini"
tags: ["Engineering","Image processing","Filters","Neural networks"]
description: "Learn about the different stages in image processing."

---


## Image processing in medical healthcare

Image processing is one of the core functionalities of machine and deep learning that is used in various fields such as computer vision,healthcare,military and related fields.

There are some operations that are performed on the image so that an enhanced image can be obtained for necessary operations. The rapid growth in the technologies is resulting in the enhancements in the signals and images and helping in research in almost all technical fields.
In the medical area, the image processing starts with the acquisition of dataset followed by the preprocessing,segmentation of the required region of interest and the classification of the dataset of images based on the training and testing of the dataset to improve the accuracy of the convolutional neural networks for the better results in organ operations and transplants.

### Processes in the lifeline of image processing are:
1. Acquisition of the dataset of images: There are various image acquisition tools as MRI and CT scanners to acquire images of valid aspect ratio.
2. Preprocess the image: The image is denoised using the filters and autoencoders so that the resultant image has proper pixel information for the next process.
3. Segmentation of region of interest: The region of interest (ROI) is the most important region that is required whereas the other region is discarded so that the images containing these regions can be fit into the training convolutional network for the classifier to identify the basic implementation for the classification.
4. Classification: The image according to the region of interest (ROI) is classified whether it consists of the tumor or not and whether the patient is having cancer or not.

## Preprocessing

The image needs to be denoised using various traditional filters as mean,median,gabor,anisotropic, bilateral,gaussian,non-local means, wavelet, wiener and deep learning based autoencoders
to remove the noise from the pixels.

## Segmentation

The region of interest (ROI) is evaluated using various deep learning architectures as ResNet, U-net, VGG-net and related models wherein on teh basis of the ground truth given by the MRI and CT scanners, the 
image is fed into the neural network and then progressively the other testing images are fed to calculate the accuracy,precision and recall values for the dataset.

## Classification

The image is classified as having cancer or not depending on the tumourous region using various deep learning approaches as InceptionV3, ResNet50, VGG-net and related models.The calculation of 
precision,sensitivity,specificity, true positive,true negative, false positive,false negative,accuracy depict the overall development of the models and helps in verifying the actual model for the classification

The images needed to be cropped for the segmentation and classification approaches hence it is necessary to automate the process of the  cropping for the images using masked RCNN based features.
These process are the most necessary steps in the image processing in the medical field that has made the performance of Computer aided diagnosis (CAD) better and more accurate.
