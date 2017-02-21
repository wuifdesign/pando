module.exports = function (gulp, plugins, config) {
    return function () {
        gulp.src(config.src_path + '/components/**/*.{png,jpg,gif}', { base: config.src_path + '/components' }).pipe(gulp.dest(config.public_path + '/img/vendor'));

        gulp.src(config.src_path + '/components/bootstrap-sass/**/*.{eot,svg,ttf,woff,woff2}', { base: config.src_path + '/components' }).pipe(gulp.dest(config.public_path + '/fonts'));
        gulp.src(config.src_path + '/components/font-awesome/**/*.{eot,svg,ttf,woff,woff2}', { base: config.src_path + '/components' }).pipe(gulp.dest(config.public_path + '/fonts'));
        gulp.src(config.src_path + '/components/slick-carousel/**/*.{eot,svg,ttf,woff,woff2}', { base: config.src_path + '/components' }).pipe(gulp.dest(config.public_path + '/fonts'));
    };
};