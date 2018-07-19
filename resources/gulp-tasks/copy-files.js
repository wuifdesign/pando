module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.src_path + '/components/photoswipe/dist/**/*.{png,svg,jpg,gif}', {base: config.src_path + '/components'})
      .pipe(plugins.rename(function(path) {
        path.dirname = 'photoswipe';
      }))
      .pipe(gulp.dest(config.public_path + '/img/vendor'));

    [{src: 'slick-carousel', dest: 'slick-carousel'}, {src: '@fortawesome/fontawesome-free/webfonts', dest: 'fontawesome'}].forEach(function(item) {
      gulp.src(config.src_path + '/components/' + item.src + '/**/*.{png,jpg,gif}', {base: config.src_path + '/components'})
        .pipe(plugins.rename(function(path) {
          path.dirname = item.dest;
        }))
        .pipe(gulp.dest(config.public_path + '/img/vendor'));

      gulp.src(config.src_path + '/components/' + item.src + '/**/*.{eot,svg,ttf,woff,woff2}', {base: config.src_path + '/components'})
        .pipe(plugins.rename(function(path) {
          path.dirname = item.dest;
        }))
        .pipe(gulp.dest(config.public_path + '/fonts/'));
    });
  };
};
