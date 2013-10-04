OGN.nav = {};

OGN.nav.dest = {};
OGN.nav.start = {};

OGN.nav.route = {};

OGN.nav.go = function (lat, lon) {
	OGN.nav.dest.lat = lat;
	OGN.nav.dest.lon = lon;

	$("body").html('<h2>Computing route...</h2><br /><img src="img/load.gif">');

	OGN.geo.getPosition(function (pos) {

		OGN.nav.start.lat = pos.coords.latitude;
		OGN.nav.start.lon = pos.coords.longitude;

		var url = "http://router.project-osrm.org/viaroute?loc=" +
					OGN.nav.start.lat + "," + OGN.nav.start.lon +
					"&loc=" + OGN.nav.dest.lat + "," + OGN.nav.dest.lon + "&instructions=true";

		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonp: "jsonp",
			cache: "true",
			success: function (data) {
				OGN.nav.route = data;
				OGN.nav.showMap();
			}
		});

	});


      
};

OGN.nav.showMap = function () {
	$( "body" ).load( "html/navigation.html", function () {
		OGN.nav.map = new ol.Map({
			target: 'map',
			layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
			controls: [],
			view: new ol.View2D({
				center: ol.proj.transform([OGN.nav.start.lon, OGN.nav.start.lat], 'EPSG:4326', 'EPSG:3857'),
				zoom: 17
			})
		});
	});
};