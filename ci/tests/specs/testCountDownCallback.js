/*global expect it describe */

describe( 'CountDownCallback', function(){
	
	var scope = null;
	var cb = null;
	
	beforeEach( function(){
		scope = new ScopeObj();
		cb = new CountdownCallback(10,scope, scope.handler);
	});
	
	it( 'CountDownCallbackMust not be called back initially', function(){
		expect( cb.isReleased() ).toBeFalsy();
		
		expect( cb.release() ).toBeFalsy();
		
		expect( scope.wasCalled ).toBeFalsy();
	});
	
	it( 'CountDownCallback must be called back once counted down', function(){
		for( var i = 0; i < 9; i++ ){
			expect( cb.isReleased() ).toBeFalsy();
			
			expect( cb.release() ).toBeFalsy();
			
			expect( scope.wasCalled ).toBeFalsy();
		}
		
		expect( cb.isReleased() ).toBeFalsy();
		
		expect( cb.release() ).toBeTruthy();
		
		expect( scope.wasCalled ).toBeTruthy();
	});
});
