var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort
var express = require('express');
var exec = require('child_process').exec;
var app = express();

function say(phrase) {
	exec('python ../talk.py "' + phrase + '"');
}

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
	var serialPort = new SerialPort("/dev/ttyACM0", {
		baudrate: 9600
	});
}

app.get('/:id', function(req, res){
		var id = req.params.id;
		if (req.params.id.length < 2) {
			console.log(id);
			serialPort.write(id, function(err, results) {
				console.log('err ' + err);
				console.log('results ' + results);
			});
			res.send(id);
		}
		else {
			res.end();
		}
});

app.get('/say/:phrase', function(req, res) {
	var phrase = req.params.phrase;
	say(phrase);
	res.send(phrase)
})

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

var server = app.listen(8001, function() {
    console.log('Listening on port %d', server.address().port);
});
