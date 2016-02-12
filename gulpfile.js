'use strict';

let gulp = require('gulp');
let concat = require('gulp-concat');
let browserify = require('browserify');
let vsource = require("vinyl-source-stream");
let babelify = require('babelify');
let shell = require('gulp-shell');
let config = require('./config.json');

let shellTaskArgument;
if (process.platform == 'win32') shellTaskArgument = config.winProjectRoot + '/node_modules/electron-prebuilt/dist/electron.exe ' + config.winProjectRoot;
else shellTaskArgument = './node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron ./../CodeViewer';

let source = {
  appjs: './ui-src/app.js',
  js: ['./ui-src/**/*.js'],
  libjs: ['./ui-src/lib/primus/primus.js'],
  appcss: ['./ui-src/css/*.css'],
  apphtml: ['./ui-src/**/*.html'],
  appimg: ['./ui-src/img/*']
};

gulp.task('appjs', function(){
  browserify({ debug: true })
    .transform(babelify, {
        presets:["stage-0", "es2015", "react"],
        plugins: ["syntax-class-properties", "transform-class-properties"]
    })
    .require(source.appjs, { entry: true })
    .bundle()
    .pipe(vsource('app.js'))
    .pipe(gulp.dest('./ui-dist'));
});

gulp.task('libjs', function () {
  gulp.src(source.libjs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./ui-dist'))
});

gulp.task('appcss', function () {
  gulp.src(source.appcss)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./ui-dist'))
});

gulp.task('apphtml', function() {
  gulp.src(source.apphtml)
    .pipe(gulp.dest('./ui-dist'));
  gulp.src(source.appimg, {base: 'ui-src'})
    .pipe(gulp.dest('./ui-dist'));
});

gulp.task('watch', function() {
  gulp.watch(source.appcss, ['appcss']);
  gulp.watch(source.apphtml, ['apphtml']);
  gulp.watch(source.js, ['appjs']);
});

gulp.task('default', ['appjs', 'libjs', 'appcss', 'apphtml', 'watch']);

gulp.task('nw', ['appjs', 'libjs', 'appcss', 'apphtml']);

gulp.task('run', shell.task([shellTaskArgument]));
