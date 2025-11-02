import { articleCommentService } from '../services/commentService.js';

export const createArticleComment = async (req, res) => {
  const data = req.body;
  const comment = await articleCommentService.create(data);
  res.status(201).send(comment);
};

export const patchArticleComment = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const comment = await articleCommentService.update(id, data);
  res.status(200).send(comment);
};

export const getArticleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await articleCommentService.findById(id);
  console.log(comment);
  res.status(200).send(comment);
};

export const deleteArticleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await articleCommentService.delete(id);
  res.status(204).send();
};

export const getArticleCommentList = async (req, res) => {
  const { cursor, sort = 'newest', keyword = '' } = req.query;
  const limit = parseInt(req.query.limit || 10, 10);

  const sortOptions = {
    newest: { createdAt: 'desc' },
    oldest: { createdAt: 'asc' },
  };

  const findOptions = {
    take: limit,
    orderBy: sortOptions[sort] || sortOptions.newest,
    ...(keyword && { where: { content: { contains: keyword } } }),
    ...(!keyword && cursor && { cursor: { id: cursor }, skip: 1 }),
  };

  const comments = await articleCommentService.find(findOptions);
  const nextCursor = comments.length === limit ? comments[limit - 1].id : null;
  res.status(200).send({ comments, nextCursor });
};
