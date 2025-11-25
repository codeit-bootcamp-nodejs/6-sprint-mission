const errorHandler = (err, req, res, next) => {
  console.error('❌ Error Log:', err);

  //Prisma 에러: P2025 (찾을 수 없음)
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: '요청하신 내용을 찾을 수 없습니다.',
    });
  }

  //Prisma 에러 : P2002 (중복 데이터)
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 데이터입니다.', // 혹은 "중복된 값입니다."
    });
  } else {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || '서버 오류가 발생했습니다. 다시 시도해주십시오.',
    });
  }
};

export default errorHandler;
