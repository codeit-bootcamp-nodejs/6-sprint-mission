export default function withAsync(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
