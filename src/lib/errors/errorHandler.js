// 커스텀 에러 클래스들
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400);
    this.field = field;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

// 비동기 함수를 감싸는 에러 핸들러
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 에러 핸들러
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

// 전역 에러 핸들러
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // 로그 출력
  console.error('Error:', err);

  // Prisma 에러 처리
  if (err.name === 'PrismaClientInitializationError' || err.code === 'P1010') {
    const message = '데이터베이스 연결 오류가 발생했습니다. 데이터베이스 설정을 확인해주세요.';
    error = new AppError(message, 503);
  }

  if (err.code === 'P2002') {
    const message = 'Duplicate field value entered';
    error = new ConflictError(message);
  }

  if (err.code === 'P2025') {
    const message = 'Record not found';
    error = new NotFoundError();
  }

  // Mongoose 에러 처리
  if (err.name === 'CastError') {
    const message = 'Invalid ID format';
    error = new ValidationError(message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    error = new ValidationError(message);
  }

  // JWT 에러 처리
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401);
  }

  // 기본 에러 응답
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
