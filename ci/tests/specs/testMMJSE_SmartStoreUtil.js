describe('Test the MMJSE_SmartStoreUtil class methods',function(){
	//setup
	beforeEach(function(){
		var indexSpec=[
			{"path":"Id","type":"string"},
			{"path":"Name","type":"string"}
		];

		//register a soup
		navigator.smartstore.registerSoup("Contact",
			indexSpec,                                  
			function(soupName){
				//upsert records
				navigator.smartstore.upsertSoupEntries(soupName,window.smartStoreData3Records, function(){
				}, function(){
					console.log("Upsert Soup Entries Error");
					console.log(error.message);
					expect(error).toBe(null);
				});	
			}, 
			function(error) {
    			console.log("Register Soup Error");
    			console.log(error.message);
    			expect(error).toBe(null);
			});
	});
	//teardown
	afterEach(function(){
		navigator.smartstore.removeSoup("Contact",function(){},function(error){
			console.log("Remove Soup Error");
			console.log(error.message);
			expect(error).toBe(null);
		});
	});

	//test specs
	it( 'LoadAllRecords returns all records from cursor', function(){
		var querySpec = navigator.smartstore.buildAllQuerySpec("Id", null, 10);
		navigator.smartstore.querySoup("Contact", querySpec, function(cursor){
			var records = [];
			//load all records
			records = MMJSE_SmartStoreUtil.LoadAllRecords(cursor,records);

			//expect
			expect( records.length ).toEqual( 3 );	

		}, function(error){
			console.log("Query Soup Error");
			console.log(error.message);
			expect(error).toBe(null);
		});
	});
	
	it( 'LoadRecordsWithLimit returns limited record set from cursor', function(){
		var querySpec = navigator.smartstore.buildAllQuerySpec("Id", null, 10);

		navigator.smartstore.querySoup("Contact", querySpec, function(cursor){
			var records = [];
			//load all records
			records = MMJSE_SmartStoreUtil.LoadRecordsWithLimit(2,cursor,records);

			console.log(records);

			//expect
			expect( records.length ).toEqual( 2 );	

		}, function(error){
			console.log("Query Soup Error");
			console.log(error.message);
			expect(error).toBe(null);
		});
	});	
});




