function Area(data) {
	this.objData = data;
	this.geoBounds;
	this.pixelBounds;
	this.objectRegister;
	this.meter = 1;
	
	this.maxDecLat = 0;
	this.maxDecLon = 0;
	this.maxPixelX = 0;
	this.maxPixelY = 0;

	this.getPixelPosition = function(lat, lon) {
		var latDec = lat - this.geoBounds.x1;
		var lonDec = lon - this.geoBounds.y1;
		var x = (this.maxPixelX / this.maxDecLat) * latDec;
		var y = (this.maxPixelY / this.maxDecLon) * lonDec;
		/* console.log(new Array(x, y))
asdasdasdsd */
		return new Array(x, y);
	}

	this.getDistance = function(lat1, lon1, lat2, lon2) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		dist = dist * 1609.344;
		return dist
	}                                                                           


	this.setGeoBounds = function(minLat, minLon, maxLat, maxLon) {
		this.geoBounds = new Bounds(minLat, minLon, maxLat, maxLon);
		this.maxDecLat = maxLat - minLat;
		this.maxDecLon = maxLon - minLon;
		this.setMeter();
	}

	this.setMeter = function() {
		this.meter = this.getDistance(this.minLat, 0, this.maxLat, 0) / this.maxPixelX;
		//controls.movementSpeed = this.meter * 10;
	}

	this.setPixelBounds = function(x,y) {
		this.pixelBounds = new Bounds(0, 0, x, y);
		this.maxPixelX = x;
		this.maxPixelY = y;
	}

	this.initSkybox = function () {
		var urlPrefix = "graphics/skybox1/";
		var urls = [ 
			urlPrefix + "posx.jpg", 
			urlPrefix + "negx.jpg",
			urlPrefix + "posy.jpg", 
			urlPrefix + "negy.jpg",
			urlPrefix + "posz.jpg", 
			urlPrefix + "negz.jpg" 
		];
		var textureCube = THREE.ImageUtils.loadTextureCube( urls );

		var shader = THREE.ShaderUtils.lib["cube"];

		var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
			uniforms['tCube'].texture= textureCube; // textureCube has been init before

		var material = new THREE.ShaderMaterial({
			fragmentShader  : shader.fragmentShader,
			vertexShader    : shader.vertexShader,
			uniforms    : uniforms
		});




		// build the skybox Mesh 
		skyboxMesh  = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000, 560, 0, 560, null, true ), material );
		// add it to the scene
		scene.add(skyboxMesh);
	}

	this.render = function() {
		var wayCount = this.objData.ways.length;
		// this.initSkybox(); - Geht nicht?!

		for (var indexWay = 0; indexWay < wayCount; indexWay++) {
			var way = this.objData.ways[indexWay];
            
			var objWayObject = this.objectRegister.getValidateObject(way);
			if(objWayObject) {
				objWayObject.render();
			}
		}
		this.objectRegister.merge();
	}

	this.registerObjects = function() {
		this.objectRegister = new ObjectRegister();
		this.objectRegister.register(new StreetRenderer());
		//this.objectRegister.register(new AreaRenderer());
		//this.objectRegister.register(new WaterwayRenderer());
		this.objectRegister.register(new BuildingRenderer());

//		this.objectRegister.register(new StreetRenderer());
	}
}

