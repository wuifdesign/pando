'use strict';

var through = require('through2');
var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

var sassReporter = function() {
    return through.obj(function(file, enc, cb) {
        if(file.cssSelectorLimit && !file.cssSelectorLimit.ok) {
            plugins.util.log(plugins.util.colors.yellow('\n'));
            plugins.util.log(plugins.util.colors.yellow('"' + file.path + '" is over the css selector limit (' + file.cssSelectorLimit.count.toLocaleString('en') + '/4,095 Selectors).'));
            plugins.util.log(plugins.util.colors.yellow('The line number of the first selector that is over the limit is ' + file.cssSelectorLimit.line.toLocaleString('en') + '.'));
            plugins.util.log(plugins.util.colors.yellow('The first selector that is over the limit is "' + file.cssSelectorLimit.selector + '".'));
        }
        cb(null, file);
    });
};

var config = {
    getTask: getTask,
    sassReporter: sassReporter, //Reporter for gulp-css-selector-limit
    src_path: './resources/assets', //change to your source path
    public_path: './public/assets', //change to your target path
    js_paths_custom: require('./gulp-js-paths-custom.js'), //JS custom path file
    js_paths_vendor: require('./gulp-js-paths-vendor.js') //JS vendor path file
};

var getTask = function(task, extra) {
    return require(config.src_path + '/../gulp-tasks/' + task)(gulp, plugins, config, extra);
};

gulp.task('symlink', getTask('symlink')); //Create symlink to node_modules folder
gulp.task('copy-files', getTask('copy-files'));
gulp.task('css-comb', getTask('css-comb')); //Rearrange code in sass files
gulp.task('js', getTask('js'));
gulp.task('js-vendor', getTask('js-vendor'));
gulp.task('sass', getTask('sass'));
gulp.task('sass-vendor', getTask('sass-vendor'));

//Generates Sprite images and adds the image to the "sprites_path" and the SCSS-files from "sass/custom/sprites" to your SCSS file
gulp.task('sprite', getTask('sprite', {
    enable_retina_sprites: false, //Enable retina sprites which are defined as "filename@2x.png" and have to be exactly double the size of the normal image
    sprites_path: config.public_path + '/img/sprites/', //Path to the spite images
    relative_sprites_path: '../img/sprites/', //Relative path to the spite images (used in the css after compiling)
    sprites: [ 'base' ] //add folder names of the sprites. (if folder is "../img/sprites/base" add "base" to the array
}));

gulp.task('sprite-svg', getTask('sprite-svg', {
    sprites: [/* 'icons' */] //add folder names of the sprites. (if folder is "/resources/assets/svg/icons" add "icons" to the array
}));

gulp.task('watch', getTask('watch'));

gulp.task('default', ['symlink', 'sass-vendor', 'sass', 'js-vendor', 'js']);
