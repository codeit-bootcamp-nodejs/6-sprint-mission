# 미션 목표

알림 기능 구현하기
웹소켓 또는 Socket.IO를 사용하여 실시간 기능 구현하기

## 요구사항

기존에 작업한 판다마켓 미션 5에 이어서 진행
판다마켓 최종 디자인 참조

### 알림

- [x] 사용자는 자신의 알림 목록을 조회할 수 있음
- [x] 사용자는 자신의 안 읽은 알림의 개수를 조회활 수 있음
- [x] 사용자는 자신의 알림을 읽음 처리할 수 있음
- [x] 클라이언트에서는 실시간으로 알림을 받을 수 있음

### 알림 전송

- [x] 좋아요한 상품의 가격이 변동되었을 때 알림을 보냄
- [x] 자신이 작성한 게시글에 댓글이 달렸을 때 알림을 보냄

### 추가로 구현한 기능

- [x] 사용자가 로그인 하면 읽지 않은 알림의 갯수가 실시간 전송됨
- [x] 상품의 가격 기록을 남기기 위한 모델 추가 (ProductPriceHistory)

## 기능 구현

### 스키마 변경

- Notification 모델 추가: 알림 저장
- ProductPriceHistory 모델 추가: 상품 가격 변동 기록

### 알림 Notification 모델

- Notification 모델
- 알림 생성 시에는 isRead = false, readAt = null
- 알림 변경하면 isRead = true, readAt = now()

### 알림 기능 로직

- 사용자 로그인, 토큰 발급
  --> 토큰 이용하며 Socket.IO 연결 --> 사용자 id로 된 방에 넣고 --> 안 읽은 알림 수 실시간 공지

- 상품의 가격이 update될 때 트렌젝션으로 묶어 (1)~(3) 시행하고, 이후 (4) 실시간 알림 날림
  (1) 상품 update: prisma.product.update
  (2) 좋아요를 누른 사람들 (likedUsers)에게 보내는 알림 생성: prisma.notification.create
  (3) 상품 가격 기록 생성: prisma.productPriceHistory.creatae
  (4) likedUsers의 userId로 된 socket.IO room에 실시간 알림 날림

- 게시글에 댓글이 달리면 아래 (1)(2)를 트렌젝션으로 묶어 실시하고, 이후 (3) 실시
  (1) 댓글 생성: prisma.comment.create
  (2) 게시글 저자에게 보내는 알림 생성: prisma.notification.create
  (3) 게시글 저자의 id로 된 socket.IO room에 실시간 알림 날림

### 상품 가격 기록 로직

- ProductPriceHistory 모델
- 상품이 생성되면, prevPrice없는 기록 생성 (트렌잭션 사용)
- 상품 가격이 변동되면, prevPrice(전 가격)과 price(변동 가격) 모두 있는 기록 생성

## ERD

<img width="1013" height="1073" alt="image" src="https://github.com/user-attachments/assets/b331bb3b-c692-4ebf-ac90-663ad86d5a1a" />

## 스크린샷

토큰 갱신
<img width="1939" height="1093" alt="image1" src="https://github.com/user-attachments/assets/13604e4f-0809-4d32-95fd-260ff124db27" />
사용자2가 좋아요를 누른 게시물 조회
<img width="2294" height="1289" alt="image" src="https://github.com/user-attachments/assets/42cb0f34-5c34-4f6b-b822-32711de14f69" />

## 폴더 구조

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
