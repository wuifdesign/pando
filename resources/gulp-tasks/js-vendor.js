module.exports = function (gulp, plugins, config) {
    return function () {
        var sourceJsPaths  = config.js_paths_vendor;
        var jsPaths = [];
        sourceJsPaths.map(function(path) {
            jsPaths.push(config.src_path + '/' + path);
        });
        return gulp.src(jsPaths)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('vendor.min.js'))
            .pipe(plugins.uglify({ preserveComments: 'license' }))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.public_path + '/js'));
    };
};