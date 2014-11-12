gulp = require 'gulp'
react = require 'gulp-react'
browserSync = require 'browser-sync'
files = ['public/**/*.html', 'public/static/build/*.js']

gulp.task 'browser-sync', ->
  browserSync.init null,
    notify: true
    browser: 'google chrome canary'
    server:
      baseDir: 'public'

gulp.task 'react', ->
  gulp.src 'public/static/js/*.js'
    .pipe react()
    .pipe gulp.dest('public/static/build')

gulp.task 'watch', ->
  gulp.watch 'public/static/js/*.js', ['react']
  gulp.watch files, browserSync.reload

gulp.task 'default', ['browser-sync', 'watch']
