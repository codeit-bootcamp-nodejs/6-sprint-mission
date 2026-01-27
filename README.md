# 미션 목표

Jest와 Supertest를 사용하여 유닛 테스트, 통합 테스트 작성하기

## 요구사항

### 기본 요구사항

#### 알림

### 심화 요구사항

#### 알림 전송

### 추가로 구현한 심화 기능

#### 추가로 구현한 기능

- [x] 사용자가 로그인 하면 읽지 않은 알림의 갯수가 실시간 전송됨
- [x] 특정 상품의 가격 변동 기록을 모두 조회할 수 있음
- [x] 특정 가격 변동 기록을 조회할 수 있음

## 기능 구현

#### 스키마 변경

- Notification 모델 추가: 알림 저장
- ProductPriceHistory 모델 추가: 상품 가격 변동 기록

#### 알림 Notification 모델

- enum 필드인 type은 'ARTICLE' 또는 'PRODUCT'. 각기 게시글에 댓글 달릴 때와 상품 가격 변동 시의 알림에 해당
- 알림 생성 시에는 isRead = false, readAt = null
- 알림을 읽으면 isRead = true, readAt = now()

#### 알림 기능 로직

- 사용자 로그인, 토큰 발급
- 토큰으로 Socket.IO 연결 --> 사용자 id로 된 방에 넣고 --> 안 읽은 알림 갯수 실시간 공지

- 상품의 가격이 update될 때 트렌젝션으로 묶어 (1)~(3) 시행하고, 이후 (4) 실시간 알림 날림
  - (1) 상품 update
  - (2) 좋아요를 누른 사람들 (likedUsers)에게 보내는 알림 생성
  - (3) 상품 가격 기록 생성
  - (4) likedUsers의 userId로 된 socket.IO room에 실시간 알림 날림

- 게시글에 댓글이 달리면 아래 (1)(2)를 트렌젝션으로 묶어 실시하고, 이후 (3) 실시
  - (1) 댓글 생성
  - (2) 게시글 저자에게 보내는 알림 생성
  - (3) 게시글 저자의 id로 된 socket.IO room에 실시간 알림 날림

#### 상품 가격 기록 로직

- ProductPriceHistory 모델
- 새 상품 등록 시 (1)과 (2)를 트렌젝션으로 묶어 시행
  - (1) 상품 생성
  - (2) prevPrice없는 기록 생성
- 상품 가격이 변동되면, prevPrice(전 가격)와 price(변동가격) 모두 갖는 ProductPriceHistory 생성 (트렌젝션 사용)

## ERD
<img width="1214" height="1280" alt="image" src="https://github.com/user-attachments/assets/f225c6b9-98a2-4077-a36b-8c9996f0ba37" />


## 스크린샷

Socket-client-test.html 브라우져의 dev tool
<img width="947" height="1099" alt="image" src="https://github.com/user-attachments/assets/cbe7143e-79c2-43f0-92da-6909c8124c10" />

안 읽은 알림 목록 조회
<img width="2140" height="1343" alt="image" src="https://github.com/user-attachments/assets/673f9070-26ab-4ae5-9709-d05742b83768" />

## 폴더 구조

```
6-sprint-mission
├── src
│   ├── controller
│   │   ├── article.control.ts
│   │   ├── auth.control.ts
│   │   ├── comment.control.ts
│   │   ├── image.control.ts
│   │   ├── notification.control.ts
│   │   ├── product.control.ts
│   │   └── user.control.ts
│   ├── lib
│   │   ├── constants.ts
│   │   ├── myFuns.ts
│   │   ├── prismaClient.ts
│   │   ├── selectFields.ts
│   │   ├── token.ts
│   │   └── withTryCatch.ts
│   ├── middleware
│   │   ├── errors
│   │   │   ├── BadRequestError.ts
│   │   │   └── NotFoundError.ts
│   │   ├── authenticate.ts
│   │   ├── authorize.ts
│   │   ├── errorHandler.ts
│   │   └── multer.ts
│   ├── repository
│   │   ├── article.repo.ts
│   │   ├── comment.repo.ts
│   │   ├── notification.repo.ts
│   │   ├── product.repo.ts
│   │   └── user.repo.ts
│   ├── router
│   │   ├── article.router.ts
│   │   ├── auth.router.ts
│   │   ├── comment.router.ts
│   │   ├── image.router.ts
│   │   ├── notification.router.ts
│   │   ├── product.router.ts
│   │   └── user.router.ts
│   ├── service
│   │   ├── article.service.ts
│   │   ├── auth.service.ts
│   │   ├── comment.service.ts
│   │   ├── image.service.ts
│   │   ├── notification.service.ts
│   │   ├── product.service.ts
│   │   └── user.service.ts
│   ├── struct
│   │   ├── article.struct.ts
│   │   ├── comment.struct.ts
│   │   ├── product.struct.ts
│   │   └── user.structs.ts
│   ├── types
│   │   ├── dto.ts
│   │   ├── express.d.ts
│   │   └── interfacedType.ts
│   ├── websocket
│   │   └── socketIO.ts
│   ├── app.ts
│   ├── mock.ts
│   └── seed.ts
└── README.md
```

## 멘토에게

- 타입 정의가 아직 많이 미숙합니다.
- 미션 5이후 멘토님의 코멘트를 반영하여 수정하였고, 타입 정의 연습을 위하여 TS가 요구하지 않는 함수 리턴값도 모두 타입 정의를 해보았습니다.
- 이번 미션8에서 product와 comment APIs에 알림 기능 구현하면서, 타입 정의에 신경을 썼습니다. 예를 들면 req.body에서 들어온 데이터를 CreateCommentDto로 타입정의하고 superstruct로 검증. 이후 레포로 보내기 위한 형태로 데이터 가공한 후 이를 Prisma.CommentCreateInput 같은 프리즈마 타입으로 타입정의하고 레포로 보내고 있습니다. 코드 리뷰 중 부적절하게 타입정의를 하고 있거나, 더 적절한 타입정의를 할 수 있는 곳이 보이면 알려 주시면 많은 도움이 되겠습니다. 감사합니다.
