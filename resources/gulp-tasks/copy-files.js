module.exports = function (gulp, plugins, config) {
    return function () {
        gulp.src(config.src_path + '/components/photoswipe/dist/**/*.{png,svg,jpg,gif}', { base: config.src_path + '/../../node_modules' }).pipe(gulp.dest(config.public_path + '/img/vendor'));

        ['font-awesome', 'slick-carousel'].forEach(function (item) {
            gulp.src(config.src_path + '/components/' + item + '/**/*.{png,jpg,gif}', { base: config.src_path + '/../../node_modules' }).pipe(gulp.dest(config.public_path + '/img/vendor'));
            gulp.src(config.src_path + '/components/' + item + '/**/*.{eot,svg,ttf,woff,woff2}', { base: config.src_path + '/../../node_modules' }).pipe(gulp.dest(config.public_path + '/fonts'));
        });
    };
};
