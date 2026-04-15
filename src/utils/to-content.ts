// TODO) To-Content: 문자열 검증 유틸
import { ValidationError } from '../core/error/error-handler.js';

export const assertContent = (content: unknown) => {
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw new ValidationError('content', '댓글 내용이 없습니다');
  }
  return content.trim();
};
