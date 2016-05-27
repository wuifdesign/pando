Pando CSS
---------

[![Bower version](https://badge.fury.io/bo/pando.svg)](http://badge.fury.io/bo/pando)
[![devDependency Status](https://david-dm.org/wuifdesign/pando/dev-status.svg)](https://david-dm.org/wuifdesign/pando#info=devDependencies)

#### See the [Documentation](http://wuifdesign.github.io/pando/)

##### Dependencies:
- [SASS](https://github.com/nex3/sass)
- [Gulp](http://gulpjs.com/)
- [jQuery](http://jquery.com/)

##### Includes:
- [bootstrap-sass](https://github.com/twbs/bootstrap-sass)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
- [Animate.css](https://github.com/daneden/animate.css)
- [AniJS](https://github.com/anijs/anijs)
- [bootstrap3-dialog](http://nakupanda.github.io/bootstrap3-dialog/)
- [Slick.js](https://github.com/kenwheeler/slick)
- [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/)
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

    $ gulp              //Copies vendor files and compiles JS/CSS
    $ gulp copy-files   //Copies new font and images from the bower folder to the public folder
    $ gulp js           //Compiles JS
    $ gulp js-vendor    //Compiles Vendor JS
    $ gulp sass         //Compiles CSS
    $ gulp sprite       //Generate sprite images and SCSS files
    $ gulp watch        //Runs the watcher to track changes to *.scss and custom *.js files