var https = require('https');

/**
 * [GET] /rest/api/2/project/{key}/components
 *
 * @param  Object 	{options}
 * @param  Function {callback} the function to execute on success
 */
exports.get = function(options, callback) {

	var params = {
		method: 'GET',
		host: options.config.host,
		path: '/rest/api/2/project/' + options.key + '/components',
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'accept': 'application/json'
		}
	};

	var body = '';

	var request = https.request(params, function(response) {

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.end();
};