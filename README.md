# 미션 목표

Jest와 Supertest를 사용하여 유닛 테스트, 통합 테스트 작성하기

## 요구사항

### 기본 요구사항: /test/api.test.ts

- [x] Jest의 테스트 커버리지 도구를 사용하도록 설정
- [x] 인증이 필요하지 않은 상품 API에 대한 통합 테스트 작성
- [x] 인증이 필요하지 않은 게시글 API에 대한 통합 테스트 작성
- [x] 로그인, 회원가입 API에 대한 통합 테스트 작성
- [x] 인증이 필요한 상품 API에 대한 통합 테스트 작성
- [x] 인증이 필요한 상품 API에 대한 통합 테스트 작성

### 심화 요구사항: /test/productService_likeToggle.test.ts (spy 사용)

- [x] 상품 API의 비즈니스 로직에 대하여 Mock, Spy를 활용한 유닛 테스트 작성

### 추가 구현한 심화 기능: /test/middlewarae_authorize.test.ts (mock 사용)

- [x] 인가 로직에 대하여 Mock을 활용한 유닛 테스트 작성: authorize.test.ts

## 스크린샷: /test/result_snapshots

jest_endPointAPI_test
<img width="898" height="1093" alt="image" src="https://github.com/user-attachments/assets/c7efdc78-625d-4f1c-9ac4-ea1a95c3d221" />

jest_authorize_mockTest
<img width="685" height="446" alt="image" src="https://github.com/user-attachments/assets/9982551d-184b-41f8-a90d-384219016600" />

jest_likeToggle_spyTest
<img width="689" height="281" alt="image" src="https://github.com/user-attachments/assets/6695d519-00f5-4ba8-ad0b-7866460fe4ad" />

## 폴더 구조

```
6-sprint-mission
├── src
├── test
│   ├── result_snapshots
│   │   ├── jest_authorize_mockTest.png
│   │   ├── jest_endPointAPI_test.png
│   │   └── jest_likeToggle_spyTest.png
│   ├── api.test.ts
│   ├── dummyArticleData.ts
│   ├── dummyPriceData.ts
│   ├── dummyProductData.ts
│   ├── dummyUserData.ts
│   ├── middleware_authorize.test.ts
│   └── productService_likeToggle.test.ts
└── README.md
```

## 멘토에게

- 미션 8 제출본에 작성하였습니다. PR 리뷰 받기 전 버전입니다.
- 엔드포인트 테스트는 그럭저럭 할 만 했지만, mock과 spy를 사용한 유닛 테스트는 힘들었습니다. 테스트 하고자 하는 코드는 커버리지에 포함되었습니다.
- product 서비스 단의 로직에 spy를 사용한 test를 작성하면서, 타입 정의가 잘못 되어 있음을 발견하고 몇가지 수정을 헀습니다. 제대로 하고자 한다면, 대대적으로 타입 정의를 다시해야 할 곳이 많지만, 일단은 이것으로 제출합니다.
