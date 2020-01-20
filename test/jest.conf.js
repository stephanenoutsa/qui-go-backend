const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    // 'common/models/**/*.{js}',
    // '!server/server.js',
    'src/services/v0/**/**/*.{js}',
    '!src/server.js',
  ],
  resetMocks: true,
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
};
