// TODO) Validate: 공통 유효성 검사
// ?) Superstruct 기반 공통 바디 검증 미들웨어
import type { NextFunction, Request, Response } from 'express';
import { create, type Failure, type Struct, StructError } from 'superstruct';
import { ValidationError } from '../core/error/error-handler.js';

type PayloadKey = 'body' | 'params' | 'query';

// 1) 공통 스키마 검증 미들웨어 팩토리
const validatePayload =
  (schema: Struct<any, any>, payloadKey: PayloadKey) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // 1-1) 요청 데이터 스키마 검증 및 변환 결과 재할당
      const validated = create(req[payloadKey as keyof Request], schema);
      (req as any)[payloadKey] = validated;

      next();
    } catch (error) {
      // 1-2) Superstruct 에러만 추출
      const structError = error instanceof StructError ? error : null;

      // 1-3) 실패 리스트 배열로 정규화
      const failures = structError
        ? Array.from(structError.failures())
        : ([] as Failure[]);

      // 1-4) 첫 번째 실패 항목만 추출
      const first = failures[0];

      // 1-5) 실패 빌드 경로를 점 표기법으로 병합
      const path =
        first?.path?.join('.') || structError?.path?.join('.') || null;

      // 1-6) 커스텀메시지 -> 기본 메시지 -> fallback
      const message =
        resolveCustomMessage(path, first) ||
        first?.message ||
        '요청 데이터가 올바르지 않습니다';

      throw new ValidationError(path, message);
    }
  };

// 2) 바디 검증 (기존 기본값)
const validate = (schema: Struct<any, any>) => validatePayload(schema, 'body');

// 3) params/query 검증
export const validateParams = (schema: Struct<any, any>) =>
  validatePayload(schema, 'params');
export const validateQuery = (schema: Struct<any, any>) =>
  validatePayload(schema, 'query');

export default validate;

// 4) 필드/타입별 커스텀 메시지
const resolveCustomMessage = (
  path: string | null,
  failure?: Failure
): string | null => {
  // 4-1) 실패 경로가 없으면 메시지 생성 불가
  if (!path) return null;

  // 4-2) 필드명별 기본 에러 메시지
  const map: Record<string, string> = {
    email: '이메일 형식이 올바르지 않습니다',
    password: '비밀번호는 8~64자여야 합니다',
    nickname: '닉네임은 1~30자여야 합니다',
    image: '이미지 확장자는 jpg, jpeg, png만 허용됩니다',
    name: '상품명은 1~20자여야 합니다',
    price: '가격은 0 이상이어야 합니다',
    stock: '재고는 0 이상의 정수여야 합니다',
    tags: 'tags는 NONE, FASHION, BEAUTY, SPORTS, ELECTRONICS, HOME_INTERIOR, HOUSEHOLD_SUPPLIES, KITCHENWARE 중 하나여야 합니다',
    title: '제목은 1~30자여야 합니다',
    content: '내용은 1~100자 이내여야 합니다',
    productId: 'productId는 1 이상의 정수여야 합니다',
    articleId: 'articleId는 1 이상의 정수여야 합니다',
    quantity: 'quantity는 1 이상의 정수여야 합니다',
  };

  // 2-3) 사전에 매핑된 필드면 해당 메시지 반환
  if (map[path]) return map[path];

  // 2-4) 확장자 커스텀 실패 메시지 처리
  if (
    failure?.type === 'imagePathExt' ||
    failure?.refinement === 'imagePathExt'
  ) {
    return 'jpg, jpeg, png 확장자여야 합니다';
  }

  // 2-5) 타입별 기본 에러 메시지
  const typeMap: Record<string, string> = {
    string: 'Stirng',
    number: 'Number',
    integer: 'Integer',
    boolean: 'Boolean',
    array: 'Array',
    object: 'Object',
  };

  // 2-6) 타입/범위/열거형 등 세부 실패 유형별 메시지 (확장 가능)
  if (failure?.type && typeMap[failure.type]) {
    return `${path}는 ${typeMap[failure.type]}이어야 합니다`;
  }
  if (failure?.type === 'min') {
    return `${path}는 최소값보다 커야 합니다`;
  }
  if (failure?.type === 'max') {
    return `${path}는 최대값을 초과할 수 없습니다`;
  }
  if (failure?.type === 'size') {
    return `${path}의 길이가 제한을 초과하거나 부족합니다`;
  }
  if (failure?.type === 'enum' || failure?.type === 'enums') {
    return `${path} 값이 허용된 목록에 없습니다`;
  }

  // 2-7) 매핑 실패 시 기본 메시지로 위임
  return null;
};
