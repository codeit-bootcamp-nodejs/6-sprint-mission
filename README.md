# 목표

타입스크립트 마이그레이션하기
타입스크립트 개발 환경 세팅하기
(심화) Layered Architecture 적용하기

## 요구사항

### 기본

- [x] 스프린트 미션4의 구현이 완료된 상태에서 진행:
      -> PR merge시 받은 코멘트가 반영된 정수영-sprint4에서 진행
- [x] 타입스크립트 마이그레이션을 먼저 진행해 보고, 이전 미션에서 구현하지 못한 부분이 있다면 추가로 구현

### 프로젝트 세팅

- [x] tsconfig.json 파일을 생성하고, 필요한 옵션 설정
      -> rootDir, outDir, typeRoots 설정
- [x] 필요한 npm script 설정 -> build, start, dev 설정

### 타입스크립트 마이그레이션

- [x] 기존 Express.js 프로젝트를 타입스크립트 프로젝트로 마이그레이션 하기
- [x] 필요한 타입 패키지 설치
- [x] any 타입 사용 최소화
- [x] 복잡한 객체 구조나 배열 구조를 가진 변수에 인터페이스 또는 타입 별칭 사용
- [x] 타입 별칭 또는 유틸리티 타입을 사용하여 타입 복잡성 감소
- [x] declare 사용하여 타입을 오버라이드하거나 확장 (req.user)

### 개발 환경 설정

- [x] ts-node 사용하여 .ts 코드를 바로 실행할수 있는 npm script 작성 (npm run dev)
- [x] nodemon 사용하여 .ts 코드가 변경될 때마다 서버가 다시 실행되는 npm script 작성 (npm run dev)

### 심화 요구 사항: Layered Architecture 적용하기

- [x] Controller, Service, Repository로 나누어 코드 리팩토링 (미션4 당시 완료)
- [x] 계층 사이에서 데이터 주고 받을 때 DTO 활용

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
├── dist
│   ├── controller
│   │   ├── articleControl.js
│   │   ├── commentControl.js
│   │   ├── imageControl.js
│   │   ├── productControl.js
│   │   └── userControl.js
│   ├── dto
│   │   ├── dto.js
│   │   └── interfacedType.js
│   ├── lib
│   │   ├── constants.js
│   │   ├── myFuns.js
│   │   ├── prismaClient.js
│   │   ├── selectFields.js
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
└── README.md
```

## 멘토에게

- Prisma Type에는 User, Product, Article, Comment가 있고, 이를 확장한 completeUser, completeProduct, completeArticle이 interfaceType.js에 정의되어 있습니다. 그리고 dto.js에는 controller에 들어온 데이터를 정의해 주기 위하여 user, product, article, comment에 관련된 interface와 type이 정의되어 있습니다. 이들의 정의와 층별 사용이 절절한지 코멘트 부탁드립니다. (Prisma Type은 Repository와 Service에서, DTO는 Controller와 Service에서 사용한다는 게 의도였지만, 혼란스러웠어요. 특히 DTO도 Prisma Type도 관계형 필드를 넣지 않게 되어 있어서, 확장형 interface와 type을 만들어 썼는데, 제대로 한 것인지 모르곘습니다)

- 미션4 이후 계속 예정으로 남겨진 작업이 있습니다. 시간이 날 때 해보겠습니다.
  - 유저/상품/게시물 등록 시 이미지와 json data를 동시에 함께 등록하는 API
