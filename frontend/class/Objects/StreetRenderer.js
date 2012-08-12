function StreetRenderer(way) {
	
	this.way = [];
	this.width = 10;
	this.color = 0x555555;

	this.setWay = function(way) {
		this.way = way;
	}

	this.objects = new THREE.Geometry();
	
	this.merge = function() {
		var material = new THREE.MeshBasicMaterial( { color: this.color } );		
		this.objects.computeFaceNormals();
		var group	= new THREE.Mesh( this.objects, material );
group.doubleSided = true;
		//group.castShadow = true;
		group.receiveShadow = true;
		scene.add(group);
	}

	this.isValid = function() {
		if(this.way.tags['highway']
		) {
			//console.log(this.way.tags);
			return true;
		}
		return false;
	}

	this.render = function() {
		
		// Flächen werden ausgeschlossen
		if(this.way.tags['area'] == 'yes') {
			return false;
		}

		if(this.way.tags['highway'] == 'residential') {
			this.width = 5 * area.meter;
		} else if (this.way.tags['highway'] == 'primary') {
			this.width = 6 * area.meter;
			//this.color = 0x505050;
		} else if (this.way.tags['highway'] == 'living_street') {
			this.width = 3 * area.meter;
		} else if (this.way.tags['footway']
		|| this.way.tags['highway'] == 'footway'
		|| this.way.tags['highway'] == 'service'
		) {
			this.width = 2 * area.meter;
			//this.color = 0xB0B0B0;
		} else {
			this.width = 10;
			//this.color = 0x505050;
			//console.log(this.way.tags);
		}

		this.draw3dStreet(this.way);
	}

	this.draw3dStreet = function(way) {
		var oldCoord;
		var newCoord;
		var height = Math.floor(Math.random() * 50) + 20;
		var coordCount = way.coordinates.length;
		var oldGeometry = null;
		for (var i = 0; i < coordCount; i++) {
		    var geometry = new THREE.Geometry();
		    var coord = way.coordinates[i];
		    newCoord = area.getPixelPosition(coord.lat, coord.lon);

		    if (oldCoord != undefined) {

				var oldcoord1 = this.getVectorPoint1(oldCoord[0],oldCoord[1],newCoord[0],newCoord[1], this.width);	    
				var oldcoord2 = this.getVectorPoint2(oldCoord[0],oldCoord[1],newCoord[0],newCoord[1], this.width);

				var newcoord1 = this.getVectorPoint1(newCoord[0],newCoord[1],oldCoord[0],oldCoord[1], this.width);
				var newcoord2 = this.getVectorPoint2(newCoord[0],newCoord[1],oldCoord[0],oldCoord[1], this.width);


		        var vector1 = oldcoord1; //new THREE.Vector3(oldCoord[0], 0      , oldCoord[1]);
		        var vector2 = oldcoord2; //new THREE.Vector3(newCoord[0], 0      , newCoord[1]);
		        var vector3 = newcoord1; //new THREE.Vector3(oldCoord[0], height , oldCoord[1]);
		        var vector4 = newcoord2; //new THREE.Vector3(newCoord[0], height , newCoord[1]);
		        
		        // Dem Objekt hinzuf?gen
				//if(oldGeometry) {
					//console.log(1);
				//	geometry.vertices.push(oldGeometry.vertices[2]);
				//	geometry.vertices.push(oldGeometry.vertices[3]);
				//} else {
					//console.log(2);
			        geometry.vertices.push(vector1);
			        geometry.vertices.push(vector2);
				//}
		        geometry.vertices.push(vector3);
		        geometry.vertices.push(vector4);
				// console.log(geometry.vertices);

// asdasdasd
//		        geometry.faces.push(new THREE.Face4(0, 2, 3, 1));
		        geometry.faces.push(new THREE.Face4(0, 1, 2, 3));
//		        geometry.faces.push(new THREE.Face4(3, 2, 1, 0));
				var material = new THREE.MeshBasicMaterial( { color: this.color } );
				oldGeometry = geometry;
		        var mesh = new THREE.Mesh(geometry, material);
				THREE.GeometryUtils.merge(this.objects, mesh);
//				
		        //
//		        scene.add(mesh);
		    }
		    oldCoord = newCoord;

		}
	}

	this.getVectorPoint1 = function(xA, yA, xB, yB, b) {

		var bruch = 1 / Math.sqrt( Math.pow(yB - yA, 2) + Math.pow(xA - xB, 2) );

		var xQ = 0;
		var yQ = 0;

		xQ = xB + (b / 2) * bruch * (yB - yA)
		yQ = yB + (b / 2) * bruch * (xA - xB)

		return new THREE.Vector3(xQ, 0, yQ);
	}

	this.getVectorPoint2 = function(xA, yA, xB, yB, b) {

		var bruch = 1 / Math.sqrt( Math.pow(yB - yA, 2) + Math.pow(xA - xB, 2) );

		var xQ = 0;
		var yQ = 0;

		xQ = xB - (b / 2) * bruch * (yB - yA)
		yQ = yB - (b / 2) * bruch * (xA - xB)

		return new THREE.Vector3(xQ, 0, yQ);
	}
}
