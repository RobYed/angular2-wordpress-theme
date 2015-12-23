'use strict';

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
	inject = require('gulp-inject'),
	run = require('run-sequence'),
   	templateCache = require('gulp-angular-templatecache'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	replace = require('gulp-replace'),
	notify = require('gulp-notify');

var	browserSync = require('browser-sync').create();

var paths = {
	src: 'src/',
    typescript: 'src/ts/**/*.ts',
	js: 'src/js/**/*.js',
	css: 'src/css/**/*.css',
	temp: 'src/templates/**/*.html',
	index: 'src/index.html',
};

var angularModule = 'wpApp';

/**
 * MAIN GULP TASKS
 */

gulp.task('serve:dev', function(callback) {
	run('inject:dev', 'browsersync:dev', callback);
});

gulp.task('inject:dev', function () {
	var projectSources = gulp.src([
			paths.js,
			paths.css,
            '!src/js/**/*.min.js'],
			{read: false},
			{relative: true});
	var options = {
		ignorePath: '/src/'
	};

  return gulp.src(paths.index)
    .pipe(wiredep({ // inject bower dependencies
      directory: 'src/lib',
      devDependencies: true,
    }))
    .pipe(inject(projectSources, options)) // inject project dependencies
    .pipe(gulp.dest(paths.src)); // write to www folder
});

gulp.task('browsersync:dev', function() {
	var options = {
    server: {
			baseDir: 'src',
			routes: {
                "/bower_components": "bower_components"
    	    }
    },
    files: [
	   	paths.src + paths.js,
			paths.src + paths.css,
			paths.src + paths.temp,
			paths.src + paths.index
    ]
  };
  browserSync.init(options);
});