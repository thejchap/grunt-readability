/*
 * grunt-readability
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
		'readability',
		'Enforce 80 column max line width',
	function () {

		var errorLines = [],
            filesScanned = 0,
            exclude = this.data.files.exclude || [];

		// Iterate over all specified file groups.
		this.files.forEach(function (file) {
			var contents = file.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {

					grunt.log.warn(
						"Source file '" + filepath + "' not found."
					);

					return false;
				} else if () {

                } else { return true; }
			}).map(function (filePath) {
				var contents = grunt.file.read(filePath),
					linesArray = contents.trim().split(/\r?\n/);

				filesScanned += 1;

				linesArray.forEach(function (line, index) {
					if (line.length > 80 && exclude.indexOf(filePath) === -1) {
						errorLines.push({
							path: filePath,
							lineNumber: index + 1
						});
					}
				});

			});
		});

		if (errorLines.length > 0) {
			grunt.log.error(
				errorLines.length +
				" lines over 80 columns wide"
			);

			grunt.log.writeln(" ");
			grunt.log.writeln("Invalid lines:");

			errorLines.forEach(function (error) {
				grunt.log.error(error.path + ": Line " + error.lineNumber);
			});

			return false;
		}

		grunt.log.ok(
			'Column width check passed: ' +
			filesScanned +
			' file(s)'
		);

	});

};
