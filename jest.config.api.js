module.exports = {
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testMatch: ['**/api.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'src/controller/auth.control.ts', // rest for API test
    'src/controller/product.control.ts',
    'src/controller/article.control.ts',
    '!src/controller/image.control.ts',
    '!src/controller/notification.control.ts',
    '!src/controller/comment.control.ts',
    '!src/controller/user.control.ts'
  ]
};
