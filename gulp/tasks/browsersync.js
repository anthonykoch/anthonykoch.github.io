var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../../.browser-sync');

/**
 * Builds all assets and then starts browsersync
 */
gulp.task('browser-sync', ['images', 'sass', 'fonts', 'utils'], function() {
	browserSync(config);
});
