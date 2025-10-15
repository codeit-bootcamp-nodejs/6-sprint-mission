export default class Product {
  #favoriteCount;
  constructor({
    name,
    description,
    price,
    tags,
    images,
    favoriteCount = 0,
    createdAt = new Date(),
  }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.#favoriteCount = favoriteCount;
    this.createdAt = createdAt;
  }

  get favoriteCount() {
    return this.#favoriteCount;
  }
  set favoriteCount(count) {
    console.log('');
    console.log('favoriteCount: NO MANUAL UPDATE is allowed');
    console.log(`               (${this.#favoriteCount} currently)`);
    console.log('');
  }

  favorite() {
    this.#favoriteCount++;
  }

  viewAll() {
    // expose all properties manually to visualize private property
    return {
      name: this.name,
      descritpion: this.description,
      price: this.price,
      tags: this.tags,
      images: this.images,
      favoriteCount: this.#favoriteCount,
      createdAt: this.createdAt,
      manufacturer: this.manufacturer,
    };
  }
}
