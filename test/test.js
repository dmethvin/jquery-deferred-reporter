"use strict";

// Polyfill `globalThis` for legacy browsers.
if ( typeof globalThis === "undefined" ) {
	window.globalThis = window;
}

QUnit.test( "Environment check", function( assert ) {
	assert.expect( 1 );
	assert.ok( Array.prototype.push, "Array#push()" );
} );

QUnit.test( "Choosing the patched API", function( assert ) {
	assert.expect( 2 );

	if ( jQuery.fn.jquery.indexOf( "3.6." ) === 0 ) {
		assert.strictEqual( typeof jQuery.Deferred.getStackHook, "function",
			"The legacy API is defined" );
		assert.strictEqual( jQuery.Deferred.getErrorHook, undefined,
			"The modern API is not defined" );
	} else {
		assert.strictEqual( typeof jQuery.Deferred.getErrorHook, "function",
			"The modern API is defined" );
		assert.strictEqual( jQuery.Deferred.getStackHook, undefined,
			"The legacy API is not defined" );
	}
} );

QUnit.test( "jQuery.Deferred.exceptionHook",
			function exceptionHookTest( assert ) {
	assert.expect( 1 );

	var done = assert.async(),
		defer = jQuery.Deferred(),
		oldWarn = globalThis.console.warn;

	if ( jQuery.fn.jquery.indexOf( "3." ) === 0 ) {
		globalThis.console.warn = function( msg ) {
			assert.ok( /barf/.test( msg ), "Message: " + msg );
		};
	} else {
		globalThis.console.warn = function( _intro, error ) {
			assert.ok( /barf/.test( error.message + "\n" + error.stack ),
				"Error mentions the method: " + error.message + "\n" + error.stack );
		};
	}

	jQuery.when(
		defer.then( function() {

			// Should get an error
			jQuery.barf();
		} ).then( null, jQuery.noop ),
		defer.then( function() {

			// Should NOT get an error
			throw new Error( "Make me a sandwich" );
		} ).then( null, jQuery.noop )
	).then( function( ) {
		globalThis.console.warn = oldWarn;
		done();
	} );

	defer.resolve();
} );

QUnit.test( "jQuery.Deferred.exceptionHook with stack hooks",
		function exceptionHookWithStack( assert ) {
	assert.expect( 2 );

	var done = assert.async(),
		defer = jQuery.Deferred(),
		oldWarn = globalThis.console.warn;

	globalThis.console.warn = function( intro, error, asyncError ) {
		assert.ok(
			/cough_up_hairball/.test( intro + "\n" + ( error && error.message || error ) ),
			"Function mentioned: " + intro + "\n" + ( error && error.message || error )
		);

		assert.ok(
			/exceptionHookWithStack/.test( asyncError.message + "\n" + asyncError.stack ),
			"Stack trace included: " + asyncError.message + "\n" + asyncError.stack
		);
	};

	defer.then( function() {
		jQuery.cough_up_hairball();
	} ).then( null, function( ) {
		globalThis.console.warn = oldWarn;
		done();
	} );

	defer.resolve();
} );
