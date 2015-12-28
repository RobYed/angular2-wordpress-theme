'use strict';

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
	inject = require('gulp-inject'),
	run = require('run-sequence'),
   	templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	replace = require('gulp-replace'),
    filter = require('gulp-filter'),
    del = require('del'),
	notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp');
    
var config = require('./gulpconfig.json');
var	browserSync = require('browser-sync').create();

var paths = config.paths;
var angularModule = config.angularModule;


/**
 * MAIN GULP TASKS
 */

gulp.task('serve', function(done) {
	run('inject', 'browsersync', done);
});

gulp.task('build', function(done) {
    run('partials', 'minify', 'del:templatesjs', done);
})

gulp.task('deploy', function(done) {
    run('build', 'upload', done);
})

gulp.task('inject', function () {
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

gulp.task('watch:dev', function() {
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
  
  var onUpdate = ['inject', browserSync.reload];
  
  gulp.watch('src/**/*.js', onUpdate);
  gulp.watch('src/**/*.css', onUpdate);
  gulp.watch('src/**/*.html', onUpdate);
});

gulp.task('watch:prod', function() {
  var options = {
    proxy: "http://nublado.de/blog/"
  };
  browserSync.init(options);
  
  var onUpdate = ['deploy', browserSync.reload];
  
  gulp.watch('src/**/*.js', onUpdate);
  gulp.watch('src/**/*.css', onUpdate);
  gulp.watch('src/**/*.html', onUpdate);
});

gulp.task('partials', function() {
  var minifyOpts = {
	empty: true,
    spare: true,
    quotes: true
  };

  var tmpCacheOpts = {
    file: 'templates.js',
    options: {
        module: angularModule,
        root: 'templates/',
        standalone: false
    }
  };

  return gulp.src( paths.temp )
    .pipe(minifyHTML(minifyOpts)) // minify angular html templates
    .pipe(templateCache(tmpCacheOpts.file, tmpCacheOpts.options)) // convert html to angular template js
    .pipe(gulp.dest( paths.src + 'js' ));
});

gulp.task('minify', function () {
    var projectSources = gulp.src([
			paths.js,
			paths.css,
            '!src/js/**/*.min.js'],
			{read: false},
			{relative: true});
    var injectOptions = {
		ignorePath: '/src/',
        addRootSlash: false
	};

  return gulp.src( paths.index )
		// inject bower dependencies
		.pipe(wiredep({
            directory: 'src/lib',
            devDependencies: false,
            ignorePath: '/src',
        }))
        // inject project dependencies
        .pipe(inject(projectSources, injectOptions))
        // minify and concatenate
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            js: [ngAnnotate(), uglify()],
            path: 'src/'
        }))
        .pipe(filter(['*', '!index.html'], {restore: true}))
        // copy result to root folder
        .pipe(gulp.dest('.'));
});

gulp.task('del:templatesjs', function (cb) {
  return del([ 'src/js/templates.js' ], cb);
});
 
gulp.task('upload', function () {
	return gulp.src([ '*', '!src' ])
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            pass: config.ftp.password,
            remotePath: config.ftp.path
        }))
        .pipe(gutil.noop());
});