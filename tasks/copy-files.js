const gulp = require('gulp');
const packageCfg = require('./build-config');

module.exports = gulp.task('copy-files',
  () => gulp.src(packageCfg.src).pipe(gulp.dest(packageCfg.dest))
);
