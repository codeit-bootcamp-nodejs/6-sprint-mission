import Product from './Product.mjs';

class ElectronicProduct extends Product {
  #manufacturer;
  constructor(
    name,
    description,
    price,
    tags,
    images,
    favoriteCount = 0,
    manufacturer
  ) {
    super(name, description, price, tags, images, favoriteCount);
    this.#manufacturer = manufacturer;
  }

  //getter
  get manufacturer() {
    return this.#manufacturer;
  }

  // setter
  set manufacturer(manufacturer) {
    this.#manufacturer = manufacturer;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      manufacturer: this.#manufacturer,
    };
  }
}

export default ElectronicProduct;
