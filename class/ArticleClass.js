class Article {
  #likeCount;
  constructor({
    title,
    content,
    writer,
    likeCount = 0,
    createdAt = new Date(),
  }) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.#likeCount = likeCount;
    this.createdAt = createdAt;
  }
  get likeCount() {
    return this.#likeCount;
  }

  set likeCount(count) {
    console.log('likeCount: NO MANUAL UPDATE is allowed');
    console.log(`           (${this.#likeCount} currently)`);
  }

  like() {
    ++this.#likeCount;
  }

  viewAll() {
    // expose all properties manually to visualize private property
    return {
      title: this.title,
      content: this.content,
      writer: this.writer,
      likeCount: this.#likeCount,
      createdAt: this.createdAt,
    };
  }
}
