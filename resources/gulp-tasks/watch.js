module.exports = function (gulp, plugins, config) {
    return function () {
        plugins.livereload.listen();
        gulp.watch([config.srcPath + '/sass/**/*.scss'], ['sass-vendor', 'sass']);
        gulp.watch([config.srcPath + '/js/**/*.js'], ['js']);
    };
};