#Documenting JS Files

JavaScript is prototype based as opposed to class based (For more information see [here](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Details_of_the_Object_Model)). This carries over a couple difficulties when generating documentation.  Coupling that, with the loose types (and occasional writing styles) and it is quite difficult to find a complete and accurate JavaScript automatic documentation tool.

After initially testing a number of products, we settled on [YUIDoc](http://yui.github.com/yuidoc/) as the documentation generation tool.  Other competitors (such as [JSDoc](http://code.google.com/p/jsdoc-toolkit/), [RoboDoc](http://www.robodoc.com/) and [NaturalDocs](http://www.naturaldocs.org/)) are quite good, but there were varying degrees of completeness, flexibility, templatability, quality and warning/error messaging.

However, the methods described here can be (mostly) ported to other documentation tools with little effort.

#Installing YUIDoc

Currently yuidoc is running on our Continuous Integration Server (Jenkins) and is committed to dist/MM_JSSyncEngine_docs.zip

This will work fine for most cases.

To run locally, you will need yuidoc installed:

## npm

YUIDoc is a node package, and can be installed with [npmjs](http://nodejs.org/).

Install npmjs [here](http://nodejs.org/download/) or continue if you already have it installed.

## YUIDoc install

Once you have npm installed, run

	npm -g install yuidocjs
	
This will install all the prerequisite files (and might take a second)

After the installation, go to the base directory and run:

	ant doc
	
The compiled docs are placed under 'doc/gen', with the zip being placed under  the 'dist' directory.

#JavaDoc Style Comments

JavaDoc Style comments are comments formatted in a specific way to separate out from standard comments (either commented out code or developer intended messages).  These are placed before the item being described, and include a description along with additional *tags* that describe other bits of helpful information.

Please see [here](http://en.wikipedia.org/wiki/Javadoc) for basic formatting styles of JavaDoc style comments.

The following is an example JavaDoc style comment

	/**
	 * This is a sample description of a method
	 * @since 1.0
	 * @method mult
	 * @param {double} val1
	 * @param {double} val2
	 * @return {double} - the result of val1 multiplied by val2
	 **/
	function mult( val1, val2 ){
		return( val1 * val2 );
	}

*Note* - Traditional JavaDoc comments include a star before each line, but this requirement is lax with yuidocs.  The following is also valid:

	/**
	  This is a sample description of a method
	  @since 1.0
	  @method mult
	  @param {double} val1
	  @param {double} val2
	  @return {double} - the result of val1 multiplied by val2
	**/
	function mult( val1, val2 ){
		return( val1 * val2 );
	}

The initial part of the javaDoc is simple text, and does not require any tags. This is considered the description.

The tags are marked in the code with an '@' symbol - where @since, @method, @param and @return are used.

## YUIDoc Tags

YUIDocs supports the following tags:
(The purpose of thid documentation is not to provide an exhaustive or complete list of tags. List of full tags (and their descriptions can be found [here](http://yui.github.com/yuidoc/syntax/index.html))

### High Level
<ul>
<li>@module</li>
<li>@main</li>
<li>@class</li>
<li>@method</li>
<li>@event</li>
<li>@property</li>
<li>@attribute</li>
</ul>

### Package Management

<ul>
<li>@submodule</li>
<li>@namespace</li>
<li>@extends</li>
</ul>

### Visibility
<ul>
<li>@private</li>
<li>@protected</li>
</ul>

### HighLighted Tags
<ul>
<li>@static</li>
<li>@constructor</li>
<li>@param</li>
<li>@return</li>
<li>@for</li>
<li>@type</li>
<li>@async</li>
<li>@uses</li>
<li>@example</li>
<li>@chainable</li>
<li>@deprecated</li>
<li>@since</li>
</ul>

###  Additional Tags
<ul>
<li>@final</li>
<li>@readOnly</li>
<li>@config</li>
<li>@writeOnce</li>
<li>@optional</li>
<li>@required</li>
<li>@requires</li>
<li>@default</li>
<li>@beta</li>
<li>@bubbles</li>
<li>@extension</li>
<li>@extensionfor</li>
<li>@extension_for</li>
</ul>

Example:

	/**
	 SalesForce Ajax Connector
	 @module SalesForceAjaxToolkit
	 @class sforce
	 **/
	sforce = {};
	
	/**
	 * @property internal
	 **/
	sforce.internal = {};
	
	/**
	 @class sforce.StringBuffer
	 @for sforce
	 @constructor
	 **/
	sforce.StringBuffer = function(){ … }
	
	/**
	 *  @method append
	 *  @for sforce.StringBuffer
	**/
	sforce.StringBuffer.prototype.append = function(){ … }
	
	/**
	 @method getInternal
	 @return {Object}
	**/
	sforce.getInternal = function(){ … }
	

#JS Specific Documentation

In addition to standard JavaDoc style comments, a few additional aspects are used:

## @module

The module tag should be applied to the class to better separate out classes used in one library (such as SalesForce.com AjaxToolkit or Forcetk) from another (such as MM JS Synch)

The generated documentation utilizes these modules to better separate out which classes are used in which library.

**Note: the module defined above in a file is applied to all other items below, unless specified differently **

## @class

Apply the @class {className} attribute to each class JavaDoc. Classes that do not have this, may not be found in the documentation.

Classes that Extend others should use @extends.

Constructor methods of those classes should use @constructor

## @method

Apply the @method {methodName} to each method JavaDoc. Methods that do not have this may not be found in the documentation.

## @property / @attribute

Apply the @property {propertyName} to each property, to specify that the property belongs to the current class. Otherwise the property may not be found in the documentation.

## @constructor

Apply the @constructor attribute to the constructor for each class.

## Visibility and Package Management

All methods imply public visibility unless otherwise set as @protected or @private

Internal methods must use these tags.


## @for

When defining multiple classes in the same file (or sub-classes) utilize the @for tag to specify which container the method/attribute/property/etc belongs to. Please note: for is only needed in those cases.

For example:

	/**
	 SalesForce Ajax Connector
	 @module SalesForceAjaxToolkit
	 @class sforce
	 **/
	sforce = {};
	
	/**
	 * @property internal
	 **/
	sforce.internal = {};
	
	/**
	 @class sforce.StringBuffer
	 @for sforce
	 @constructor
	 **/
	sforce.StringBuffer = function(){ … }
	
	/**
	 *  @method append
	 *  @for sforce.StringBuffer
	**/
	sforce.StringBuffer.prototype.append = function(){ … }
	
	/**
	 @method getInternal
	 @return {Object}
	**/
	sforce.getInternal = function(){ … }
	
