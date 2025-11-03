import { articleService } from '../services/articleService.js';

export const createArticle = async (req, res) => {
  const article = await articleService.create(req.body);
  res.status(201).send(article);
};

export const patchArticle = async (req, res) => {
  const { id } = req.params;
  const article = await articleService.update(id, req.body);
  res.status(200).send(article);
};

export const getArticle = async (req, res) => {
  const { id } = req.params;
  const article = await articleService.findById(id);
  res.status(200).send(article);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const article = await articleService.delete(id);
  res.status(204).send();
};

export const getArticleList = async (req, res) => {
  const { sort, keyword, limit: limitStr, offset: offsetStr } = req.query;
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;
  const offset = offsetStr ? parseInt(offsetStr, 10) : undefined;
  const articles = await articleService.find({ sort, keyword, limit, offset });
  res.status(200).send(articles);
};
