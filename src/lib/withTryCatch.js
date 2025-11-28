export default function withTryCatch(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next); // 여기서 next 전달
    } catch (e) {
      next(e);
    }
  };
}
