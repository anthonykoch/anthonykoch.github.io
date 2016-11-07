'use strict';

var gulp = require('gulp');
var del  = require('del');

/**
 * Deletes the css and images folders
 * Doesn't delete js because js is completely managed by webpack
 */
gulp.task('clean', function () {
	return del([
		'assets/images/**',
		'assets/stylesheets/**',
		'assets/fonts/**'
	]);
});