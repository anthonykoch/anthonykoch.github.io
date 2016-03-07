var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('./../config').browserSync;

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['images', 'sass', 'fonts', 'utils'], function() {
	browserSync(config);
});
