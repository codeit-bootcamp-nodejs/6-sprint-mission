import * as s from 'superstruct';

//.post (validate(CreateProductStruct, 'body'), createProduct);
export const validate = (struct, target = 'body') => {
  return (req, res, next) => {
    try {
      // 1. 검사할 데이터 선택 (body냐 params냐)
      const data = req[target];

      // 2. 설계도와 대조 (검증)
      const validatedData = s.create(data, struct);

      // 3. 검증된 데이터로 덮어쓰기 (Sanitization 효과)
      req[target] = validatedData;

      next(); // 통과!
    } catch (error) {
      // 4. 실패 시 에러 던지기
      error.status = 400;
      error.message = `유효성 검사 에러: ${error.message}`;
      next(error);
    }
  };
};
