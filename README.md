# jquery-deferred-reporter

This jQuery plugin extends the jQuery.Deferred features added in version 3.0 to include a stack trace whenever a Deferred throws an exception. This makes it easier to find programming errors that occur inside Deferreds. 

## Why does this plugin exist?

Prior to jQuery 3.0, Deferreds would simply terminate and the browser would generate a message on the console if an exception occurred such as attempting to call an undefined method as a function (e.g., `myobject.missingFunction()`). As of version 3.0 jQuery follows the Promise/A+ specification which requires all errors to be trapped by the Promise, which prevents console errors from being logged. If the user has forgotten to add an error handler, this can result in the error being silently swallowed with no notification at all! 

The native `Promise` object as implemented in the browser tracks Promise rejections and report problems on the console. However, doing the same type of reporting in the JavaScript world is much more difficult. jQuery itself is unable to use the native Promise because jQuery.Deferred implements a superset of Promise that requires additional features, and because Promise is not implemented on all the platforms that jQuery supports.

