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
                options: {
                    banner: '<%= banner %>'
                },
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
                dest: '<%= js_path %>/bootstrap.js'
            },
            vendor: {
                src: [
                    '<%= js_src_path %>/vendor/bootstrap-dialog.min.js',
                    '<%= js_src_path %>/vendor/slick.min.js',
                    '<%= js_src_path %>/vendor/select2.min.js',
                    '<%= js_src_path %>/vendor/spin.js',
                    '<%= js_src_path %>/vendor/jquery/jquery.spin.js'
                ],
                dest: '<%= js_path %>/vendor.min.js'
            }
        },

        uglify: {
            pando: {
                options:{
                    mangle: false,
                    report: 'min',
                    banner: '<%= banner %>',
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
                dest: '<%= js_path %>/bootstrap.min.js'
            }
        },

        compass: {
            options: {
                cssDir: '<%= css_path %>',
                sassDir: '<%= sass_path %>',
                imagesDir: '<%= img_path %>',
                fontsDir: '<%= fonts_path %>',

                generatedImagesDir: '<%= sprite_path %>',
                spriteLoadPath: '<%= sprite_path %>',

                relativeAssets: true,
                noLineComments: true,
                outputStyle: 'expanded' //nested, expanded, compact, compressed
            },
            pando: {
                options: {
                    banner: '<%= banner %>',
                    specify: ['<%= sass_path %>/pando.scss']
                }
            },
            vendor: {
                options: {
                    specify: ['<%= sass_path %>/vendor.scss']
                }
            },
            animate: {
                options: {
                    specify: ['<%= sass_path %>/vendor/animate.scss']
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
                src: ['<%= css_path %>/vendor/animate.css'],
                dest: '<%= css_path %>/vendor/animate.min.css'
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
                    'jquery/jquery.spin.js': 'spin.js/jquery.spin.js',
                    'spin.js': 'spin.js/spin.js'
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
                    '_select2.scss': 'select2/dist/css/select2.css'
                }
            },
            public: {
                options: {
                    destPrefix: '<%= public_path %>'
                },
                files: {
                    'js/respond.min.js': 'respond/dest/respond.min.js',
                    'js/holder.min.js':  'holderjs/holder.min.js',

                    'js/jquery.min.js':  'jquery/dist/jquery.min.js',
                    'js/jquery.min.map':  'jquery/dist/jquery.min.map',

                    'fonts/slick.eot':  'slick-carousel/slick/fonts/slick.eot',
                    'fonts/slick.svg':  'slick-carousel/slick/fonts/slick.svg',
                    'fonts/slick.ttf':  'slick-carousel/slick/fonts/slick.ttf',
                    'fonts/slick.woff': 'slick-carousel/slick/fonts/slick.woff',
                    'img/vendor/ajax-loader.gif': 'slick-carousel/slick/ajax-loader.gif',

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
                tasks: ['concat:pando', 'uglify:pando']
            },
            scripts_vendor: {
                files: ['<%= concat.vendor.src %>', '<%= concat.bootstrap.src %>'],
                tasks: ['concat:vendor', 'concat:bootstrap', 'uglify:bootstrap']
            },
            sass: {
                files: ['<%= sass_path %>/*.scss', '<%= sass_path %>/config/*.scss', '<%= sass_path %>/pando/*.scss', '<%= sass_path %>/custom/*.scss'],
                tasks: ['compass:pando', 'cssmin:pando']
            },
            sass_vendor: {
                files: ['<%= sass_path %>/vendor.scss', '<%= sass_path %>/vendor/**/*.scss', '<%= sass_path %>/config/**/*.scss'],
                tasks: ['compass:vendor', 'cssmin:vendor', 'compass:animate', 'cssmin:animate']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-bowercopy');

    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'cssmin']);
    grunt.registerTask('css',     ['compass', 'cssmin']);
    grunt.registerTask('js',      ['concat', 'uglify']);
    grunt.registerTask('bower',   ['bowercopy']);
};