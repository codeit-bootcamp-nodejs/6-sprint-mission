import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../struct/structs';
import commentRepo from '../repository/comment.repo';
import { UpdateCommentDto, ArticleCommentDto, ProductCommentDto } from '../dto/dto';
import { Comment2show, CommentWithNextCursor } from '../dto/interfaceType';
import { Comment } from '@prisma/client';

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

async function post(url: string, content: string, id: string, userId: number): Promise<Comment> {
  let commentData: ArticleCommentDto | ProductCommentDto;
  if (url.includes('articles')) {
    commentData = {
      content,
      userId,
      articleId: Number(id),
      productId: null
    };
  } else {
    commentData = {
      content,
      userId,
      productId: Number(id),
      articleId: null
    };
  }

  assert(commentData, CreateComment);
  console.log(commentData);
  const comment = await commentRepo.post(commentData);
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
  post,
  // postProduct,
  // postArticle,
  patch,
  erase
};
