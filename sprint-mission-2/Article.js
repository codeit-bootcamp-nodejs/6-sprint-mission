export class Article {
  constructor(title, content, writer) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = 0;
    this.createdAt = new Date();
  }
  like() {
    this.likeCount += 1;
  }
  getTitle() {
    return this.title;
  }
  getContent() {
    return this.content;
  }
  getWriter() {
    return this.writer;
  }
  getLikeCount() {
    return this.likeCount;
  }
  getCreatedAt() {
    return this.createdAt;
  }
}
