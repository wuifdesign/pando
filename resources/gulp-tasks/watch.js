module.exports = function (gulp, plugins, config) {
    return function () {
        plugins.livereload.listen();
        gulp.watch([config.src_path + '/sass/**/*.scss'], ['sass-vendor', 'sass']);
        gulp.watch([config.src_path + '/js/**/*.js'], ['js']);
    };
};