function AreaRenderer(way) {
	
	this.way = [];
	this.width = 1;
	this.color = 0x000080;

	this.setWay = function(way) {
		this.way = way;
	}

	this.isValid = function() {
		if(this.way.tags['area']
		&& this.way.tags['area'] == 'yes') {
			//console.log(this.way.tags);
			return true;
		}
		return false;
	}

	this.render = function() {
		
		this.draw3dStreet(this.way);
	}

	this.draw3dStreet = function(way) {
		var coordCount = way.coordinates.length;
	    var geometry = new THREE.Geometry();
		var coords = [];

		var apath = new THREE.SplineCurve3();

		for (var i = 0; i < coordCount; i++) {
		    var coord = way.coordinates[i];
		    var pixelCoord = area.getPixelPosition(coord.lat, coord.lon);
			var vector = THREE.Vector3(pixelCoord[0], 0, pixelCoord[1]);
			apath.points.push(vector);
		}

		var areaShape = new THREE.Shape( coords );
/*
		areaShape.closePath();
		areaShape.stroke();
		areaShape.fill();
		scene.add(areaShape);
*/


/*
		var material = new THREE.MeshBasicMaterial( { color: this.color } );
        var mesh = new THREE.Mesh(areaShape, material);
		mesh.receiveShadow = true;
        mesh.doubleSided = true;
*/
        
		
	}
}
