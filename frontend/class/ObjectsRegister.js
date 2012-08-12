function ObjectRegister() {
	
	this.arrObjects = [];

	this.register = function(obj) {
		this.arrObjects.push(obj);
	}

	this.getValidateObject = function(way) {
		var objectCount = this.arrObjects.length;
		for (var indexObject = 0; indexObject < objectCount; indexObject++) {
			var renderobject = this.arrObjects[indexObject];
				renderobject.setWay(way);
			if(this.arrObjects[indexObject].isValid()) {
				return this.arrObjects[indexObject];
			}
		}
	}

	this.merge = function() {
		var objectCount = this.arrObjects.length;
		for (var indexObject = 0; indexObject < objectCount; indexObject++) {
			var renderobject = this.arrObjects[indexObject];
				renderobject.merge();
		}
	}
}
