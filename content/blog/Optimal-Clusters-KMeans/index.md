---
title: Optimal clusters for KMeans Algorithm
date: "2020-10-01"
coverImage: "cover3.png"
author: "Neeraj Ap"
tag: Machine learning
---

Before we get into details of finding out optimal clusters let's first see what is KMeans clustering algorithm and some basics!!


## Unsupervised learning :

Unsupervised Learning is a machine learning technique in which the users do not need to supervise the model. Instead, it allows the model to work on its own to discover patterns and information that was previously undetected. It mainly deals with the unlabelled data.
Unsupervised Learning Algorithms allow users to perform more complex processing tasks compared to supervised learning. Although, unsupervised learning can be more unpredictable compared with other natural learning methods. Unsupervised learning algorithms include clustering, anomaly detection, neural networks, etc.
Clustering is a part of unsupervised learning

## What is Clustering?

Let’s kick things off with a simple example. A bank wants to give credit card offers to its customers. Currently, they look at the details of each customer and based on this information, decide which offer should be given to which customer.

Now, the bank can potentially have millions of customers. Does it make sense to look at the details of each customer separately and then make a decision? Certainly not! It is a manual process and will take a huge amount of time.

```Clustering is the process of dividing the entire data into groups (also known as clusters) based on the patterns in the data```

## What is KMeans clustering alogrithm?

The K-means algorithm in data mining starts with a first group of randomly selected centroids, which are used as the beginning points for every cluster, and then performs iterative (repetitive) calculations to optimize the positions of the centroids
It halts creating and optimizing clusters when either:
The centroids have stabilized — there is no change in their values because the clustering has been successful.
The defined number of iterations has been achieved.

## Intial Imports :
```python

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
%matplotlib inline

```

## Method :

Now let's discuss the method behind finding out the right number of clusters on a K-Means clustering algorithm.
So we'll learn how to decide what number of clusters to input into your K-Means algorithm.
Here we've got a data science problem.
We've got only two variables, x and y coordinates

Now, if we run the K means clustering algorithm on this dataset with three clusters or with K pre-determine the clusters to be three, then the result will look something like this.

![intial](https://github.com/NEERAJAP2001/engineering-portal/tree/master/content/blog/Optimal-Clusters-KMeans/intial.png)


We need a specific metric we need a way to understand or evaluate how a certain number of clusters performs compared to a different number of clusters, and preferably, that metric should be quantifiable.

So what kind of metric can we impose upon our clustering algorithm that will tell us something about the final result?
And there is such a metric called the within-cluster sum of squares. (WCSS)


![Wcss](https://github.com/NEERAJAP2001/engineering-portal/tree/master/content/blog/Optimal-Clusters-KMeans/Wcss.png )


So you can see here that it jump from 8000 down to 3000, that's a massive change of 5000 let's just call them units 5000 units and then from 3000 as we increase the number of the close from two to 3, they jump from 3000 to 1000.

Again quite a large drop And then from three to four what's going to happen is going to jump from 1000 to maybe eight hundred and from 800 to 600, 600 to 500 and so on so as you can see the first two improvements or first two changes from one cluster to two from two to three created some huge jumps or considerable drops in the WTS going forward The WCR says drops not substantially. And this is our hint at selecting the optimum optimal number of clusters, and the method we're going to use is the elbow method, and it is actually very visual. All you have to do is look at your chart and look for that change, or that's kind of like it does look like an ELBOW.


Look for that elbow in your chart where the drop goes from being quite substantial to being not as significant not as proven is not as great, and therefore, that point in your chart will be the optimal number of clusters.


In this case, it is indeed three clusters

That is the optimal number. And as you can imagine, this method is entirely arbitrary.
Sometimes, the situations are not as pronounced as the elbow might not be as evident as in this case, and therefore, somebody might pick one number of clusters. Someone else might come along and select a different number.

## CODE :

```python

from sklearn.cluster import KMeans
wcss = []

for i in range(1, 11):

  kmeans = KMeans(n_clusters = i, init = 'k-means++', random_state = 42)

  kmeans.fit(X)
  
  wcss.append(kmeans.inertia_)

plt.plot(range(1, 11), wcss)

plt.title('The Elbow Method')

plt.xlabel('Number of clusters')

plt.ylabel('WCSS')

plt.show()
```
