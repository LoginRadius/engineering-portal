---
title: "Encryption and Hashing"
date: "2018-12-24"
coverImage: "encryption-and-hashing.png"
author: "Andy Yeung"
tags: ["Encryption", "Hashing"]
---

Both encryption and hashing have significant uses in cryptology and other fields. One defining difference between them is that encryption is reversible, while hashing is irreversible. Because of this, encryption is often used for protecting the confidentiality of data. Only authorized people with the key should be able to access the data. On the other hand, hashing works well for verification; knowing the actual data is unnecessary, just whether or not the hashes are the same.

Encryption example: sending confidential documents to a co-worker through email.

  1. Encrypt confidential documents.
  2. Send encrypted documents & key to co-worker through different sources.
  3. Co-worker receives the documents & decrypts them using the key.

Hashing example: verifying user credentials for login.

  1. User registers and creates a password.
  2. Server hashes a password and stores it in a database.
  3. User logs in by submitting their password.
  4. Server hashes the submitted password, and compares it with the hashed password in the database.
  5. If hashes are the same, the user is authenticated.

## Encryption

Encryption is defined as conversion of electronic data into unreadable format by using encryption algorithms. This process of encoding the original data is called encryption. The data dump after encoding is called ciphertext.

The purpose of encryption is to protect stored data, by guaranteeing that the information cannot be understood by individuals other than the proposed recipient(s).

Encryption transforms information under another format such that just particular individual(s) could decrypt the conversion.

### DES

The Data Encryption Standard (DES) is a symmetric key algorithm that was widely used for many years. DES is a block cipher that uses a 64-bit block of plaintext and a 56-bit key in order to output a 64-bit block of ciphertext. The core of the algorithm is composed of a series of repetitive modules that transform the block of plaintext. Each module’s bit manipulation includes transposition, splitting, concatenation, and combination with the key. A security limitation is that the key can be brute forced, especially since in DES the key is a relatively short 56-bits (thus, 256possibilities). Because of the technological advances in computing, DES is now considered insecure.

### 3DES

Triple Data Encryption Standard (3DES/TDES) is a successor to DES, and runs the DES algorithm three times to each block of data. The standard keying option is to use 3 keys of 56-bits each, resulting in a final key of 3 x 56 = 168-bits. A security limitation is its vulnerability to meet-in-the-middle attacks, where essentially the attacker brute forces the encryption of the plaintext and decryption of the ciphertext at the same time. This allows the 168-bit key to be brute forced in 22 x 56iterations.

### AES

The Advanced Encryption Standard (AES) is a symmetric key algorithm trusted worldwide including the U.S government with classified material. AES is a block cipher which uses 128-bit blocks of plaintext, and three key options: 128-bit, 192-bit, and 256-bit. On a high-level, AES shares many fundamental concepts with DES; in particular, transforming a block of plaintext through repetition and bit manipulation. This include substitution, transposition, and bitwise operations. Currently, the only security limitation is its theoretical risk to brute force.

### RSA

The Rivest-Shamir-Adleman (RSA) is a asymmetric key algorithm based on the difficulty of prime factorization. The algorithm first generates a private and public key using 2 random, sufficiently large, and distinct prime numbers. Public keys can then be distributed to external parties. Plaintext encrypted using the public key and RSA formula can only be decrypted using the private key. Security limitations include weak key generation due to poor choices in prime numbers, and the possibility of breakthroughs such as quantum computers trivializing prime factorization.

### Blowfish

Blowfish is a symmetric key algorithm freely available in the public domain. As a block cipher, Blowfish processes 64-bit blocks of plaintext, and a key ranging from 32 to 448-bits. It is known to be fast compared to existing alternatives, except when changing keys. The algorithm involves multiple cycles of splitting the key into 2 subarrays, substituting bits, and performing a series of bitwise operations with parts of the plaintext block. A security limitation is its relatively small block size of 64-bits makes it vulnerable to birthday attacks, which is based on probability theory.

### Twofish

Twofish is a symmetric key algorithm freely available in the public domain. Twofish is a block cipher with 128-bit blocks of plaintext, and up to a 256-bit key. The designer of Blowfish also worked on Twofish. Similar to Blowfish, Twofish is a fast cipher, and shares some of the same concepts and structure in transforming a block of plaintext. Currently, the only security limitation is its theoretical risk to brute force.

### Skipjack

Skipjack is a symmetric key algorithm with 64-bit blocks of plaintext and 80-bit key. It was designed by the NSA with the purpose of encrypting voice transmission, and later declassified for public knowledge. The algorithm is based off a technique of repeatedly splitting the plaintext block and performing bitwise operations with subkeys. Currently, the only security limitation is its theoretical risk to brute force, especially due to its relatively short key.

### Use Cases

Symmetric key encryption

- Enforcing confidentiality of data: encryption and decryption of plaintext.
- E.g. protecting top secret documents.

Asymmetric key encryption

- Key exchange: encrypt a symmetric key which is then used for encrypting and decrypting plaintext.
- Authentication: a single private key and the distribution of multiple public keys.
- Less ideal for encrypting/decrypting plaintext compared to symmetric encryption due to being slower from high overhead.
- E.g. digital signatures; protocols such as SSH, SSL.

## Hashing

Hashing is a process of taking a big block of data and reducing it to smaller blocks of data in a specific order by using hashing functions. Cryptographic hashes are irreversible.

- E.g. One way password management, chain management.

Some properties of hashed data:

- Same inputs will always produce the same outputs.
- Different inputs should not produce the same output (otherwise, a hash collision occurs).
- Input should not be derived from output.
- Small changes to the input should drastically change the output.

The output of a hashing algorithm is a hashed value, also known as a message digest. Analogous to a fingerprint.

### MD4

The Message Digest 4 (MD4) algorithm takes an input text of arbitrary length, and outputs a 128-bit digest in the form of a 32-digit hexadecimal number. The algorithm works by first padding the text to a certain length, and then appending to it a 64-bit binary representation of the text. Next, the text is processed in blocks of 512-bits, with each block undergoing three rounds of bit manipulation. MD4 is insecure, as a collision attack was found. This is where two input texts produce the same output digest (a hash collision), thus allowing for issues such as forging digital signatures.

### MD5

The Message Digest 5 (MD5) algorithm is similar to MD4, except each block is processed in four more complex rounds. MD5 is also considered insecure, as a collision attack was found. However, MD5 is still often used in the industry for cases which do not require collision resistance, such as password hashing. Better solutions exists, but tradition and lack of modern security expertise drives the popularity of MD5.

### SHA-1

The Secure Hash Algorithm 1 (SHA-1) takes an input text of arbitrary length, and outputs a 160-bit digest, typically in the form of a 40-digit hexadecimal number. The algorithm performs padding, and 80 rounds of text manipulation such as bitwise shifting and XOR operations. SHA-1 is considered insecure, as a collision attack was found.

### SHA-2

The Secure Hash Algorithm 2 (SHA-2) is a family of successors to SHA-1. This includes SHA-224, SHA-256, SHA-384, and SHA-512. Digest sizes range from 224 to 512-bits, increasing its difficulty to brute force. The algorithm consists of padding, and 64 or 80 rounds of bit manipulation. A security limitation is its vulnerability to length extension attacks. When the algorithm is finished, this attack takes advantage of the internal state of the machine in order to keep processing new text. As a result, it is possible to construct a new digest which is an extension of the original digest.

### HMAC-SHA1

Hash-based Message Authentication Code SHA-1 (HMAC-SHA1) uses the SHA-1 hashing algorithm and a key in order to generate a HMAC. Due to the usage of a key, there is less chance of a hash collision, but the key is vulnerable to discovery through brute force. Additionally, HMAC is vulnerable to length extension attacks.

### HMAC-SHA256

Hash-based Message Authentication Code SHA-256 (HMAC-SHA256) uses the SHA-256 hashing algorithm and a key in order to generate a HMAC. Security concerns include the key being brute forced, and length extension attacks.

### PBKDF2

Password-Based Key Derivation Function 2 (PBKDF2) is a hashing algorithm designed to be used for passwords. By design, hashing using PBKDF2 is slow, making it much more difficult to brute force a password. This is because the algorithm takes in a random salt, as well as the desired number of times to hash the password. Other inputs include the desired length of the output, and the hashing function used. Typically, the recommended number of iterations range in the tens of thousands, but depends on the hashing function and capabilities of the application. However, brute force still remains a threat, especially with weakly chosen salts and a small number of iterations.

### Use Cases

Authentication

- Storing and comparing hashed passwords in a database.

Message integrity

- A person sends a message, as well as its corresponding hash (likely through a different source). The receiver can hash the message, and if the hashes are different then the message was compromised.

Identification

- Database indexing.

# Encoding and Cryptography

### Encoding

The process of transforming the data by using an algorithm (that is publicly available) into another format. 

The motivation behind encoding is to change information with the goal that it can be appropriately (and securely) fed to a different system. The main objective is not to keep data secret, but instead to guarantee that it is ready to be legitimately used.

### Symmetric key cryptography

The process of using the same key for encrypting and decrypting the text is called symmetric key cryptography.

### Asymmetric key cryptography

The process of using a public key for encryption and a private key for decryption is called asymmetric key cryptography.

### Stream cipher

The process of encrypting or decrypting the text bit by bit using a symmetric key is called stream cipher. The stream cipher process is high speed and requires low hardware complexity.

### Block cipher

The process of encrypting or decrypting the text block by block using a symmetric key is called block cipher. Block ciphers are the functions that take an input message and a key in order to create a new, encrypted ciphertext. Block cipher are used with Symmetric key encryption.

Block ciphers are invertible and efficiently computable. E.g. DES, AES, BlowFish etc.

### Cryptographic Salt

Salts are an additional piece of data used in hashing algorithms, typically for passwords. They help protect against brute force attacks, by adding complexity to the hashes. As a result, salts increase the time taken to brute force a single hash, and deter against optimizations such as dictionaries and precomputed tables.
