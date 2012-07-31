/*
require.paths = [ '/usr/lib/node' ];
var jQuery 	= require('jquery');
var fs 		= require('fs');

fs.readFile('./Chemnitz01.osm', 'utf8', function (err, data) {
  if (err) throw err;
	
	var osm = jQuery(data);
	var bounds = osm.find('bounds')

	var scene = new Array();
	scene['world'] = new Array();
	scene['world']['minlat'] = bounds.attr('minlat');
	scene['world']['minlon'] = bounds.attr('minlon');
	scene['world']['maxlat'] = bounds.attr('maxlat');
	scene['world']['maxlon'] = bounds.attr('maxlon');
	scene['polygons'] = new Array();
	
	var polygons = osm.find('relation').each( function () {
		jQuery(this).find('member').each( function () {
			var query = 'node[id=' + jQuery(this).attr('ref') + ']';
			console.log(osm.find(query)[0]);
//			var coord = ;

		});
	});
	
//	console.log(scene);
});
*/
