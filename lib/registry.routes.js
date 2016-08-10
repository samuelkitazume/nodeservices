'use strict';
var router = require("express").Router(),
	serviceSchemas = require("./service.schemas"),
	Datastore = require("nedb"),
	validator = require("jsonschema").validate,
	resjson = require("./resjson");

var servicesDB = new Datastore({ filename: __dirname + "/../db/services" });
router.use(["/service"], function (req, res, next) {
	req.body.service = req.body.service || "{}";
	req.body.service = JSON.parse(req.body.service);
	next();
});

router.post("/service", function (req, res) {
	if (validator(req.body.service, serviceSchemas.registry).valid) {
		servicesDB.loadDatabase(function(e) {
			servicesDB.insert(req.body.service, function (err, newDoc) {					
				if (!err) {
					res.json(resjson.success(newDoc, "Serviço registrado"));
				} else {
					res.json(resjson.error(err));
				}
			});
		});
	} else {			
		res.json(resjson.error());
	}
});	

router.delete("/service", function (req, res) {	
	if (validator(req.body.service, serviceSchemas.registry).valid) {
		servicesDB.loadDatabase(function(e) {
			servicesDB.remove(req.body.service, { multi: true }, function (err, numRemoved) {					
				if (!err) {
					res.json(resjson.success(numRemoved, "Serviços desregistrados"));
				} else {
					res.json(resjson.error(err, "aqui"));
				}
			});
		});
	} else {			
		res.json(resjson.error());
	}
});

module.exports = router;