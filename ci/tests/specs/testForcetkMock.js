/**
 *  Tests that verify the forcetk mock works as expected
**/
/*global describe it expect $j forcetkClient ForcetkDataStubs ForcetkAjaxCall spyOn*/
describe( 'forcetkMock', function(){
	//-- this test is that IndexPageMock has completed, and therefore jQueryNS.onLoad has completed
	//-- so therefore no waitFor is needed.
	
	it( 'test further assumptions made that jQuery.onLoad has been called', function(){
		expect( jQueryNS.hasLoaded ).toBe( true );
	});
	
	it( 'test forcetkClient exists', function(){
		expect( forcetkClient ).toBeDefined();
	});
	
	it( 'test forcetkClient was initialized', function(){
		expect( forcetkClient.clientId ).toBeDefined();
	});
	
	it( 'test forcetkClient modifications were found', function(){
		expect( forcetkClient.shouldFail ).toBeDefined();
	});
	
	it( 'test forcetkClient resetTest defined', function(){
		expect( forcetkClient.resetTest ).toBeDefined();	
	});
	
	it( 'test forcetkClient shouldFail', function(){
		forcetkClient.resetTest();
		expect( forcetkClient.willFail ).toBe( false );
		forcetkClient.shouldFail( true );
		
		expect( forcetkClient.willFail ).toBe( true );
	});
	
	//-- -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	
	
	var wasSuccessCalled = false;
	var wasFailureCalled = false;
	var metaResponse = null;
	var resetSuccessFailure = function(){
		wasSuccessCalled = false;
		wasFailureCalled = false;
		metaResponse = null;
	};
	
	var SuccessFailObject = function(){
		this.successCalled = false;
		this.failureCalled = false;
		this.success = function( response ){
			//debugger;
			this.successCalled = true;
			wasSuccessCalled = true;
			metaResponse = response;
		};
		this.failure = function( response ){
			//debugger;
			this.failureCalled = true;
			wasFailureCalled = true;
			metaResponse = response;
		};
	};
	
	var testAjaxCallGivesExpectedMeta = function( path, method, payload, expectedMeta ){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.ajax( path, response.success, response.failure, method, payload );
		
		expect( wasSuccessCalled ).toBe( true );
		expect( wasFailureCalled ).toBe( false );
		expect( metaResponse ).toBe( expectedMeta );
	};
	
	it( 'test versions', function(){
		testAjaxCallGivesExpectedMeta( '/', 'GET', null, ForcetkDataStubs.metaVersions );
	});
	
	it( 'test resources', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0', 'GET', null, ForcetkDataStubs.metaResouces );
	});
	
	it( 'test resources2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/', 'GET', null, ForcetkDataStubs.metaResouces );
	});
	
	it( 'test describe global', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/', 'GET', null, ForcetkDataStubs.metaGlobalDescribe );
	});
	
	it( 'test describe global2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects', 'GET', null, ForcetkDataStubs.metaGlobalDescribe );
	});
	
	it( 'test describe global2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects', 'POST', null, ForcetkDataStubs.metaGlobalDescribe );
	});
	
	it( 'test describe sObject', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account', 'POST', null, ForcetkDataStubs.metaObjectDescribe.Account );
	});
	
	it( 'test describe sObject2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Contact/', 'POST', null, ForcetkDataStubs.metaObjectDescribe.Contact );
	});
	
	it( 'test describe sObject detail', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/describe', 'POST', null, ForcetkDataStubs.metaObjectDescribeDetail.Account );
	});
	
	it( 'test describe sObject2 detail', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Contact/describe/', 'POST', null, ForcetkDataStubs.metaObjectDescribeDetail.Contact );
	});
	
	it( 'test create', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/', 'POST', {name:"Cuca"}, true );
	});
	
	it( 'test retrieve', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345', 'GET', null, ForcetkDataStubs.metaGet.Account );
	});
	it( 'test retrieve2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345?fields=cuca,cuca', 'GET', null, ForcetkDataStubs.metaGet.Account );
	});
	it( 'test retrieve3', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345678', 'GET', null, ForcetkDataStubs.metaGet.Account );
	});
	it( 'test retrieve4', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345678?fields=cuca,cuca', 'GET', null, ForcetkDataStubs.metaGet.Account );
	});
	it( 'test not retrieve', function(){
		try {
			testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/12345678901234', 'GET', null, null );
			expect( 'this test should throw an error' ).toBe( true );
		} catch( Error ){}
	});
	it( 'test not retrieve2', function(){
		try {
			testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/1234567890123456', 'GET', null, ForcetkAjaxCall.GET );
			expect( 'this test should throw an error' ).toBe( true );
		} catch( Error ){}
	});
	it( 'test UPDATE', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345/123456789012345?_HttpMethod=PATCH', 'POST', {id:'123456789012345',name:"Cuca"}, true );
	});
	it( 'test DELETE', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/sobjects/Account/123456789012345', 'delete', null, true );
	});
	
	it( 'test QUERY', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/query?q=select id from Account', 'GET', null, ForcetkDataStubs.metaQueryWithNext.Account );
	});
	it( 'test QUERY2', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/query?q=select+id+from+Account', 'GET', null, ForcetkDataStubs.metaQueryWithNext.Account );
	});
	it( 'test QUERY3', function(){
		testAjaxCallGivesExpectedMeta( '/v25.0/query?q=select+Id,+IsDeleted,+AccountId,+Name,+Description,+StageName,+Amount,+Probability,+CloseDate,+Type,+NextStep,+LeadSource,+IsClosed,+IsWon,+ForecastCategory,+ForecastCategoryName,+CampaignId,+HasOpportunityLineItem,+Pricebook2Id,+OwnerId,+CreatedDate,+CreatedById,+LastModifiedDate,+LastModifiedById,+SystemModstamp,+LastActivityDate,+FiscalQuarter,+FiscalYear,+Fiscal+from+Opportunity', 'GET', null, ForcetkDataStubs.metaQueryWithNext.Opportunity );
	});
	it( 'test QUERYNext1', function(){
		testAjaxCallGivesExpectedMeta( ForcetkDataStubs.metaQueryWithNext.Account.nextRecordsUrl, 'GET', null, ForcetkDataStubs.metaQueryWithoutNext.Account );
	});
	
	//-- -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	
	
	var testAjaxCallGivesExpectedMeta2 = function( expectedMeta ){
		expect( wasSuccessCalled ).toBe( true );
		expect( wasFailureCalled ).toBe( false );
		expect( metaResponse ).toBe( expectedMeta );
	};
	
	it( 'test forcetk versions', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.versions( response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaVersions );
	});
	it( 'test forcetk resources', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.resources( response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaResouces );
	});
	it( 'test forcetk describe global', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.describeGlobal( response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaGlobalDescribe );
	});
	it( 'test forcetk describe sObject', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.describe( 'Account', response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaObjectDescribeDetail.Account );
	});
	it( 'test forcetk create', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.create( 'Account', 'name="cuca"', response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( true );
	});
	it( 'test forcetk retrieve', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.retrieve( 'Account', '123456789012345', null, response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaGet.Account );
	});
	it( 'test forcetk UPDATE', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.update( 'Account', '123456789012345', null, response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( true );
	});
	it( 'test forcetk DELETE', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.del( 'Account', '123456789012345', response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( true );
	});
	
	it( 'test forcetk QUERY', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.query( 'select id from Account', response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaQueryWithNext.Account );
	});

	it( 'test forcetk QUERY2', function(){
		resetSuccessFailure();
		var response = new SuccessFailObject();
		
		forcetkClient.query( 'select Id, IsDeleted, AccountId, Name, Description, StageName, Amount, Probability, CloseDate, Type, NextStep, LeadSource, IsClosed, IsWon, ForecastCategory, ForecastCategoryName, CampaignId, HasOpportunityLineItem, Pricebook2Id, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, FiscalQuarter, FiscalYear, Fiscal from Opportunity', response.success, response.failure );
		
		testAjaxCallGivesExpectedMeta2( ForcetkDataStubs.metaQueryWithNext.Opportunity );
	});
	
	//-- -	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	
	
	
	
	/*
	it( 'test forctkClient.describe Account', function(){
		var responder = {
			handleSuccess: function( result ){
				this.successCalled = true;
			},
			handleFailure: function( result ){
				
			}
		};
		spyOn( responder, "handleSuccess" );
		spyOn( responder, "handleFailure" );
		
		forcetkClient.describe( 'Account', responder.handleSuccess, responder.handleFailure );
		expect( responder.handleSuccess ).toHaveBeenCalled();
		expect( responder.handleSuccess ).not.toHaveBeenCalled();
	});
	*/
	
	/*
	//-- test jquery isArray
	it( 'test jquery is Array positive', function(){
		var results = [1,2,3];
		expect( $j.isArray( results ) ).toBe( true );
	});
	
	it( 'test jQuery isArray null is not array', function(){
		var results = null;
		expect( $j.isArray( results ) ).toBe( false );
	});
	
	it( 'test jQuery isArray negative', function(){
		var results = 23;
		expect( $j.isArray( results ) ).toBe( false );
	});
	
	
	it( 'text jQuery isArray string is not array', function(){
		var results = '23';
		expect( $j.isArray( results ) ).toBe( false );
	});
	
	//-- test jQuery has expected results
	if( 'test jQuery has expectedResult is false if no response is found', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( null );
		expect( forcetkClient.hasExpectedResult() ).toBe( false );
	});
	
	it( 'test jQuery has expectedResult is false if empty array', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( [] );
		expect( forcetkClient.hasExpectedResult() ).toBe( false );
	});
	
	it( 'test jQuery has expectedResult is false if not array1', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( 1 );
		expect( forcetkClient.hasExpectedResult() ).toBe( false );
	});
	
	it( 'test jQuery has expectedResult is false if not array2', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( "hi" );
		expect( forcetkClient.hasExpectedResult() ).toBe( false );
	});
	
	it( 'test jQuery has expectedResult is true if the array has a value', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( [1] );
		expect( forcetkClient.hasExpectedResult() ).toBe( true );
	});
	
	it( 'test popExpectedResult pops a result', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( [1] );
		var result = forcetkClient.popExpectedResult();
		expect( result ).toBe( 1 );
	});
	
	it( 'test popExpectedResult popping a result has no more expected results', function(){
		forcetkClient.resetTest();
		forcetkClient.setExpectedResults( [1] );
		expect( forcetkClient.hasExpectedResult() ).toBe( true );
		var result = forcetkClient.popExpectedResult();
		expect( forcetkClient.hasExpectedResult() ).toBe( false );
	});
	*/
});
