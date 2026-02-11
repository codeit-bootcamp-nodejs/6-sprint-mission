module.exports = {
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testMatch: ['<rootDir>/test/middleware_authorize.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'src/middleware/authorize.ts' // for authorize test
  ]
};
