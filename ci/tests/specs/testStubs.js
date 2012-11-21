/**
 *  Tests to make sure the stubs are correctly loaded.
**/
describe( 'Stubs are correctly loaded', function(){
	it( 'Connection is expected to be found', function(){
		expect( typeof Connection ).not.toEqual( "undefined" );
	});
	it( 'navigator is expected to be found', function(){
		expect( typeof navigator ).not.toEqual( "undefined" );
	});
	it( 'navigator.network is expected to be found', function(){
		expect( typeof navigator.network ).not.toEqual( "undefined" );
	});
	it( 'navigator.network.connection is expected to be found', function(){
		expect( typeof navigator.network.connection ).not.toEqual( "undefined" );
	});
	it( 'navigator.network.connection.type is expected to be found', function(){
		expect( typeof navigator.network.connection.type ).not.toEqual( "undefined" );
	});
});

describe( "LocalStorage", function(){
	var localStorage = window.localStorage;
	it( 'LocalStorage must be found', function(){
		expect(localStorage).not.toBe(null);
	});
});

//-- sample test to show failures
/*
describe( 'test expected to fail', function(){
	it( 'test expected to fail', function(){
		expect( false ).toEqual( true );	
	});
});
*/

