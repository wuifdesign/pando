module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.src_path + '/sass/**/*.scss')
            .pipe(plugins.csscomb())
            .pipe(gulp.dest(config.src_path + '/sass'));
    };
};
