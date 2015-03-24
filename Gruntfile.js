module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Define our source and build folders
        public_path: 'dist',

        js_src_path: 'src/js',
        sass_path:   'src/sass',

        js_path:     '<%= public_path %>/js',
        css_path:    '<%= public_path %>/css',
        img_path:    '<%= public_path %>/img/vendor',
        fonts_path:  '<%= public_path %>/fonts',
        sprite_path: '<%= public_path %>/img/sprites',

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + "\\n" %>' +
            '* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
            '* <%= pkg.homepage + "\\n" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> - Michael Wohlfahrter <%= "\\n" %>' +
            '*/ <%= "\\n" %><%= "\\n" %>',

        concat: {
            options:{
                separator: ';\n\n'
            },
            pando: {
                src: [
                    '<%= js_src_path %>/main.js',
                    '<%= js_src_path %>/elements/**/*.js'
                ],
                dest: '<%= js_path %>/pando.js'
            },
            bootstrap: {
                src: [
                    '<%= js_src_path %>/vendor/bootstrap/transition.js',
                    '<%= js_src_path %>/vendor/bootstrap/alert.js',
                    '<%= js_src_path %>/vendor/bootstrap/button.js',
                    '<%= js_src_path %>/vendor/bootstrap/carousel.js',
                    '<%= js_src_path %>/vendor/bootstrap/collapse.js',
                    '<%= js_src_path %>/vendor/bootstrap/dropdown.js',
                    '<%= js_src_path %>/vendor/bootstrap/modal.js',
                    '<%= js_src_path %>/vendor/bootstrap/tooltip.js',
                    '<%= js_src_path %>/vendor/bootstrap/popover.js',
                    '<%= js_src_path %>/vendor/bootstrap/scrollspy.js',
                    '<%= js_src_path %>/vendor/bootstrap/tab.js',
                    '<%= js_src_path %>/vendor/bootstrap/affix.js'
                ],
                dest: '<%= js_path %>/vendor/bootstrap.js'
            },
            vendor: {
                src: [
                    '<%= js_src_path %>/vendor/bootstrap-dialog.min.js',
                    '<%= js_src_path %>/vendor/slick.min.js',
                    '<%= js_src_path %>/vendor/select2.min.js',
                    '<%= js_src_path %>/vendor/spin.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.spin.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.magnific-popup.min.js',
                    '<%= js_src_path %>/vendor/toastr.min.js',
                    '<%= js_src_path %>/vendor/anijs.min.js',
                    '<%= js_src_path %>/vendor/anijs-helper-dom.min.js',
                    '<%= js_src_path %>/vendor/anijs-helper-scrollreveal.min.js'
                ],
                dest: '<%= js_path %>/vendor/vendor.min.js'
            }
        },

        uglify: {
            pando: {
                options:{
                    mangle: false,
                    report: 'min',
                    sourceMap: true
                },
                src: ['<%= concat.pando.dest %>'],
                dest: '<%= js_path %>/pando.min.js'
            },
            bootstrap: {
                options:{
                    mangle: false,
                    report: 'min',
                    sourceMap: true
                },
                src: ['<%= concat.bootstrap.dest %>'],
                dest: '<%= js_path %>/vendor/bootstrap.min.js'
            }
        },

        sass: {
            options: {
                compass: true,
                style: 'expanded'
            },
            pando: {
                files: {
                    '<%= css_path %>/pando.css': '<%= sass_path %>/pando.scss'
                }
            },
            vendor: {
                files: {
                    '<%= css_path %>/vendor.css': '<%= sass_path %>/vendor.scss'
                }
            },
            animate: {
                files: {
                    '<%= css_path %>/animate.css': '<%= sass_path %>/vendor/animate.scss'
                }
            }
        },

        cssmin: {
            options:{
                mangle: true,
                report: 'min'
            },
            pando: {
                src: ['<%= css_path %>/pando.css'],
                dest: '<%= css_path %>/pando.min.css'
            },
            vendor: {
                src: ['<%= css_path %>/vendor.css'],
                dest: '<%= css_path %>/vendor.min.css'
            },
            animate: {
                src: ['<%= css_path %>/animate.css'],
                dest: '<%= css_path %>/animate.min.css'
            }
        },

        usebanner: {
            css: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: [ '<%= css_path %>/pando.css', '<%= css_path %>/pando.min.css' ]
                }
            },
            js: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: [ '<%= js_path %>/pando.js', '<%= js_path %>/pando.min.js' ]
                }
            }
        },

        bowercopy: {
            options: {
                clean: true
            },
            js_dev: {
                options: {
                    destPrefix: '<%= js_src_path %>/vendor'
                },
                files: {
                    'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap',
                    'bootstrap-dialog.min.js': 'bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',
                    'slick.min.js': 'slick-carousel/slick/slick.min.js',
                    'select2.min.js': 'select2/dist/js/select2.min.js',
                    'toastr.min.js': 'toastr/toastr.min.js',
                    'jquery/jquery.spin.js': 'spin.js/jquery.spin.js',
                    'spin.js': 'spin.js/spin.js',
                    'jquery/jquery.magnific-popup.min.js': 'magnific-popup/dist/jquery.magnific-popup.min.js',

                    'anijs.min.js': 'anijs/dist/anijs-min.js',
                    'anijs-helper-dom.min.js': 'anijs/dist/helpers/dom/anijs-helper-dom-min.js',
                    'anijs-helper-scrollreveal.min.js': 'anijs/dist/helpers/scrollreveal/anijs-helper-scrollreveal-min.js'
                }
            },
            css_dev: {
                options: {
                    destPrefix: '<%= sass_path %>/vendor'
                },
                files: {
                    'bootstrap': 'bootstrap-sass/assets/stylesheets',
                    '_bootstrap-dialog.scss': 'bootstrap3-dialog/dist/css/bootstrap-dialog.css',
                    '_font-awesome.scss': 'Font-Awesome/css/font-awesome.css',
                    'animate.scss': 'animate.css/animate.css',
                    '_slick.scss': 'slick-carousel/slick/slick.scss',
                    '_slick-theme.scss': 'slick-carousel/slick/slick-theme.scss',
                    '_select2.scss': 'select2/dist/css/select2.css',
                    '_toastr.scss': 'toastr/toastr.scss',
                    '_magnific-popup.scss': 'magnific-popup/dist/magnific-popup.css'
                }
            },
            public: {
                options: {
                    destPrefix: '<%= public_path %>'
                },
                files: {
                    'js/vendor/respond.min.js': 'respond/dest/respond.min.js',
                    'js/vendor/holder.min.js':  'holderjs/holder.min.js',

                    'js/vendor/jquery.min.js':  'jquery/dist/jquery.min.js',
                    'js/vendor/jquery.min.map':  'jquery/dist/jquery.min.map',

                    'fonts/slick.eot':  'slick-carousel/slick/fonts/slick.eot',
                    'fonts/slick.svg':  'slick-carousel/slick/fonts/slick.svg',
                    'fonts/slick.ttf':  'slick-carousel/slick/fonts/slick.ttf',
                    'fonts/slick.woff': 'slick-carousel/slick/fonts/slick.woff',
                    'img/ajax-loader.gif': 'slick-carousel/slick/ajax-loader.gif',

                    'fonts/glyphicons-halflings-regular.eot':  'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot',
                    'fonts/glyphicons-halflings-regular.svg':  'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg',
                    'fonts/glyphicons-halflings-regular.ttf':  'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf',
                    'fonts/glyphicons-halflings-regular.woff': 'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff',
                    'fonts/glyphicons-halflings-regular.woff2': 'bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2',

                    'fonts/fontawesome-webfont.eot':  'Font-Awesome/fonts/fontawesome-webfont.eot',
                    'fonts/fontawesome-webfont.svg':  'Font-Awesome/fonts/fontawesome-webfont.svg',
                    'fonts/fontawesome-webfont.ttf':  'Font-Awesome/fonts/fontawesome-webfont.ttf',
                    'fonts/fontawesome-webfont.woff': 'Font-Awesome/fonts/fontawesome-webfont.woff'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= concat.pando.src %>'],
                tasks: ['concat:pando', 'uglify:pando', 'usebanner:js']
            },
            scripts_vendor: {
                files: ['<%= concat.vendor.src %>', '<%= concat.bootstrap.src %>'],
                tasks: ['concat:vendor', 'concat:bootstrap', 'uglify:bootstrap']
            },
            sass: {
                files: ['<%= sass_path %>/*.scss', '<%= sass_path %>/config/*.scss', '<%= sass_path %>/pando/*.scss', '<%= sass_path %>/custom/*.scss'],
                tasks: ['sass:pando', 'cssmin:pando', 'usebanner:css']
            },
            sass_vendor: {
                files: ['<%= sass_path %>/vendor.scss', '<%= sass_path %>/vendor/**/*.scss', '<%= sass_path %>/config/**/*.scss'],
                tasks: ['sass:vendor', 'cssmin:vendor', 'sass:animate', 'cssmin:animate']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'usebanner']);
    grunt.registerTask('css',     ['sass', 'cssmin', 'usebanner:css']);
    grunt.registerTask('js',      ['concat', 'uglify', 'usebanner:js']);
    grunt.registerTask('bower',   ['bowercopy']);
};