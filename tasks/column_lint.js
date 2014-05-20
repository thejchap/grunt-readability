/*
 * grunt-column-lint
 * https://github.com/justinchapman/grunt-column-lint
 *
 * Copyright (c) 2014 Justin Chapman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask(
		'column_lint',
		'Enforce 80 column max line width',
	function () {

		var errorFiles = [];

		// Iterate over all specified file groups.
		this.files.forEach(function (file) {
			var contents = file.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {

					grunt.log.warn(
						"Source file '" + filepath + "' not found."
					);

					return false;
				} else { return true; }
			}).map(function (filePath) {
				var contents = grunt.file.read(filePath),
					linesArray = contents.trim().split("\n"),
					foundError = false;

				linesArray.forEach(function (line) {
					if (line.length > 80 && foundError === false) {
						foundError = true;
						errorFiles.push(filePath);
					}
				});

			});
		});

		if (errorFiles.length > 0) {
			grunt.log.error(
				errorFiles.length +
				" files contain lines over 80 columns wide"
			);

			grunt.log.writeln(" ");
			grunt.log.writeln("Invalid files:");

			errorFiles.forEach(function (filePath) {
				grunt.log.errorlns(filePath);
			});

			return false;
		}

		grunt.log.ok(
			'Column width check passed: ' +
			this.files.length +
			' file(s)'
		);

	});

};
