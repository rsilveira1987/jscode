 /* SimpleXhrFactory is a Singleton JavaScript object who handles cross-browsing XMLHttRequest object instantiation. */

var SimpleXhrFactory = (function(){
	//
	// private properties and methods
	//
	var instance;

	// private mini-factory
	var XMLHttpFactories = [
 		function() {return new XMLHttpRequest()},
 		function() {return new AcvtiveXObject("Msxml2.XMLHTTP")},
 		function() {return new AcvtiveXObject("Msxml3.XMLHTTP")},
 		function() {return new AcvtiveXObject("Microsoft.XMLHTTP")}
	];

	// private create function
	function createXMLHttpRequest() {

		var xmlhttp = false;
		
		for (var i=0,num=XMLHttpFactories.length; i<num; i++) {
			try {
				xmlhttp = XMLHttpFactories[i]();
			} catch (e) {
				continue;
			}
			break;
		}
		// if xmlhttp is a valid XMLHttp object, store it
		instance = (xmlhttp)? XMLHttpFactories[i] : instance;
		
		// return the object
		return xmlhttp;
	}
	
	//
	// public method
	//
	return {
		getInstance: function() {
			(instance) ? return instance() : return createXMLHttpRequest();
		}
	}
})();
