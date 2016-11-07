var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('gulp-cssnano');
var config       = require('../config').sass;
var catche       = require('../utils').catche;

/**
 * Compiles sass with optimiations from cssnano.
 *
 * For faster live reloading, the sass is first compiled straight
 * to _site, and then compiled to the actual destination.
 */
gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(catche('sass'))
		.pipe(sass(config.settings.sass))
		.pipe(autoprefixer(config.settings.autoprefixer))
		.pipe(rename({
			extname: '.css',
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.siteDest))
		.pipe(browserSync.reload({ stream: true }))
		.pipe(
			rename(function (path) {
				path.basename = path.basename.replace('.min' , '');
			})
		)
		.pipe(gulp.dest(config.dest))
		.pipe(cssnano(config.settings.cssnano))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.dest))
});
