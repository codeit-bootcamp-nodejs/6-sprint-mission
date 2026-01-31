# 미션 목표

Jest와 Supertest를 사용하여 유닛 테스트, 통합 테스트 작성하기

## 요구사항

### 기본 요구사항

#### 알림

### 심화 요구사항

#### 알림 전송

### 추가로 구현한 심화 기능

- [x] 인가 로직에 대하여 Mock을 활용한 유닛 테스트 작성: authorize.test.ts

## 스크린샷

Socket-client-test.html 브라우져의 dev tool
<img width="947" height="1099" alt="image" src="https://github.com/user-attachments/assets/cbe7143e-79c2-43f0-92da-6909c8124c10" />

jest --Coverage 결과 출력

## 폴더 구조

```
6-sprint-mission
├── src
├── test
│   ├── api.test.ts
│   ├── dummyArticleData.ts
│   ├── dummyPriceData.ts
│   ├── dummyProductData.ts
│   ├── dummyUserData.ts
│   ├── middleware_authorize.test.ts
│   ├── productService_likeToggle.test.ts
│   └── productService_patch.test.ts
└── README.md
```

## 멘토에게

- 미션 8 제출본에 작성하였습니다. PR 리뷰 받기 전 버전입니다.
- api endpoint test는 그럭저럭 하겠는데, mock과 spy를 사용한 unit test는 어려웠습니다. 특히 테스트하려는 유닛 내에 여러 개의 함수가 있는 경우, 무엇을 mock/spy로 모사해야 하는지 난감했습니다. 이걸 궁리할 시간에 unit을 스스로 점검하는 것이 더 생산적이라는 생각이 듭니다.
