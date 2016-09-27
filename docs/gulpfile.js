'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('copy-files', function() {
    gulp.src('../public/assets/**/*', { base: '../public/assets' }).pipe(gulp.dest('assets'));
});

gulp.task('watch', function() {
    gulp.watch(['../public/assets/**/*'], ['copy-files']);
});

gulp.task('default', ['copy-files']);