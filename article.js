export class Article {
  /** 제목 */
  _title;

  /** 내용 */
  _content;

  /** 작성자 */
  _writer;

  /** 좋아요 개수 */
  _likeCount;

  _createdAt;

  constructor({ title, content, writer, likeCount = 0 }) {
    this._title = title;
    this._content = content;
    this._writer = writer;
    this._likeCount = likeCount;
    this._createdAt = new Date();
  }

  getTitle() {
    return this._title;
  }

  getContent() {
    return this._content;
  }

  getLikeCount() {
    return this._likeCount;
  }

  like() {
    this._likeCount++;
  }

  getCreatedAt() {
    return this._createdAt;
  }
}
