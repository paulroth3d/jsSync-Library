

var ScopeObj = function(){
	this.value = null;
	this.wasCalled = false;
};
ScopeObj.prototype.handler = function( someValue ){
	this.value = someValue;
	this.wasCalled = true;
}


