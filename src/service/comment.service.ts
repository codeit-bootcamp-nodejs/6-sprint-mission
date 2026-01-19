import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../struct/userStruct';
import commentRepo from '../repository/comment.repo';
import {
  UpdateCommentDto,
  ArticleCommentDto,
  ProductCommentDto,
  CreateNotificationDto
} from '../dto/dto';
import { Comment2show, CommentWithNextCursor } from '../dto/interfaceType';
import { Comment, Notification, NotificationType, Prisma } from '@prisma/client';
import { CreateNotification } from '../struct/productStruct';
import prisma from '../lib/prismaClient';
import articleRepo from '../repository/article.repo';
import NotFoundError from '../middleware/errors/NotFoundError';
import { getIO } from '../websocket/socketIO';

async function getList(
  limit: number,
  cursor: number | undefined,
  typeStr: string,
  contentStr: string | undefined
): Promise<CommentWithNextCursor> {
  let where = {};
  if (contentStr) where = { content: { contains: contentStr } };

  // nextCursor 계산에 반영해야 할 부분
  // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
  // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
  const comments = await commentRepo.getList(where, limit, cursor);
  const newComments = comments.map((c) => {
    if (typeStr === 'product') c.articleId = null;
    if (typeStr === 'article') c.productId = null;
    return c;
  });

  const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments: newComments, nextCursor };
}

async function get(commentId: string): Promise<Comment2show> {
  const comment = await commentRepo.findById(Number(commentId));
  const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
  if (comment.articleId == null) return { id, content, productId, userId, createdAt };
  else return { id, content, articleId, userId, createdAt };
}

async function postArticle(
  content: string,
  id: number,
  userId: number
): Promise<[Comment, Notification]> {
  const commentData = {
    content,
    userId,
    articleId: id,
    productId: null
  } as ArticleCommentDto;

  assert(commentData, CreateComment);

  const commentDataToRepo = {
    content,
    user: { connect: { id: userId } },
    article: { connect: { id } }
  } as Prisma.CommentCreateInput;

  const article = await articleRepo.findById(id);
  if (!article) throw new NotFoundError('article', id);

  const message = `게시글${id}에 사용자${userId}가 댓글을 남겼습니다 (${content})`;
  const notificationData = {
    userId: article.userId,
    type: NotificationType.ARTICLE,
    message,
    articleId: id,
    productId: null
  } as CreateNotificationDto;

  assert(notificationData, CreateNotification);

  const notificationDataToRepo = {
    user: { connect: { id: article.userId } },
    type: NotificationType.ARTICLE,
    message: notificationData.message,
    article: { connect: { id } }
  } as Prisma.NotificationCreateInput;

  const [comment, notification] = await prisma.$transaction([
    prisma.comment.create({ data: commentDataToRepo }),
    prisma.notification.create({ data: notificationDataToRepo })
  ]);

  const io = getIO();
  io.to(`user:${article.userId}`).emit('notification', { message });
  return [comment, notification];
}

async function postProduct(content: string, id: number, userId: number): Promise<Comment> {
  const commentData = {
    content,
    userId,
    productId: id,
    articleId: null
  } as ProductCommentDto;
  assert(commentData, CreateComment);

  const commentDataToRepo = {
    content,
    user: { connect: { id: userId } },
    product: { connect: { id } }
  } as Prisma.CommentCreateInput;

  const comment = await commentRepo.post(commentDataToRepo);
  return comment;
}

async function patch(commentId: string, data: UpdateCommentDto, userId: number): Promise<Comment> {
  const commentData = { ...data, userId };
  assert(commentData, PatchComment);
  return await commentRepo.patch(Number(commentId), commentData);
}

async function erase(commentId: string): Promise<void> {
  await commentRepo.erase(Number(commentId));
}

export default {
  getList,
  get,
  postProduct,
  postArticle,
  patch,
  erase
};
