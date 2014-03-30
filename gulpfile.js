var 
  gulp = require('gulp'),
  uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('up-right.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'))
});

gulp.task('default', ['compress']);