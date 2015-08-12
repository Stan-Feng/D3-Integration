var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function(){
    connect.server({
      livereload : true,
      port : 8005
    });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  gulp.src('./public/scripts/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./public/stylesheets/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./public/scripts/*.js'], ['scripts']);
    gulp.watch(['./public/stylesheets/*.css'], ['css']);
});


gulp.task('default', ['connect', 'watch']);