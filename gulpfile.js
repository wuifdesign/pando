'use strict';

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

var config = {
    getTask: getTask,
    srcPath: './resources/assets', //change to your source path
    publicPath: './public/assets' //change to your target path
};

function getTask(task) {
    return require(config.srcPath + '/../gulp-tasks/' + task)(gulp, plugins, config);
}

gulp.task('copy-files', getTask('copy-files'));
gulp.task('sass', getTask('sass'));
gulp.task('js', getTask('js'));
gulp.task('watch', getTask('watch'));

gulp.task('default', ['copy-files', 'sass', 'js']);