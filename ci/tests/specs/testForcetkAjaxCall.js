/**
 *  Tests for the ForcetkAjaxCall object.
**/
/*global describe it expect ForcetkAjaxCall */
describe( 'ForcetkAjaxCall', function(){
	
	it( 'testForcetkAjaxCall defined', function(){
		expect( ForcetkAjaxCall ).toBeDefined();
	});
	/*
	it( 'testFail', function(){
		expect( 'this test should fail' ).toBe( true );
	});
	*/
	
	var apiVersion = '25.0';
	
	it( 'test versions', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.VERSIONS );
	});
	
	it( 'test resources', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.RESOURCES );
	});
	
	it( 'test resources2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.RESOURCES );
	});
	
	it( 'test not resources', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/cuca', 'GET', null );
		expect( ajaxCall.methodType ).not.toBe( ForcetkAjaxCall.RESOURCES );
	});
	
	it( 'test describe global', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_GLOBAL );
	});
	
	it( 'test describe global2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_GLOBAL );
	});
	
	it( 'test describe global2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects', 'POST', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_GLOBAL );
	});
	
	it( 'test describe sObject', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account', 'POST', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_OBJECT );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	
	it( 'test describe sObject2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Contact/', 'POST', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_OBJECT );
		expect( ajaxCall.sObject ).toBe( 'Contact' );
	});
	
	it( 'test describe sObject detail', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/describe', 'POST', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_OBJECT );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	
	it( 'test describe sObject2 detail', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Contact/describe/', 'POST', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DESCRIBE_OBJECT );
		expect( ajaxCall.sObject ).toBe( 'Contact' );
	});
	
	it( 'test create', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/', 'POST', {name:"Cuca"} );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.INSERT );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	
	it( 'test retrieve', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.GET );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test retrieve2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345?fields=cuca,cuca', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.GET );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test retrieve3', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345678', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.GET );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test retrieve4', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345678?fields=cuca,cuca', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.GET );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test not retrieve', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/12345678901234', 'GET', null );
		expect( ajaxCall.methodType ).not.toBe( ForcetkAjaxCall.GET );
	});
	it( 'test not retrieve2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/1234567890123456', 'GET', null );       
		expect( ajaxCall.methodType ).not.toBe( ForcetkAjaxCall.GET );
	});
	it( 'test UPDATE', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345/123456789012345?_HttpMethod=PATCH', 'POST', {id:'123456789012345',name:"Cuca"} );       
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.UPDATE );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test DELETE', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/sobjects/Account/123456789012345', 'delete', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.DELETE );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	
	it( 'test QUERY', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/query?q=select id from Account', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.QUERY );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test QUERY2', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/query?q=select+id+from+Account', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.QUERY );
		expect( ajaxCall.sObject ).toBe( 'Account' );
	});
	it( 'test QUERY3', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/v25.0/query?q=select+Id,+IsDeleted,+AccountId,+Name,+Description,+StageName,+Amount,+Probability,+CloseDate,+Type,+NextStep,+LeadSource,+IsClosed,+IsWon,+ForecastCategory,+ForecastCategoryName,+CampaignId,+HasOpportunityLineItem,+Pricebook2Id,+OwnerId,+CreatedDate,+CreatedById,+LastModifiedDate,+LastModifiedById,+SystemModstamp,+LastActivityDate,+FiscalQuarter,+FiscalYear,+Fiscal+from+Opportunity', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.QUERY );
		expect( ajaxCall.sObject ).toBe( 'Opportunity' );
	});
	it( 'test SOSL', function(){
		var ajaxCall = ForcetkAjaxCall.parseCall( '/services/data/v25.0/search?s=FIND+"cuca"+IN+ALL+FIELDS+RETURNING+Account+(Id,+Name),+Contact,+Opportunity,+Lead', 'GET', null );
		expect( ajaxCall.methodType ).toBe( ForcetkAjaxCall.SEARCH );
	});
});
