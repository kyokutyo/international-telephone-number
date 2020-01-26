gulp = require 'gulp'
react = require 'gulp-react'
sass = require 'gulp-sass'
plumber = require 'gulp-plumber'
browserSync = require 'browser-sync'
s3 = require 'gulp-s3'
fs = require 'fs'
files = ['public/**/*.html', 'public/static/build/*.js', 'public/static/css/*.css']

gulp.task 'react', ->
  gulp.src 'public/static/js/*.js'
    .pipe plumber()
    .pipe react()
    .pipe gulp.dest('public/static/build')

gulp.task 'sass', ->
  gulp.src 'public/static/scss/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe gulp.dest 'public/static/css'

gulp.task 'watch', ->
  gulp.watch 'public/static/js/*.js', gulp.task('react')
  gulp.watch 'public/static/scss/*.scss', gulp.task('sass')

gulp.task 'default', gulp.parallel('watch')

gulp.task 'deploy', ->
  aws = JSON.parse fs.readFileSync './aws.json'
  gulp.src './public/**'
    .pipe s3 aws
