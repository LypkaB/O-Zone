let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCSS    = require('gulp-concat-css'),
    // compressCSS  = require('gulp-csso'),
    browserSync  = require('browser-sync');

gulp.task('html', function() {
    return gulp.src('../*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scss', function() {
    return gulp.src('../assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions', 'ie >= 10'],
            cascade: false
        }))
        .pipe(concatCSS('style.css'))
        // .pipe(compressCSS())
        .pipe(gulp.dest('../assets/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
    return gulp.src('../src/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watcher', function() {
    gulp.watch('../*.html', gulp.parallel('html'));
    gulp.watch('../assets/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('../src/*.js', gulp.parallel('js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watcher'));