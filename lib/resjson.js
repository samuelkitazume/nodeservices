var resjson = {
	error: function error(err, message) {
		return {
			status: "error",
			message: message || "something went wrong",
			err: err || []
		};
	},
	success: function success(data, message) {
		return {
			status: "success",
			message: message || "action completed",
			data: data || []
		};
	}	
};

module.exports = resjson;