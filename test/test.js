
QUnit.test( "Sanity", function( assert ) {
	assert.expect( 1 );
	assert.ok( Array.prototype.push, "Array.push()" );
} );

QUnit[ window.console ? "test" : "skip" ](
"jQuery.Deferred.exceptionHook",
function exceptionHookTest( assert ) {

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

QUnit[ window.console ? "test" : "skip" ](
"jQuery.Deferred.exceptionHook with stack hooks",
function exceptionHookWithStack( assert ) {

	assert.expect( 2 );

	var done = assert.async(),
		defer = jQuery.Deferred(),
		oldWarn = window.console.warn;

	window.console.warn = function( msg, stack ) {
		assert.ok( /cough_up_hairball/.test( msg ), "Function mentioned: " + msg );
		assert.ok( /exceptionHookWithStack/.test( stack ), "Stack trace included: \n" + stack );
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
