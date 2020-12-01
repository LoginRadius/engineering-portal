---
title: "Setting up WebAuthn for your Authentication Application"
date: "2020-11-27"
coverImage: "webauthn-logo.png"
author: "Chris Yee"
tags: ["WebAuthn", "FIDO", "Authentication"]
description: "Login with a new way using WebAuthn."
---

# Setting up WebAuthn for your Authentication Application

## Introduction

WebAuthn is a new standard for authentication published by the World Wide Web Consortium and supported by the FIDO alliance. The standard works by providing a way for users to authenticate through a third-party authenticator. These authenticators can be built into the operating system software, like Windows Hello or Android biometrics, or could be done through external authenticators, like a USB authenticator.

![Authenticators](authenticators.png)

This blog will cover a high-level description of how WebAuthn works and two different ways an application can be set up to use the WebAuthn standard to authenticate users. One is through a basic registration flow where the authenticator data is stored upon registration and must be used to login. The other is a flow where the authenticator can be used as a second-factor authentication method, which is prompted after a user logs in. For more information on this, resources like the [`World Wide Web Consortium documentation`](https://www.w3.org/TR/webauthn-2/) can be useful.

## WebAuthn Overview

The WebAuthn authentication process involves the interaction between three entities: The relying party, which is the server that handles the credentials of the authenticator and verifies it, a web browser that should support the WebAuthn protocol, and the authenticator itself.

The registration process begins when the client generates some sort of identifying information about themselves. Typically, this would be a user name or an email from the user but could be another identifier sent from the client, such as a randomly generated GUID. Using the Web Authentication APIs with JavaScript, the client can send a request to the relying party to register the authenticator credentials.

![WebAuthn Flow](webauthn-flow.png)

After receiving the request from the client, the relying party generates a challenge based on the options provided by the client. The client receives the response and attempts to get the user to verify the authenticator being used. For example, with Windows Hello as the authenticator, the user can enter their PIN. After verifying the authenticator, it signs the challenge-response back with identifying details and returns it to the relying party, which validates the authenticator and registers the user.

When the registration begins, options are set from the relying party that changes how the flow will work. A list of the options that can be set can be found [`here`](https://www.w3.org/TR/webauthn/#dictionary-makecredentialoptions). Here are some examples of the significant options that one might set for their flows:

- Authenticator Attachment - The authenticator being used can be set to a platform authenticator or a cross-platform authenticator. Platform authenticators are limited to the usage of a single device to authenticate. Windows Hello and the fingerprint scanner on a smartphone are examples of Platform authenticators, as the user is identified through the device being used to authenticate with. Cross-platform authenticators are external devices that can be used with a device to authenticate. Things like USB authenticators are an example of cross-platform authenticators. Depending on the implementation, USB authenticators can also set up multiple platform authenticators to work on their device, but this won't be covered in this blog.
- Resident Key Required Boolean - By default, this value is set to false, which means that private key and authentication credentials are stored on the relying party server. However, if this option is set to true, the authenticator will store the private key credentials instead. With certain flows, by setting the resident key to required, only the ids of the authenticator will be stored on the relying party server. This would allow for authentication systems to not only validate a user via the authenticator but identify them as well.
- User Verification - This field can hold three values: Preferred by default, Discouraged, or Required. User verification is when the user can be identified to be one that is attempting the authentication request. If an authenticator supports user verification, a flag is set by the authenticator during validation and sent to the relying party. When the authenticator is attempting verification, it can be done through different means, such as password, PIN, or biometrics.
- Attestation - Attestation certificates have the option to be created through this option. As a result, the certificate will contain details about the hardware being used as an authenticator and ensure that the device used for authentication is trustworthy. If the authentication flow does not require this, you can set it to None to reduce the workload done by the relying party to validate the attestation certificate. By setting the option to Indirect, the relying party allows the attestation certificate to be generated by a third party. This could allow the relying party to receive less private information surrounding the actual authenticator and use only what is needed. Lastly, if set to Direct, the authenticator itself must generate the attestation certificate to be verified.

The authentication or login process is similar to the registration process. Using the JavaScript libraries, the authenticator passes identifying information to the relying party. The relying party returns a challenge, which should be validated by the user, processed by the authenticator, and finally validated by the relying party. User verification is checked from the options, but a majority of the options have been reduced as no credentials are generated or saved on either end.

## Setting up WebAuthn for your Application

When setting up WebAuthn as an authentication method for your application, two considerations are to use the standard as a primary registration and authentication method or as a second-factor authentication method.

As a primary authentication method, the authenticator identification and credentials are stored by the server at the same time the user account is created.

To begin, use the Web Authentication API to initiate the flow:

```javascript
Let publicKeyCredentialCreationOptions = {
    user: {
        id: “1234”,
        name: "example@example.com",
        displayName: "example",
    },
    authenticatorSelection: {
    authenticatorAttachment: "platform",
    },
    attestation: "direct"
};

const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions
});
```

For this section, the creation options are generated by the client. In other scenarios, including this blog's example, the options are generated from the relying party by retrieving them via an API call.

After this code is triggered by the browser, the authenticator will be prompted for validation. Since the authenticatorAttachment is set to ‘platform’, it would use the device's authenticator, like Windows Hello or an Android fingerprint scan.

The data returned from the creation of the credentials will have a structure like this:

```javascript
PublicKeyCredential {
    id: 'ADSUllKQmbqdGtpu4sjseh4cg2TxSvrbcHDTBsv4NSSX9...',
    rawId: ArrayBuffer(59),
    response: AuthenticatorAttestationResponse {
        clientDataJSON: ArrayBuffer(121),
        attestationObject: ArrayBuffer(306),
    },
    type: 'public-key'
}
```

This object should be passed to the relying party to complete the registration. The relying party verifies that the credentials passed in are correct and stores the identifier and credentials in the data store. In addition to storing the credentials object, any other registration variables should be passed in this step as well to register on your data store.

To use this flow as part of a second factor authentication process, the user account should be created before initiating this process with an already existing authentication method, like a password system. After the user account is created, running this flow should update the current user in the data store with the credential data. This will allow the second-factor authentication credentials to be configured and triggered after a password login.

Most programming languages have a library built that supports WebAuthn for a relying party server. For example, Duo has created them for [`Python`](https://github.com/duo-labs/py_webauthn) and [`Go`](https://github.com/duo-labs/webauthn). Using one of these libraries during the development of the relying party server will simplify the process. These resources also provide demos on how to implement their libraries to handle the credential data generated by the JavaScript Web Authentication APIs.

## Conclusion

Although the usage of WebAuthn is not widespread at the moment, the potential to authenticate a user passwordless or with the extra security of an authenticator allows it to be a strong contender in the future over regular password authentication flows. Hopefully, this blog helps you get started on your own authentication apps with WebAuthn.

A quick demo on the WebAuthn flow can be found in [`here`](https://www.loginradius.com/demo/fido).
