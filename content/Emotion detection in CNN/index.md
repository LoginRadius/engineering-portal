---
title: "Emotion detection using CNN"
date: "2021-10-01"
coverImage: "cover.jpg"
author: Mayank
tags: ["AI", "ML"]
description: "We can use Deep learning libraries to detect real time emotion detection"
---
# EMOTION DETECTION USING CNN!

![image](https://user-images.githubusercontent.com/56837137/135588031-e504c797-271e-4c27-94e9-b0e154e37090.png)
<br>

Emotion Recognition is an important area of work to improve the interaction between human and machine. Complexity of emotion makes the acquisition task more difficult. More recently, inception to the idea of multimodal emotion recognition has increased the accuracy rate of the detection of the machine. Moreover, deep learning technique with neural network extended the success ratio of machine in respect of emotion recognition. Recent works with deep learning technique has been performed with different kinds of input of human behavior such as facial expressions and body gestures. Still many aspects in this area to work on to improve and make a robust system will detect and classify emotions more accurately. In this paper, we tried to explore the relevant significant works, their techniques, and the effectiveness of the methods and the scope of the improvement of the results. 
<br>
![image](https://user-images.githubusercontent.com/56837137/135587725-3fb714a1-2055-4830-acc5-bfc22e0c9c94.png)


Deep learning usually requires big data, with respect to both volume and variety. However, most remote sensing applications only have limited training data, of which a small subset is labeled.

Having analyzed both the current state of machine learning education as well as the skills needed to create important applied machine learning systems, we now comment on the gap between the two sides. Based on what classes cover and what applications require,  it is clear that students are not taught enough about how to properly manage the data they are working with.

A static approach using extracted features and emotion recognition using machine learning is used in this work. The focus is on extracting features using python and image processing libraries and using machine learning algorithms for prediction. Our implementation is divided into three parts. The first part is image pre-processing and face detection. For face detection, inbuilt methods available in dlib library are used. Once the face is detected, the region of interest and important facial features are extracted from it. There are various features which can be used for emotion detection. In this work, the focus is on facial points around the eyes, mouth.

### We can generalize the emotion detection steps as follows: 
1) Dataset preprocessing 
2) Face detection 
3) Feature extraction 
4) Classification based on the features

With rapid advancements in Artificial intelligence, the use cases and applications you can build using AI are increasing rapidly.

For future work, a more robust face detection algorithm coupled with some good features can be researched to improve the results. We focused on only some distances and areas, there can be many more such interesting features on the face which can be statistically calculated and used for training the algorithm. Also, not all the features help to improve the accuracy, some maybe not helpful with the other features. Feature selection and reduction technique can be implemented on the created feature to improve the accuracy of the dataset. We can experiment with facial action coding system or feature descriptors as features or a combination of both of them. Also, we can experiment with different datasets amongst different races. This will give us an idea if the approach is similar for all kinds of faces or if some other features should be extracted to identify the emotion. Applications such as drowsiness detection amongst drivers  can be developed using feature selection and cascading different algorithms together. Algorithms like logistic regression, linear discriminant analysis and random forest classifier can be fine-tuned to achieve good accuracy and results. Also, metrics such as cross-validation score, recall and f1 score can be used to define the correctness of model and the model can be improved based on these metric results. We can derive different types of features from the image and normalize it in vector form. We can employ various types of techniques to identify the emotion like calculating the ellipses formed on the face or the angles between different parts like eyes, mouth etc.

<br>

![image](https://user-images.githubusercontent.com/56837137/135587827-0c239392-3322-4a44-9c25-1046dd1ab7ec.png)
<br>
# EXPECTED OUTCOME
Human emotions can be classified as: fear, contempt, disgust, anger, surprise, sad, happy and neutral using our model. These emotions are very subtle. Facial muscle contortions are very minimal and detecting these differences can be very challenging as even a small difference results in different expressions. Also, expressions of different or even the same people might vary for the same emotion, as emotions are hugely context dependent. While we can focus on only those areas of the face which display a maximum of emotions like around the mouth and eyes, how we 2 extract these gestures and categorize them is still an important question. Neural networks and machine learning have been used for these tasks and have obtained good results. Machine learning algorithms have proven to be very useful in pattern recognition and classification. The most important aspects for any machine learning algorithm are the features. In this paper we will see how the features are extracted and modified for algorithms like Support Vector Machines. We will compare algorithms and the feature extraction techniques from different papers. The human emotion dataset can be a very good example to study the robustness and nature of classification algorithms and how they perform for different types of dataset. Usually before extraction of features for emotion detection, face detection algorithms are applied on the image or the captured

![image](https://user-images.githubusercontent.com/56837137/135587855-97cd2731-63ff-4f5a-99e6-04faca2d5c02.png)

