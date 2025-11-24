// 'P2025' = not found
const errorHandler = (err, req, res, next) => {
  if (err.code === 'P2025') {
    return res.status(404).send({
      success: false,
      message: '요청하신 내용을 찾을 수 없습니다.',
    });
  } else {
    const statusCode = err.status || 500;
    return res.status(statusCode).send({
      success: false,
      message: err.message || '서버 오류가 발생했습니다. 다시 시도해주십시오.',
    });
  }
};

export default errorHandler;
