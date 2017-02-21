module.exports = function(gulp, plugins, config, extra) {

    var minimizeSVGs = function(sprite_name) {
        return gulp.src(config.src_path + '/svg/icons/src/*.svg')
            .pipe(plugins.svgmin())
            .on('end', function() {
                generateSprite(sprite_name);
            })
            .pipe(gulp.dest(config.src_path + '/svg/icons/src'));
    };

    var generateSprite = function(sprite_name) {
        gulp.src(config.src_path + '/svg/icons/src/*.svg')
            .pipe(plugins.svgSprite({
                mode: {
                    symbol: {
                        dest: './',
                        sprite: 'sprite-icons.svg',
                        prefix: '.svg-' + sprite_name + '-%s',
                        svg: {
                            xmlDeclaration: false
                        },
                        render: {
                            scss: {
                                dest: '_styles.scss'
                            }
                        },
                        example: true
                    }
                }
            }))
            .on('end', function() {
                copySpriteSVG(sprite_name);
            })
            .pipe(gulp.dest(config.src_path + '/svg/icons'));
    };

    var copySpriteSVG = function(sprite_name) {
        gulp.src(config.src_path + '/svg/icons/*.svg', {base: config.src_path + '/svg/icons'}).pipe(gulp.dest(config.public_path + '/svg'));
    };

    return function() {
        extra.sprites.forEach(function(sprite_name) {
            minimizeSVGs(sprite_name);
            console.log(sprite_name);
        });
    };
};