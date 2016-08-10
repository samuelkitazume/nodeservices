'use strict';

var router = require("express").Router(),
	serviceSchemas = require("./service.schemas"),
	Datastore = require("nedb"),
	validator = require("jsonschema").validate,
	resjson = require("./resjson");

var servicesDB = new Datastore({ filename: __dirname + "/../db/services" });

router.get("/service/:name/:version", function (req, res) {			
	servicesDB.loadDatabase(function(e) {		
		servicesDB.find({ "name": req.params.name, "version": req.params.version }).limit(1).exec(function (err, docs) {
			if (!err && docs.length) {
				res.json(resjson.success(docs[0], "Service found."));
			} else {
				res.json(resjson.error(err));
			}
		});
	});
});

router.get("/service/:name", function (req, res) {			
	servicesDB.loadDatabase(function(e) {		
		servicesDB.find({ "name": req.params.name }).sort({ "version": -1 }).limit(1).exec(function (err, docs) {
			if (!err && docs.length) {
				res.json(resjson.success(docs[0], "Service found."));
			} else {
				res.json(resjson.error(err));
			}
		});
	});
});

router.get("/service", function (req, res) {			
	servicesDB.loadDatabase(function(e) {		
		servicesDB.find({}).exec(function (err, docs) {
			if (!err && docs.length) {
				res.json(resjson.success(docs, "Service found."));
			} else {
				res.json(resjson.error(err));
			}
		});
	});
});

module.exports = router;