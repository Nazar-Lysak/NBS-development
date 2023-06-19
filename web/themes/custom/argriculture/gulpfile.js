const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
  return gulp.src('assets/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('build/js'));
});

async function minifyImages() {
  const imagemin = await import('gulp-imagemin').then(m => m.default);
  return gulp.src('assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
}

gulp.task('watch', function () {
  gulp.watch('assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('assets/js/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'scripts', 'watch', minifyImages));
gulp.task('build', gulp.series('sass', 'scripts', minifyImages));