var gulp = require('gulp');
var ejs = require("gulp-ejs");
var minifyCSS = require('gulp-csso');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var revReplace = require('gulp-rev-replace');

var cleaned = false;

gulp.task('clean-build', function(){
    return del([
        'build/css/*',
        'build/js/*',
        'build/images/*',
        'build/vendor/*'
    ])
});


gulp.task('html-build', function(){
    var jsFilter = filter("**/*.js", { restore: true });
    var cssFilter = filter("**/*.css", { restore: true });
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(minifyCSS())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['html-build', 'images', 'css', 'js'])


/*
 * Build EJS distribution bundles
 * 
 */

gulp.task('ejs-clean', function(){ return del(['dist/*']); });

gulp.task('build-dist:config', function(){ 
    return gulp.src('*.yml')
        .pipe(gulp.dest('dist/')); 
});

gulp.task('build-dist:languages', function(){ 
    return gulp.src('languages/*')
        .pipe(gulp.dest('dist/languages')); 
    });

gulp.task('build-dist:scripts', function(){ 
    return gulp.src('scripts/*')
        .pipe(gulp.dest('dist/scripts'));
    });

gulp.task('build-dist:source-links', function(){
    var jsFilter = filter("**/*.js", { restore: true });
    var cssFilter = filter("**/*.css", { restore: true });
    var ejsFilter = filter(['**/*', '!**/index.ejs', '!**/*.ejs'], { restore: true });
    var nojscssFilter = filter(['**/*', '!**/*.js', '!**/*.css'], { restore: true });
    var onlyejsFilter = filter("**/*.ejs", { restore: true });
    return gulp.src('layout/import/*.ejs')
        .pipe(useref({ 
            transformPath: function(filePath) {
                return filePath.replace('./','../../')
                } 
            }))
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(minifyCSS())
        .pipe(cssFilter.restore)
        .pipe(ejsFilter)
        .pipe(rev())
        .pipe(gulp.dest('dist/source/')) // Write css js vendors to dist/source/
        .pipe(ejsFilter.restore)
        .pipe(revReplace({replaceInExtensions:['.ejs']}))
        .pipe(onlyejsFilter)
        .pipe(gulp.dest('dist/layout/import')); // Write import ejs.
});



gulp.task('build-dist:layout', function(){
    return gulp.src('layout/*.ejs')
        .pipe(gulp.dest('dist/layout'));
});

gulp.task('build-dist:layout-partial', function(){
    return gulp.src('layout/partial/*.ejs')
        .pipe(gulp.dest('dist/layout/partial'));
});

gulp.task('build-dist:source', function(){
    return gulp.src('source/*')
        .pipe(gulp.dest('dist/source'));
});

gulp.task('build-dist:copy-ico-fonts', function(){
    return gulp.src(['node_modules/material-design-icons/iconfont/*.ttf','node_modules/material-design-icons/iconfont/*.eot','node_modules/material-design-icons/iconfont/*.svg','node_modules/material-design-icons/iconfont/*.woff','node_modules/material-design-icons/iconfont/*.woff2'])
        .pipe(gulp.dest('dist/source/vendor'));
    });

gulp.task('build-dist:copy-roboto', function(){
    return gulp.src('node_modules/materialize-css/dist/fonts/**/*')
        .pipe(gulp.dest('dist/source/vendor/fonts'))
    });

// gulp.task('build-dist',['build-dist:config','build-dist:languages','build-dist:scripts']);
gulp.task('build-dist',['build-dist:config', 'build-dist:languages', 'build-dist:scripts' , 'build-dist:source-links', 'build-dist:layout', 'build-dist:layout-partial', 'build-dist:source', 'build-dist:copy-ico-fonts', 'build-dist:copy-roboto']);
