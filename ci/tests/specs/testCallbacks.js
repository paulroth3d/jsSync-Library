/*global describe it callback */

describe( 'Callback', function(){
		
	var scope = null;
	var cb = null;
	
	beforeEach( function(){
		scope = new ScopeObj();
		cb = new Callback( scope, scope.handler );
	});
	
	it( 'Callback must callback', function(){
		cb.execCallback( "cat" );
		
		expect( scope.value ).toBe( "cat" );
	});
});
