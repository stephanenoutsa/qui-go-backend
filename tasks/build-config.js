module.exports = {
  src: [
    './**/*.js',
    './**/*.json',
    '!./**/*spec.js',
    '!./test/**/*.js',
    './package.json',
    '!./tasks/**',
    '!./gulpfile.js',
    '!./tools/**',
    '!./ci/**',
    '!./node_modules/**',
  ],
  dest: 'dist/',
  dirToDel: 'dist/',
};
