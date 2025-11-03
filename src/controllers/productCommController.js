import { productCommentService } from '../services/commentService.js';

export const createProductComment = async (req, res) => {
  const comment = await productCommentService.create(req.body);
  res.status(201).send(comment);
};

export const patchProductComment = async (req, res) => {
  const { id } = req.params;
  const productComment = await productCommentService.update(id, req.body);
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
  const { cursor, sort = 'newest', keyword = '', limit: limitStr } = req.query;
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;
  const comments = await productCommentService.find({
    cursor,
    sort,
    keyword,
    limit,
  });
  res.status(200).send(comments);
};
