/**
 *  Testing methods
**/
function MOCK_ChangeNetworkStatus( newStatus ){
	try {
		navigator.network.connection.type = newStatus;
	} catch( err ){
		console.log( "MOCK: unable to set the networWIk status programatically:" + newStatus );
	}
}

/**
 *  JavaScript stubs
**/
if( typeof Connection == "undefined" ){
	Connection = {};
	Connection.UNKNOWN = "UNKNOWN";
	Connection.ETHERNET="ETHERNET";
	Connection.WIFI="WIFI";
	Connection.CELL_2G="CELL_2G";
	Connection.CELL_3G="CELL_3G";
	Connection.CELL_4G="CELL_4G";
	Connection.NONE="NONE";
}

if( typeof navigator.network == "undefined" ){
	navigator.network = {};
}

if( typeof navigator.network.connection == "undefined" ){
	navigator.network.connection = {};
}

if( typeof navigator.network.connection.type == "undefined" ){
	MOCK_ChangeNetworkStatus( Connection.UNKNOWN );
}
