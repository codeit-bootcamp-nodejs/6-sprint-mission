class NotFoundError extends Error {
  statusCode = 404;
  constructor(message = '존재하지 않습니다') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
