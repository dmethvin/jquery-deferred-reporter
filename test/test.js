QUnit.module( "core" );

QUnit.test( "Sanity", function( assert ) {
	assert.expect( 1 );
	assert.ok( Array.prototype.push, "Array.push()" );
} );

QUnit[ window.console ? "test" : "skip" ]( "jQuery.Deferred.exceptionHook", function( assert ) {

	assert.expect( 1 );

	var done = assert.async(),
		defer = jQuery.Deferred(),
		oldWarn = window.console.warn;

	window.console.warn = function( msg ) {
		assert.ok( /barf/.test( msg ), "Message: " + msg );
	};
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
		window.console.warn = oldWarn;
		done();
	} );

	defer.resolve();
} );

QUnit[ window.console ? "test" : "skip" ]( "jQuery.Deferred.exceptionHook with stack hooks", function( assert ) {

	assert.expect( 2 );

	var done = assert.async(),
		defer = jQuery.Deferred(),
		oldWarn = window.console.warn;

	jQuery.Deferred.getStackHook = function() {
		// Default exceptionHook assumes the stack is in a form console.warn can log,
		// but a custom getStackHook+exceptionHook pair could save a raw form and
		// format it to a string only when an exception actually occurs.
		// For the unit test we just ensure the plumbing works.
console.trace();
		return "NO STACK FOR YOU";
	};

	window.console.warn = function( msg, stack ) {
		assert.ok( /cough_up_hairball/.test( msg ), "Function mentioned: " + msg );
		assert.ok( /NO STACK FOR YOU/.test( stack ), "Stack trace included: " + stack );
	};
	defer.then( function() {
		jQuery.cough_up_hairball();
	} ).then( null, function( ) {
		window.console.warn = oldWarn;
		delete jQuery.Deferred.getStackHook;
		done();
	} );

	defer.resolve();
} );
