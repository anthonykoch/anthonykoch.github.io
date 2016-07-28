'use strict';

var gulp = require('gulp');
var del  = require('del');

/**
 * Delete css and images folder
 * Doesn't delete js because js is completely managed by webpack
 */
gulp.task('clean', function () {
	return del([
		'assets/images/**',
		'assets/stylesheets/**',
		'assets/fonts/**'
	]);
});