'use strict';

function registry(ports) {
	var express = require("express"),
		_ = require("lodash"),
		bodyParser = require("body-parser"),
		Datastore = require("nedb"),
		validator = require("jsonschema").validate;
		
	var servicesDB = new Datastore({ filename: "./db/services.db" }),
		analyticsDB = new Datastore({ filename: "./db/analytics.db" });

	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var serviceSchema = {
		"type": "object",
		"properties": {
			"name": { "type": "string" },
			"version": { "type": "string" },
			"url": { "type": "string" }
		},
		"required": ["name", "version", "url"]
	};

	app.post("/register", function (req, res) {				
		req.body.serviceProperties = req.body.serviceProperties || "{}";
		req.body.serviceProperties = JSON.parse(req.body.serviceProperties);
		if (validator(req.body.serviceProperties, serviceSchema).valid) {			
			res.send("Nice service! I'm gonna register this :)");
		} else {			
			res.send("No properties found. You sure you sent me all properties required?");
		}
	});

	app.listen(3000);
	console.log("Registry opened and serving");

};

module.exports = registry;