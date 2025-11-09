import { assert } from 'superstruct';

const modelValidate = (schema) => {
  return (req, res, next) => {
    try {
      assert(req.body, schema);
      next();
    } catch (err) {
      res.status(400).json({
        error: 'Validation failed',
        message: err.message
      });
    }
  };
};

export default modelValidate;
