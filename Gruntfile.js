/*
 * grunt-readability
 * https://github.com/justinchapman/grunt-column-lint
 *
 * Copyright (c) 2014 Justin Chapman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: [ 'Gruntfile.js', 'tasks/*.js' ],
			options: { jshintrc: '.jshintrc' }
		},

		readability: {
			all: { files: { src: ["tasks/**/*.js"] } },
			test: { files: { src: ["test/fixtures/invalid.js"] } }
		}

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint']);

};
