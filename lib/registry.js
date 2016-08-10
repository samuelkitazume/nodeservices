'use strict';

var PORT_NUM = 4002;

function Registry(port) {

	port = port || PORT_NUM;

	var express = require("express"),
		bodyParser = require("body-parser");

	var registryRoutes = require("./registry.routes");		

	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));	

	app.use(registryRoutes);

	app.listen(port);
	console.log("Registry opened and serving on port:", port);

};

module.exports = Registry;