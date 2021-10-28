---
title: "What is Homomorphic Encryption?"
date: "2021-28-10"
coverImage: "homomorphicencryption.jpg"
author: "Avik Shokeen"
tags: ["Cryptography", "Homomorphic Encryption"]
description: "Basic Introduction of Homomorphic Encryption"
--- 

##Homomorphic encryption- it is simply an encryption scheme where one can combine encrypted text and perform computations on the original plane text in encrypted 
form without knowing the actual encryption key. 

The following are the properties of encryption:

**Correctness**- this means that applying decryption on cipher text which we got after applying some encryption on the plain text using the keys will always result
in the same plane text as before.

**Semantic security**- given to encrypted ciphertexts ct0, ct1, that corresponds to the encryption of plain text pt0 and pt1 respectively, we cannot distinguish which
Ciphertext is encryption of ct0. It basically means the cipher text looks random and it does not give any information about the original plain text.

Now if the encrypted ciphertext looks random, does it mean start they are totally useless unless we don't have the corresponding decryption key?

Luckily and unluckily the answer is no.

Some encryption schemes actually show amazing properties. Like for example if we are having in corruption of number 1 and 2 although we have no information of 
what the plain text was but we can simply add these two ciphertext together to obtain the ciphertext for 1+2 i.e. 3.
This property is homomorphism where the algebraic brick relationship on the plain text is preserved in the ciphertext and the encryption schemes that exhibit this
Property are called homomorphic encryption schemes.

When we can fully add ciphertext together and can obtain any linear combination of original plain text in encrypted form, then it is said to be additivly 
Homomorphic encryption scheme.
In the similar way, when we can freely multiply ciphertext together and obtain any product of original plain text, then it is called multiplicative homomorphic
encryption scheme.

Example- say we are having a group of people who are voting on something like whether they would like to go for a movie or not. For the poll process, everyone
Well submit their choice 0/1 to the host and then the host will simply add everyone's share together and will declare the result accordingly.
But the problem with this encryption scheme is that this polling process is not anonymous. By just looking at the vote the host can know who is coming and who is
Not coming.
We can make this anonymous easily with the help of additive homomorphic encryption. The host will use a key generation algorithm to generate a pair of encryption 
and decryption key and then he will distribute the encryption key to the public. Now everyone will encrypt their choices under encryption key and will send their 
ciphertext to the host. The host will add up all the encrypted ciphertext and will obtain one ciphertext and he will finally ran a decryption algorithm on cipher 
text to get the results of the poll.

Homomorphic encryption allows us to do secure delegated communication meaning that we can delegate some third party to compute on the secret input we were having
By encrypting our inputs using homomorphic encryption schemes and then the third party can apply whatever computation they want to directly on the ciphertext
And can obtain the result by decrypting the ciphertext.

Types of homomorphic encryption schemes:

**Somewhat homomorphic encryption**- example- we have an homomorphic encryption scheme where one can perform unlimited additions but only one level of multiplication.

**Level fully homomorphic**- as the functionality goes deeper, the noise blows up and destroys the observable state of the ciphertext and we can no longer recover
The original plain text. So these schemes allow only certain level of operations to be performed on them.

**Fully homomorphic encryption**- it enables us to perform secure delegated computation.

Now let us have a look on some of the algorithms and check whether they are fully homomorphic or not.

RSA- it works on exponentiating a message in a finite cyclic field. By simply multiplying to ciphertext together, we can obtain the encryption of product of
original plain text implying that RSA is multiplicative homomorphic. But we cannot find additive homomorphic encryption properties within RSA so it is a partially 
homomorphic encryption algorithm.

