const gulp = require('gulp')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')

let user = process.env.user
let password = process.env.pass
let host = process.env.host
let port = 21
let localFilesGlob = ['./**/*', '!node_modules/**']
let remoteFolder = 'www/sandbox/flexbox-layout'

console.log(user)

const conn = () => {
  return ftp.create({
    host: host,
    port: port,
    user: user,
    password: password,
    parallel: 5,
    reload: true,
    log: gutil.log
  })
}

gulp.task('ftp-deploy', () => {
  let connection = conn()
  
  return gulp.src(localFilesGlob, { base: '.', buffer: false })
  .pipe(connection.newer(remoteFolder))
  .pipe(connection.dest(remoteFolder))
})