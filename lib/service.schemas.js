'use strict';
var schemas = {
	registry: {
		"type": "object",
		"properties": {
			"name": { "type": "string" },
			"version": { "type": "string" },
			"url": { "type": "string" },
			"ip": { "type": "string" }
		},
		"required": ["name", "version", "url"]
	}
};

module.exports = schemas;