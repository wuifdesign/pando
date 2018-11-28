module.exports = function(gulp, plugins, config) {
  return function() {
    plugins.livereload.listen();
    gulp.watch([config.src_path + '/sass/_variables.scss', config.src_path + '/sass/vendor.scss'], gulp.series('sass-vendor'));
    gulp.watch([config.src_path + '/sass/_variables.scss', config.src_path + '/sass/main.scss', config.src_path + '/sass/custom/**/*.scss', config.src_path + '/sass/pando/**/*.scss'], gulp.series('sass'));
    gulp.watch([config.src_path + '/js/**/*.js'], gulp.series('js'));
  };
};
