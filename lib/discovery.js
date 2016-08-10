'use strict';

var PORT_NUM = 4002;

function discovery(port) {

	port = port || PORT_NUM;

	var express = require("express"),
		_ = require("lodash"),
		bodyParser = require("body-parser"),
		Datastore = require("nedb"),
		validator = require("jsonschema").validate;
		
	var servicesDB = new Datastore({ filename: "./db/services" }),
		analyticsDB = new Datastore({ filename: "./db/analytics" });

	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var serviceSchema = {
		"type": "object",
		"properties": {
			"name": { "type": "string" },
			"version": { "type": "string" },
			"url": { "type": "string" },
			"ip": { "type": "string" }
		},
		"required": ["name", "version", "url"]
	};

	app.use(["/register", "/unregister"], function (req, res, next) {
		req.body.serviceProperties = req.body.serviceProperties || "{}";
		req.body.serviceProperties = JSON.parse(req.body.serviceProperties);
		next();
	});

	app.post("/register", function (req, res) {		
		if (validator(req.body.serviceProperties, serviceSchema).valid) {
			servicesDB.loadDatabase(function(e) {
				servicesDB.insert(req.body.serviceProperties, function (err, newDoc) {					
					if (!err) {
						res.json({
							status: "ok",							
							message: "Nice service! I'm gonna register this :)",
							document: newDoc
						});
					} else {
						res.json({
							status: "error",
							message: "something went wrong",
							error: err
						});
					}
				});
			});
		} else {			
			res.json({
				status: "error",
				message: "something went wrong"
			});
		}
	});	

	app.post("/unregister", function (req, res) {
		if (validator(req.body.serviceProperties, serviceSchema).valid) {
			servicesDB.loadDatabase(function(e) {
				servicesDB.remove(req.body.serviceProperties, { multi: true }, function (err, numRemoved) {					
					if (!err) {
						res.json({
							status: "ok",							
							message: "Services unregistered",
							count: numRemoved
						});
					} else {
						res.json({
							status: "error",
							message: "something went wrong",
							error: err
						});
					}
				});
			});
		} else {			
			res.json({
				status: "error",
				message: "something went wrong"
			});
		}
	});

	app.listen(port);
	console.log("Discovery opened and serving on port:", port);

};

module.exports = discovery;