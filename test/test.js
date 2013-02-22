var assert = require('should');
var exec = require('child_process').exec;
var fs = require('fs');
var jira = require('../index');
var child;

var defaults = {
	"issueIdOrKey": "CRC-15",
	"projectKey": "CRC"
};

var options = {
	"config": {
		"username": "scott",
		"password": "smebberson.?",
		"host": "thememphisagency.atlassian.net"
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

	describe('should be able to resolve /rest/api/latest/issue', function () {

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

		describe('/rest/api/latest/issue/createmeta', function () {

			it('.get', function (done) {

				jira.issue.createmeta.get(requestOptions, function (response) {
					response.should.have.property('projects');
					done();
				});

			});

		});

	});

	describe('should be able to resolve /rest/api/latest/project', function () {

		it('.get', function (done) {

			jira.project.get(requestOptions, function (response) {
				response.should.be.an.instanceOf(Array);
				done();
			});

		});

		describe('/rest/api/latest/project/{key}', function () {

			it('.get', function (done) {

				requestOptions.key = defaults.projectKey;

				jira.project.get(requestOptions, function (response) {
					response.key.should.equal(requestOptions.key);
					done();
				});

			});

			describe('/rest/api/latest/project/{key}/components', function () {

				it('.get', function (done) {

					requestOptions.key = defaults.projectKey;

					jira.project.components.get(requestOptions, function (response) {
						response.should.be.an.instanceOf(Array);
						done();
					});

				});

			});



			describe('/rest/api/latest/project/{key}/versions', function () {

				it('.get', function (done) {

					requestOptions.key = defaults.projectKey;

					jira.project.versions.get(requestOptions, function (response) {
						response.should.be.an.instanceOf(Array);
						done();
					});

				});

			});

		});

	});

});
