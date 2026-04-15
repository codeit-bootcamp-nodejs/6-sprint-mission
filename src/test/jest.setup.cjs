process.env.NODE_ENV = 'test';
process.env.DEBUG_MODE = 'false';
process.env.LOG_LEVEL = 'error';

if (!process.env.JWT_ACCESS_SECRET) {
  process.env.JWT_ACCESS_SECRET = 'test-access-secret';
}
if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
}
