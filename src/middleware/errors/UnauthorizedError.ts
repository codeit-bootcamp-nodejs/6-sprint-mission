class UnauthorizedError extends Error {
  statusCode = 401;

  constructor(message = '로그인이 필요합니다') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
