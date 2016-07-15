const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');

gulp.task('sources', () => {
    return gulp.src(['app/app.js', 'app/**/*.module.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('vendorScripts', () => {
    return gulp.src(['./node_modules/angular/angular.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendorStyles', () => {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/gentelella/build/css/custom.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', () => {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('app/**/*.js', ['sources']);
    gulp.watch('app/**/*.pug', ['templates'])
});

gulp.task('build', ['sources', 'templates', 'vendorScripts', 'vendorStyles']);
gulp.task('default', ['connect', 'watch', 'build']);