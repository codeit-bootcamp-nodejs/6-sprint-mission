export default class Product {
  constructor(name, description, price, tags, images, favoriteCount) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags || []; //undefined 값 방지 || [] / 0
    this.images = images || [];
    this.favoriteCount = favoriteCount;
  }

  favorite() {
    this.favoriteCount++;
    return this.favoriteCount;
  }
}
