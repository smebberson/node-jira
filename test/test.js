var assert = require('should');
var exec = require('child_process').exec;
var fs = require('fs');
var jira = require('../index');
var child;

var defaults = {
	"issueIdOrKey": ""
};

var options = {
	"config": {
		"username": "",
		"password": "",
		"host": ""
	}
};

var requestOptions;

if (!options.config.username.length || !defaults.issueIdOrKey.length) {
	console.log('Before tests can be run, please open ./test/test.js and customise options and defaults.');
	process.exit(0);
}

describe('Using jira', function () {

	this.timeout(5000);

	beforeEach(function () {

		requestOptions = {
			"config": options.config
		};

	});

	describe('should be able to query /rest/api/latest/issue', function () {

		it('.get', function (done) {

			requestOptions.issueIdOrKey = defaults.issueIdOrKey;

			jira.issue.get(requestOptions, function (response) {
				response.should.have.property('id');
				response.should.have.property('self');
				response.should.have.property('key');
				response.key.should.equal(requestOptions.issueIdOrKey);
				response.should.have.property('fields');
				done();
			});

		});

		describe('specifically, issue/createmeta', function () {

			it('.get', function (done) {

				jira.issue.createmeta.get(requestOptions, function (response) {
					response.should.have.property('projects');
					done();
				});

			});

		});

	});

});
