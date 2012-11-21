describe('Test the Util class methods',function(){
	it( 'dateTimeToUTCString returns correctly', function(){
		var syncDate = new Date().getTime();

		var utcString = Util.dateTimeToUTCString(new Date(syncDate));

		expect( typeof utcString ).not.toEqual( "undefined" );

		expect( typeof utcString ).toEqual( "string" );

		expect( typeof utcString ).toEqual( "string" );

		expect( utcString.charAt(utcString.length-1) ).toEqual( "Z" );		
	});
});