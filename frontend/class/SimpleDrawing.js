function drawLine(way, properties) {
	properties = { color: 0x000000, linewidth: 1 }
    var material = new THREE.LineBasicMaterial(properties);

    var geometry = new THREE.Geometry();
    var coordCount = way.coordinates.length;
	var oldCoord;
    for (var i = 0; i < coordCount; i++) {
        var coord = way.coordinates[i];
        var arrPixelPos = area.getPixelPosition(coord.lat, coord.lon);
        var x = arrPixelPos[0];
        var y = 0;
        var z = arrPixelPos[1];

		newCoord = new THREE.Vector3(x, y, z);        
        geometry.vertices.push(newCoord);
		if(oldCoord != undefined) {
			//console.log(oldCoord.x, oldCoord.z, newCoord.x, newCoord.z);
		}
    	oldCoord = newCoord;


    }
    var line = new THREE.Line(geometry, material);
    scene.add(line);
}


