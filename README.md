
## 요구사항
**클래스 구현하기**

### 기본
- [x] class 키워드를 이용해서 Product 클래스와 ElectronicProduct 클래스를 만들어 주세요.
- [x] Product 클래스는 name(상품명) description(상품 설명), price(판매 가격), tags(해시태그 배열), images(이미지 배열), favoriteCount(찜하기 수)프로퍼티를 가진다.
- [x] Product 클래스는 favorite 메소드를 가진다. favorite 메소드가 호출될 경우 찜하기 수가 1 증가
- [x] ElectronicProduct 클래스는 Product를 상속하며, 추가로 manufacturer(제조사) 프로퍼티를 가진다.
- [x] class 키워드를 이용해서 Article 클래스를 만들어 주세요.
- [x] Article 클래스는 title(제목), content(내용), writer(작성자), likeCount(좋아요 수) 프로퍼티를 가집니다.
- [x] Article 클래스는 like 메소드를 가집니다. like 메소드가 호출될 경우 좋아요 수가 1 증가합니다.
- [x] 각 클래스 마다 constructor를 작성해 주세요.
- [x] 추상화/캡슐화/상속/다형성을 고려하여 코드를 작성해 주세요.

## 요구사항
**Article 요청 함수 구현하기**

### 기본
- [x] https://panda-market-api-crud.vercel.app/docs 의 Article API를 이용하여 아래 함수들을 구현해 주세요.
- [x] getArticleList() : GET 메소드를 사용해 주세요.
- [x] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
- [x] getArticle() : GET 메소드를 사용해 주세요.
- [x] createArticle() : POST 메소드를 사용해 주세요.
- [x] request body에 title, content, image 를 포함해 주세요.
- [x] patchArticle() : PATCH 메소드를 사용해 주세요.
- [x] deleteArticle() : DELETE 메소드를 사용해 주세요.
- [x] fetch 혹은 axios를 이용해 주세요.
- [x] 응답의 상태 코드가 2XX가 아닐 경우, 에러 메시지를 콘솔에 출력해 주세요.
- [x] .then() 메소드를 이용하여 비동기 처리를 해주세요.
- [x] .catch() 를 이용하여 오류 처리를 해주세요.

### 심화
**Article 요청 함수 구현하기**
- [x]Article 클래스에 createdAt(생성일자) 프로퍼티를 만들어 주세요.
- [x] 새로운 객체가 생성되어 constructor가 호출될 시 createdAt에 현재 시간을 저장합니다.

## 주요 변경사항
- 
- 

## 스크린샷
![image](이미지url)

## 멘토에게
- 셀프 코드 리뷰를 통해 질문 이어가겠습니다.
- 
