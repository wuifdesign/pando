module.exports = function (gulp, plugins, config) {
    return function () {
        var sourceJsPaths  = require('../../gulp-js-paths-vendor.js');
        var jsPaths = [];
        sourceJsPaths.map(function(path) {
            jsPaths.push(config.srcPath + '/' + path);
        });
        return gulp.src(jsPaths)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('vendor.min.js'))
            .pipe(plugins.uglify({ preserveComments: 'license' }))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.publicPath + '/js'));
    };
};