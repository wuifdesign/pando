Pando CSS
---------

[![Bower version](https://badge.fury.io/bo/pando.svg)](http://badge.fury.io/bo/pando)
[![devDependency Status](https://david-dm.org/wuifdesign/pando/dev-status.svg)](https://david-dm.org/wuifdesign/pando#info=devDependencies)

#### See the [Documentation](http://wuifdesign.github.io/pando/)

##### Dependencies:
- [SASS](https://github.com/sass/sass)
- [Gulp](https://gulpjs.com/)
- [jQuery](https://jquery.com/)

##### Includes:
- [bootstrap-sass](https://github.com/twbs/bootstrap-sass)
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
- [Animate.css](https://github.com/daneden/animate.css)
- [AniJS](https://github.com/anijs/anijs)
- [bootstrap3-dialog](https://github.com/nakupanda/bootstrap3-dialog)
- [Slick.js](https://github.com/kenwheeler/slick)
- [Magnific Popup](https://github.com/dimsemenov/Magnific-Popup)
- [Toastr](https://github.com/CodeSeven/toastr)

## Installation

Files are bundled using "Gulp". You will need to install the `gulp-cli`. The bundle can be created like this:

    $ npm install -g bower gulp-cli
    $ npm install
    $ gulp

## Compiling the code

How to update your vendor dependencies:

    $ bower update

You can use to `gulpfile.js` to compile the code. Use one of the following

    $ gulp              //Copies vendor files and compiles JS/CSS ('copy-files', 'sass', 'js-vendor', 'js')
    $ gulp copy-files   //Copies new font and images from the bower folder to the public folder
    $ gulp js           //Compiles JS
    $ gulp js-vendor    //Compiles Vendor JS
    $ gulp sass         //Compiles CSS
    $ gulp sprite       //Generate sprite images and SCSS files
    $ gulp watch        //Runs the watcher to track changes to *.scss and custom *.js files

## LiveReload

This will work using [gulp-livereload](https://github.com/vohof/gulp-livereload).

Install the [LiveReload Chrome Extention](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) 
or the [LiveReload for Firefox](https://addons.mozilla.org/de/firefox/addon/livereload/)
and activate it for the current page you are working on.

When running `gulp watch`, the website will reload automatically after changing sass/js files. You can also add a watcher
for your html/php files if you want to.