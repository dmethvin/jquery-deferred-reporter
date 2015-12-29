( function( factory ) {

    if ( typeof define === "function" && define.amd ) {
        define( "jquery-deferred-reporter", [ "jquery" ], factory );
    } else if ( typeof module === "object" && module.exports ) {
        module.exports = factory( require( "jquery" ) );
    } else {
        factory( jQuery );
    }

}( function( jQuery ) {

	function getStackHook() {

		// Throw an error so we can extract the stack from the Error
		try {
			throw new Error( "Exception in jQuery.Deferred" );
		} catch ( err ) {
			return err.stack;
		}
	}
	return jQuery.Deferred.getStackHook = getStackHook;

} ) );
