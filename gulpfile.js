// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var srcDirectories = {
	'sass': './src/assets/sass/',
	'sassPartials': './src/assets/sass/partials/',
	'scripts': './src/assets/app/',
	'images': './src/assets/img/'
};

var distDirectories = {
	'stylesheets': './dist/assets/',
	'scripts': './dist/assets/',
	'images': './dist/assets/img/'
};

gulp.task('sass', function () {
	gulp.src(srcDirectories.sass + '*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(distDirectories.stylesheets));
});

gulp.task('default', ['sass', 'scripts', 'images'], function () {
	gulp.watch(srcDirectories.sass + '*.scss', ['sass']);
	gulp.watch(srcDirectories.sassPartials + '*.scss', ['sass']);

	gulp.watch(srcDirectories.scripts + '*.js', ['scripts']);
});




var libs = [
	'./bower_components/angular/angular.min.js',
	'./bower_components/angular-mocks/angular-mocks.js',
	'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'./bower_components/xyz-angular-swapi/dist/xyz-angular-swapi.min.js',
];

var scripts = [
	'./src/assets/app/swapi-service.module.js',
	'./src/assets/app/movie-poster.module.js',
	'./src/assets/app/libraries.module.js',
	'./src/assets/views/home/directives.js',
	'./src/assets/views/home/controllers.js',
	'./src/assets/views/detail/directives.js',
	'./src/assets/views/detail/controllers.js',
	'./src/assets/app/app.js'
];

gulp.task('libs', function () {
	return gulp.src(libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(distDirectories.scripts));
});

gulp.task('appScripts', function () {
	return gulp.src(scripts)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(distDirectories.scripts));
});

gulp.task('images', function () {
	gulp.src(srcDirectories.images + "*")
		.pipe(gulp.dest(distDirectories.images));
});

gulp.task('scripts', ['libs', 'appScripts']);