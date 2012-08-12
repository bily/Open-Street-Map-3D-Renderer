
var camera, scene, renderer, container, light, controls, stats, clock;
var mouse = { x: 0, y: 0 };

// var group 		= new THREE.Object3D();					
// var mergedGeo	= new THREE.Geometry();

function ThreeScene() {
	
	// general init
	this.init = function() {

		clock = new THREE.Clock();
		
		this.initContainer();
		this.initScene();
		
		// scene.fog = new THREE.FogExp2(0xEEEEEE, 0.005); // color, density
		

		this.initStats();
		this.initCamera();
		this.initControls();
		
		// Canvas
//		this.initRenderer();
//		this.initLight();
		
		// WebGL
		this.initRendererWebGL();
		this.initLightWebGL();
	};

	this.initControls = function() {
		controls = new THREE.FirstPersonControls( camera );
        controls.movementSpeed = 30;
        controls.lookSpeed = 0.05;
		controls.lookVertical = false; // Temporary solution; play on flat surfaces only
		controls.noFly = true;

		// Track mouse position so we know where to shoot
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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
		scene.fog = new THREE.FogExp2(0xEEEEEE, 0.0025); // color, density
	};

	this.initLight = function() {
		//var ambientLight = new THREE.AmbientLight( 0xFFFFFF );
		//scene.add( ambientLight );
	}

	this.initLightWebGL = function() {
		light = new THREE.SpotLight();
      	light.position.set( 400, 400, 400 );
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
		var VIEW_ANGLE = 45,
			ASPECT = window.innerWidth / window.innerHeight,
			NEAR = 0.01,
			FAR = 10000;

		camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR );
		camera.position.x = 27;
		camera.position.y = 10;
		camera.position.z = 400;
		
		// Rathausplatz
		camera.position.x = 560;
		camera.position.y = 1;
		camera.position.z = 560;


		camera.lookAt(new THREE.Vector3(1000, 0, 1000));

		scene.add(camera);
	};

	this.initRendererWebGL = function() {
        renderer = new THREE.WebGLRenderer({antialias: false});
		renderer.setSize( window.innerWidth, window.innerHeight );
		
		renderer.setClearColorHex(0xEEEEEE, 1.0);
		renderer.clear();

		renderer.shadowMapEnabled = true;
renderer.sortObjects = false;
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
						new THREE.MeshBasicMaterial( { color: 0x008000 } ) 
					);
		meshGrid.receiveShadow = true;
		meshGrid.position.x = 500;
		meshGrid.position.y = -0.01;
		meshGrid.position.z = 500;
		
		scene.add(meshGrid);
	}

	
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	controls.update(delta);
	stats.update();

	gui.__controllers[0].setValue(camera.position.x).updateDisplay();
	gui.__controllers[1].setValue(camera.position.y).updateDisplay();
	gui.__controllers[2].setValue(camera.position.z).updateDisplay();

	renderer.render( scene, camera );
}

function onDocumentMouseMove(e) {
	e.preventDefault();
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
}







			




