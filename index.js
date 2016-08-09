#! /usr/bin/env node
'use strict';

var	app_arguments = process.argv.splice(2, process.argv.length -1);

if (app_arguments.indexOf("registry")) {	
	require("./registry.js")();
}
if (app_arguments.indexOf("discovery")) {
	require("./discovery.js")();	
}

console.log("Everything is right. Be cool.");