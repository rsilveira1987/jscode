 /* SimpleXhrFactory is a Singleton JavaScript object who handles cross-browsing XMLHttRequest object instantiation. */

var SimpleXhrFactory = (function(){

	// private object instance
	var instance;

	// private mini-factory
	var XMLHttpFactories = [
 		function() {return new XMLHttpRequest()},
 		function() {return new AcvtiveXObject("Msxml2.XMLHTTP")},
 		function() {return new AcvtiveXObject("Msxml3.XMLHTTP")},
 		function() {return new AcvtiveXObject("Microsoft.XMLHTTP")}
	];

	// private method
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
		
		return xmlhttp;
	}
	
	// public method
	return {

		getInstance: function(){
			// control instance 
			if (!instance) {
				instance = createXMLHttpRequest();
			}

			return instance;
		}
	}

})();

/*
 * Example:
 *
 * var xhr = SimpleXhrFactory.getInstance();
 * if (xhr) {
 * 	// do something magic
 * }
 *
 */
