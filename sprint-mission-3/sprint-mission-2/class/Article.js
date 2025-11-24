export default class Article {
  constructor(title, content, writer, likeCount) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = likeCount;
    //생성일자 넣기
    this.createdAt = new Date();
  }
  like() {
    this.likeCount++;
    return this.likeCount;
  }
}
