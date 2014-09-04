var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort
var express = require('express');
var app = express();

DEBUG = false

if (DEBUG) {
	var serialPort = {};
	serialPort.write = function(id, callback) {
		console.log(id);
	}
	serialPort.on = function(id, callback) {
		console.log(id);
	}
} else {
	var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
		baudrate: 9600
	});
}

app.get('/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
		serialPort.write(id, function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
		res.send(id);

});

var ref = new Firebase('https://poofytoo.firebaseIO.com/exitsign');
serialPort.on("open", function () {
ref.on('value', function(data) {
	var v = data.val();
		console.log(v.val);
		serialPort.write(v.val, function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
	});
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
