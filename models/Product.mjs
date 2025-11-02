class Product {
  #name;
  #description;
  #price;
  #tags;
  #images;
  #favoriteCount;

  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#tags = tags;
    this.#images = images;
    this.#favoriteCount = favoriteCount;
  }

  //getter
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get price() {
    return this.#price;
  }
  get tags() {
    return this.#tags;
  }
  get images() {
    return this.#images;
  }
  get favoriteCount() {
    return this.#favoriteCount;
  }

  // setter
  set name(name) {
    this.#name = name;
  }
  set description(description) {
    this.#description = description;
  }
  set price(price) {
    this.#price = price;
  }
  set tags(tags) {
    this.#tags = tags;
  }
  set images(images) {
    this.#images = images;
  }
  set favoriteCount(favoriteCount) {
    this.#favoriteCount = favoriteCount;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      price: this.#price,
      tags: this.#tags,
      images: this.#images,
      favoriteCount: this.#favoriteCount,
    };
  }

  //method
  favorite() {
    this.favoriteCount++;
  }
  unfavorite() {
    this.favoriteCount--;
  }
}

export default Product;
