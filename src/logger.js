/**
*  Utility functions for logging.
*  <p>Unlike the salesforce.util.logger, this does not make assumptions
*  about items in the DOM</p>
*  @module MobileMapping
*  @class Logger
**/
/*global cordova, debugMode, logTarget console */

if( typeof debugMode == "undefined" ){
	debugMode = true;
}
var debugMode = debugMode;

//-- set default values
if( typeof logTarget == "undefined" ){
	logTarget = 1;
}
var logTarget = logTarget;

/**
 *  Defines an INFO message
 *  @property LOG_INFO
**/
var LOG_INFO="info";

/**
 *  Defines a WARNING message
 *  @property LOG_WARN
**/
var LOG_WARN="warn";

/**
 *  Defines an ERROR message
 *  @property LOG_ERROR
**/
var LOG_ERROR="error";
		  
/**
 *  Logs a message by message type
 *  @method logMsg
 *  @param {String} msg - the message to log
 *  @param {LOG_INFO|LOG_WARN|LOG_ERROR} msgType - the type of message. Default LOG_INFO
**/
var logMsg = function( msg, msgType ){
	if(!msg){
		return;
	}
	
	if( msgType == LOG_INFO || msgType == LOG_WARN || msgType == LOG_ERROR ){
		//msgType
	} else {
		msgType = LOG_INFO;
	}
	
	//var logPlugin = cordova.require( "mobileMap/plugin/LogPlugin" );
	
	if( debugMode ){
		try {
			if( msgType == LOG_WARN ){
				console.warn( msg );
			} else if( msgType == LOG_ERROR ){
				console.error( msg );
			} else {
				console.log( msg );
			}
		} catch( err2 ){ console.log( 'error occurred while logging a message to console' ); }
		/*
		if( ((logTarget & 1) > 0) && window.plugins && logPlugin ){
			try {
				if( msgType == LOG_WARN || msgType == LOG_ERROR ){
					logPlugin.log( '[' + msgType + ']' + msg );
				} else {
					logPlugin.log( msg );
				}
			} catch( err ){ console.log( 'error occurred while logging to the loginPlugin' ); }
		}
		if( (logTarget & 2) > 0 ){
			try {
				if( msgType == LOG_WARN ){
					console.warn( msg );
				} else if( msgType == LOG_ERROR ){
					console.error( msg );
				} else {
					console.log( msg );
				}
			} catch( err2 ){ console.log( 'error occurred while logging a message to console' ); }
		}
		*/
	}
};

/**
 *  Logs a warning message
 *  <p>convenience function to LogMsg( msg, LOG_WARN )</p>
 *  @method logWarn
 *  @param {String} msg
**/
var logWarn = function( msg ){
	logMsg( msg, LOG_WARN );
};

/**
 *  Logs an error message
 *  <p>Convenience function to LogMsg( msg, LOG_ERROR )</p>
 *  @method logError
 *  @param msg
**/
var logError = function( msg ){
	logMsg( msg, LOG_ERROR );
};

/**
 *  Logs an object/message with a specific title
 *  @method logObj
 *  @param {string} objName - the title of the message to be provided
 *  @param {Object} obj - the object or message to be logged
**/
var logObj = function( objName, obj ){
	logMsg( objName );
	logMsg( obj );
};

//-- backwards compatability
var logToConsole = logMsg;

/**
 *  Prints an object with a specific title.
 *  <p>Similar to logObj, but logObj does not always show all properties of objects.</p>
 *  @method printObj
 *  @param {string} objName
 *  @param {Object} obj
**/
var printObj = function( objName, obj ){
	console.log( "printing[" + objName + "]" );
	if( obj ){
		for( var i in obj ){
			console.log( objName + "[" + (obj[i]) + "]:" + (typeof obj[i]) + ":[" + obj[i] + "]" );
		}
	}
	console.log( "done printing[" + objName + "]" );
};

//-- debug helpers
/**
 *  Prints the arguments to console log.
 *  @example printArguments( "1", 4, { name: "SomeObject"} ); // remember, arguments is reserved javascript value generated for each function call</p>
 *  @method printArguments
 *  @param [VARIABLE]
**/
var printArguments = function( args ){
	if( !args ){
		logMsg( "arguments[0]" );
	} else {
		console.log( "arguments[" + args.length + "]" );
		for( var i = 0; i < args.length; i++ ){
			console.log( "[" + i + "/" + args.length + "]:" );
			console.log( args[i] );
		}
		console.log( "arguments[" + args.length + "] DONE" );
	}
};

