# 구현 요구사항 체크리스트

## 공통 요구사항

- [x] PostgreSQL 사용
- [x] 데이터 모델 간 관계 설정 (onDelete: Cascade)
- [x] 데이터베이스 시딩 코드 작성 (`scripts/prisma-seed.js`)
- [x] 각 API에 적절한 에러 처리 (`asyncHandler`, `errorHandler`)
- [x] 각 API 응답에 적절한 상태 코드 (201, 400, 404, 500 등)

## 중고마켓 (Product)

- [x] Product 스키마 작성 (id, name, description, price, tags, createdAt, updatedAt, image_url)
- [x] 상품 등록 API (`POST /api/products`)
- [x] 상품 상세 조회 API (`GET /api/products/:id`)
- [x] 상품 수정 API (`PATCH /api/products/:id`)
- [x] 상품 삭제 API (`DELETE /api/products/:id`)
- [x] 상품 목록 조회 API (`GET /api/products`)
  - [x] id, name, price, createdAt 조회
  - [x] offset 방식 페이지네이션
  - [x] 최신순(recent) 정렬
  - [x] name, description 검색 기능

## 자유게시판 (Article)

- [x] Article 스키마 작성 (id, title, content, createdAt, updatedAt)
- [x] 게시글 등록 API (`POST /api/articles`)
- [x] 게시글 상세 조회 API (`GET /api/articles/:id`)
- [x] 게시글 수정 API (`PATCH /api/articles/:id`)
- [x] 게시글 삭제 API (`DELETE /api/articles/:id`)
- [x] 게시글 목록 조회 API (`GET /api/articles`)
  - [x] id, title, content, createdAt 조회
  - [x] offset 방식 페이지네이션
  - [x] 최신순(recent) 정렬
  - [x] title, content 검색 기능

## 댓글 (Comments)

- [x] 댓글 등록 API (상품/게시글 분리)
  - [x] 상품 댓글 등록 (`POST /api/comments/products/:productId`)
  - [x] 게시글 댓글 등록 (`POST /api/comments/articles/:articleId`)
- [x] 댓글 수정 API (`PATCH /api/comments/:id`)
- [x] 댓글 삭제 API (`DELETE /api/comments/:id`)
- [x] 댓글 목록 조회 API (cursor 방식 페이지네이션)
  - [x] id, content, createdAt 조회
  - [x] 상품 댓글 목록 (`GET /api/comments/products/:productId`)
  - [x] 게시글 댓글 목록 (`GET /api/comments/articles/:articleId`)

## 유효성 검증

- [x] 상품 등록/수정 시 유효성 검증 미들웨어 (`validateProductCreate`, `validateProductUpdate`)
- [x] 게시글 등록/수정 시 유효성 검증 미들웨어 (`validateArticleCreate`, `validateArticleUpdate`)
- [x] 댓글 등록/수정 시 유효성 검증 미들웨어 (`validateCommentCreate`, `validateCommentUpdate`)

## 이미지 업로드

- [x] multer 미들웨어 사용 (`src/lib/upload.js`)
- [x] 이미지 업로드 API (`POST /api/upload/upload`)
- [x] 업로드된 이미지 서버 저장 및 경로 반환

## 에러 처리

- [x] 전역 에러 핸들러 미들웨어 구현 (`errorHandler`)
- [x] 404 에러 핸들러 (`notFoundHandler`)
- [x] 적절한 상태 코드 반환 (400, 404, 500 등)
- [x] Prisma 에러 처리

## 라우트 관리

- [x] express.Router() 활용하여 라우트 모듈화
  - [x] `src/routers/productsRouters.js`
  - [x] `src/routers/articlesRouter.js`
  - [x] `src/routers/commentsRouter.js`
  - [x] `src/routers/uploadRouters.js`
- [x] app.route()로 중복 라우트 통합 (productsRouter, articlesRouter, commentsRouter에서 사용)

## 배포

- [x] .env 파일에 환경 변수 설정 (`DATABASE_URL`)
- [x] CORS 설정 (개발/프로덕션 환경 구분)
- [ ] render.com 배포 설정

## 추가 확인 사항

- [x] package.json에 Prisma seed 스크립트 설정
- [x] .gitignore에 .env 추가
- [x] HTTP 테스트 파일 (`__http__/api.http`)
