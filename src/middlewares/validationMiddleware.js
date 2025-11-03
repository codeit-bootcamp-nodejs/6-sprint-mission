import { assert } from 'superstruct';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      assert(req.body, schema);
      next();
    } catch (err) {
      next(err);
    }
  };
};
