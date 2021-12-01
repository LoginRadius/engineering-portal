---
title: "Password Security"
date: "2015-05-14"
coverImage: "password-security.png"
author: "Govind Malviya"
tags: ["Security", "Password"]
---

When we start thinking about authentication in any kind of software (it can be web, mobile, desktop, or even console), the first thing that comes to mind is username/password, this is an older but still effective technique to protect and identify users. Securing these passwords is not an easy task we require better techniques to secure these passwords from attackers. Generally, passwords stored in databases, so we can secure passwords by traditional techniques to prevent access to databases like firewalls, role definitions, etc. but just to prevent database intrusions is not a fully secured way, we require further password protections by converting them into non-readable (encrypted) formats. To understand encrypting passwords we have to understand plain text passwords and how these kinds of passwords are insecure.

**Let's start our journey**

# Plain text passwords [Never Store Plain text Passwords]
Plain text passwords are stored directly in a database without any encryption. These passwords are very insecure because:
    - If someone hacks your database he can access any account and do anything possible after login.
    - Developers or employees who are working on a project commonly misuse the password and spread these passwords to other people for misuse.
As a hard and fast rule plain text passwords should NOT be accepted in any case or used for any project or product.

# Encrypted passwords [Not recommended]

Encryption helps us by protecting data from hackers. In network communication, the same techniques can be used in saving passwords. Any encryption algorithm can be used to protect passwords. So on registration plain text passwords are encrypted and saved to your database.

    ```
    EncryptedPassword = Encrypt ( Password, Key);
    ```

Get this encrypted password from database then de-crypt and match
    ```
    Password = Decrypt ( EncryptedPasword, Key);
    ```

Match with user entered password.

But passwords will still not be fully secured because encrypted data can be always be de-crypted with the encryption key if someone get the key then they can de-crypt your password.

# Hashed passwords [Recommended]

Hashing is a method of encryption to get original data from hash. Hashing algorithms are used in network data communications. The encryption encrypts the data but hashing protects tampering with the encrypted data. Hashing algorithms are widely used in securing passwords.

In case of hashing validation of password performed refer to the following pseudo-code:

On registration

```
PasswordHash = HASH(Password);
```
Some of the hashing algorithms support salts(a set of characters that is appended to your hash) like HMAC

  ```
  PasswordHash = HASH(Password, salt);
  ```

On login the same process happens, get hash from users entered password

  ```
    inputPasswordHash = HASH(inputPassword);
  ```

And compare with the saved password

  ```
    If(SavedPassworHash == inputPasswordHash){

    //user get login

    }
  ```

For making a strong hash from non-salted hash algorithms, salt is appended or prepended to your password string. Appending and prepending also has two kinds of implementations one is a universal salt and the second is per password random salt, let us understand one by one.

**Universal salt:** In this implementation every password has one salt.

- Universal salt prepend

  ```
    PasswordHash = Hash(Salt+Password);
  ```

- Universal salt append

  ```
    PasswordHash = Hash(Password+Salt);
  ```
**Per password salt:** In this implementation every password has it's own random salt, but the question is how we preserve salt for a password? Answer is the salt is appended with password by a separator. And on login split that saved string by separator and get hashed password and salt.

On registration when we save password

  ```
    Salt = RandomString();
    PasswordHashWithSalt = Hash(Password+Salt) + ":" + Salt;
  ```
On login when compare password : first split salt and password hash

  ```
    StringArray = Split(PasswordHashWithSalt , ":" );
    Salt = StringArray\[1\];
    PasswordHash = StringArray\[0\];
  ```

Than get hash of user entered password by salt

```
inputPasswordHash = Hash(inputPassword + Salt);
```
Then compare both password hash

```
If(PasswordHash == inputPasswordHash){

//user get login

}
```

**Some popular encryption methods:** Most of people use following algorithms for hashing passwords, explaining all algorithms is out of scope of this blog. I am adding reference URLs for more reading. I am adding only strong hashing algorithms 

1. [PBKDF2](http://en.wikipedia.org/wiki/PBKDF2)
2. [bcrypt](http://en.wikipedia.org/wiki/Bcrypt)
3. [scrypt](http://www.tarsnap.com/scrypt.html)
4. [Argon2](https://en.wikipedia.org/wiki/Argon2)

## Hash cracking techniques

**Brute force:** It is the most popular password cracking technique, in this loop every combination of numbers and alphabets are tried. Suppose one system have password minimum length is 6 digits then

000000, 000001,000002……………….111111,111112……..AAAAAA etc.

In any case user have set simple password like 123123, it will be cracked simply. How to prevent this kind of scenarios

1. Enforce to user to use at-least one number, one symbols, one capital letter and one small letter in password.
2. On login form if someone entered more than three time wrong password for one username then ask for human verification by captcha, it will be prevented by automatic brute force password generator.

**Dictionary attacks:**

In crypt-analysis and computer security, a dictionary attack is a technique for defeating a cipher or authentication mechanism by trying to determine its decryption key or pass-phrase by trying hundreds or sometimes millions of likely possibilities, such as words in a dictionary. ([Wikipedia](http://en.wikipedia.org/wiki/Dictionary_attack))

it is just extended version of brute force attack, in this attacker attack by dictionary words, most of time people set their password as meaningful name to keep easily in mind. And in this attack.

**Rainbow tables**

A rainbow table is a precomputed table for reversing cryptographic hash functions, usually for cracking password hashes. Tables are usually used in recovering a plain text password up to a certain length consisting of a limited set of characters. It is a practical example of a space/time trade-off, using less computer processing time and more storage than a brute-force attack which calculates a hash on every attempt, but more processing time and less storage than a simple look-up table with one entry per hash. Use of a key derivation function that employs a salt makes this attack unfeasible. ([Wikipedia](http://en.wikipedia.org/wiki/Rainbow_table))

## Migrating Hashing algorithm 
Sometimes people realize that their Hashing algorithm is weak so they think to migrate system to one algorithm to another but hashing algorithms are one way so getting original password is not possible so the question becomes how to make this possible. There are two ways to do this.

**Reset all passwords:** In this approach just migrate your algorithm from one to another but keep password hash same, but password will not be matched because hash of one algorithm doesn't match with hash of another algorithm, so email to user about it that our system has improved security system and send link with this email for resetting password, so user will reset password.

**Migrate on login:** this approach is tricky in this case maintain one parameter for checking is password upgraded to new algorithm, set false for all user by default and when use come for login check this check if it is false then compare password with old algorithm and if password get matched then start user's session and get newer hash from plain text password and saved to database and update is password upgraded check to true. Now from next time user's password will be checked by newer algorithm.


