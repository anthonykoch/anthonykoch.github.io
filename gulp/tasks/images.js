var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var config   = require('../config').images;

/**
 * Just pipes images to their destination
 */
gulp.task('images', function () {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest));
});

/**
 * Optimizes images and pipes them to their destination
 */
gulp.task('images:optimize', function () {
	return gulp.src(config.src)
		.pipe(imagemin())
		.pipe(gulp.dest(config.dest));
});