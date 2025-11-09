# Codeit Note 6기 미션3 by 정수영

## 🧩 개요

- PostgreSQL 기반 데이터베이스 서버 구축 및 배포
- Prisma ORM을 이용한 스키마 정의 및 데이터 관리
- Express REST API 서버 구현 및 Render 배포

---

## 🗂 주요 내용

### 1. Prisma 모델

| 모델        | 필드                                                     | 설명                        |
| ----------- | -------------------------------------------------------- | --------------------------- |
| **Product** | id, name, description, price, tags, createdAt, updatedAt | 필수                        |
|             | imageUrls                                                | 옵션 (단순 문자열 배열)     |
|             | comments                                                 | 옵션 (관계형)               |
| **Article** | id, title, content, createdAt, updatedAt                 | 필수                        |
|             | imageUrls                                                | 옵션 (단순 문자열 배열)     |
|             | comments                                                 | 옵션 (관계형)               |
| **Comment** | id, content, createdAt, updatedAt                        | 필수                        |
|             | productId, articleId                                     | 옵션(FK), onDelete: Cascade |

- Mock data 생성 및 seeding 코드 작성

---

### 2. HTTP 요청 함수 (API)

#### 2.1 Product API

| 기능           | 함수             | 설명                                                                                                          |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| 상품 등록      | `postProduct`    | name, description, price, tags 입력                                                                           |
| 상품 조회      | `getProduct`     | id, name, description, price, tags, createdAt 조회                                                            |
| 상품 수정      | `patchProduct`   | PATCH 메소드 사용                                                                                             |
| 상품 삭제      | `deleteProduct`  | -                                                                                                             |
| 상품 목록 조회 | `getProductList` | id, name, price, createdAt 조회<br>offset 방식 페이지네이션<br>최신순(default)<br>검색 가능(name/description) |

#### 2.2 Article API

| 기능             | 함수             | 설명                                                                                                              |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 게시글 등록      | `postArticle`    | title, content 입력                                                                                               |
| 게시글 조회      | `getArticle`     | id, title, content, createdAt 조회                                                                                |
| 게시글 수정      | `patchArticle`   | PATCH 메소드 사용                                                                                                 |
| 게시글 삭제      | `deleteArticle`  | -                                                                                                                 |
| 게시글 목록 조회 | `getArticleList` | id, title, content, createdAt 조회<br>offset 기반 페이지네이션<br>최신순(recent) 정렬<br>검색 가능(title/content) |

#### 2.3 Comment API

| 기능           | 함수                                       | 설명                                                                                                                            |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 댓글 등록      | `postProductComment`, `postArticleComment` | content 입력                                                                                                                    |
| 댓글 수정      | `patchComment`                             | PATCH 메소드 사용                                                                                                               |
| 댓글 삭제      | `deleteComment`                            | -                                                                                                                               |
| 댓글 조회      | `getComment`                               | 단일 댓글 조회                                                                                                                  |
| 전체 댓글 조회 | `getAllCommentList`                        | id, content, createdAt 조회<br>cursor 기반 페이지네이션<br>id 오름차순 조회<br>검색 가능(content)<br>type = all/product/article |

---

### 3. 유효성 검증

- 상품/게시물 등록, 수정, 댓글 등록/수정 시 사용
- 미들웨어: `modelValidate.js`

---

### 4. 이미지 업로드

| 기능                    | 함수                     | 설명                                                           |
| ----------------------- | ------------------------ | -------------------------------------------------------------- |
| 상품 이미지 등록        | `postProductImage`       | `multer` 미들웨어로 업로드<br>서버 저장 및 DB `imageUrls` 저장 |
| 상품 이미지 목록 조회   | `getProductImageList`    | 해당 상품의 이미지 목록 조회                                   |
| 상품 이미지 목록 삭제   | `deleteProductImageList` | 해당 상품의 모든 이미지 삭제                                   |
| 게시글 이미지 등록      | `postArticleImage`       | `multer` 미들웨어로 업로드<br>서버 저장 및 DB `imageUrls` 저장 |
| 게시글 이미지 목록 조회 | `getArticleImageList`    | 해당 게시글의 이미지 목록 조회                                 |
| 게시글 이미지 목록 삭제 | `deleteArticleImageList` | 해당 게시글의 모든 이미지 삭제                                 |

- 업로드 시 `multer` 미들웨어 사용
- 업로드된 이미지는 서버에 저장되고, DB의 `imageUrls` 필드에 경로 저장됨

---

### 5. 에러 처리

| 단계 | 미들웨어           | 설명                     |
| ---- | ------------------ | ------------------------ |
| 1    | `prismaErrHandler` | Prisma 에러 처리 (Pxxxx) |
| 2    | `routeErrHandler`  | 라우터 에러 (404)        |
| 3    | `errHandler`       | 일반 에러 (500)          |

ㅗ

- 상태 코드 반환: `200`, `201`, `400`, `404`, `500`

---

### 6. 라우트 관리

- 중복 라우트 제거: `app.route()`
- Router 모듈 분리: `/router/product.js`, `/router/article.js` 등

---

### 7. 배포

- 환경 변수: `.env`
- CORS: public 허용
- Render 배포: [https://codeit6-sprint-mission3-jeongsuyeong.onrender.com](https://shshop-o0oy.onrender.com)

---

## 📁 파일 구성

```
정수영-sprint3/
├── http/
│ ├── article.http
│ ├── comment.http
│ ├── image.http
│ └── product.http
├── images/
├── prisma/
│ ├── migrations/
│ ├── mock.js
│ ├── schema.prisma
│ └── seed.js
├── src/
│ ├── controller/
│ │ ├── article.js
│ │ ├── comment.js
│ │ ├── image.js
│ │ └── product.js
│ ├── lib/
│ │ └── constants.js
│ ├── middleware/
│ │ ├── errhandler.js
│ │ └── validate.js
│ ├── router/
│ │ ├── article.js
│ │ ├── comment.js
│ │ ├── image.js
│ │ └── product.js
│ └── struct/
│ └── validate.js
│ └── app.js
├── uploads/
├── package-lock.json
├── package.json
└── README.md
```
