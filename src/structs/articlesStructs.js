export const validateArticle = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title/content required' });
  }
  next();
};
