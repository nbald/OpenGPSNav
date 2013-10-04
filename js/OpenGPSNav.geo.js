OGN.geo = {};

OGN.geo._options = {
  enableHighAccuracy: true
};


OGN.geo.refreshHomePosition = function () {
	OGN.geo.getPosition(function (pos) {
		$("#current_location").html("Here : " + pos.coords.latitude + ", " + pos.coords.longitude);
	});
};

OGN.geo.getPosition = function (callback) {

	var _error =  function (err) {
		alert('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(callback, _error, OGN.geo._options);
};


OGN.geo.lookupAdress = function () {
	$("#q_btn").hide();
	$("#q_load").show();
	$.ajax({
	  url: "http://open.mapquestapi.com/nominatim/v1/search",
	  dataType: "jsonp",
	  data: {
	  	q: $("#q_address").val(),
	  	format: "json"
	  },
	  jsonp: "json_callback",
	  success: function (data) {
	  	if (data.length == 0) {
	  		$("#q_results").html("No results found");
	  	} else  {
			var items = [];
			$.each( data, function( key, val ) {
				var name = val.display_name;
				var lat = val.lat;
				var lon = val.lon;
				items.push( '<li onclick="OGN.nav.go('+lat+', '+lon+')">' + name + "</li>" );
			});

			$("#q_results").html($( "<ul/>", {html: items.join( "" )}));

	  	}
	  	$("#q_results").show();
		$("#q_load").hide();
	  	$("#q_btn").show();
	  }
	});
};