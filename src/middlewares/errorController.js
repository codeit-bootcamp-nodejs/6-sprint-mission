import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'StructError') {
    return res.status(400).send({ message: err.message });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).send({ message: '요청한 리소스를 찾을 수 없습니다.' });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    return res.status(500).send({ message: err.message });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).send({ message: '데이터베이스 처리 중 오류가 발생했습니다.' });
  } else {
    res.status(500).send({ message: err.message });
  }
};
