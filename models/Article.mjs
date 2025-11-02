class Article {
  #title;
  #content;
  #image;
  #writer;
  #createdAt;
  #likeCount;

  constructor(title, content, image, writer, createdAt, likeCount = 0) {
    this.#title = title;
    this.#content = content;
    this.#image = image;
    this.#writer = writer;
    this.#createdAt = createdAt || new Date().toISOString();
    this.#likeCount = likeCount;
  }

  // getter
  get title() {
    return this.#title;
  }
  get content() {
    return this.#content;
  }
  get image() {
    return this.#image;
  }
  get writer() {
    return this.#writer;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get likeCount() {
    return this.#likeCount;
  }

  // setter
  set title(title) {
    this.#title = title;
  }
  set content(content) {
    this.#content = content;
  }
  set image(image) {
    this.#image = image;
  }
  set writer(writer) {
    this.#writer = writer;
  }
  set createdAt(createdAt) {
    this.#createdAt = createdAt;
  }
  set likeCount(likeCount) {
    this.#likeCount = likeCount;
  }

  // 서버 등록 아티클
  toServerData() {
    return {
      title: this.title,
      content: this.content,
      image: this.image,
    };
  }
  // 로컬 확인 아티클
  toJSON() {
    return {
      title: this.#title,
      content: this.#content,
      image: this.#image,
      writer: this.#writer,
      createdAt: this.#createdAt,
      likeCount: this.#likeCount,
    };
  }

  //method
  like() {
    this.likeCount++;
  }
  unlike() {
    this.likeCount--;
  }
}

//------

export default Article;
