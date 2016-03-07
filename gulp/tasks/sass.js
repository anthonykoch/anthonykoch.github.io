var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('gulp-cssnano');
var config       = require('../config').sass;
var handleError  = require('../utils').handleError;

/**
 * Compiles sass with optimiations from cssnano
 */
gulp.task('sass', function (done) {
	return gulp.src(config.src)
		.pipe(plumber(handleError('sass')))
		.pipe(sass(config.settings.sass))
		.pipe(autoprefixer(config.settings.autoprefixer))
		.pipe(gulp.dest(config.dest))
		.pipe(rename({ suffix: ".min" }))
		.pipe(cssnano(config.settings.cssnano))
		.pipe(gulp.dest(config.siteDest))
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest(config.dest))
});

