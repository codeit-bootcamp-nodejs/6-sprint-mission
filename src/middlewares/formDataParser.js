export const parseFormData = (req, res, next) => {
  const data = req.body;

  // 숫자 필드 반환
  if (data.price) {
    data.price = parseInt(data.price, 10);
  }
  if (data.stock) {
    data.stock = parseInt(data.stock, 10);
  }

  // 배열로 변환
  const arrayFields = ['tags', 'images'];
  for (const field of arrayFields) {
    if (data[field] && typeof data[field] === 'string') {
      try {
        // "['item1', 'item2']" 형식 처리
        data[field] = JSON.parse(data[field].replace(/'/g, '"'));
      } catch (e) {
        // "item1, item2" 형식 처리
        data[field] = data[field].split(',').map((tag) => tag.trim());
      }
    }
  }
  next();
};
