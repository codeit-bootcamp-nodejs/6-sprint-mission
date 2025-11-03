export const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || !description || price == null) {
    return res.status(400).json({ error: 'name/description/price required' });
  }
  next();
};
