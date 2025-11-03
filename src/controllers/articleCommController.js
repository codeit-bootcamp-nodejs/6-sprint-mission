import { articleCommentService } from '../services/commentService.js';

export const createArticleComment = async (req, res) => {
  const comment = await articleCommentService.create(req.body);
  res.status(201).send(comment);
};

export const patchArticleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await articleCommentService.update(id, req.body);
  res.status(200).send(comment);
};

export const getArticleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await articleCommentService.findById(id);
  res.status(200).send(comment);
};

export const deleteArticleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await articleCommentService.delete(id);
  res.status(204).send();
};

export const getArticleCommentList = async (req, res) => {
  const { cursor, sort, keyword, limit: limitStr } = req.query;
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;
  const comments = await articleCommentService.find({
    cursor,
    sort,
    keyword,
    limit,
  });
  res.status(200).send(comments);
};
