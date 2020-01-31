gulp = require 'gulp'
s3 = require 'gulp-s3'
fs = require 'fs'

gulp.task 'deploy', ->
  aws = JSON.parse fs.readFileSync './aws.json'
  gulp.src './public/**'
    .pipe s3 aws
