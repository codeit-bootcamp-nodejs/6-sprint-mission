import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../struct/comment.struct';
import { CreateNotification } from '../struct/product.struct';
import commentRepo from '../repository/comment.repo';
import notificationRepo from '../repository/notification.repo';
import {
  UpdateCommentDto,
  ArticleCommentDto,
  ProductCommentDto,
  CreateNotificationDto
} from '../types/dto';
import { Comment2show, CommentWithNextCursor } from '../types/interfaceType';
import { Comment, NotificationType, Prisma } from '@prisma/client';
import articleRepo from '../repository/article.repo';
import NotFoundError from '../middleware/errors/NotFoundError';
import { getIO } from '../websocket/socketIO';
import { stripNulls } from '../lib/myFuns';

async function getList(
  limit: number,
  cursor: number | undefined,
  typeStr: string,
  contentStr: string | undefined
): Promise<CommentWithNextCursor> {
  let where = {};
  if (contentStr) where = { content: { contains: contentStr } };
  if (typeStr == 'product') where = { ...where, articleId: null };
  if (typeStr == 'article') where = { ...where, productId: null };

  // nextCursor 계산에 반영해야 할 부분
  // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
  // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
  const comments = await commentRepo.getList(where, limit, cursor);
  const newComments = stripNulls(comments);

  const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments: newComments, nextCursor } as CommentWithNextCursor;
}

async function get(commentId: string): Promise<Comment2show> {
  const comment = await commentRepo.findById(Number(commentId));
  const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
  if (comment.articleId == null) return { id, content, productId, userId, createdAt };
  else return { id, content, articleId, userId, createdAt };
}

async function postArticle(content: string, id: number, userId: number): Promise<Comment> {
  const commentData: ArticleCommentDto = {
    content,
    userId,
    articleId: id,
    productId: null
  };

  assert(commentData, CreateComment);

  const commentDataToRepo: Prisma.CommentCreateInput = {
    content,
    user: { connect: { id: userId } },
    article: { connect: { id } }
  };
  const comment = await commentRepo.post(commentDataToRepo);
  console.log('');
  console.log('Comment created for article');

  const article = await articleRepo.findById(id);
  if (!article) throw new NotFoundError();

  //if (article.userId !== userId) { //테스트 위해 본인이 댓글 달아도 알림 보내기
  const message = `댓글 알림: ${content} (게시글${id} by 사용자${userId})`;
  const notificationData: CreateNotificationDto = {
    userId: article.userId,
    type: NotificationType.ARTICLE,
    message,
    articleId: id,
    productId: null
  };

  assert(notificationData, CreateNotification);

  const notificationDataToRepo: Prisma.NotificationCreateInput = {
    user: { connect: { id: article.userId } },
    type: NotificationType.ARTICLE,
    message: notificationData.message,
    article: { connect: { id } }
  };

  const notification = await notificationRepo.post(notificationDataToRepo);

  const io = getIO();
  io.to(`user:${article.userId}`).emit('notification', { message });

  console.log('Notification sent & stored for article author');
  // }
  return comment;
}

async function postProduct(content: string, id: number, userId: number): Promise<Comment> {
  const commentData: ProductCommentDto = {
    content,
    userId,
    productId: id,
    articleId: null
  };
  assert(commentData, CreateComment);

  const commentDataToRepo: Prisma.CommentCreateInput = {
    content,
    user: { connect: { id: userId } },
    product: { connect: { id } }
  };

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
