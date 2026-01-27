import prisma from '../lib/prismaClient';
import { Prisma, Comment } from '@prisma/client';

async function getList(
  where: object,
  limit: number,
  cursor: number | undefined
): Promise<Comment[]> {
  return await prisma.comment.findMany({
    skip: cursor ? 1 : 0, // 첫 검색 0, 이후 1
    take: limit, // default 10
    cursor: cursor ? { id: cursor } : undefined, // 첫 검색 undefined, 이후 전 검색의 최종 id
    where, // type과 content에 포함된 단어로 조건 검색
    orderBy: { id: 'asc' } // 조회순: id 오름순으로 고정
  });
}

async function findById(id: number): Promise<Comment> {
  return await prisma.comment.findUniqueOrThrow({
    where: { id }
  });
}

async function post(data: Prisma.CommentCreateInput): Promise<Comment> {
  return await prisma.comment.create({ data });
}

async function patch(id: number, commentData: Prisma.CommentUpdateInput): Promise<Comment> {
  return await prisma.comment.update({
    where: { id },
    data: commentData
  });
}

async function erase(id: number): Promise<void> {
  await prisma.comment.delete({ where: { id } });
}

export default {
  getList,
  findById,
  post,
  patch,
  erase
};
