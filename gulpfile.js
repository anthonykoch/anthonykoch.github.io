'use strict';

/**
 * FIXME: The clean task only runs on initialization
 */

var gulp       = require('gulp');
var requireDir = require('require-dir');
var config     = require('./gulp/config');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('watch', function () {
  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.js.src,     ['javascript']);
  gulp.watch(config.images.src, ['images']);
});
