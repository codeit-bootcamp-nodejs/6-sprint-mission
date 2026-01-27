class ConflictError extends Error {
  statusCode = 409;

  constructor(message = '이미 존재합니다') {
    super(message);
    this.name = 'ConflictError';
  }
}

export default ConflictError;
