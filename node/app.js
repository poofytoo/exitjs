var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort
var express = require('express');
var exec = require('child_process').exec;
var app = express();

var PORT = "/dev/tty.usbmodem1421";// "/dev/ttyACM0";

var asleepTimer = {};
var signlogRef = new Firebase('https://poofytoo.firebaseio.com/exitsignlog');

function say(phrase) {
	var c;
  exec('python ../talk.py "' + phrase + '"');
  signlogRef.child('count').transaction(function(count){
    c = count;
    return count+1;
  }, function() {
    var logmsg = {};
    logmsg[c] = phrase;
    signlogRef.update(logmsg);
  });
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
	var serialPort = new SerialPort(PORT, {
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

app.get('/demand/:phrase', function(req, res) {
	var phrase = req.params.phrase;
	res.send(phrase);
  say(phrase);
})

var ref = new Firebase('https://poofytoo.firebaseIO.com/exitsign');
serialPort.on("open", function () {
  
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    ref.child('easy').once('value', function(data) {
      say(data.val().summon);
      ref.child('easy').child('trigger').set(1);
    });
  });

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
