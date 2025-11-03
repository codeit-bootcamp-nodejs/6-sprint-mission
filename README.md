# Used Market API Server

## 개요

이 프로젝트는 'Used Market' 중고 거래 애플리케이션을 위한 API 서버를 구축하는 Node.js 기반 학습 프로젝트입니다. Express.js를 사용하여 RESTful API 서버를 구현하고, Prisma ORM을 통해 PostgreSQL 데이터베이스와 상호작용합니다. Superstruct를 이용해 데이터 유효성 검사를 수행하며, 계층화된 아키텍처(Controller, Service, Repository)를 적용하여 코드의 모듈성과 유지보수성을 높이는 데 중점을 두었습니다.

### 학습내용

- Express.js를 이용한 RESTful API 서버 설계 및 구현
- Prisma ORM을 사용한 데이터베이스 스키마 관리 및 마이그레이션
- Repository, Service, Controller 계층으로 구분된 아키텍처 패턴 적용
- Superstruct를 활용한 요청 데이터의 구조화 및 유효성 검사
- Multer를 이용한 이미지 업로드 및 정적 파일 서빙
- ES6 모듈 시스템(`import`/`export`)의 이해와 적용
- `async/await`를 사용한 비동기 처리 및 오류 처리 미들웨어 구현

### 핵심기술

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Superstruct
- **Middleware:** Cors, Multer

### 주요 라이브러리

`package.json`을 기준으로 한 주요 의존성 라이브러리는 다음과 같습니다.

- **`@prisma/client`**: Prisma 클라이언트 (데이터베이스 쿼리용)
- **`express`**: 웹 프레임워크
- **`superstruct`**: 데이터 유효성 검사
- **`cors`**: CORS(Cross-Origin Resource Sharing) 처리
- **`multer`**: 파일 업로드(multipart/form-data) 처리
- **`dotenv`**: 환경 변수 관리
- **`nodemon`**: 개발 환경에서 파일 변경 시 자동 서버 재시작

### 의존성 설치

```bash
npm install
```

---

## 아키텍처

본 프로젝트는 역할에 따라 코드를 분리하는 계층형 아키텍처(Layered Architecture)를 따릅니다.

- **`src/main.js`**: Express 애플리케이션의 진입점으로, 미들웨어 설정 및 라우터 등록을 담당합니다.
- **`src/routers/`**: API 엔드포인트를 정의하고, 해당 경로로 들어온 요청을 적절한 컨트롤러에 연결합니다.
- **`src/controllers/`**: HTTP 요청을 수신하여 요청 데이터를 정제하고, 비즈니스 로직을 처리하는 서비스 계층에 작업을 위임한 후, 결과를 클라이언트에 응답합니다.
- **`src/services/`**: 애플리케이션의 핵심 비즈니스 로직을 수행합니다. 여러 리포지토리를 호출하여 데이터를 조작하고, 트랜잭션 관리 등을 담당할 수 있습니다.
- **`src/repositories/`**: 데이터베이스와의 상호작용을 추상화합니다. Prisma 클라이언트를 사용하여 실제 데이터 CRUD 작업을 수행합니다.
- **`src/structs/`**: Superstruct를 사용하여 API 요청/응답 데이터의 구조와 유효성 규칙을 정의합니다.
- **`src/middlewares/`**: 오류 처리, 파일 업로드(Multer), 요청 데이터 파싱 등 공통 관심사를 처리하는 미들웨어를 포함합니다.
- **`prisma/`**: Prisma 관련 파일을 관리합니다.
  - `schema.prisma`: 데이터베이스 모델, 관계, enum을 정의합니다.
  - `seed.js`: 개발용 초기 데이터를 생성합니다.

---

## 주요 기능

- **사용자 관리**: 사용자 정보 조회
- **상품(Product) 관리**: 상품 등록, 조회, 수정, 삭제 (CRUD)
  - 이미지 업로드 및 관리
  - 상품 상태 관리 (판매중, 예약중, 판매완료)
- **게시글(Article) 관리**: 게시글 등록, 조회, 수정, 삭제 (CRUD)
- **댓글(Comment) 관리**: 상품 및 게시글에 대한 댓글 등록, 조회, 수정, 삭제 (CRUD)

### API Endpoints

- `GET /users`: 모든 사용자 조회
- `GET /users/:id`: 특정 사용자 조회
- `GET /products`: 모든 상품 조회
- `POST /products`: 새 상품 등록
- `GET /products/:id`: 특정 상품 조회
- `PUT /products/:id`: 상품 정보 수정
- `DELETE /products/:id`: 상품 삭제
- `GET /articles`: 모든 게시글 조회
- `POST /articles`: 새 게시글 등록
- `GET /articles/:id`: 특정 게시글 조회
- `PUT /articles/:id`: 게시글 정보 수정
- `DELETE /articles/:id`: 게시글 삭제
- (댓글 관련 엔드포인트는 `productCommRouter.js`, `articleComRouter.js`에 정의되어 있습니다.)

---

## 프로젝트 폴더 구조

```
.
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── public/
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── repositories/
│   ├── routers/
│   ├── services/
│   └── structs/
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
...
```

---

## 개발 컨벤션

- **코드 스타일**: Prettier를 사용하여 일관된 코드 스타일을 유지합니다. (`.prettierrc` 설정 파일 참고)
- **모듈 시스템**: ES6 모듈(`import`/`export`)을 사용합니다. (`package.json`의 `"type": "module"`)
- **비동기 처리**: 모든 비동기 작업은 `async/await`를 사용하며, 컨트롤러에서는 `asyncHandler` 유틸리티를 통해 오류를 중앙에서 처리합니다.
- **데이터 유효성 검사**: `superstruct`를 사용하여 각 API의 요청 `body`, `params`, `query`를 검증합니다. 유효성 검사 로직은 `validationMiddleware.js`를 통해 라우터 레벨에서 적용됩니다.
- **데이터베이스 모델링**: `prisma/schema.prisma` 파일에서 데이터 모델과 관계를 정의합니다. 스키마 변경 후에는 `npx prisma migrate dev` 명령어로 마이그레이션을 수행해야 합니다.

### 데이터 모델 관계

`prisma/schema.prisma`에 정의된 주요 모델 간의 관계는 다음과 같습니다.

- **User**는 여러 개의 **Product**, **Article**, **ProductComment**, **ArticleComment**를 가질 수 있습니다. (1:N)
- **User**는 하나의 **UserPreference**를 가질 수 있습니다. (1:1)
- **Product**는 여러 개의 **Tag**, **Image**, **ProductComment**를 가질 수 있습니다. (1:N 또는 M:N)
- **Article**은 여러 개의 **ArticleComment**를 가질 수 있습니다. (1:N)

---

## 주요 구현 세부사항

1.  **계층형 아키텍처**: 요청 처리 흐름은 `Router` -> `Middleware(Validation)` -> `Controller` -> `Service` -> `Repository` 순으로 진행됩니다. 이 구조는 각 컴포넌트의 책임을 명확히 분리하여 테스트와 유지보수를 용이하게 합니다.
2.  **Prisma ORM**: `schema.prisma`에 정의된 모델을 바탕으로 타입-세이프(type-safe)한 데이터베이스 클라이언트를 생성합니다. 이를 통해 SQL 쿼리를 직접 작성하지 않고 JavaScript/TypeScript 코드로 데이터베이스 작업을 수행할 수 있습니다.
3.  **Superstruct 유효성 검사**: `structs` 디렉토리에서 각 API에 필요한 데이터의 형태(shape)와 타입을 정의합니다. `validationMiddleware`는 이 구조를 사용하여 들어오는 요청이 유효한지 자동으로 검사하고, 유효하지 않을 경우 에러를 반환하여 컨트롤러가 비즈니스 로직에만 집중할 수 있도록 합니다.
4.  **이미지 업로드**: `multer` 미들웨어를 사용하여 `multipart/form-data` 형식의 요청에서 이미지 파일을 추출하고 서버의 `uploads/` 디렉토리에 저장합니다. 저장된 파일의 경로는 데이터베이스에 기록되며, `express.static` 미들웨어를 통해 `/uploads` 경로로 서빙됩니다.

---

## 실행

### 전제 조건

- Node.js 설치
- PostgreSQL 데이터베이스 실행
- 프로젝트 루트에 `DATABASE_URL`이 포함된 `.env` 파일 생성

**.env 파일 예시**
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 데이터베이스 초기화 및 시드

처음 프로젝트를 설정할 때 다음 명령어를 실행하여 데이터베이스 스chi마를 적용하고 초기 데이터를 삽입합니다.

```bash
# 데이터베이스 스키마를 마이그레이션합니다.
npx prisma migrate dev

# 초기 데이터를 시드합니다.
npx prisma db seed
```

### 애플리케이션 실행

개발 모드에서는 `nodemon`을 사용하여 파일 변경 시 서버가 자동으로 재시작됩니다.

```bash
# 개발 모드로 실행
npm run dev
```

프로덕션 환경에서는 다음 명령어를 사용합니다.

```bash
# 프로덕션 모드로 실행
npm start
```

서버가 성공적으로 실행되면 콘솔에 `Server listening on port [PORT]!` 메시지가 출력됩니다.