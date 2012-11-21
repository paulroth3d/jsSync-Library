/**
 *  File that provides the initial setup once all files are loaded.
 *  
 *  This includes setup of the forcetkClient and mmSync objects
 *  and closely resembles the samples/www/index.html page
**/
/*global forcetk mmSync */

var forcetkClient = null;

var jQueryNS = {
	
	hasLoaded : false,
	
	onLoad : function(){
		jQueryNS.hasLoaded = true;
		
		forcetkClient = new forcetk.Client( 'MOCK_CLIENT_ID', 'MOCK://loginURL' );
		forcetkClient.setSessionToken( 'MOCK_ACCESS_TOKEN', 'v25.0', 'MOCK://instanceURL' );
		forcetkClient.setRefreshToken( 'MOCK_REFRESH_TOKEN' );
	}
};

jQuery(document).ready( jQueryNS.onLoad );
