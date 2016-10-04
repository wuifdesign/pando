module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.srcPath + '/sass/**/*.scss')
            .pipe(plugins.csscomb())
            .pipe(gulp.dest(config.srcPath + '/sass'));
    };
};