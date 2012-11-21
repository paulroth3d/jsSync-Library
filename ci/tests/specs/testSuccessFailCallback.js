/*global describe it callback */

describe( 'SuccessFailCallback', function(){
	
	var successScope = null;
	var failureScope = null;
	var successFailCallback = null;
	
	beforeEach( function(){
		successScope = new ScopeObj();
		failureScope = new ScopeObj();
		successFailCallback = new SuccessFailCallback( successScope, successScope.handler,
			failureScope, failureScope.handler );
	});
	
	it( 'SuccessFail must callback only success', function(){
		successFailCallback.success( "isSuccessful" );
		
		expect( successScope.value ).toBe( "isSuccessful" );
		expect( failureScope.value ).toBeNull();
	});
	
	it( 'SuccessFail must callback only failure', function(){
		successFailCallback.fail( "isFailure" );
		
		expect( successScope.value ).toBeNull();
		expect( failureScope.value ).toBe( "isFailure" );
	});
	
	it( 'SuccessFail must be a callback', function(){
		expect( successFailCallback.isCallback ).toBeDefined();
		expect( successFailCallback.isCallback ).toBe( true );	
	});
});
