
function World() {
	this.arrAreas = [];
	
	this.addArea = function(objArea) {
		this.arrAreas.push(objArea);
	}
	
	this.draw = function() {
		this.drawWorld();
		for(var k = 0; k < this.arrAreas.length; k++ ) {
			this.arrAreas[k].draw();
		}
	}

	this.drawWorld = function() {

	}
}
