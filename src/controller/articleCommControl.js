import articleCommService from '../service/articleCommService.js';

// 게시물 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 articleId 있어야 함

async function postArticleComment(req, res, next) {
  const { articleId } = req.params;
  const { content } = req.body;
  //assert({ articleId, content }, CreateComment);
  const contentArray = Array.isArray(content) ? content : [content];

  try {
    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        comments: {
          create: contentArray.map((c) => ({ content: c }))
        }
      },
      include: { comments: true }
    });
    article.comments = article.comments.map(({ productId, ...rest }) => rest); // pdoructId = null 가림
    console.log('Comments updated');
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

// 1개 댓글 수정
// req.params에 commentId 있어야 함
// 입력 필드: content
async function patchComment(req, res, next) {
  const { commentId: id } = req.params;
  //assert(req.body, PatchComment);

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: req.body
    });
    console.log('Comments edited.');
    res.status(201).send(comment);
  } catch (err) {
    next(err);
  }
}

// 1개 댓글 삭제
// req.params에 commentId 있어야 함
async function deleteComment(req, res, next) {
  const { commentId: id } = req.params;
  try {
    const comment = await prisma.comment.delete({ where: { id } });
    console.log('Comment deleted.');
    res.status(201).send('Comment deleted.');
  } catch (err) {
    next(err);
  }
}

// 모든 댓글 목록 조회
// 페이지네이션: cursor 기반 (default: limit=10)
// 조회순: id 오름순으로 고정
// 조건 검색: content에 포함된 단어
export async function getAllCommentList(req, res, next) {
  const { limit, cursor, type, content } = req.query;
  console.log(`Fetching ${type} comment list...`);
  console.log(`cursor, now:   ${cursor}`);

  let where;
  if (type == 'product') {
    where = { articleId: null, content: { contains: content } };
  } else if (type == 'article') {
    where = { productId: null, content: { contains: content } };
  } else {
    where = { content: { contains: content } };
  }

  try {
    const comments = await prisma.comment.findMany({
      skip: cursor ? 1 : 0, // 첫 검색 0, 이후 1
      take: parseInt(limit) || 10, // 페이지 사이즈는 조정 가능 (default 10)
      cursor: cursor ? { id: cursor } : undefined, // 첫 검색 undefined, 이후 전 검색의 최종 id
      where, // content에 포함된 단어로 조건 검색
      orderBy: { id: 'asc' }, // 조회순: id 오름순으로 고정
      select: {
        id: true,
        content: true,
        productId: type == 'article' ? false : true,
        articleId: type == 'product' ? false : true,
        createdAt: true,
        updatedAt: false
      }
    });

    const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
    console.log(`cursor, next:  ${nextCursor}`);
    console.log('');
    res.status(200).send({ comments, nextCursor });
  } catch (err) {
    next(err);
  }
}

// 1개 댓글 조회
export async function getComment(req, res, next) {
  const { commentId } = req.params;

  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id: commentId }
    });
    console.log('Comments retrieved.');
    res.status(200).send(comment);
  } catch (err) {
    next(err);
  }
}
