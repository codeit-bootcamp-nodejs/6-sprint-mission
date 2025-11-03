export const validateComment = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'content required' });
  next();
};
