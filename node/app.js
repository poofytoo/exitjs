var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600
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

