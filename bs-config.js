module.exports = {
  files: [
    './public/**/*.html',
    './public/static/js/*.js',
    './public/static/css/*.css'
  ],
  server: {
    baseDir: './public'
  },
  proxy: false,
  port: 3000,
  startPath: '/',
  browser: ['Google Chrome']
}
