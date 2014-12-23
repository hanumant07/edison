/*
 * Node JS based server to turn on study light
 * Displays a http web page with a textbox to enter
 * ON/on or OFF/of
 */

//set up Gpio 5 as the switch control
var mraa = require('mraa');
var light_pon = new mraa.Gpio(5);
light_pon.dir(mraa.DIR_OUT);

//set up HTTP server to accept command
var http = require("http");
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function(req, res) {
	var body = "";
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		console.log('POSTed: ' + body);
		body = querystring.parse(body);
		console.log('decoded: ' + util.inspect(body));
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("<html>");
		res.write("<head>");
		res.write("<title>Study Light</title>");
		res.write("</head>");
		res.write("<body>");
		res.write("Enter Command on/off");
		res.write('<form action="/" method="post">');
		res.write('<input type="text" name="Command">');
		res.write('<input type="submit" value="Submit">');
		res.write('</form>');
		if (body.Command) {
			var parameter = body.Command;
			if(parameter) {
				res.write(parameter);
				if (parameter === "ON" || parameter === "on") {
					console.log("Turn Light on");
					light_pon.write(1);
				} else {
					console.log("Turn Light on");
					light_pon.write(0);
				}
			}
		}
		res.write("</body>");
		res.write("</html>");
		res.end();
	});
});

server.listen(1337);
console.log("Server is listening");
