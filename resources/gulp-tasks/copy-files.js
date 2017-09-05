module.exports = function (gulp, plugins, config) {
    return function () {
        ['font-awesome', 'slick-carousel'].forEach(function (item) {
            console.log(item);
            console.log(config.src_path + '/../../node_modules/' + item + '/**/*.{png,jpg,gif}');
            gulp.src(config.src_path + '/../../node_modules/' + item + '/**/*.{png,jpg,gif}', { base: config.src_path + '/../../node_modules' }).pipe(gulp.dest(config.public_path + '/img/vendor'));
            gulp.src(config.src_path + '/../../node_modules/' + item + '/**/*.{eot,svg,ttf,woff,woff2}', { base: config.src_path + '/../../node_modules' }).pipe(gulp.dest(config.public_path + '/fonts'));
        });
    };
};
