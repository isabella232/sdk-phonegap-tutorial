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
* **Step 1: Installing the OAuth.io plugin** (tagged `step-1`)
* **Step 2: SDK Initialization** (tagged `step-2`)
* **Step 3: Authenticating the user** (tagged `step-3`)
* **Step 4: Getting user information** (tagged `step-4`)

Step 0: Project configuration
-----------------------------

**This step is mandatory.**

Before you begin, you need to make sure you have an account on OAuth.io (subscription and first app are free), and an app with the provider `facebook` configured to use the `client-side flow`, with at least `email` selected in the scope list.

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

*Skip this step*

If your want to get the code for this step right away, or want to override your changes with it, just checkout the tag `step-1` of the git repository:

```sh
$ git checkout step-1 --force
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

*Skip this step*

If your want to get the code for this step right away, or want to override your changes with it, just checkout the tag `step-2` of the git repository:

```sh
$ git checkout step-2 --force
```

Step 3: Authenticating the user
-------------------------------

In this step you will add the code to show a popup and retrieve the user's credentials (the access token) from OAuth.io.

Go to the `www/js/script.js` file, and find the following placeholder:

```javascript
function authenticate(callback) {
    // Replace this with the popup authentication
}
```

Replace it with the following code:

```javascript
function authenticate(callback) {
    OAuth.popup('facebook')
        .done(function(result) {
            callback(null, result);
        })
        .fail(function(error) {
            console.log(error);
            callback(error);
        });
}
```

The `popup` method launches a popup over the app that asks the user to log in to Facebook and accept the permissions you set in your OAuth.io app. Once he accepts them, the popup disappears, and the callback given in the `.done()` method is called with a `result` object as first argument.

The `result` object is what contains the access token. It also lets you perform API requests easily, which we'll see in the next step. Note that here we pass the `result` to a callback that is going to be called in the next step.

*Skip this step*

If your want to get the code for this step right away, or want to override your changes with it, just checkout the tag `step-3` of the git repository:

```sh
$ git checkout step-3 --force
```

Step 4: Getting user information
--------------------------------

In this step you will use the `result` object that you got in `step-3` to perform an API request.

Here we'll use the `.me` method, which allows you to retrieve a unified object containing the authenticated user's information. This method can be used for many provider, and will always return the same field names when they are available. For example, when the provider returns the first name of the user, you will always get the field `firstname`, regardless of the fact that the provider returns `first_name` or `FirstName`.

Go to the `www/js/script.js` file, and find the following placeholder:

```javascript
function retrieve_user_info(result, callback) {
    // Replace this with the API request code
}
```

Replace it with the following code:

```javascript
function retrieve_user_info(result, callback) {
    result.me()
        .done(function(user_info) {
            callback(null, user_info);
        })
        .fail(function(error) {
            console.log(error);
            callback(error);
        });
}
```

Here, the `.me()` method calls OAuth.io, which automatically selects the provider's user information endpoint, calls it, and maps the content into standardized fields.

When that's done, the function in the `.done` method of the promise returned by the `.me()` method is called with an object containing the user info.

The `user_info` object also contains a `raw` field, which contains the provider's original response.

Here we give `user_info` to a callback that fills the page with the user's information (`name`, `email` and `avatar`). But you can play arround with the object to see what's contained.

Note that the `result` objects also contains the `.get`, `.post`, `.put`, `.del` and `.patch` methods that allow you to perform standard HTTP calls to the provider's API endpoints. For example, if you want to post a message on the user's Facebook wall, you'd do something like this:

```javascript
result.post('/me/feed', {
        data: {
            message: 'Hello World!'
        }
    })
    .done(function (response) {
        // Deal with Facebook's response 
        // (response.id will be set to the message id if everything worked)
    })
    .fail(function (error) {
        // Handle errors here
    });
```

Note that to do this call, you need to have the `publish_stream` permission set to the provider's scope in your OAuth.io app.

*Skip this step*

If your want to get the code for this step right away, or want to override your changes with it, just checkout the tag `step-4` of the git repository:

```sh
$ git checkout step-4 --force
```

More information
----------------