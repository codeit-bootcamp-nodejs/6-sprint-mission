import { ValidationError } from './errors/errorHandler.js';

// 게시글 생성 검증
export const validateArticleCreate = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('제목은 필수입니다.');
  } else if (title.length > 200) {
    errors.push('제목은 200자를 초과할 수 없습니다.');
  }

  if (!content || content.trim().length === 0) {
    errors.push('내용은 필수입니다.');
  } else if (content.length > 10000) {
    errors.push('내용은 10000자를 초과할 수 없습니다.');
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};

// 게시글 수정 검증
export const validateArticleUpdate = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (title !== undefined) {
    if (title.trim().length === 0) {
      errors.push('제목은 비어있을 수 없습니다.');
    } else if (title.length > 200) {
      errors.push('제목은 200자를 초과할 수 없습니다.');
    }
  }

  if (content !== undefined) {
    if (content.trim().length === 0) {
      errors.push('내용은 비어있을 수 없습니다.');
    } else if (content.length > 10000) {
      errors.push('내용은 10000자를 초과할 수 없습니다.');
    }
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};

// ID 파라미터 검증
export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return next(new ValidationError('유효한 ID가 필요합니다.'));
  }

  next();
};

// 페이지네이션 검증
export const validatePagination = (req, res, next) => {
  const { offset = 0, limit = 10 } = req.query;

  const offsetNum = parseInt(offset);
  const limitNum = parseInt(limit);

  if (isNaN(offsetNum) || offsetNum < 0) {
    return next(new ValidationError('offset은 0 이상의 숫자여야 합니다.'));
  }

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return next(new ValidationError('limit은 1-100 사이의 숫자여야 합니다.'));
  }

  next();
};

// 제품 생성 검증
export const validateProductCreate = (req, res, next) => {
  const { name, price, description, category } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('상품명은 필수입니다.');
  } else if (name.length > 100) {
    errors.push('상품명은 100자를 초과할 수 없습니다.');
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    errors.push('가격은 0보다 큰 숫자여야 합니다.');
  }

  if (!description || description.trim().length === 0) {
    errors.push('상품 설명은 필수입니다.');
  } else if (description.length > 1000) {
    errors.push('상품 설명은 1000자를 초과할 수 없습니다.');
  }

  if (!category || category.trim().length === 0) {
    errors.push('카테고리는 필수입니다.');
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};

// 제품 수정 검증
export const validateProductUpdate = (req, res, next) => {
  const { name, price, description, category } = req.body;
  const errors = [];

  if (name !== undefined) {
    if (name.trim().length === 0) {
      errors.push('상품명은 비어있을 수 없습니다.');
    } else if (name.length > 100) {
      errors.push('상품명은 100자를 초과할 수 없습니다.');
    }
  }

  if (price !== undefined) {
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      errors.push('가격은 0보다 큰 숫자여야 합니다.');
    }
  }

  if (description !== undefined) {
    if (description.trim().length === 0) {
      errors.push('상품 설명은 비어있을 수 없습니다.');
    } else if (description.length > 1000) {
      errors.push('상품 설명은 1000자를 초과할 수 없습니다.');
    }
  }

  if (category !== undefined) {
    if (category.trim().length === 0) {
      errors.push('카테고리는 비어있을 수 없습니다.');
    }
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};

// 댓글 생성 검증
export const validateCommentCreate = (req, res, next) => {
  const { content } = req.body;
  const errors = [];

  if (!content || content.trim().length === 0) {
    errors.push('댓글 내용은 필수입니다.');
  } else if (content.length > 500) {
    errors.push('댓글은 500자를 초과할 수 없습니다.');
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};

// 댓글 수정 검증
export const validateCommentUpdate = (req, res, next) => {
  const { content } = req.body;
  const errors = [];

  if (content !== undefined) {
    if (content.trim().length === 0) {
      errors.push('댓글 내용은 비어있을 수 없습니다.');
    } else if (content.length > 500) {
      errors.push('댓글은 500자를 초과할 수 없습니다.');
    }
  }

  if (errors.length > 0) {
    return next(new ValidationError(errors.join(' ')));
  }

  next();
};
