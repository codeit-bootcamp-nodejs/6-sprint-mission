import { articleService } from '../services/articleService.js';

export const createArticle = async (req, res) => {
  const data = req.body;
  const article = await articleService.create(data);
  res.status(201).send(article);
};

export const patchArticle = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const article = await articleService.update(id, data);
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
  const { sort, keyword = '' } = req.query;
  const limit = parseInt(req.query.limit || 10, 10);
  const offset = parseInt(req.query.offset || 10, 10);
  const select = {
    id: true,
    title: true,
    content: true,
    createdAt: true,
  };

  const sortOptions = {
    newest: { createdAt: 'desc' },
    oldest: { createdAt: 'asc' },
    priceHighest: { price: 'desc' },
    priceLowest: { price: 'asc' },
  };

  const findOptions = {
    take: limit,
    orderBy: sortOptions[sort] || sortOptions.newest,
    ...(keyword && {
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      },
      select,
    }),
    ...(!keyword &&
      offset && {
        skip: offset,
        select,
      }),
  };
  const articles = await articleService.find(findOptions);
  res.status(200).send(articles);
};
