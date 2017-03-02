module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.src_path + '/sass/vendor.scss')
            .pipe(plugins.cssimport({ extensions: ['css'] }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.cssSelectorLimit())
            .pipe(plugins.cssSelectorLimit.reporter(config.sassReporter))
            .pipe(plugins.cleanCss({
                processImport: false
            }))
            .on('error', function(e) { plugins.util.log(e); })
            .pipe(plugins.rename({ suffix: '.min' }))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.public_path + '/css'));
    };
};