# Codeit Note 6기 미션2 by 정수영

## 🧩 개요: 클래스와 API 함수 구현하고 사용하기

- 객체지향 프로그래밍의 출발점인 클래스 구현
- 클라이언트/서버 소통을 위한 API 요청 함수 구현
- API 요청 함수 작동 확인
- 활용: 서버에서 받아온 데이터로부터 클래스 인스턴스 생성

## 주요 내용

#### 클래스 구현

- 클래스 :ArticleClass.js, ProductClass.js, ElectronicProductClass.js
- cosntructor, 프로퍼티와 메소드 포함
- 추상화/캡슐화/상속/다형성 고려

#### API 요청 함수 구현 및 테스트

- GET, POST, PATCH, DELETE 메소드 이용
- Article API 요청 함수: fetch, then/catch 이용, HTTP 오류 처리
- Product API 요청 함수: axios, axync/await, try/catch 이용
- 함수 작동 테스트: test_ArticleService.js, test_productService.js

#### 활용

- GET 메소드 이용하여 데이터 받아옴
- 데이터의 해시테그 '전자제품'을 이용하여 분류
- 분류 결과에 따라 Product 또는 ElectronicProduct 클래스 인스턴스 생성
- main.js

## 파일 구성

- ./class/ArticleClass.js, ProductClass.js, ElectronicProductClass.js
- ./service/ArticleService.js, ProductService.js
- ./lib/myFuns.js (사용자 정의 함수)
- ./main.js, test_ArticleService.js, test_ProductService.js
