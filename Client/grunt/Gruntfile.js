var requirejsCompileSkip = require('./tasks/requirejs-compile-skip.json');

var pkg = require('./package.json');
var bwr = require('../bower/bower.json');

var pub = pkg.wa.public;
var tmp = pkg.wa.temp;
var bld = pkg.wa.build;
var appPath = pkg.wa.public + bwr.appPath;

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({

		wa: {
			appPath: appPath,
			pub: pub,
			tmp: tmp,
			bld: bld
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= wa.appPath %>/**/*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			styles: {
				files: ['<%= wa.appPath %>styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= wa.appPath %>/**/*.html',
					'<%= wa.pub %>/*.html',
					'<%= wa.pub %>styles/{,*/}*.css',
					'<%= wa.pub %>styles/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 2015,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 2016
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('<%= wa.pub %>styles/'),
							connect().use(
								'<%= wa.pub %>plugin',
								connect.static('<%= wa.pub %>plugin')
							),
							connect.static(pub)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= wa.bld %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= wa.appPath %>/**/*.js'
				]
			}
		},

		turnOffPotatoDeclaration: {
			tmp: {
				expand: true,
				src: [
					tmp + '*/**/*.js',
					tmp + 'app.js'
				]
			}
		},
		ngAnnotate: {
			tmp: {
				files: [{
					expand: true,
					cwd: pub,
					src: [
						tmp + '*/**/*.js',
						tmp + 'app.js'
					],
					ext: '.js', // Dest filepaths will have this extension.
					extDot: 'last',
					dest: pub
				}]
			}
		},
		turnOnPotatoDeclaration: {
			tmp: {
				expand: true,
				src: [
					tmp + '*/**/*.js',
					tmp + 'app.js'
				]
			}
		},
		adjustTemplateUrls: {
			tmp: {
				options: {
					from: 'app',
					to: 'build'
				},
				expand: true,
				src: [
					tmp + '*/**/*.*',
					tmp + 'app.js'
				]
			}
		},
		html2js: {
			options: {
				base: tmp,
				module: 'wa-templates',
				singleModule: true,
				rename: function (moduleName) {
					return 'build/' + moduleName;
				}
			},
			main: {
				src: [tmp + '**/*.tpl.html'],
				dest: tmp + 'wa-templates.js'
			}
		},
		addIncludes:{
			options:{
				appFile: tmp + 'app.js',
				includesFile: tmp + 'includes.js'
			},
			templates:{
				options:{
					angularModule: true,
					wrapToDefine: true,
					name: 'wa-templates',
					injectToApp: true
				},
				src: [
					tmp + 'wa-templates.js'
				]

			}

		},
		uglify: {
			tmp: {
				expand: true,
				cwd: tmp,
				src: [
					'**/*.js'
				],
				dest: tmp,
				ext: '.js'
			}
		},

		clean: {
			pre: {
				options: {
					force: true
				},
				src: [
					bld,
					tmp
				]
			},
			post: {
				options: {
					force: true
				},
				src: [
					tmp
				]
			}
		},
		copy: {
			pre: {
				expand: true,
				cwd: pub + 'app/',
				src: [
					'**'
				],
				dest: tmp
			},
			post: {
				expand: true,
				cwd: tmp,
				src: [
					'**/*',
					'rconfig.js',
					'!**/*.tpl.html'
				],
				dest: bld
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: false,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: tmp,
					src: ['*.html', '*/**/*.html'],
					dest: tmp
				}]
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: tmp,
					paths: requirejsCompileSkip,
					mainConfigFile: tmp + 'rconfig.js',
					name: "main",
					optimize: 'none',
					uglify2: {
						mangle: false
					},
					out: bld + 'main.js',
					done: function (done, output) {
						console.log('done requirejs');
						done();
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-ng-annotate');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.loadNpmTasks('grunt-html2js');

	grunt.loadTasks('tasks');


	grunt.registerTask('default', [
		'clean:pre',
		'copy:pre',
		'turnOffPotatoDeclaration',
		'turnOnPotatoDeclaration',
		'adjustTemplateUrls',
		'htmlmin:dist',
		'html2js',
		'addIncludes',
		'uglify',
		'requirejs',
		'copy:post',
		'clean:post',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:pre',
		'copy:pre',
		'turnOffPotatoDeclaration',
		'turnOnPotatoDeclaration',
		'adjustTemplateUrls',
		'htmlmin:dist',
		'html2js',
		'addIncludes',
		'uglify',
		'requirejs',
		'copy:post',
		'clean:post'
	]);

	grunt.registerTask('vtp', [
		'vendor-to-plugin',
		'default'
	]);

};