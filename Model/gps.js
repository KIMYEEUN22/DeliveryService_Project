const express = require('express');
const app = express();
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
var port = '3001';
var getData = [];
var getLat = [];
var getLon = [];
var Lat, Lon;
var arduinoSerialPort = new SerialPort('/dev/cu.usbmodem14301', {
	baudRate : 9600
});
const parser = arduinoSerialPort.pipe(new Readline({ delimiter: '\r\n' }));
// will have 8 bytes per data event
parser.on('data', function(data) {
	for (var i = 0; i < 17; i++) {
		if (i < 8) {
			getLat[i] = data[i];
		} else {
			getLon[i - 8] = data[i];
		}
	}
	for (var i = 7; i > 1; i--) {
		getLat[i + 1] = getLat[i];
		if (i == 2) {
			getLat[i] = '.';
		}
	}
	for (var i = 8; i > 2; i--) {
		getLon[i + 1] = getLon[i];
		if (i == 3) {
			getLon[i] = '.';
		}
	}
	Lat = getLat.join('');
	Lon = getLon.join('');
	getData = [
		{ lat: Lat },
		{ lon: Lon }
	];
	console.log('Latitude', Lat);
	console.log('Longitude', Lon);
	console.log(data);
});

app.get('/', function(req, res) {
	return res.send(getData);
});

app.listen(port, function() {
	console.log('');
});
