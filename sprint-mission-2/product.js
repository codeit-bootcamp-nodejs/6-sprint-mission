export class Product {
  constructor(name, description, prcie, tags, images) {
    this._name = name;
    this._description = description;
    this._price = prcie;
    this._tags = tags;
    this._images = images;
    this._favoriteCount = 0;
    this._createdAt = new Date();
  }
  favorite() {
    this._favoriteCount += 1;
  }
  GetName() {
    return this._name;
  }
  SetName(name) {
    this._name = name;
  }
  GetDescription() {
    return this._description;
  }
  SetDescription(description) {
    this._description = description;
  }
  GetPrice() {
    return this._price;
  }
  SetPrice(price) {
    this._price = price;
  }
  GetTags() {
    return this._tags;
  }
  SetTags(tags) {
    this._tags = tags;
  }
  GetImages() {
    return this._images;
  }
  SetImages(images) {
    this._images = images;
  }
  GetFavoriteCount() {
    return this._favoriteCount;
  }
  SetfavoriteCount(count) {
    this._favoriteCount = count;
  }
  GetCreatedAt() {
    return this._createdAt;
  }
  SetCreatedAt(date) {
    this._createdAt = date;
  }
}
