module.exports = function (gulp, plugins, config) {

    var catchError = function(error) {
        console.log(error.toString());
        this.emit('end');
    };

    return function () {
        var sourceJsPaths  = require('../../gulp-js-paths-custom.js');
        var jsPaths = [];
        sourceJsPaths.map(function(path) {
            jsPaths.push(config.srcPath + '/' + path);
        });
        return gulp.src(jsPaths)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'))
            //.pipe(plugins.jshint.reporter('fail').on('error', catchError))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('main.min.js'))
            .pipe(plugins.uglify({ preserveComments: 'license' }))
            .on('error', catchError)
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.publicPath + '/js'))
            .pipe(plugins.livereload());
    };
};