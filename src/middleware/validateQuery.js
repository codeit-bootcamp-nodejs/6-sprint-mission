import BadRequestError from '../lib/errors/BadRequestError.js';

export function validateQueryKeys(allowedKeys = []) {
  return (req, res, next) => {
    const queryKeys = Object.keys(req.query);
    const queryKeysOK = queryKeys.length ? queryKeys.every((k) => allowedKeys.includes(k)) : true;

    if (!queryKeysOK) {
      throw new BadRequestError('잘못된 요청입니다.');
    } else {
      next();
    }
  };
}

export function validateQueryValues(allowedValues = []) {
  return (req, res, next) => {
    const queryValues = Object.values(req.query).filter((n) => isNaN(Number(n)));
    const queryValsOK = queryValues.every((n) => allowedValues.includes(n));

    if (!queryValsOK) {
      throw new BadRequestError('잘못된 요청입니다.');
    } else {
      next();
    }
  };
}
