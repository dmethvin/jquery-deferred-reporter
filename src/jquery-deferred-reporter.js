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

	jQuery.Deferred.getErrorHook = getErrorHook;

	// Only assign to the older API in jQuery <4.
	if ( jQuery.fn.jquery.indexOf( "4." ) !== 0 ) {
	} else {
		jQuery.Deferred.getStackHook = jQuery.Deferred.getErrorHook;
	}

	return getErrorHook;

} );
