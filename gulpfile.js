var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var del = require('del');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');


// styles

gulp.task('build:css', [ 'clean:css', 'build:css-mini' ], function () {
  return sass('./src/scss/main.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Got yer css here' }));
});

gulp.task('build:css-mini', function () {
  return sass('./src/scss/main.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Gotter minified' }));
});

// images

gulp.task('copy:images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Copied yer images over' }));
});

// clean

gulp.task('clean:css', function() {
  del('./dist/assets/css');
});

gulp.task('clean:images', function() {
  del('./dist/assets/img');
});

// default task

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['build:css']);
});

gulp.task('build', function(cb) {
  gulp.start([ 'build:css', 'copy:images' ], cb);
});

gulp.task('default', [ 'build' ], function() {
    gulp.start([ 'watch' ]);
});
