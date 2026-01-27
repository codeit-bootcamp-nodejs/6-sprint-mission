class BadRequestError extends Error {
  statusCode = 400;

  constructor(message = '잘못된 요청입니다') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
