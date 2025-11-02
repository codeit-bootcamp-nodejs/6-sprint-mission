## 개요

- 'Used Market' 마켓플레이스 애플리케이션의 API CRUD 작업을 구현하는 Node.js 학습 프로젝트

### 학습내용

- Express를 통한 api 서버 구현
- axios를 사용한 REST API 연동
- ES6 모듈 (.mjs)
- Promise 기반 및 async/await 패턴

### 핵심기술

- Node.js
- ES Modules
- Prisma
- PostgreSQL
- SuperStruct
- Cors

### 주요 라이브러리

- `axios`
- `prisma`
- `postgreSQL`

### 의존성 설치

```bash
npm install
```

### 아키텍처

- `main.mjs`: 서비스 레벨의 명령을 실행하기 위한 메인 진입점(CRUD 사용 예시 포함)
- `services/`: 비즈니스 로직 및 API 통신
  - `ArticleService.mjs`: Article에 대한 CRUD 작업 관리
  - `ProductService.mjs`: Product에 대한 CRUD 작업 관리(`ElectronicProduct` 로직 포함)
- `models/`: 애플리케이션 데이터 구조 정의
  - `Article.mjs`: Article 클래스
  - `Product.mjs`: Product 기본 클래스
  - `ElectronicProduct.mjs`: 전자제품용 서브 클래스
- `lib/`: 공유 유틸리티
  - `axios.js`: 미리 구성된 Axios 인스턴스
  - `constants.js`: API 기본 URL
  - `dummy.js`: 생성 및 업데이트 테스트를 위한 더미 데이터

---

## 주요 기능

- 게시글 관리: Article에 대한 CRUD 기능
- 상품 관리: Product에 대한 CRUD 기능
  - 특정 상품 유형 처리: `ElectronicProduct`와 같은 특정 유형 상품 처리
- API 연동: `axios`를 활용하여 백엔드 API와 비동기 통신

### 프로젝트 폴더 구조

```
.
├── main.mjs                    # 애플리케이션 메인 진입점
├── package.json                # 프로젝트 의존성 및 스크립트
├── package-lock.json
├── README.md                   # 프로젝트 안내
├── services/
│   ├── ArticleService.mjs      # Article 관련 비즈니스 로직
│   └── ProductService.mjs      # Product 관련 비즈니스 로직
├── models/
│   ├── Article.mjs             # Article 데이터 모델
│   ├── Product.mjs             # Product 데이터 모델
│   └── ElectronicProduct.mjs   # Electronic Product 데이터 모델
└── lib/
    ├── axios.js                # 설정된 Axios 인스턴스
    ├── constants.js            # 상수 (API 기본 URL)
    └── dummy.js                # 테스트용 더미 데이터
```

---

## 개발 컨벤션

- 코드 스타일: Prettier 사용 (`.prettierrc` 파일 확인)
- 모듈성: 기능별(모델, 서비스)로 모듈화
- 데이터 모델링:
  - 클래스 기반 모델(`Article`, `Product`) 사용
  - 데이터 직렬화를 위한 메서드(`toJSON`, `toServerData`) 포함
- API 상호작용: 백엔드 API와의 모든 상호작용은 `services` 모듈에 포함 (`axios` 수행)
- 오류 처리: 서비스는 API 요청에 대한 기본 오류 처리를 포함하며, 오류 응답 상태 및 메시지 로깅

### 클래스 계층 구조

---

## 주요 구현 세부사항

1.

---

## 실행

### 애플리케이션 실행

- `main.mjs`
  - 다양한 서비스 메서드를 테스트하기 위한 여러 함수 호출 포함
- 아래 명령어는 `package.json`에 정의된 `node main.mjs` 명령 실행

```bash
npm start
```

### 실행(테스트) 방법

1. `main.mjs`에서 원하는 함수 호출의 주석 해제
2. `npm start` 실행
3. 콘솔 출력에서 API 응답 확인 (Articles 및 Products 샘플(dummy) 테스트 데이터 제공)
