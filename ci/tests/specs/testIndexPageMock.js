/**
 *  Specs that test the initialization done in the indexPageMock
**/
/*global forcetk mmSync describe it expect waitsFor jQueryNS, forcetkClient */

describe( 'IndexPageMock', function(){
	/*
	it( 'test jQuery completes the load', function(){
		console.log( 'jQueryLoaded:' + jQueryLoaded );
		waitsFor( function(){
			return( jQueryLoaded );
		}, 'jQuery never initialized', 10000 );
	});
	*/
	
	it( 'test jQueryReady called', function(){
		expect( jQueryNS ).toBeDefined();
		
		console.log( 'jQueryLoaded:' + jQueryNS.hasLoaded );
		waitsFor( function(){
			return( jQueryNS.hasLoaded );
		}, 'jQuery never proved initialization by setting jQueryNS.hasLoaded', 1000 );
	});
	
	//-- if the above test fails then the following test will also fail
	//-- and any other assumptions made that jQuery.onLoad has been called
	
	it( 'test further assumptions made that jQuery.onLoad has been called', function(){
		expect( jQueryNS.hasLoaded ).toBe( true );
	});
});
