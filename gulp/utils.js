'use strict';

var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var Editor  = require('editor-connect');
var sublime;

/**
 * Setup for tasks
 *
 * We setup sublime in a task so it doesn't keep the gulp file running
 * when only executing one task.
 */
gulp.task('utils', function () {
	sublime = Editor
		.sublime
		.configure({ gulp: gulp })
		.connect();
});

/**
 * Displays an error message and sends an error message to Sublime Text
 */
exports.catche = function catche(taskName) {
	if (typeof taskName !== 'string') {
		var err = new Error('No task name was specified for the error handler');
		throw err;
	}

	return plumber({
		errorHandler: function (err) {
			if (sublime) {
				sublime.showError(err, taskName)
			}

			console.log(err.message);
			this.emit('end');
		}
	});
};