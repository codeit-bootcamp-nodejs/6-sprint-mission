# 🛒 중고마켓 & 📝 자유게시판 API 서버

이 프로젝트는 **중고마켓**과 **자유게시판** 기능을 제공하는 Express.js API 서버입니다.  
초보자도 쉽게 이해할 수 있도록 코드에 상세한 주석을 달았습니다! 🎯

## ✨ 주요 기능

### 🛒 중고마켓 기능

- **상품 등록**: 이름, 설명, 가격, 태그로 상품 등록
- **상품 조회**: 개별 상품 상세 정보 조회
- **상품 수정**: 기존 상품 정보 수정 (PATCH 메서드 사용)
- **상품 삭제**: 상품 완전 삭제
- **상품 목록**: 페이지네이션, 정렬, 검색 기능 포함
- **댓글 시스템**: 상품별 댓글 등록, 조회, 수정, 삭제

### 📝 자유게시판 기능

- **게시글 등록**: 제목과 내용으로 게시글 작성
- **게시글 조회**: 개별 게시글 상세 정보 조회
- **게시글 수정**: 기존 게시글 내용 수정
- **게시글 삭제**: 게시글 완전 삭제
- **게시글 목록**: 페이지네이션, 정렬, 검색 기능 포함
- **댓글 시스템**: 게시글별 댓글 등록, 조회, 수정, 삭제

### 🔧 공통 기능

- **이미지 업로드**: multer를 사용한 이미지 파일 업로드
- **유효성 검증**: express-validator로 입력 데이터 검증
- **에러 처리**: 체계적인 에러 핸들링 시스템
- **CORS 설정**: 프론트엔드와의 안전한 통신
- **데이터베이스 관계**: onDelete 설정으로 데이터 무결성 보장

## 🛠 기술 스택

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL + Prisma ORM
- **File Upload**: Multer
- **Validation**: express-validator
- **CORS**: cors
- **Environment**: dotenv

## 프로젝트 구조

```
6-sprint-missiom3/
├── config/
│   ├── database.js      # DB 연결 설정
│   ├── init.js          # DB 초기화
│   └── schema.sql       # DB 스키마
├── prisma/
│   ├── schema.prisma    # Prisma 스키마
│   └── migrations/      # 데이터베이스 마이그레이션
├── src/
│   └── lib/
│       ├── controllers/     # 컨트롤러 (비즈니스 로직)
│       │   ├── ProductController.js   # 상품 컨트롤러
│       │   ├── ArticleController.js   # 게시글 컨트롤러
│       │   ├── CommentController.js   # 댓글 컨트롤러
│       │   └── UploadController.js     # 업로드 컨트롤러
│       ├── errors/          # 에러 처리 관련
│       │   ├── errorHandler.js  # 에러 핸들러
│       │   ├── validation.js    # 유효성 검증
│       │   └── upload.js        # 파일 업로드
│       ├── routers/         # API 라우터 (라우팅만)
│       │   ├── products.js      # 상품 라우터
│       │   ├── articles.js      # 게시글 라우터
│       │   ├── comments.js      # 댓글 라우터
│       │   └── upload.js        # 이미지 업로드 라우터
│       ├── structs/         # 데이터 구조체 (모델)
│       │   ├── Product.js       # 상품 구조체
│       │   ├── Article.js       # 게시글 구조체
│       │   └── Comment.js       # 댓글 구조체
│       └── prisma.js       # Prisma Client 설정
├── scripts/
│   └── seed.js          # 데이터 시딩
├── uploads/             # 업로드 파일 저장소
├── app.js               # 메인 애플리케이션
├── package.json         # 의존성 관리
├── README.md            # 프로젝트 문서
└── render.yaml          # 배포 설정
```

## 🚀 설치 및 실행

### 1️⃣ 의존성 설치

```bash
# 프로젝트 폴더로 이동
cd 6-sprint-mission

# 필요한 패키지들 설치
npm install
```

### 2️⃣ 환경 변수 설정

```bash
# 환경 변수 예제 파일을 복사
cp env.example .env

# .env 파일을 열어서 데이터베이스 정보를 입력하세요
# 특히 DATABASE_URL을 올바르게 설정해야 합니다!
```

### 3️⃣ 데이터베이스 설정

#### 3-1. PostgreSQL 데이터베이스 생성

```bash
# PostgreSQL 데이터베이스 생성 (PostgreSQL이 설치되어 있어야 함)
createdb marketplace_board
```

#### 3-2. 데이터베이스 사용자 권한 부여

PostgreSQL에 접속하여 다음 명령을 실행하세요:

```sql
-- 데이터베이스 생성 (없는 경우)
CREATE DATABASE marketplace_board;

-- 사용자에게 권한 부여
GRANT ALL PRIVILEGES ON DATABASE marketplace_board TO postgres;

-- public 스키마에 대한 권한 부여
\c marketplace_board
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

#### 3-3. .env 파일 설정

프로젝트 루트에 `.env` 파일이 있고 다음과 같은 형식으로 설정되어 있는지 확인하세요:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/marketplace_board?schema=public"
```

#### 3-4. Prisma 마이그레이션 및 클라이언트 생성

```bash
# Prisma 마이그레이션 실행 (데이터베이스 테이블 생성)
npx prisma migrate dev

# Prisma Client 생성 (타입 안전한 데이터베이스 클라이언트)
npx prisma generate

# 샘플 데이터 시딩 (테스트용 데이터 삽입)
npm run seed
```

#### 3-5. 데이터베이스 연결 오류 해결

**오류: `User 'postgres' was denied access on the database 'marketplace_board.public'**

이 오류는 PostgreSQL 데이터베이스에 접근 권한이 없을 때 발생합니다.

**해결 방법:**

1. 위의 3-2 단계를 따라 데이터베이스 권한을 부여하세요
2. `.env` 파일의 `DATABASE_URL`이 올바른지 확인하세요
3. PostgreSQL 서버가 실행 중인지 확인하세요 (`pg_ctl status` 또는 `brew services list`)

**참고사항:**

- 현재 서버는 데이터베이스 연결 실패 시에도 실행되지만, 데이터베이스 기능은 사용할 수 없습니다
- API 엔드포인트를 호출하면 503 오류가 반환됩니다

### 4️⃣ Prisma 유용한 명령어들

```bash
# 데이터베이스 마이그레이션 (스키마 변경사항 적용)
npm run db:migrate

# Prisma Client 재생성 (스키마 변경 후)
npm run db:generate

# Prisma Studio 실행 (데이터베이스 GUI - 브라우저에서 데이터 확인)
npm run db:studio

# 데이터베이스 리셋 (모든 데이터 삭제 후 다시 생성)
npm run db:reset

# 프로덕션 배포용 마이그레이션 (배포 시 사용)
npm run db:deploy
```

### 5️⃣ 서버 실행

```bash
# 개발 모드 (파일 변경 시 자동 재시작)
npm run dev

# 프로덕션 모드 (실제 서비스용)
npm start
```

### 6️⃣ 서버 확인

서버가 정상적으로 실행되면 다음 URL에서 확인할 수 있습니다:

- **API 정보**: http://localhost:3000/
- **헬스 체크**: http://localhost:3000/api/health
- **Prisma Studio**: http://localhost:5555 (npm run db:studio 실행 후)

## 📡 API 엔드포인트

### 🛒 상품 (Products) API

| 메서드   | 엔드포인트          | 설명                | 요청 본문                                            |
| -------- | ------------------- | ------------------- | ---------------------------------------------------- |
| `POST`   | `/api/products`     | 새 상품 등록        | `{ name, description, price, tags, image_url }`      |
| `GET`    | `/api/products`     | 상품 목록 조회      | 쿼리: `offset`, `limit`, `sort`, `search`            |
| `GET`    | `/api/products/:id` | 특정 상품 상세 조회 | -                                                    |
| `PATCH`  | `/api/products/:id` | 상품 정보 수정      | `{ name?, description?, price?, tags?, image_url? }` |
| `DELETE` | `/api/products/:id` | 상품 삭제           | -                                                    |

### 📝 게시글 (Articles) API

| 메서드   | 엔드포인트          | 설명                  | 요청 본문                                 |
| -------- | ------------------- | --------------------- | ----------------------------------------- |
| `POST`   | `/api/articles`     | 새 게시글 등록        | `{ title, content }`                      |
| `GET`    | `/api/articles`     | 게시글 목록 조회      | 쿼리: `offset`, `limit`, `sort`, `search` |
| `GET`    | `/api/articles/:id` | 특정 게시글 상세 조회 | -                                         |
| `PATCH`  | `/api/articles/:id` | 게시글 수정           | `{ title?, content? }`                    |
| `DELETE` | `/api/articles/:id` | 게시글 삭제           | -                                         |

### 💬 댓글 (Comments) API

| 메서드   | 엔드포인트                          | 설명               | 요청 본문               |
| -------- | ----------------------------------- | ------------------ | ----------------------- |
| `POST`   | `/api/comments/products/:productId` | 상품에 댓글 등록   | `{ content }`           |
| `POST`   | `/api/comments/articles/:articleId` | 게시글에 댓글 등록 | `{ content }`           |
| `GET`    | `/api/comments/products/:productId` | 상품 댓글 목록     | 쿼리: `cursor`, `limit` |
| `GET`    | `/api/comments/articles/:articleId` | 게시글 댓글 목록   | 쿼리: `cursor`, `limit` |
| `PATCH`  | `/api/comments/:id`                 | 댓글 수정          | `{ content }`           |
| `DELETE` | `/api/comments/:id`                 | 댓글 삭제          | -                       |

### 📸 이미지 업로드 API

| 메서드 | 엔드포인트           | 설명               | 요청 본문                              |
| ------ | -------------------- | ------------------ | -------------------------------------- |
| `POST` | `/api/upload/upload` | 이미지 파일 업로드 | `multipart/form-data` (field: `image`) |

### 🏥 헬스 체크 API

| 메서드 | 엔드포인트    | 설명                        | 응답                                       |
| ------ | ------------- | --------------------------- | ------------------------------------------ |
| `GET`  | `/api/health` | 서버 상태 확인              | `{ success, message, timestamp }`          |
| `GET`  | `/`           | API 정보 및 엔드포인트 목록 | `{ success, message, version, endpoints }` |

## 🔍 쿼리 파라미터

### 📄 상품/게시글 목록 조회

| 파라미터 | 타입   | 기본값   | 설명                          | 예시              |
| -------- | ------ | -------- | ----------------------------- | ----------------- |
| `offset` | number | 0        | 건너뛸 항목 수 (페이지네이션) | `?offset=10`      |
| `limit`  | number | 10       | 가져올 항목 수                | `?limit=20`       |
| `sort`   | string | 'recent' | 정렬 방식                     | `?sort=price_asc` |
| `search` | string | ''       | 검색어 (제목/내용에서 검색)   | `?search=아이폰`  |

**정렬 옵션:**

- `recent`: 최신순 (기본값)
- `price_asc`: 가격 낮은순 (상품만)
- `price_desc`: 가격 높은순 (상품만)
- `title_asc`: 제목 가나다순 (게시글만)
- `title_desc`: 제목 가나다역순 (게시글만)

### 💬 댓글 목록 조회 (Cursor 페이지네이션)

| 파라미터 | 타입   | 기본값 | 설명                         | 예시          |
| -------- | ------ | ------ | ---------------------------- | ------------- |
| `cursor` | number | null   | 이전 페이지의 마지막 댓글 ID | `?cursor=123` |
| `limit`  | number | 10     | 가져올 댓글 수               | `?limit=5`    |

## 🗄 데이터베이스 스키마

> **📝 스키마 변경사항 (v2.0)**
>
> - **UUID 사용**: 모든 ID가 `SERIAL`에서 `UUID`로 변경되어 보안성과 확장성이 향상되었습니다
> - **댓글 분리**: `Comment` 테이블이 `ProductComment`와 `ArticleComment`로 분리되어 더 명확한 구조를 가집니다
> - **네이밍 통일**: 모든 컬럼명이 `camelCase`로 통일되었습니다
> - **가격 타입 변경**: `DECIMAL`에서 `INTEGER`로 변경되어 원 단위로 저장됩니다

### Products 테이블 (상품)

| 컬럼명        | 타입         | 제약조건      | 설명                  |
| ------------- | ------------ | ------------- | --------------------- |
| `id`          | UUID         | PRIMARY KEY   | 상품 고유 ID          |
| `name`        | VARCHAR(255) | NOT NULL      | 상품명                |
| `description` | TEXT         | NOT NULL      | 상품 설명             |
| `price`       | INTEGER      | NOT NULL      | 가격 (원 단위)        |
| `tags`        | TEXT[]       | -             | 태그 배열             |
| `image_url`   | VARCHAR(500) | -             | 이미지 URL (선택사항) |
| `createdAt`   | TIMESTAMP    | DEFAULT NOW() | 생성일시              |
| `updatedAt`   | TIMESTAMP    | DEFAULT NOW() | 수정일시              |

### Articles 테이블 (게시글)

| 컬럼명      | 타입         | 제약조건      | 설명           |
| ----------- | ------------ | ------------- | -------------- |
| `id`        | UUID         | PRIMARY KEY   | 게시글 고유 ID |
| `title`     | VARCHAR(255) | NOT NULL      | 게시글 제목    |
| `content`   | TEXT         | NOT NULL      | 게시글 내용    |
| `createdAt` | TIMESTAMP    | DEFAULT NOW() | 생성일시       |
| `updatedAt` | TIMESTAMP    | DEFAULT NOW() | 수정일시       |

### ProductComments 테이블 (상품 댓글)

| 컬럼명      | 타입      | 제약조건      | 설명         |
| ----------- | --------- | ------------- | ------------ |
| `id`        | UUID      | PRIMARY KEY   | 댓글 고유 ID |
| `content`   | TEXT      | NOT NULL      | 댓글 내용    |
| `productId` | UUID      | FOREIGN KEY   | 상품 ID      |
| `createdAt` | TIMESTAMP | DEFAULT NOW() | 생성일시     |
| `updatedAt` | TIMESTAMP | DEFAULT NOW() | 수정일시     |

### ArticleComments 테이블 (게시글 댓글)

| 컬럼명      | 타입      | 제약조건      | 설명         |
| ----------- | --------- | ------------- | ------------ |
| `id`        | UUID      | PRIMARY KEY   | 댓글 고유 ID |
| `content`   | TEXT      | NOT NULL      | 댓글 내용    |
| `articleId` | UUID      | FOREIGN KEY   | 게시글 ID    |
| `createdAt` | TIMESTAMP | DEFAULT NOW() | 생성일시     |
| `updatedAt` | TIMESTAMP | DEFAULT NOW() | 수정일시     |

**외래키 제약조건:**

- `productId` → `products(id)` ON DELETE CASCADE
- `articleId` → `articles(id)` ON DELETE CASCADE

## 🔄 마이그레이션 가이드

### 기존 데이터베이스에서 새 스키마로 마이그레이션

1. **데이터베이스 백업** (중요!)

   ```bash
   pg_dump marketplace_board > backup.sql
   ```

2. **새 마이그레이션 생성**

   ```bash
   npx prisma migrate dev --name update_schema_to_uuid
   ```

3. **데이터베이스 스키마 적용**

   ```bash
   npx prisma db push
   ```

4. **새 데이터로 시딩**
   ```bash
   npm run seed
   ```

> **⚠️ 주의사항**: 이 마이그레이션은 기존 데이터를 삭제합니다. 프로덕션 환경에서는 데이터 마이그레이션 스크립트를 별도로 작성해야 합니다.

## 🚀 배포

### Render.com 배포 방법

1. **GitHub 저장소 준비**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Render.com에서 새 Web Service 생성**

   - Render.com에 로그인
   - "New +" → "Web Service" 선택
   - GitHub 저장소 연결

3. **환경 변수 설정**

   - `NODE_ENV`: production
   - `DATABASE_URL`: PostgreSQL 데이터베이스 URL
   - `PORT`: 10000 (Render.com 기본값)

4. **PostgreSQL 데이터베이스 연결**

   - Render.com에서 PostgreSQL 데이터베이스 생성
   - 데이터베이스 URL을 환경 변수에 설정

5. **빌드 및 배포**
   - Render.com이 자동으로 빌드 및 배포
   - `render.yaml` 파일의 설정이 자동 적용됨

### 배포 후 확인사항

- ✅ 서버가 정상적으로 시작되었는지 확인
- ✅ 데이터베이스 연결이 정상인지 확인
- ✅ API 엔드포인트들이 정상 작동하는지 확인
- ✅ 이미지 업로드가 정상 작동하는지 확인

## 📄 라이선스

ISC License

---

**Happy Coding! 🎉**
