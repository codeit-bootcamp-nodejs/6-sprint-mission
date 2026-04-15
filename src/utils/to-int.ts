// TODO) To-Int: 숫자 검증 유틸
import { ValidationError } from '../core/error/error-handler.js';

export const toIntOrThrow = (value: unknown, field: string) => {
  const num = Number(value);

  if (!Number.isInteger(num)) {
    throw new ValidationError(field, `정수가 아닌 ${field}입니다`);
  }

  return num;
};
