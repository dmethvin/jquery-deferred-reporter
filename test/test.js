QUnit.module( "core" );

QUnit.test( "Basics", function( assert ) {
	assert.expect( 1 );
	assert.ok( Array.prototype.push, "Array.push()" );
} );

