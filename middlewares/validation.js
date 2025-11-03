export const validate = (struct) => (req, res, next) => {
  const [error] = struct.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
