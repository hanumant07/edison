/*
 * Node JS based server
 */



//set up HTTP server to accept command
var http = require("http");
var querystring = require('querystring');
var util = require('util');


//alarm module
var alarm = require('alarm');
alarm = new alarm();

var server = http.createServer(function(req, res) { 
	var body = "";
	req.on('data', function (chunk) {
	});
	req.on('end', function () {
		body = req.url.split('?')[1]
		console.log('POSTed: ' + body);
		body = querystring.parse(body);
		console.log('decoded: ' + util.inspect(body));
		console.log(body);
		res.writeHead(200, {"Content-Type": "text/html"});
		if (body.Command) {
			console.log("command received");
			var parameter = body.Command;
			if(parameter) {
				alarm.process_command(parameter);
			}
		}
		res.end();
	});
});

server.listen(1337);
console.log("Server is listening");
