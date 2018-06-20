/*
************************
Created by Stepan Pesout
*****www.pesout.eu******
************************
*/

// ----- VARABLES DECLARATION -----
var latitude = 0;
var longitude = 0;
var lat_before = 0;
var lng_before = 0;

var elevation = 0;

var started = false;

// function log (info) {
// 	document.getElementById("log").innerHTML =
// 		info + "<br>" + document.getElementById("log").innerHTML;
// }

function savePosition (lat, lng) {
	latitude = lat;
	longitude = lng;
}

function saveElevation (elv) {
	elevation = elv;
}

function getPosition () {
	navigator.geolocation.getCurrentPosition(function(position){
		savePosition(position.coords.latitude, position.coords.longitude);
	});
}

function showPosition () {
		document.getElementById('latitude').innerHTML = latitude.toFixed(5);
		document.getElementById('longitude').innerHTML = longitude.toFixed(5);
}

function showElevation () {
		document.getElementById('elevation').innerHTML = elevation;
}

function getElevation (lat,lng) {
	var HttpClient = function() {
	    this.get = function(url, callback) {
	        var http_request = new XMLHttpRequest();
	        http_request.onreadystatechange = function() {
	            if (http_request.readyState == 4 && http_request.status == 200)
	                callback(http_request.responseText);
	        }
	        http_request.open("GET", url, true);
	        http_request.send(null);
	    }
	}

	var elevation_src="https://cors.io/?http://maps.googleapis.com/maps/api/elevation/json?locations="
		+ lat + "," + lng;
	var client = new HttpClient();
	client.get(elevation_src, function(response) {
	    var data = JSON.parse(response);


	    if (data.status == "OK" && data.results[0].elevation > -3000)
		 	saveElevation(data.results[0].elevation.toFixed(1));
		else
			document.getElementById("log").innerHTML =
				document.getElementById("log").innerHTML + "<br>"
				+ document.getElementById('stat').innerHTML + ": "
			 	+ data.status;


	 });
}

function run () {
	setTimeout("getElevation(latitude,longitude); showElevation();", 50);
	getPosition();
	showPosition();

	if (compDirection(lat_before, lng_before, latitude, longitude) == "CHANGED") { // TODO EDIT THIS
		document.getElementById('changes').innerHTML = document.getElementById('changes').innerHTML + "<br>" + "CHANGED>" +	" lat: " + latitude + " lng: " + longitude +	"; stat: " + document.getElementById('stat').innerHTML;
		setTimeout(
			"document.getElementById('elevs').innerHTML = document.getElementById('elevs').innerHTML + ',' + Math.round(elevation)"
		, 1500);
		setTimeout("drawGraph(document.getElementById('elevs').innerHTML)", 1600);
	}

	lat_before = latitude;
	lng_before = longitude;

	document.getElementById('stat').innerHTML++;
}

function debug_test1 () {
	document.getElementById('latitude').innerHTML++;
	latitude++;
}

function startStop() {
	if (started) {
		clearInterval(timer);
		started = false;
		document.getElementById('start').innerHTML = "start";
	} else {
		timer = setInterval('run()', 200);
		started = true;
		document.getElementById('start').innerHTML = "stop";
	}

}


// ----- CANVAS & TESTS -----
function compDirection (lat1, lng1, lat2, lng2) {
	lat_d = lat2 - lat1;
	lng_d = lng2 - lng1;

	lat_d = lat_d.toFixed(6);
	lng_d = lng_d.toFixed(6);

	if (lat_d == 0 && lng_d == 0) {
		// first_run = false;
		return "NO_CHANGE";
	}
	return "CHANGED"
}
