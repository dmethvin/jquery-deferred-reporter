# jquery-deferred-reporter

This jQuery plugin extends the `jQuery.Deferred` features added in version 3.0 to include a stack trace whenever a Deferred throws an exception. This makes it easier to find programming errors that occur inside Deferreds. 

## Why does this plugin exist?

Prior to jQuery 3.0, Deferreds would simply terminate and the browser would generate a message on the console if an exception occurred such as attempting to call an undefined method as a function (e.g., `myobject.missingFunction()`). As of version 3.0 `jQuery.Deferred` follows the Promise/A+ specification when you use the `.then` method. The spec requires all errors to be trapped by the Promise, which prevents console errors from being logged. If the user has forgotten to add a handler for rejected promises, this can result in the error being silently swallowed with no notification at all! 

The native `Promise` object as implemented in the browser tracks Promise rejections and reports problems on the console. However, doing the same type of reporting in the JavaScript world is much more difficult. jQuery itself is unable to use the native Promise because jQuery.Deferred implements a superset of Promise that requires additional features for methods like `.done` or `.fail`, and because Promise is not implemented on all the platforms that jQuery supports.

## Why not just put this in jQuery?

 Since it has to save the stack trace regardless of whether an exception will happen or not, adding this plugin makes `jQuery.Deferred` [significantly slower](https://jsfiddle.net/h20r0e6z/5/), by roughly a factor of two.
 

