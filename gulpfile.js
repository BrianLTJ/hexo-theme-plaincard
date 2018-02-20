var gulp = require('gulp');
var ejs = require("gulp-ejs");
var minifyCSS = require('gulp-csso');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

gulp.task('clean-css', function(){
    return del([
        'build/css/*'
    ])
});
gulp.task('clean-js', function(){
    return del([
        'build/js/*'
    ])
});
gulp.task('clean-html', function(){
    return del([
        'build/*.html',
        'build/*.htm',
        'build/images/*'
    ])
});
gulp.task('clean-rev-manifest', function(){
    return del([
        'build/rev-manifest.json'
    ])
});
gulp.task('clean-images', function(){
    return del([
        'build/images/*'
    ])
});

gulp.task('html', ['clean-html', 'clean-rev-manifest'],function(){
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('build'))
});

gulp.task('images', ['clean-images'], function(){
    return gulp.src(['./images/*.jpg', './images/*.jpeg', './images/*.png', './images/*.bmp', './images/*.svg'])
        .pipe(gulp.dest('build/images'))
});

gulp.task('css', ['clean-css'],function(){
    return gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(rev('revcss'))
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest({merge:true}))
        .pipe(gulp.dest('build/'))
});

gulp.task('js', ['clean-js'],function(){
    return gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(rev('revjs'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest({
            merge:true
        }))
        .pipe(gulp.dest('build/'))
});

gulp.task('ejs', ['clean-build-ejs'], function(){
    return gulp.src('index.ejs')
        .pipe(ejs())
        .pipe(gulp.dest('build-ejs'))
});

gulp.task('clean-build-ejs', function(){
    return del([
        'build-ejs/*'
    ]);
});

gulp.task('jquery', function(){
    return gulp.src()
});

gulp.task('default', ['html', 'images', 'css', 'js'])


gulp.task('build-js', ['ejs'])