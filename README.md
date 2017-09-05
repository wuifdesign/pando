Pando CSS
---------

[![devDependency Status](https://david-dm.org/wuifdesign/pando/dev-status.svg)](https://david-dm.org/wuifdesign/pando#info=devDependencies)

#### See the [Documentation](http://wuifdesign.github.io/pando/)

##### Dependencies:
- [SASS](https://github.com/sass/sass)
- [Gulp](https://gulpjs.com/)
- [jQuery](https://jquery.com/)

##### Includes:
- [bootstrap](https://github.com/twbs/bootstrap)
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
- [Animate.css](https://github.com/daneden/animate.css)
- [Slick.js](https://github.com/kenwheeler/slick)
- [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup)
- [Toastr](https://github.com/CodeSeven/toastr)

## Installation

Files are bundled using [Gulp.js](http://gulpjs.com/). The bundle can be created like this:

    $ npm install       //Install dependencies
    $ npm run gulp      //Runs the gulp default task

## Compiling the code

You can use `npm` or `gulp` to compile the code. Use one of the following

    $ npm run gulp              //Copies vendor files and compiles JS/CSS ('copy-files', 'sass-vendor', 'sass', 'js-vendor', 'js')
    $ npm run gulp-copy-files   //Copies new font and images from the npm folder to the public folder
    $ npm run gulp-css-comb     //Rearrange code in sass files
    $ npm run gulp-js           //Compiles JS
    $ npm run gulp-js-vendor    //Compiles vendor JS
    $ npm run gulp-sass         //Compiles CSS
    $ npm run gulp-sass-vendor  //Compiles vendor CSS
    $ npm run gulp-sprite       //Generate sprite images and SCSS files
    $ npm run gulp-sprite-svg   //Generate sprite svg and SCSS files
    $ npm run gulp-watch        //Runs the watcher to track changes to *.scss and custom *.js files

If you have `gulp-cli installed globally you can also use the following commands:

    $ gulp              //Copies vendor files and compiles JS/CSS ('copy-files', 'sass-vendor', 'sass', 'js-vendor', 'js')
    $ gulp copy-files   //Copies new font and images from the npm folder to the public folder
    $ gulp css-comb     //Rearrange code in sass files
    $ gulp js           //Compiles JS
    $ gulp js-vendor    //Compiles vendor JS
    $ gulp sass         //Compiles CSS
    $ gulp sass-vendor  //Compiles vendor CSS
    $ gulp sprite       //Generate sprite images and SCSS files
    $ gulp sprite-svg   //Generate sprite svg and SCSS files
    $ gulp watch        //Runs the watcher to track changes to *.scss and custom *.js files

## Sprite

To enable sprites you just have to do two simple steps:

Edit `sprite` task in your `gulpfile.js`
Just add the name of the folder containing the sprite images (i.e.: `../img/sprites/base` you add `base` to the `sprites` key)
Add the sprite from `sass/custom/sprites` and some extra lines to your `custom.scss`:

    @import "sprites/sprite-base";
    @include sprites($spritesheet-sprites);
    //@include retina-sprites($retina-groups); //Include if 'enable_retina_sprites' is true

##### Supporting Retina Displays

You can also enable `enable_retina_sprites` in the `gulpfile.js`.
If you do so, you have to add for each image in the sprite folder a second one (`filename@2x.png`) to the same folder.

This will automatically generate a sprite for retina displayes and use it if the monitor supports retina. also you have to add `@include retina-sprites($retina-groups);` after the import into your SCSS file.

## SVG Sprite

First you have to add the folder to the `gulpfile.js`. Therefor you have to add the name of the folder you want to creata an SVG for.
For example if folder is `/resources/assets/svg/icons` add "icons" to the array. If you have added the folder, the part in the `gulpfile.js` should look like this.

    gulp.task('sprite-svg', getTask('sprite-svg', {
        sprites: [ 'icons' ]
    }));
    
You can preview the generated sprite if you use the generated `/resources/assets/svg/icons/sprite.symbol.html`.
Now you have to add the resulting file `/resources/assets/svg/icons/_styles.scss` to your `main.scss` file.

Afterwards, you cann use the svg like the following:

    <svg class="svg-icons-dims-img-name">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/path/to/assets/svg/sprite-icons.svg"></use>
    </svg>
    
**If you want to support IE 9-11 you have to call the svg4everybody() function in your js-file.**

## LiveReload

This will work using [gulp-livereload](https://github.com/vohof/gulp-livereload).

Install the [LiveReload Chrome Extention](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) 
or the [LiveReload for Firefox](https://addons.mozilla.org/de/firefox/addon/livereload/)
and activate it for the current page you are working on.

When running `gulp watch`, the website will reload automatically after changing sass/js files. You can also add a watcher
for your html/php files if you want to.
