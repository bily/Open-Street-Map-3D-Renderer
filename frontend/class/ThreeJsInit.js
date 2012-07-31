
var camera, scene, renderer, container, light, controls, stats;

function ThreeScene() {
	
	// general init
	this.init = function() {
		this.initContainer();
		this.initScene();
		this.initStats();
		this.initCamera();
		//this.initControls();
		
		// Canvas
//		this.initRenderer();
//		this.initLight();
		
		// WebGL
		this.initRendererWebGL();
		this.initLightWebGL();
	};

	this.initControls = function() {
		controls = new THREE.FirstPersonControls( camera );
        controls.movementSpeed = 70;
        controls.lookSpeed = 0.05;
//        controls.noFly = false;
//        controls.lookVertical = false;

		camera.position.x = -200;
		camera.position.y = 200;
		camera.position.z = -200;
		camera.lookAt(new THREE.Vector3(200, 0, 200));
	}
	
	this.initContainer = function() {
		container = document.createElement('div');
		document.body.appendChild(container);

		var info = document.createElement('div');
			info.style.position = 'absolute';
			info.style.top = '10px';
			info.style.width = '100%';
			info.style.textAlign = 'center';

		container.appendChild(info);
	};

	this.initScene = function() {
		scene = new THREE.Scene();
	};

	this.initLight = function() {
		//var ambientLight = new THREE.AmbientLight( 0xFFFFFF );
		//scene.add( ambientLight );
	}

	this.initLightWebGL = function() {
		light = new THREE.SpotLight();
      	light.position.set( 170, 330, -160 );
		light.castShadow = true;
	    scene.add(light);
	}

	this.initStats = function() {
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild(stats.domElement);
	};

	this.initCamera = function() {
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.x = -200;
		camera.position.y = 200;
		camera.position.z = -200;
		camera.lookAt(new THREE.Vector3(200, 0, 200));

		scene.add(camera);
	};

	this.initRendererWebGL = function() {
        renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		
		renderer.setClearColorHex(0xEEEEEE, 1.0);
		renderer.clear();

		renderer.shadowMapEnabled = true;
		container.appendChild(renderer.domElement);
	}

	this.initRenderer = function() {
        renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild(renderer.domElement);
	}

	this.drawGrid = function() {
		meshGrid = 	new THREE.Mesh( 
						new THREE.PlaneGeometry( 2000, 2000, 100, 100 ), 
						new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) 
					);
		meshGrid.receiveShadow = true;
		meshGrid.position.x = 500;
		meshGrid.position.y = -0.01;
		meshGrid.position.z = 500;
		
		camera.position.x = -200;
		camera.position.y = 200;
		camera.position.z = -200;
		camera.lookAt(new THREE.Vector3(200, 0, 200));

		// console.log(meshGrid);

		scene.add(meshGrid);
	}
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	controls.update();
	stats.update();
	renderer.render( scene, camera );


}







			




