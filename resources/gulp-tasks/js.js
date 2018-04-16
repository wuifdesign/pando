module.exports = function(gulp, plugins, config) {

  var catchError = function(error) {
    console.log(error.toString());
    this.emit('end');
  };

  return function() {
    var sourceJsPaths = config.js_paths_custom;
    var jsPaths = [];
    sourceJsPaths.map(function(path) {
      jsPaths.push(config.src_path + '/' + path);
    });
    return gulp.src(jsPaths)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      //.pipe(plugins.jshint.reporter('fail').on('error', catchError))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel())
      .pipe(plugins.concat('main.min.js'))
      .pipe(plugins.uglify({output: {comments: 'some'}}))
      .on('error', catchError)
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(config.public_path + '/js'))
      .pipe(plugins.livereload())
      .pipe(plugins.notify(config.gulpNotify('"main.js" generated!')));
  };
};
