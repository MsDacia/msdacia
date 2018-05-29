var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	path = require('path'),
	plugins = gulpLoadPlugins(),
	fs = require('fs'),
	rimraf = require('rimraf');

var config = {
	dist: 'public/'
}

var onError = function (err) {
	console.log(err);
}

gulp.task('clean', ['clean:public']);

gulp.task('clean:public', function (done) {
	rimraf(config.dist, done);
});

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest(path.join(config.dist, 'static/assets/')));
});

gulp.task('content', function() {
	return gulp.src('src/json/**/*.*')
		.pipe(gulp.dest(path.join(config.dist, 'static/json/')));
});

gulp.task('sass', function() {
	return plugins.rubySass('src/styles/sass/main.sass', {
			'sourcemap': true,
			'lineNumbers': true
    })
		.pipe(plugins.sourcemaps.write())
	 	.pipe(plugins.cleanCss({keepSpecialComments: 0}))
	 	.pipe(plugins.concat('app.css'))
	 	.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join(config.dist, 'static')));
});

gulp.task('js', function() {
	return gulp.src('src/scripts/app.js')
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.uglify({mangle: true}))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join(config.dist, 'static')));
});

gulp.task('html', function() {
	return gulp.src('view/*.html')
		.pipe(gulp.dest(config.dist));
});

gulp.task('connect', ['html', 'assets', 'content', 'js', 'sass'], function() {
	plugins.connect.server({
		root: config.dist,
		port: 2001
	});
});

/* Watcher tasks */
gulp.task('watch', function () {
	gulp.watch('view/*.html', ['html']);
	gulp.watch('src/assets/**/*.*', ['assets']);
	gulp.watch('src/json/**/*.*', ['content']);
	gulp.watch('src/styles/sass/**/*.sass', ['sass']);
	gulp.watch('src/scripts/**/*.js', ['js']);
});

/* Default tasks */
gulp.task('default', ['connect']);
