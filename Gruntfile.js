module.exports = function(grunt) {


    grunt.initConfig({

        // Task configuration
        copy: {
            main: {
                expand: true,
                cwd: 'bower_components/font-awesome/fonts/',
                src: '**',
                dest: './public/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            imgfile: {
                expand: true,
                cwd: 'rawimg/',
                src: '**',
                dest: './public/assets/img/',
                flatten: true,
                filter: 'isFile'
            }
        },

        less: {
            development: {
                options: {
                    /*compress: true,*/
                    syncImport: true,
                    strictMath: true,
                    sourceMap: true,
                    yuicompress: true,
                    optimization: 2,
                    /*cleancss: true,*/
                    /* sourceMapURL: 'combined.css.map',*/
                    /*sourceMapFilename: '/public/assets/combined.css.map',*/
                    /*sourceMapBasepath: 'public/',*/
                    /*sourceMapRootpath: 'jmbportfolio.tk'*/
                    //minifying the result
                },
                files: {
                    //compiling frontend.less into frontend.css
                    './public/assets/combined.css': './rawcss/combine.less'
                }
            }
        },
        autoprefixer: {
            development: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ],
                expand: true,
                flatten: true,
                src: 'public/assets/combined.css',
                dest: 'public/assets/'
            },
            core: {
                options: {
                    map: true
                },
                src: './public/assets/combined.css',
                dest: './public/assets/combined.css'
            },
            diff: {
                options: {
                    diff: true
                },
                src: './public/assets/combined.css',
                dest: './public/assets/combined.css' // -> dest/css/file.css, dest/css/file.css.patch
            },
        },
        /* cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            core: {
                files: {
                    './public/assets/combined.css': './public/assets/combined.css'
                }
            }
        },*/
        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: './public/assets/combined.css'
            }
        },
        concat: {
            options: {
                separator: ';',
                compress: true
            },
            js_frontend: {
                src: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './rawjs/libraries/plugin.js',
                    './rawjs/main.js'
                ],
                dest: './rawjs/compiled.js'
            }
        },
        uglify: {
            options: {
                mangle: false, // Use if you want the names of your functions and variables unchanged
                sourceMap: true
            },
            frontend: {
                files: {
                    './public/assets/compiled.js': './rawjs/compiled.js'
                }
            }
            /* backend: {
                files: {
                    './public/assets/stylesheets/combined.css': './public/assets/stylesheets/combined.css',
                }
            },*/
        },
        phpunit: {
            classes: {
                dir: 'app/tests/' //location of the tests
            },
            options: {
                bin: 'vendor/bin/phpunit',
                colors: true
            }
        },
        watch: {
            js_frontend: {
                files: [
                    //watched files
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './rawjs/libraries/plugin.js',
                    './rawjs/main.js'
                ],
                tasks: ['concat:js_frontend', 'uglify:frontend'], //tasks to run
                options: {
                    livereload: true //reloads the browser
                }
            },
            less: {
                files: ['./rawcss/*.less'], //watched files
                tasks: ['less', 'cssmin', 'usebanner', 'autoprefixer:development'], //tasks to run
                options: {
                    livereload: true //reloads the browser
                }
            },
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    /*grunt.loadNpmTasks('grunt-contrib-cssmin');*/
    grunt.loadNpmTasks('grunt-banner');




    // Task definition
    grunt.registerTask('init', ['copy', 'less', 'concat', 'uglify' /*, 'cssmin'*/ , 'autoprefixer', 'usebanner']);
    grunt.registerTask('default', ['watch']);

};