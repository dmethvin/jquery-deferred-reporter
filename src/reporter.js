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
	return jQuery.Deferred.getStackHook = jQuery.Deferred.getErrorHook = getErrorHook;

} );
