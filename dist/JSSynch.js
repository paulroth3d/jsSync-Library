/*
 *  Collection of asynchronous utils
*/
/*global Ext console DEBUG */

/**
 *  Object that represents a specific method invocation that can be called at any time
 *  (or repeatedly) in an agnostic manner.
 *  @module JSAsynch
 *  @class Callback
 *  @constructor
 *  @param thisObj (Object) the scope object (commonly used for 'this') that the method will run in.
 *  @param fn (Function) the function to call
**/
var Callback = function( thisObj, callbackFn ){
	
	this.init( thisObj, callbackFn );
	
	return( this );
};

/**
 *  Describes the object as being a callback
 *  @for Callback
 *  @property isCallback
**/
Callback.prototype.isCallback = true;

Callback.prototype.init = function( thisObj, callbackFn ){
	
	//if( thisObj && thisObj.thisObj && thisObj.callbackFn ){
	
	//-- use instanceof to determine how to importa instead of using hasProperty etc
	if( thisObj instanceof Callback ){
		//-- assume it is a callback
		this.thisObj = thisObj.thisObj;
		this.callbackFn = thisObj.callbackFn;
	} else {
		this.thisObj = thisObj;
		this.callbackFn = callbackFn;
	}
};

/**
 * Empty method to provide a NOOP
 * @method empty
 * @protected
 **/
Callback.prototype.empty = function(){};

/**
 *  Performs the callback.
 *  <p>Note, exec, callback, run, among other names could potentially be considered keywoards,
 *  so the name was chosen instead</p>
 *  <p>Calling the method with a null scope can cause some unexpected consequences</p>
 *  @method execCallback
 *  @param [PASSTHROUGH]
**/
Callback.prototype.execCallback = function(){
	//alert( 'callback was requested' );
	
	if( this.callbackFn ){
		this.callbackFn.apply( this.thisObj, arguments );
	}
};

/*
var cb = new Callback( this,
	function( noun, verb ){
		console.log( "a " + noun + " has " + verb + "ed" );
	}
);

cb.execCallback( "cat", "jump" );
*/

/**
 *  Empty callback if a callback must exist but not do anything.
 *  @module JSAsynch
 *  @class EmptyCallback
**/
var EmptyCallback = function(){
	var emptyFn = function(){};
	this.init( this, emptyFn );
	
	return( this );
};
EmptyCallback.prototype = new Callback();
EmptyCallback.prototype.constructor = EmptyCallback;

//-	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	

/**
 *  Object that supports both a success and a failure
 *  @class SuccessFailCallback
 *  @constructor
 *  @extends Callback
 *  @param {Object} successThis
 *  @param {Function} succcessFn
 *  @param {Object} failureThis
 *  @param {Function} failureFn
**/
var SuccessFailCallback = function( successThis, successFn, failureThis, failureFn ){
	this.successCB = new Callback( successThis, successFn );
	this.failureCB = new Callback( failureThis, failureFn );
};

SuccessFailCallback.prototype.isCallback = true;

/**
 *  Calls success method.
 *  (Meaning it calls the successFn using successThis as the scope
 *  @method success
 *  @for SuccessFailCallback
 *  @param [PASSTHROUGH]
**/
SuccessFailCallback.prototype.success = function(){
	this.successCB.execCallback.apply( this.successCB, arguments );
};

/**
 *  Calls failure method.
 *  (Meaning it calls the failureFn using failureThis as the scope
 *  @method fail
 *  @for SuccessFailCallback
 *  @param [PASSTHROUGH]
**/
SuccessFailCallback.prototype.fail = function(){
	this.failureCB.execCallback.apply( this.failureCB, arguments );
};

var emptySFCallback = new SuccessFailCallback( this, function(){}, this, function(){} );

/**
 *  Determines whether the object is a successFailCallback
 *  @global
 *  @method isSuccessFailCallback
 *  @param {Object} obj - object to be determined whether it is a successFailCallback
**/
var isSuccessFailCallback = function( obj ){
	return( obj && obj.success && obj.fail );
};

//-- sample success fail callbacks
function logMsg( msg ){
	if( typeof DEBUG === "undefined" && DEBUG !== false ){
		console.log( logMsg );
	}
}

function logObj( msg, obj ){
	logMsg( msg );
	logObj( obj );
}

function printArguments(){
	console.og( arguments );
}

/**
 *  simple function that claims sucess and console logs out all arguments.
 *  <p>Example usage: forcetkClient.query( myQuery, simpleSuccess, simpleFailure );</p>
 *  @global
 *  @method simpleSuccess
 *  @param [PASSTHROUGH]
**/
function simpleSuccess( successObj ){
	logMsg( "success" );
	printArguments( arguments );
}

/**
 *  Simple function that claims failure and console logs out all arguments
 *  <p>Example usage: forcetkClient.query( myQuery, simpleSuccess, simpleFailure );</p>
 *  @global
 *  @method simpleFailure
 *  @param [PASSTHROUGH]
**/
function simpleFailure( failObj ){
	logMsg( "fail" );
	printArguments( arguments );
}

/**
 *  Simple callback that simply claims success, or failure and console logs the results.
 *  <p>Note: it may be preferrable to use a different object with large datasets/volumes
 *  as consolelog, especially from the device can have issues with too many records being printed at a time</p>
 *  @property debugCB
 *  @global
**/
var debugCB = new SuccessFailCallback( this, simpleSuccess, this, simpleFailure );

/*
var successFailure = new SuccessFailCallback(
this, function( noun, verb ){
	debugger;
	console.log( "a " + noun + " " + verb + "ed" );
},
this, function( noun, verb ){
	debugger;
	console.log( "a " + noun + " failed to " + verb );
});
*/
//-- inline test
//successFailure.success( "dog", "jumped" );
//successFailure.fail( "programmer", "sleep " );


//-	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	

/**
 *  Object that has a set number of latches. Once all the latches are released
 *  @class CountdownCallback
 *  @constructor
 *  @param {int} latchCount
 *  @param {Object} thisObj
 *  @param {Function} callbackFn
 *  @extends Callback
**/
var CountdownCallback = function( latchCount, thisObj, callbackFn ){
	this.latchCount = latchCount;
	
	//Callback.apply( this, thisObj, callbackFn );
	this.init( thisObj, callbackFn );
	
	return( this );
};

CountdownCallback.prototype = new Callback();
CountdownCallback.prototype.constructor = CountdownCallback;

/**
 *  Adds a latch to the count as something else that needs to be waited for
 *  @method addStrap
 *  @for CountdownCallback
**/
CountdownCallback.prototype.addStrap = function(){
	this.latchCount++;
	console.log( "addStrap[" + this.latchCount + "]" );
};

/**
 *  Determines the number of latches remaining
 *  @method getLatchCount
**/
CountdownCallback.prototype.getLatchCount = function(){
	return( this.latchCount );
};

/**
 *  Determines if the latch is currently released
 *  @method isReleased
**/
CountdownCallback.prototype.isReleased = function(){
	return( this.latchCount <= 0 );
};

/**
 *  Releases a latch and executes the callbackFn if all the latches are released.
 *  @param boolean - whether the latch is currently released
 *  @method release
 *  @param [PASSTHROUGH]
**/
CountdownCallback.prototype.release = function(){
	this.latchCount--;
	
	console.log( "release[" + this.latchCount + "]" );
	
	if( this.latchCount < 0 ){ this.latchCount = 0; }
	
	if( this.latchCount === 0 ){
		this.callbackFn.apply( this.thisObj, arguments );
		return( true );
	} else {
		return( false );
	}
};

/*
var ccb = new CountdownCallback( 2, this,
	function( noun, verb ){
		console.log( "a " + noun + " has " + verb + "ed" );
	}
);
console.log( "is callback: " + ( ccb instanceof Callback ) );
console.log( 'latch:' + ccb.getLatchCount() );
ccb.release('dog','jump');
console.log( 'latch:' + ccb.getLatchCount() ); //-- released
ccb.release('dog','jump');
console.log( 'latch:' + ccb.getLatchCount() ); //-- still released
ccb.release('dog','jump');
*/

//- #	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	

/**
 * NamedLatch requires that all latches provided must be released
 * This means that latches must be unique or will throw an exception.
 * @class NamedLatch
 * @constructor
 * @extends CountdownCallback
 * @param latchList (Array<String>)
 * @param thisObj
 * @param callbackFn
 **/
var NamedLatch = function( latchList, thisObj, callbackFn ){
	this.latches = {};
	
	this.isChatty = false;
	
	if( latchList ){
		for( var i = 0; i < latchList.length; i++ ){
			this.addStrap( latchList[i] );
		}
	}
	
	this.init( thisObj, callbackFn );
};

var NamedLatchLock = function( latchName ){
	this.name = latchName;
};

NamedLatch.prototype = new Callback();
NamedLatch.prototype.constructor = NamedLatch;

NamedLatch.prototype.addStrap = function( latchName ){
	
	if( !latchName ){
		return;
	}
	
	//-- either the latches are constant to add, but harder to tell if all are done
	//-- or are harder to add and easier to tell if all are done
	
	if( this.latches.hasOwnProperty( latchName )){
		if( console && console.error ){
			console.error( "Latch[" + latchName + "] has already been used" );
		}
		
		throw( "ALREADY_USED" );
	} else {
		this.latches[ latchName ] = new NamedLatchLock( latchName );
	}
};

NamedLatch.prototype.getLatchCount = function(){
	var result = 0;
	var aLatch = null;
	for( var i in this.latches ){
		aLatch = this.latches[i];
		if( aLatch instanceof NamedLatchLock && !aLatch.isReleased ){
			result++;
		}
	}
	
	return( result );
};

NamedLatch.prototype.isReleased = function(){
	
	var newLatch = null;
	for( var i in this.latches ){
		newLatch = this.latches[i];
		
		// assert the namedLatchLock
		if( newLatch instanceof NamedLatchLock ){
			if( !newLatch.isReleased ){
				return( false );
			}
		}
	}
	
	return( true );
};

NamedLatch.prototype.hasLatch = function( latchName ){
	if( !latchName ){
		return;
	}
	
	return( this.latches.hasOwnProperty( latchName ));
};

/**
 *  Determines whether a named latch has been released
 *  @method isLatchReleased
 *  @param {String} latchName
**/
NamedLatch.prototype.isLatchReleased = function( latchName ){
	if( !latchName ){
		return;
	}
	
	if( this.latches.hasOwnProperty( latchName ) ){
		var myLatch = this.latches[ latchName ];
		return( myLatch.isReleased );
	} else {
		return( true );
	}
};

NamedLatch.prototype.release = function( latchName, callbackArguments ){
	if( !latchName ){
		return;
	}
	
	if( !this.latches.hasOwnProperty( latchName )){
		if( console && console.error ){
			console.error( "no latch was found with that name[" + latchName + "]" );
		}
		
		throw( "NOT_FOUND" );
	} else {
		var myLatch = this.latches[ latchName ];
		var wasAlreadyReleased = myLatch.isReleased;
		
		if( this.isChatty && console && console.log ){
			console.log( "released latch[" + latchName + "]" );
		}
		
		myLatch.isReleased = true;
		
		if( this.isReleased() ){
			this.callbackFn.apply( this.thisObj, callbackArguments );
		}
		
		return( !wasAlreadyReleased );
	}
	
	return( false );
};

/*
debugger;
var myNamedLatch = new NamedLatch( ["PhoneGap","Sencha","JQuery"], this, function( noun, verb ){
	console.log( "The " + noun + " just " + verb + "ed" );
});

myNamedLatch.release( "PhoneGap", ["dog", "jump"] );
myNamedLatch.release( "Sencha", ["dog", "jump"] );
myNamedLatch.release( "JQuery", ["dog", "jump"] );
*/

//-	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	
/**
 *  Object that represents a cyclical barrier
 *  @class CyclicalCallback
 *  @constructor
 *  @extends CountdownCallback
 *  @param {int} latchCount
 *  @param {Object} thisObj
 *  @param {Function} callbackFn
**/
var CyclicalCallback = function( latchCount, thisObj, callbackFn ){
	this.latchCount = latchCount;
	
	this.initialLatch = latchCount;
	
	//Callback.apply( this, thisObj, callbackFn );
	this.init( thisObj, callbackFn );
};

CyclicalCallback.prototype = new CountdownCallback();
CyclicalCallback.prototype.constructor = CyclicalCallback;

CyclicalCallback.prototype.release = function(){
	if( CountdownCallback.prototype.release.apply( this, arguments ) ){
		this.latchCount = this.initialLatch;
		return( true );
	} else {
		return( false );
	}
};

/*
ccb = new CyclicalCallback( 2, this, function( noun, verb ){
	console.log( 'a ' + noun + ' ' + verb + 'ed' );
});
console.log( "is callback: " + ( ccb instanceof Callback ) );
console.log( 'latch:' + ccb.getLatchCount() );
ccb.release('dog','jump');
console.log( 'latch:' + ccb.getLatchCount() ); //-- released
ccb.release('dog','jump');
console.log( 'latch:' + ccb.getLatchCount() );
ccb.release('dog','jump');
console.log( 'latch:' + ccb.getLatchCount() ); //-- released
ccb.release('dog','jump');
*/

/**
 *  Abstract class that contains a callback that should execute at some point after
 *  completing run. (This allows for asynchronous methods to run that should perform
 *  a callback when it has completed)
 *  @class RunnableCallback
 *  @constructor
**/
var RunnableCallback = function( callback ){
	this.callback = callback;
};

RunnableCallback.prototype.isCallback = true;

/**
 *  Calls the callback
 *  @method run
 *  @param [PASSTHROUGH]
**/
RunnableCallback.prototype.run = function(){
	//-- provide additional logic if needed
	this.callback.execCallback.apply( this, arguments );
};
