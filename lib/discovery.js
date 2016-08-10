'use strict';

var PORT_NUM = 4001;

function Discovery(port) {

	port = port || PORT_NUM;

	var express = require("express"),
		bodyParser = require("body-parser");		

	var discoveryRoutes = require("./discovery.routes");
	
	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(discoveryRoutes);

	app.listen(port);
	console.log("Discovery opened and serving on port:", port);

};

module.exports = Discovery;