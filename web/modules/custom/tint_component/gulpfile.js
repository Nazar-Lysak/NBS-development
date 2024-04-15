'use strict';
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');
const media = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat'); 

// Configurable params.
const settings = {
  // Where source files are located.
  sassSrcFile: 'assets/scss/*.scss',
  sassSrcAllFile: 'assets/scss/**/*.scss',
  jsSrcFile: 'assets/js/**/*.js',
  fontsSrcFiles: 'assets/fonts/**/*',
  imagesSrcFiles: 'assets/images/**/*',

  // Where each asset files will be stored.
  sassDestFile: 'assets/dist/css',
  jsDestFile: 'assets/dist/js',
  fontsDestFiles: 'assets/dist/fonts',
  imagesDestFiles: 'assets/dist/images'
};

/**
 * Compiles js files.
 */
const jsTask = () => {
  return gulp.src(settings.jsSrcFile)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(settings.jsDestFile));
};

const fontsTask = () => {
  return gulp.src(settings.fontsSrcFiles)
    .pipe(gulp.dest(settings.fontsDestFiles));
};

/**
 * Compiles images files.
 */
const imagesTask = () => {
  return gulp.src(settings.imagesSrcFiles)
    .pipe(gulp.dest(settings.imagesDestFiles));
};

/**
 * Compiles SASS files.
 */
const sassTask = () => {
  return gulp.src(settings.sassSrcFile)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(media())
    .pipe(autoprefixer({
      overrideBrowserslist: [
        'last 1 major version',
        '>= 1%',
        'Chrome >= 69',
        'Firefox >= 76',
        'Edge >= 44',
        'Explorer >= 11',
        'iOS >= 13',
        'Safari >= 13',
        'Android >= 10'
      ]
    }))
    .pipe(gulp.dest(settings.sassDestFile))
    .pipe(clean_css())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.sassDestFile));
};

/**
 * Builds task.
 */
const buildTask = gulp.parallel(
  fontsTask,
  imagesTask,
  sassTask,
  jsTask
);

/**
 * Watcher.
 */
function watcherTask() {
  buildTask();
  gulp.watch(settings.fontsSrcFiles, fontsTask);
  gulp.watch(settings.imagesSrcFiles, imagesTask);
  gulp.watch(settings.sassSrcAllFile, sassTask);
  gulp.watch(settings.jsSrcFile, jsTask);
}

exports.build = buildTask;
exports.watch = watcherTask;