// Interface
var Interface = function(newName, newMethods) {
	    
	//
	// private attributes
	// 
	var name,
      methods = [];

	//
	// privileged methods
	// 
	this.getName = function(){
		return name;
	};

	this.getMethods = function(){
		return methods;
	};

	// constructor logic
    if(arguments.length != 2) {
        throw new Error("Interface Constructor called with " + arguments.length
          + "arguments, but expected exactly 2.");
    }

    if(!Array.isArray(newMethods)) {
    	throw new Error("Interface constructor expects its second argument to be an array.");
    }
    
    for(var i = 0, len = newMethods.length; i < len; i++) {
        if(typeof newMethods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " 
              + "passed in as a string.");
        }      
    }

    // Constructor Logic
    name = newName;
    methods = newMethods;

};

// ensure implements to all objects
Object.prototype.ensureImplements = function(interfaceObject){
	// validation
	if(!interfaceObject instanceof Interface) {
        throw new Error("Function ensureImplements expects its argument to be an instance of Interface.");
    }

	for(var i=0, len=interfaceObject.getMethods().length; i < len; i++ ){
		var method = interfaceObject.getMethods()[i];
		if(!this[method] || typeof this[method] !== 'function'){
			throw new Error(interfaceObject.getName() + " interface must implement method " + method);
		}
	}

};
