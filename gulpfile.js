// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var sourceDirectories = {
	'sass': './src/assets/sass/',
	'sassPartials': './src/assets/sass/partials/',
	'scripts': './src/assets/app/',
	'images': './src/assets/img/',
	'main': './src/',
	'views': './src/assets/views/'
};

var distDirectories = {
	'fonts': './dist/assets/fonts/',
	'stylesheets': './dist/assets/',
	'scripts': './dist/assets/',
	'images': './dist/assets/img/',
	'main': './dist/',
};

var libs = [
	'./bower_components/jquery/dist/jquery.min.js',
	'./bower_components/angular/angular.min.js',
	'./bower_components/angular-animate/angular-animate.min.js',
	'./bower_components/angular-mocks/angular-mocks.js',
	'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'./bower_components/xyz-angular-swapi/dist/xyz-angular-swapi.min.js'
];

var scripts = [
	'./src/assets/app/libraries.module.js',
	'./src/assets/app/components/*.js',
	'./src/assets/app/app.module.js',
	'./src/assets/app/app.*.js',
	'./src/assets/app/ui-components/*.js',
	'./src/assets/views/**/*.module.js',
	'./src/assets/views/**/*.js'
];

gulp.task('sass', function () {
	gulp.src(sourceDirectories.sass + '*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(distDirectories.stylesheets));

	gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/**')
		.pipe(gulp.dest(distDirectories.fonts + 'bootstrap/'));
});

gulp.task('libs', function () {
	gulp.src(libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(distDirectories.scripts));

});

gulp.task('appScripts', function () {
	gulp.src(scripts)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(distDirectories.scripts));
});

gulp.task('images', function () {
	gulp.src(sourceDirectories.images + "*")
		.pipe(gulp.dest(distDirectories.images));
});

gulp.task('html', function () {
	gulp.src(sourceDirectories.main + 'assets/src/*.html')
		.pipe(gulp.dest(distDirectories.main));

	gulp.src(sourceDirectories.main + 'assets/views/home/*.html')
		.pipe(gulp.dest(distDirectories.main + 'views/home/'));

	gulp.src(sourceDirectories.main + 'assets/views/movie/*.html')
		.pipe(gulp.dest(distDirectories.main + 'views/movie/'));


	gulp.src(sourceDirectories.main + 'assets/views/list/*.html')
		.pipe(gulp.dest(distDirectories.main + 'views/list/'));


	gulp.src(sourceDirectories.main + "*.html")
		.pipe(gulp.dest(distDirectories.main));
});

gulp.task('scripts', ['libs', 'appScripts']);


gulp.task('default', ['sass', 'scripts', 'html', 'images'], function () {
	gulp.watch(sourceDirectories.sass + '**/*.scss', ['sass']);
	gulp.watch(sourceDirectories.sassPartials + '**/*.scss', ['sass']);
	gulp.watch(sourceDirectories.scripts + '**/*.js', ['scripts']);
	gulp.watch(sourceDirectories.views + '**/*.js', ['scripts']);
	gulp.watch(sourceDirectories.views + '**/*.html', ['html']);
});

gulp.task('build', ['sass', 'scripts', 'html', 'images']);