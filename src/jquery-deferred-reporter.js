( function( factory ) {
	"use strict";


	if ( typeof define === "function" && define.amd ) {
		define( "jquery-deferred-reporter", [ "jquery" ], factory );
	} else if ( typeof module === "object" && module.exports ) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}

} )( function( jQuery ) {
	"use strict";

	function getErrorHook() {

		// Throw an error as IE doesn't capture `stack` of non-thrown ones.
		try {
			throw new Error( "Exception in jQuery.Deferred" );
		} catch ( err ) {
			return err;
		}
	}

	// Define both `jQuery.Deferred.getErrorHook` used in jQuery >=3.7.0
	// and `jQuery.Deferred.getStackHook` used in jQuery <4.0.0.
	var version = jQuery.fn.jquery
		.split( "." )
		.map( function( v ) {
			return Number( v );
		} );

	// Only assign to the newer API if supported to avoid jQuery Migrate warnings.
	if ( version[ 0 ] >= 4 || ( version[ 0 ] === 3 && version[ 1 ] >= 7 ) ) {
		jQuery.Deferred.getErrorHook = getErrorHook;
	} else {
		jQuery.Deferred.getStackHook = getErrorHook;
	}

	return getErrorHook;

} );
