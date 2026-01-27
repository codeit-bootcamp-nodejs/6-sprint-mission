class ForbiddenError extends Error {
  statusCode = 403;

  constructor(message = '권한이 없습니다') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
