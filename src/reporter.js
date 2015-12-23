( function( factory ) {

    if ( typeof define === "function" && define.amd ) {
        define( "jquery-deferred-reporter", [], factory );
    } else if ( typeof exports === "object" ) {
        module.exports = factory();
    } else {
        factory();
    }

}( function() {

	function makeStackTrace() {

		// Throw an error so we can extract the stack from the Error
		try {
			throw new Error();
		} catch ( err ) {
			return err.stack;
		}
	}
	return jQuery.Deferred.stackTraceHook = makeStackTrace;

} ) );
