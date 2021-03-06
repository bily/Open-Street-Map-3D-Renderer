function Area(data) {
	this.objData = data;
	this.geoBounds;
	this.pixelBounds;
	
	this.maxDecLat = 0;
	this.maxDecLon = 0;
	this.maxPixelX = 0;
	this.maxPixelY = 0;

	this.getPixelPosition = function(lat, lon) {
		var latDec = lat - this.geoBounds.x1;
		var lonDec = lon - this.geoBounds.y1;
		var x = (this.maxPixelX / this.maxDecLat) * latDec;
		var y = (this.maxPixelY / this.maxDecLon) * lonDec;
		return new Array(x, y);
	}

	this.setGeoBounds = function(minLat, minLon, maxLat, maxLon) {
		this.geoBounds = new Bounds(minLat, minLon, maxLat, maxLon);
		this.maxDecLat = maxLat - minLat;
		this.maxDecLon = maxLon - minLon;
	}

	this.setPixelBounds = function(x,y) {
		this.pixelBounds = new Bounds(0, 0, x, y);
		this.maxPixelX = x;
		this.maxPixelY = y;
	}

	this.getDistanceLatLon = function(lat1, lon1, lat2, lon2) {
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var radlon1 = Math.PI * lon1 / 180;
		var radlon2 = Math.PI * lon2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		
		// Ausgabe in Meter		
		dist = dist * 1.609344 * 1000;
		return dist;
	} 
}

