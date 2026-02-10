class InternalServerError extends Error {
  statusCode = 500;

  constructor(message = '서버 내부 문제가 발생했습니다') {
    super(message);
    this.name = 'InternalServerError';
  }
}

export default InternalServerError;
