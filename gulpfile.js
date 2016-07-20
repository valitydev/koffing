const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const templateCache = require('gulp-angular-templatecache');
const addStream = require('add-stream');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');

function prepareTemplates() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(templateCache({
            standalone: true
        }));
}

gulp.task('sources', () => {
    return gulp.src([
        'app/app/app.js',
        'app/**/*.module.js',
        'app/**/*.js'
    ])
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(sourcemaps.init())
        .pipe(concat('source.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('styles', () => {
    return gulp.src('app/assets/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('vendorScripts', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/gentelella/build/js/custom.js',
        'node_modules/moment/moment.js',
        'node_modules/bootstrap-daterangepicker/daterangepicker.js',
        'node_modules/select2/dist/js/select2.full.js',
        'node_modules/angular/angular.js',
        'node_modules/@angular/router/angular1/angular_1_router.js',
        'node_modules/angular-chart.js/node_modules/chart.js/dist/Chart.bundle.js',
        'node_modules/angular-chart.js/dist/angular-chart.js'
    ])
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendorStyles', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/select2/dist/css/select2.css',
        'node_modules/gentelella/build/css/custom.css'
    ])
        .pipe(cleanCSS())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('index', () => {
    return gulp.src('app/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        host: '127.0.0.1',
        port: 8000,
        fallback: 'dist/index.html',
        livereload: true
    });
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(['app/**/*.js', 'app/**/*.pug'], ['sources']);
    gulp.watch('app/index.pug', ['index']);
    gulp.watch('app/assets/**/*.less', ['styles']);
});

gulp.task('build', ['index', 'sources', 'styles', 'vendorScripts', 'vendorStyles']);
gulp.task('default', ['connect', 'watch', 'build']);
