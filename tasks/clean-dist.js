const del = require('del');
const packageCfg = require('./build-config');
const gulp = require('gulp');
const dirs = [packageCfg.dirToDel];

module.exports = gulp.task('clean-dist', cb => del(dirs, cb));
