'use strict';

var gulp = require('gulp');
var config = require('../config').fonts;

/**
 * Just pipes fonts to their destination
 */
gulp.task('fonts', function () {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest));
});
