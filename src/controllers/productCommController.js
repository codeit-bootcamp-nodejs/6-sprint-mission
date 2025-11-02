import { productCommentService } from '../services/commentService.js';

export const createProductComment = async (req, res) => {
  const data = req.body;
  const comment = await productCommentService.create(data);
  res.status(201).send(comment);
};

export const patchProductComment = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const productComment = await productCommentService.update(id, data);
  res.status(200).send(productComment);
};

export const getProductCommentDetail = async (req, res) => {
  const { id } = req.params;
  const comment = await productCommentService.findById(id);
  res.status(200).send(comment);
};

export const deleteProductComment = async (req, res) => {
  const { id } = req.params;
  const productComment = await productCommentService.delete(id);
  res.status(204).send();
};

export const getProductCommentList = async (req, res) => {
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

  const comments = await productCommentService.find(findOptions);
  const nextCursor = comments.length === limit ? comments[limit - 1].id : null;

  res.status(200).send({ comments, nextCursor });
};
