gulp = require 'gulp'
sass = require 'gulp-sass'
plumber = require 'gulp-plumber'
s3 = require 'gulp-s3'
fs = require 'fs'
files = ['public/**/*.html', 'public/static/css/*.css']

gulp.task 'sass', ->
  gulp.src 'public/static/scss/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe gulp.dest 'public/static/css'

gulp.task 'watch', ->
  gulp.watch 'public/static/scss/*.scss', gulp.task('sass')

gulp.task 'default', gulp.parallel('watch')

gulp.task 'deploy', ->
  aws = JSON.parse fs.readFileSync './aws.json'
  gulp.src './public/**'
    .pipe s3 aws
