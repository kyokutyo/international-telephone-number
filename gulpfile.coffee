gulp = require 'gulp'
react = require 'gulp-react'
less = require 'gulp-less'
plumber = require 'gulp-plumber'
browserSync = require 'browser-sync'
s3 = require 'gulp-s3'
fs = require 'fs'
files = ['public/**/*.html', 'public/static/build/*.js', 'public/static/css/*.css']

gulp.task 'browser-sync', ->
  browserSync.init null,
    notify: true
    browser: 'google chrome canary'
    server:
      baseDir: 'public'

gulp.task 'react', ->
  gulp.src 'public/static/js/*.js'
    .pipe plumber()
    .pipe react()
    .pipe gulp.dest('public/static/build')

gulp.task 'less', ->
  gulp.src 'public/static/less/*.less'
    .pipe plumber()
    .pipe less()
    .pipe gulp.dest 'public/static/css'

gulp.task 'watch', ->
  gulp.watch 'public/static/js/*.js', gulp.task('react')
  gulp.watch 'public/static/less/*.less', gulp.task('less')
  gulp.watch files, browserSync.reload

gulp.task 'default', gulp.parallel('browser-sync', 'watch')

gulp.task 'deploy', ->
  aws = JSON.parse fs.readFileSync './aws.json'
  gulp.src './public/**'
    .pipe s3 aws
