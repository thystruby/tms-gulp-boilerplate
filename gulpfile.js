const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

var src = {
	html: 'app/**/*.html',
	scss: 'app/scss/style.scss',
	fonts: 'app/fonts/**/*.*',
	images: 'app/images/**/*.*',
	js: 'app/js'
};

var dist = {
	root: 'dist/',
	css: 'dist/css/',
	js: 'dist/js',
	images: 'dist/images',
	fonts: 'dist/fonts',
}

var watch = {
	scss: 'app/scss/**/*.scss',
	js: 'app/js/**/*.js',
	html: 'app/**/*.html',
	images: 'app/images/**/*.*'
}

gulp.task('run',
  [
    'concat-min-js',
    'html',
    'fonts-dist',
		'img-min',
		'watch'	
  ], function() {
  browserSync.init({
    server: "./dist"
  });
});

gulp.task("watch", ["watch:scss", "watch:html", "watch:js", "watch:img"]);

gulp.task('watch:scss', function(){
	gulp.watch(watch.scss, ['scss']);
});

gulp.task('watch:html', function(){
	gulp.watch(watch.html, ['html']);
});

gulp.task('watch:js', function(){
	gulp.watch(watch.js, ['concat-min-js']);
});

gulp.task('watch:img', function(){
	gulp.watch(watch.images, ['img-min']);
});

gulp.task('html', function () {
	gulp.src(src.html)
		.pipe(gulp.dest(dist.root))
		.pipe(browserSync.stream());
});

// Converting scss files to css files (add prefixes, minifyCSS)
gulp.task('scss', function(){
	gulp.src(src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({level: {1: {specialComments: 0}}}))
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.stream());  
});

// js concat and min
gulp.task('concat-min-js', function() {
	return gulp.src
		([ src.js+'/**/*.js' ])
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
});

// img minimization
gulp.task('img-min', function() {
	gulp.src(src.images)
	.pipe(imagemin())
	.pipe(gulp.dest(dist.images))
	.pipe(browserSync.stream());
});

gulp.task('fonts-dist', function() {
  	gulp.src(src.fonts)
	.pipe(gulp.dest(dist.fonts))
	.pipe(browserSync.stream());
});

gulp.task('default', ['run']);
