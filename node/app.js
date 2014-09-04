var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort
var express = require('express');
var app = express();

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600
});

app.get('/e', function(req, res){
		serialPort.write('e', function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
		res.send('e');

});

app.get('/f', function(req, res){
		serialPort.write('f', function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
		res.send('f');
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
