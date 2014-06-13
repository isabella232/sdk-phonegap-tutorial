OAuth.io Phonegap Tutorial
==========================

This is the official OAuth.io Phonegap Tutorial. It will help you understand how to integrate OAuth.io in your Phonegap/Cordova project.

It is divided in several steps, each step corresponding to a tag on the tutorial repository on Github. All you need to do to follow this tutorial is to create an account on OAuth.io, create your first app with the provider Facebook, and finally clone the tutorial repository.

To clone the repository, run the following command in your terminal:

```sh
$ git clone https://github.com/oauth-io/sdk-phonegap-tutorial
```

These are the steps of this tutorial:

* **Step 0: Project configuration** (tagged `step-0`)
* **Step 1: SDK Initialization** (tagged `step-1`)
* **Step 2: Authenticating the user** (tagged `step-2`)
* **Step 3: Getting user information** (tagged `step-3`)

Step 0: Project configuration
-----------------------------

**This step is mandatory.**

Before you begin, you need to make sure you have an account on OAuth.io (subscription and first app are free), and an app with the provider `facebook` configured to use the `client-side flow`.

It is also possible to use this SDK along with one of our server-side flow SDKs (currently Node.js and PHP), but this is outside the scope of this tutorial.

To configure the project, create a file called `credentials.js` in `www/config`. You can copy and the contents of `credentials.example.js`, and replace the value of the field `app_key` with the public app key of your app you got from [OAuth.io](https://oauth.io).

You should have something like this in the `credentials.js` file:

```javascript
var credentials = {
    app_key: 'your_app_key'
};
```

This file is loaded by the Phonegap root page (`www/index.html`), and thus initializes the `credentials` variable in the environment. This will be useful in the next step to initialize the SDK.

Step 1: Installing the OAuth.io plugin
--------------------------------------

In this step you will install the OAuth.io plugin to the project. To do that, just run the following command in your terminal:

```sh
$ phonegap plugin add https://github.com/oauth-io/oauth-phonegap
```

This will install `com.phonegap.plugins.oauthio`, which enables you to use the `OAuth` variable in the project's javascript. This variable lets you use OAuth.io easily by helping you showing OAuth popups and performing API requests.

The plugin depends on `org.apache.cordova.inappbrowser` to show the popup (installing the OAuth.io plugin will automatically install this).

If your want to get the code for this step, just checkout the tag `step-1` of the git repository:

```sh
$ git checkout step-1
```

Step 2: SDK Initialization
--------------------------

In this step you will initialize the framework with your OAuth.io app's public key. Go to the `www/js/script.js` file, and find the following placeholder:

```javascript
// Replace this line with the SDK initialization
```

Replace it with the following code:

```javascript
OAuth.initialize(credentials.app_key);
```

This initializes the SDK by telling it which app to use on OAuth.io.

If your want to get the code for this step, just checkout the tag `step-2` of the git repository:

```sh
$ git checkout step-2
```

