# 🛡️ 스프린트 미션: 인증/인가 및 관계형 DB 구현

## 📅 프로젝트 개요

- **목표:** 토큰 기반의 인증(Authentication)과 인가(Authorization) 시스템을 구현하고, Prisma의 관계형 데이터 모델링을 적용합니다.
- **핵심 기술:** Node.js, Express, Prisma, JWT, bcrypt

---

## ✅ 개발 체크리스트 (To-Do List)

### 🛠️ 1. 초기 세팅 & 데이터베이스 (Prisma)

- [ ] **환경변수(.env) 설정**
  - [x] `DATABASE_URL` 확인
  - [x] `JWT_SECRET` (토큰 비밀키)
- [ ] **User 스키마 작성**
  - [x] 필드 구성: `id`, `email`, `nickname`, `image`, `password`, `createdAt`, `updatedAt`
  - [x] 기존 모델(`Product`, `Article`, `Comment`)과 1:N 관계 설정 (`relation` 연결)

### 🔐 2. 인증 (Authentication) - 로그인/회원가입

- [ ] **회원가입 API 구현**
  - [x] 입력: `email`, `nickname`, `password`
  - [x] **중요:** 비밀번호는 반드시 **해싱(Hashing)** 하여 저장 (bcrypt 등 사용)
- [ ] **로그인 API 구현**
  - [x] 입력: `email`, `password` 검증
  - [x] 성공 시: **Access Token (JWT)** 발급 및 반환

### 👮 3. 인가 (Authorization) - 권한 체크

> **공통 규칙:** 로그인한 유저만 등록 가능 / 본인만 수정, 삭제 가능

- [x] **인가 미들웨어(Middleware) 구현** (토큰 검증 및 유저 확인)
- [ ] **상품(Product) 기능 인가**
  - [ ] 등록: 로그인한 유저만 가능
  - [ ] 수정/삭제: 상품 등록자(본인)만 가능
- [ ] **게시글(Article) 기능 인가**
  - [ ] 등록: 로그인한 유저만 가능
  - [ ] 수정/삭제: 게시글 작성자(본인)만 가능
- [ ] **댓글(Comment) 기능 인가**
  - [ ] 등록: 상품/게시글에 댓글 달기 (로그인 유저만)
  - [ ] 수정/삭제: 댓글 작성자(본인)만 가능

### 👤 4. 유저 정보 관리 (My Page)

- [ ] **내 정보 조회 API**
  - [ ] 응답에 `password` 제외할 것
- [ ] **내 정보 수정 API**
- [ ] **비밀번호 변경 API** (기존 비번 확인 과정 권장)
- [ ] **내가 등록한 상품 목록 조회 API**

---

## 🔥 심화 요구사항 (Advanced) - 시간 남으면 도전!

- [ ] **Refresh Token 구현** (토큰 갱신 기능)
- [ ] **좋아요(Like) 기능 - 상품**
  - [ ] 좋아요 / 좋아요 취소 토글
  - [ ] 조회 시 `isLiked` 필드 포함
- [ ] **좋아요(Like) 기능 - 게시글**
  - [ ] 좋아요 / 좋아요 취소 토글
  - [ ] 조회 시 `isLiked` 필드 포함
- [ ] **좋아요한 목록 조회 기능**
