const exec = require('gulp-exec');
const gulp = require('gulp');
const dest = require('./build-config').dest;
const options = {
  dist: dest,
};

module.exports = gulp.task('build-sources', () => gulp.src(dest)
  .pipe(exec('cd <%= options.dist %> && yarn install --production --ignore-scripts', options))
);
