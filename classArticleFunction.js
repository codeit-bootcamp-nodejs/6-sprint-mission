// 죽은 기자의 마지막 기사를 접근하는 코드
class Article {
  constructor(title, content, writer, inquiryCount) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.inquiryCount = inquiryCount;
  }

  inquiry() {
    this.inquiryCount += 1;
  }
}

class SubArticle extends Article {
  #accessor;

  constructor(title, content, writer, inquiryCount, accessor) {
    super(title, content, writer, inquiryCount);
    this.accessor = accessor;
  }

  get accessor() {
    return this.#accessor;
  }

  set accessor(access) {
    if (access === '이호성') {
      this.#accessor = access;
    } else {
      throw new Error('접근 권한이 없는 이름입니다.');
    }
  }
}

const restrict = new SubArticle(
  '정신병원 의문의 제보',
  '인체실험과 관련된...',
  '마이클업셔',
  0,
  '이호성'
);

restrict.accessor = ''; // 접근자 이름을 기입하세요

// 출력 값
restrict.inquiry();
console.log(restrict);
