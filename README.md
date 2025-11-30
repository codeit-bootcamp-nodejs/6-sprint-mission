# 목표

토큰 기반 유저 인증/인가 구현하기
(심화) Refresh Token 구현하기
(심화) Prisma로 관계형 활용하기

## 요구사항

### 기본

- [x] 미션3의 구현이 완료된 상태에서 진행 (정수영-sprint3로 시작함)
- [x] 스키마에 큰 변화가 있었고, 배포가 된 상태여서 그런지, 마이그레이션이 잘 되지 않아, DB를 초기화하고 진행함
- [x] User 스키마 작성: id, email, nickname, imageUrls, password, createdAt, updatedAt 필드 가짐
- [x] 회원가밉 API 구현: email, nickname, passwork 입력하여 진행하고, password는 해싱하여 저장
- [x] 토큰 기반 유저 인증: 로그인에 성공하면 Access Token과 Refresh Token이 발급됨
- [x] 로그인한 유저만 상품/게시글 등록 가능
- [x] 상품/게시글을 등록한 유저한 해당 상품/게시글의 정보를 수정하거나 삭제 가능
- [x] 로그인한 유저만 상품/게시글에 댓글 등록 가능
- [x] 댓글을 등록한 유저만 해당 댓글을 수정하거나 삭제 가능
- [x] 유저가 자신의 정보를 조회하는 기능 구현
- [x] 유저가 자신의 정보를 수정하는 기능 구현
- [x] 유저가 자신의 비밀번호를 변경할 수 있는 기능 구현
- [x] 유저의 비밀번호는 리스폰스로 노출하지 않음

### 심화

- [x] 토큰 기반 인증: Refresh Token으로 토큰을 갱신하는 기능 구현
- [x] 로그인한 유저는 상품/게시글에 '좋아요'와 '좋아요 취소' 가능
- [x] 상품/게시글을 조회할 때 유저가 '좋아요'를 누른 항목인지 확인할 수 있도록 isLiked와 같은 불린형 필드를 리스폰스객체에 포함시켜 리스폰스 출력
- [x] 유저가 '좋아요'를 표시한 상품의 목록을 조회하는 기능 구현

## 주요 변경사항 (미션3과 비교)

- 4층 구조로 구현 (router, controller, service, repository)
- 토큰 기반 인증과 인가 기능 구현
- 토큰 갱신 기능 구현
- 스키마 변경하고 변경된 mock.js 생성하여 migration & seeding 실시
  - 사용자:상품 = 1:N, 사용자:게시물 = 1:N 관계 구축
    --> 사용자 모델에 products, articles 관계형 필드 추가, 상품과 게시물 모델에 userId FK 필드 추가
  - 사용자:상품 = M:N, 사용자:게시물 = M:N의 관계 구축
    -->사용자 모델에 likedProducts, likedArticles 관계형 필드 추가, 상품과 게시물에 likedUsers 관계형 필드 추가
- 좋아요/좋아요취소 기능 구현
- 사용자/상품/게시물 이미지 업로드/삭제 기능 구현

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
├── http
│   ├── article.http
│   ├── comment.http
│   ├── image.http
│   ├── product.http
│   └──  user.http
├── prisma
│   ├── migrations/
│   ├── mock.js
│   ├── schema.prisma
│   └── seed.js
├── src
│   ├── controller
│   │   ├── articleControl.js
│   │   ├── commentControl.js
│   │   ├── imageControl.js
│   │   ├── productControl.js
│   │   └── userControl.js
│   ├── lib
│   │   ├── constants.js
│   │   ├── myFuns.js
│   │   ├── prismaClient.js
│   │   ├── token.js
│   │   └── withTryCatch.js
│   ├── middleware
│   │   ├── errors
│   │   │   ├── BadRequestError.js
│   │   │   └── NotFoundError.js
│   │   ├── authenticateUser.js
│   │   ├── authorizeUser.js
│   │   ├── errorHandler.js
│   │   └── multer.js
│   ├── repository
│   │   ├── articleRepo.js
│   │   ├── commentRepo.js
│   │   ├── imageRepo.js
│   │   ├── productRepo.js
│   │   └── userRepo.js
│   ├── router
│   │   ├── articleRouter.js
│   │   ├── commentRouter.js
│   │   ├── imageRouter.js
│   │   ├── productRouter.js
│   │   └── userRouter.js
│   ├── service
│   │   ├── articleService.js
│   │   ├── commentService.js
│   │   ├── imageService.js
│   │   ├── productService.js
│   │   └── userService.js
│   ├── struct
│   │   └── structs.js
│   └── app.js
├── package-lock.json
├── package.json
└── README.md
```


## 멘토에게

- 급히 작성하느라 중복되는 APIs, 불필요한 디테일, 그리고 일관되지 못한 출력 방식 등이 있습니다. 양해 부탁 드립니다.
- PR merge 후 작업하고자 하는 부분들
  - 유저/상품/게시물 등록 시 이미지와 json data를 동시에 함께 등록하는 API
  - 관계형 필드로 연결된 모델들의 경우는 같은 결과를 관여된 두 모델 모두에서 구할 수 있는 것 같습니다. 예를 들면 M:N 관계인 Product (likedUser 필드)와 User (likedProducts 필드)입니다. prisma.user.findUnique로 likedProducts를 가져올 수도 있고 (쉬운 방법), prisma.products.findMany에서 likedUsers 필드에 대한 조건 검색을 해서 (어려운 방법) 가져올 수도 있을 것 같습니다. 후자가 모르는 방식이라 연습 삼아 먼저 시도했지만 안 되고 시간도 부족해서 전자로 구현했습니다. 전자로 구현하는 방법 알려주세요. prisma.product.findMany({ where: { likedUsers: { is: { id: userId}}})로도 안되고, is 대신 some을 써도 안 되었어요. likedUsers는 user 객체의 배열입니다.
