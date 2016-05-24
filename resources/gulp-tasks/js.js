module.exports = function (gulp, plugins, config) {
    return function () {
        var crystalJsPaths  = require('../../gulp-js-paths.js');
        var crystalPaths = [];
        crystalJsPaths.map(function(path) {
            crystalPaths.push(config.srcPath + '/' + path);
        });
        return gulp.src(crystalPaths)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('main.min.js'))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.publicPath + '/js'));
    };
};