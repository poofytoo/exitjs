var Firebase = require("firebase");
var SerialPort = require("serialport").SerialPort

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600
});


var ref = new Firebase('https://poofytoo.firebaseIO.com/exitsign');
serialPort.on("open", function () {
ref.on('value', function(data) {
	var val = data.val();
		console.log(val);
		serialPort.write(val, function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
	});
})

