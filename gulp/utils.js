'use strict';

var gulp = require('gulp');
var Editor = require('editor-connect');
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
module.exports.handleError = function handleError(taskName) {
	if (typeof taskName !== 'string') {
		var err = new Error('No task name was specified for the error handler');
		throw err;
	}

	var plumberErrorHandler = {
		errorHandler: function (err) {
			if (sublime) {
				sublime.showError(err, taskName)
			}

			console.log(err.message);
			this.emit('end');
		}
	};

	return plumberErrorHandler;
};