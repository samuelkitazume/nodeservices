'use strict';

var PORT_NUM = 4001;

function registry(port) {

	port = port || PORT_NUM;

	var express = require("express"),
		bodyParser = require("body-parser"),
		Datastore = require("nedb"),
		validator = require("jsonschema").validate;
		
	var servicesDB = new Datastore({ filename: "./db/services" });

	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var serviceSchema = {
		"type": "object",
		"properties": {
			"name": { "type": "string" },
			"version": { "type": "string" }
		}
	};

	app.use(["/get"], function (req, res, next) {
		req.body.service = req.body.service || "{}";
		req.body.service = JSON.parse(req.body.service);
		next();
	});

	app.post("/get", function (req, res) {		
		if (validator(req.body.service, serviceSchema).valid) {
			servicesDB.loadDatabase(function(e) {
				if (req.body.service.name === undefined || req.body.service.name === null) {
					servicesDB.find({}).exec(function (err, docs) {
						if (!err) {
							res.json({
								status: "ok",							
								message: "Services found",
								document: docs
							});
						} else {
							res.json({
								status: "error",
								message: "something went wrong",
								error: err
							});
						}
					});	
				} else {
					servicesDB.find(req.body.service).limit(1).exec(function (err, docs) {
						if (!err) {
							res.json({
								status: "ok",							
								message: "Service found",
								document: docs[0]
							});
						} else {
							res.json({
								status: "error",
								message: "something went wrong",
								error: err
							});
						}
					});
				}				
			});
		} else {			
			res.json({
				status: "error",
				message: "something went wrong"
			});
		}
	});	

	app.listen(port);
	console.log("Registry opened and serving on port:", port);

};

module.exports = registry;