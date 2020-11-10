---
title: "Using PGP Encryption with Nodejs"
date: "2020-11-10"
coverImage: "cover.png"
author: "Andy Yeung"
tags: ["Security", "NodeJS", "Encryption"]
description: "Starter guide on Pretty Good Privacy(PGP) with Nodejs. PGP, a cryptographic process used to encrypt and decrypt information."
---

## What is PGP?

PGP (Pretty Good Privacy) is a cryptographic process used to encrypt and decrypt information. It combines concepts from symmetric and asymmetric key encryption, maintaining some of the best security and usability aspects of both.

One way PGP can be used is to protect the confidentiality of information. Once the information is encrypted, nobody will be able to decrypt it unless they have the right key. In practice, PGP is commonly used in sending and receiving emails, sharing information on the Dark Web, and others. This is because both on and off the Internet, there are ways to intercept information being sent, making encryption using PGP or similar critical.

On a high-level the process between a sender and receiver looks like this:
1. The recipient generates public and private keys.
2. The recipient sends its public key to the sender.
3. The sender encrypts the message using the given public key.
4. The sender sends the encrypted message to the recipient.
5. The recipient decrypts the message using its private key.

## PGP Examples in Node.js

Now, let's go over some examples in Node.js using the [openpgp library](https://www.npmjs.com/package/openpgp).
- OpenPGP is a protocol that defines the standards for PGP. OpenPGP.js implements the OpenPGP protocol in JavaScript.

We'll go over some basic examples and show how to encrypt & decrypt large files using Node.js streams.

First, set up your Node.js project and install openpgp.js:

```
mkdir pgp-tutorial && cd pgp-tutorial && npm init
npm i openpgp --save
```

Note: examples use openpgp v4.10.8

### Generating keys

When generating private and public PGP keys with OpenPGP, you can define which curve to use in Elliptic-curve cryptography. In this example, we use Ed25519 for its performance and small key size. For the full list of curves, you can choose from, refer to OpenPGP.js docs.

You also need to define a passphrase used to decrypt files and the private key. In practice, this should be a strong, randomized secret generated for a single-use.

```
// generate-keys.js
const openpgp = require("openpgp");

generate();
async function generate() {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase: "qwerty",
  });
  console.log(privateKeyArmored);
  console.log(publicKeyArmored);
}
```

Running the above gives us our private key:

```
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: OpenPGP.js v4.10.8
Comment: https://openpgpjs.org

xYYEX6iKVxYJKwYBBAHaRw8BAQdANJ6JIXuMMZV3NIlwq0POS7xsF2N7+kAE
7KQjAtfIuqj+CQMI4CUgW9jPsGPgJvQnnCWFf1s7lO/5+D5ZQ9JK25fUtmQo
WyHX0Ja1ryOoFnvq7u+7fUC0+RAzt8S1xv3eDzazfgNuLtEmufwMyR6wMi78
Kc0ccGVyc29uIDxwZXJzb25Ac29tZWJvZHkuY29tPsKPBBAWCgAgBQJfqIpX
BgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEAIQkQVrbGpNEnCPUWIQQb8YRJ
hw7DjekU68lWtsak0ScI9UM7AQDv4YRbIdU2ErPf8MobreeLiXXjYZ6fas8E
zW0KoTZWEQD+NHDY2YYByMF1mWusPkdPDpyBzqMJrlMeihMzZ+PE8AfHiwRf
qIpXEgorBgEEAZdVAQUBAQdARY37/Vys4Sj6DvwN6TRjxrIqiMIngxQgvOb6
wi+tQzEDAQgH/gkDCJ2xNZ1OXxv94E8fTLQ3gYHFQuebn/PSijD8CqlvHNB/
/Z9sIxSFt7rzorW+9v6Awfe+pQwXW5iEyJkdiGu3BM91GMwMvMmZ+rBNlBvq
iX7CeAQYFggACQUCX6iKVwIbDAAhCRBWtsak0ScI9RYhBBvxhEmHDsON6RTr
yVa2xqTRJwj17W0BAI5MuCWHrqjSRcdjLTwxa++jYv+Yxq4tODj8oh27T86v
AQCfb3lij9JGlIMNDQgceeougl+Lw4Gb0kQCnsNQRggTDw==
=yzT4
-----END PGP PRIVATE KEY BLOCK-----
```

And the public key:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.8
Comment: https://openpgpjs.org

xjMEX6iKVxYJKwYBBAHaRw8BAQdANJ6JIXuMMZV3NIlwq0POS7xsF2N7+kAE
7KQjAtfIuqjNHHBlcnNvbiA8cGVyc29uQHNvbWVib2R5LmNvbT7CjwQQFgoA
IAUCX6iKVwYLCQcIAwIEFQgKAgQWAgEAAhkBAhsDAh4BACEJEFa2xqTRJwj1
FiEEG/GESYcOw43pFOvJVrbGpNEnCPVDOwEA7+GEWyHVNhKz3/DKG63ni4l1
42Gen2rPBM1tCqE2VhEA/jRw2NmGAcjBdZlrrD5HTw6cgc6jCa5THooTM2fj
xPAHzjgEX6iKVxIKKwYBBAGXVQEFAQEHQEWN+/1crOEo+g78Dek0Y8ayKojC
J4MUILzm+sIvrUMxAwEIB8J4BBgWCAAJBQJfqIpXAhsMACEJEFa2xqTRJwj1
FiEEG/GESYcOw43pFOvJVrbGpNEnCPXtbQEAjky4JYeuqNJFx2MtPDFr76Ni
/5jGri04OPyiHbtPzq8BAJ9veWKP0kaUgw0NCBx56i6CX4vDgZvSRAKew1BG
CBMP
=C6S6
-----END PGP PUBLIC KEY BLOCK-----
```

### File Encryption

Now we can start encrypting information.

Create a text file:

```
echo 'This file contains secret information' > secrets.txt
```

Here, we act as the sender who received a public key from the intended recipient. We use their public key to encrypt the confidential information:

```
// encrypt-file.js
const openpgp = require("openpgp");
const fs = require("fs");

const publicKeyArmored = <PUBLIC KEY GIVEN BY RECIPIENT>

encrypt();
async function encrypt() {
  const plainData = fs.readFileSync("secrets.txt");
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(plainData),
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
  });

  fs.writeFileSync("encrypted-secrets.txt", encrypted.data);
}
```

In the newly created `encrypted-secrets.txt` file, we have the contents encrypted like so:

```
-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v4.10.8
Comment: https://openpgpjs.org

wV4DUsPKVnc3UHMSAQdAey4TJiEOrZQIrx6q2zBLgmPkbnhPMt1WR+jCWX5x
Gn8wEim8W4OhDVMwfhtgVIClBCGPhvdeZ1zvVUAJGDdl8+S+DUynKhPNcN8m
Kb9TRGYs0sAlAaXcTChBHSS5kDHV/8Hgjcn0OIs6v2mbCkz/bHs/shwf8WMI
ov711iEkgcXnXIX+ZDGyDFnAKftoygzAf0aZy82g7ejAD9SX13wNmO6TK8Gw
wr9Xj8F6XBV0yHvdsm2uzRY9W03tTSqAf0anEs+ZWyVR/ha9ddnZJPFKtUbC
BEF4AMavsIN0CcqpA4q69I3E6GEtkAzgBWfJOOO8mQsNQ1vJWcJocinryBE6
Kbhznoe+R69qmUaJXPpe5scF6tfCYuQtPz4uhOljT+OUP6qss5Nz4zBs4JLq
nUlyynLLSSgdVr4Hvg==
=5tyF
-----END PGP MESSAGE-----
```

Now, as the sender, we can send the encrypted file to the recipient.

### File Decryption

Here, we act as the reciever. To decrypt the `encrypted-secrets.txt` file, we use our private key and passphrase:

```
// decrypt-file.js
const openpgp = require("openpgp");
const fs = require("fs");

const privateKeyArmored = <PRIVATE KEY>
const passphrase = <PASS PHRASE>;

decrypt();
async function decrypt() {
  const privateKey = (await openpgp.key.readArmored([privateKeyArmored])).keys[0];
  await privateKey.decrypt(passphrase);

  const encryptedData = fs.readFileSync("encrypted-secrets.txt");
  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(encryptedData),
    privateKeys: [privateKey],
  });

  console.log(decrypted.data);
}
```

Which logs the decrypted file contents:

```
This file contains secret information.
```

### Using Streams for Large Files

If you plan on encrypting or decrypting large files, you won't be able to fit the entire file contents in memory. In this case, you can use Node.js streams.

Here, we encrypt a large file called `dataset-1mill.json` using streams:

```
encrypt();
async function encrypt() {
  const encrypted = await openpgp.encrypt({
    message: openpgp.message.fromText(fs.createReadStream("dataset-1mill.json")),
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
  });

  let readStream = encrypted.data;
  let writeStream = fs.createWriteStream("encrypted-dataset.txt", { flags: "a" });
  readStream.pipe(writeStream);
  readStream.on("end", () => console.log("done!"));
}
```

And then, we decrypt the newly created `encrypted-dataset.txt` using streams:
- Notice that we set the flag allow_unauthenticated_stream to true, which allows streaming data before the message integrity has been checked. This is because, in our case, our OpenPGP message only has a single integrity tag at the end. This means the entire message gets loaded into memory, and we get a heap out of memory error since our file is too large to fit into memory at once.

```
openpgp.config.allow_unauthenticated_stream = true;

decrypt();
async function decrypt() {
  const privateKey = (await openpgp.key.readArmored([privateKeyArmored])).keys[0];
  await privateKey.decrypt(passphrase);

  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(fs.createReadStream("encrypted-dataset.txt")),
    privateKeys: [privateKey],
  });

  let readStream = decrypted.data;
  let writeStream = fs.createWriteStream("decrypted-dataset.json", { flags: "a" });
  readStream.pipe(writeStream);
  readStream.on("end", () => console.log("done!"));
}
```

Now, `decrypted-dataset.json` will have the same contents as our original `dataset-1mill.json` file.
