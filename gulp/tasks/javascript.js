var gulp   = require('gulp');
var babel  = require('gulp-babel');
var config = require('../config').js;
var catche = require('../utils').catche;

/**
 * Exists solely for the purpose of editor-connect
 */

gulp.task('javascript', function(done) {
	return gulp.src(config.src)
		.pipe(catche('javascript'))
		.pipe(babel(config.settings.babel));
});