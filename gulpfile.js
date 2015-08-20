'use strict';
var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('connect', function(){
    connect.server({
      livereload : true,
      port : 8005
    });
});

gulp.task('delete', function(){
    del(['assets/stylesheets/*', 'assets/javascripts/*'], function(err){
        if(!err) console.log("Files Deleted.");
        else  console.log(err);
    });
});

gulp.task('html', function () {
  return gulp.src('./public/html/*.html')
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src('./public/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(jshint())
    .pipe(gulp.dest('assets/javascripts'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src('./public/stylesheets/*.css')
    .pipe(gulp.dest('assets/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./public/scripts/*.js'], ['scripts']);
    gulp.watch(['./public/stylesheets/*.css'], ['css']);
});


gulp.task('default', ['delete', 'connect', 'watch', 'html', 'scripts', 'css']);




