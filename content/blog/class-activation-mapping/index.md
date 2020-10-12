---
title: "Class Activation Mapping in Deep Learning"
date: "2020-10-10"
coverImage: "Cover.png"
author: "Ankit Choraria"
tags: ["Explainable AI", "Deep Learning", "CNN", "Machine Learning"]
description: "Learn about the importance of the explainability of deep learning models and Class Activation Map Technique"
---

### Introduction

#### Learning Deep Features for Discriminative Localization:
Machine learning and Deep learning are gaining traction in today’s world and are making significant and unimaginable progress in almost every industry. However, with the increase in complexity and accuracy of these algorithms, the interpretability of these is at stake- especially the deep learning models which take in more than a million parameters for complex, convoluted models. Class Activation Mapping (CAM) is one such technique which helps us in enhancing the interpretability of such complex models.

### Class Activation Mapping (CAMs)

For a particular class (or category), Class activation mapping basically indicates the discriminative region of the image, which influenced the deep learning model to make the decision. The architecture is very similar to a convolutional neural network. It comprises several convolution layers, with the layer just before the final output performing Global Average Pooling. The features that are obtained are fed into the fully connected neural network layer governed by the softmax activation function and thus, output us the required probabilities. The importance of the weights with respect to a category can be found out by projecting back the weights onto the last convolution layer’s feature map. 

### Global Average Pooling (GAP) vs Global Max Pooling (GMP)

The Global Average Pooling (GAP) is preferred over Global Max Pooling (GMP) because GAP helps us in identifying the full extent of the object as compared to the GMP layer, which identifies one discriminative part. In Global Average Pooling, an average is taken across all the activation maps which help us to find all the possible discriminative regions present in them. Contrary to this, the Global Max Pooling method just considers the most discriminative region. Hence, Global Average Pooling showed better results than Global Max Pooling.

### Mathematical equations governing CAMs

Let `f(x,y)` be the activation map of unit `k` in the last convolutional layer at spatial location `(x,y)`.

_The result of GAP is represented as:-_

```\Large F_{k}= \sum_{x,y}f_{k}(x,y)```

_For a class c, an input to the softmax will be:-_

```\Large S_{c}= \sum_{k}w^{c}_{k}F_{k}```

_Output of Softmax layer:-_

```\Large P_{c}=\frac{e^{S_{c}}}{\sum_{c}e^{S_{c}}}```

Thus, **the final equation** for an activation map of class c would be:- 

```\Large M_{c}(x,y)=\sum_{k}w^{c}_{k}f_{k}(x,y)```
  

### Weakly-supervised Object Localization

The localization ability of the CAM method was put to the test when they were trained on the ILSVRC 2014 benchmark dataset. The CAM technique was used on popular CNN models like AlexNet, VGGNet and GoogLeNet by tweaking their models and fitting a GAP layer (similar to the CAM architecture) towards the end. This modified model was giving astounding results with the GAP layer as compared to their traditional architecture in terms of discriminative localization.

### Deep Features for Generic Localization

After applying a CAM architecture to fine-grained recognition and pattern discovery (like discovering informative objects in the scenes, concept localization in weakly labelled images, weakly supervised text detector and interpreting visual question answering), we can infer that feature capturing and localization was far more accurate in the CAM based GAP layer architecture, as the complete extent of the features were captured.
Visualizing Class-specific Units:-
When we use the GAP layer and the ranked softmax weight, we can directly visualize the units, which are the most discriminative for a particular class. Thus, CNN actually learns a bag of words, where each word is a discriminative class-specific unit. A combination of these class-specific units helps to guide CNNs in classifying each image.

### Conclusion:

CAMs are a great technique to interpret the information from the CNN models. However, the disadvantage of CAMs is that they can be noisy, and there might be some loss of spatial information. Hence, the Grad-CAM architecture and the Score-CAM architecture were built upon the CAM architecture to improve the accuracy, feature capturing and retain precise spatial information.
