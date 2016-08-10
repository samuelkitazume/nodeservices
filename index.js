#! /usr/bin/env node
'use strict';

var commandLineArgs = require("command-line-args");
var args_definitions = [{
	name: "registry",
	alias: "r",
	type: Boolean
},{
	name: "discovery",
	alias: "d",
	type: Boolean
},{
	name: "registry-port",	
	type: String,
	defaultValue: 4001
},{
	name: "discovery-port",	
	type: String,
	defaultValue: 4002
}];

var args = commandLineArgs(args_definitions);

if (args.registry) {	
	require("./registry.js")(args["registry-port"]);
}
if (args.discovery) {
	require("./discovery.js")(args["discovery-port"]);
}

console.log("Everything is right. Be cool.");