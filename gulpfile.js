var gulp = require('gulp');
require('require-dir')('./tasks');

gulp.task(
  'build',
  gulp.series(
    'clean-dist',
    'copy-files',
    'build-sources'
  ),
  done => { done(); }
);

