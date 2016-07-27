'use strict';

// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var header = require('gulp-header');
var nib = require('nib');

// set packages info 
var pkg = require('./package.json');
var banner = ['/*',
  '* <%= pkg.name %> <%= pkg.description %> (<%= pkg.homepage %>)',
  '* Copyright 2015 <%= pkg.author %>',
  '* Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)',
  '*/',
  '',
  ''].join('\n');

// include, if you want to work with sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// Get one .styl file and render
gulp.task('stylus', function () {
	gulp.src('./stylus/normandy.styl')
		.pipe(stylus({ use: nib() }))
    .pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist/css/'));
});



// Options
// Options compress
// gulp.task('compress', function () {
// 	gulp.src('./css/compressed.styl')
// 		.pipe(stylus({
//       compress: true
//     }))
// 		.pipe(gulp.dest('./css/build'));
// });


// Set linenos
// gulp.task('linenos', function () {
//   gulp.src('./css/linenos.styl')
//     .pipe(stylus({linenos: true}))
//     .pipe(gulp.dest('./css/build'));
// });

// Inline sourcemaps
// gulp.task('sourcemaps-inline', function () {
//   gulp.src('./css/sourcemaps-inline.styl')
//     .pipe(sourcemaps.init())
//     .pipe(stylus())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./css/build'));
// });

// External sourcemaps
// gulp.task('sourcemaps-external', function () {
//   gulp.src('./css/sourcemaps-external.styl')
//     .pipe(sourcemaps.init())
//     .pipe(stylus())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./css/build'));
// });

gulp.task('watch', function () {
  gulp.watch(['./stylus/*.styl','./stylus/mixins/*.styl'], ['stylus']);
});

// Default gulp task to run
gulp.task('default', ['stylus']);
