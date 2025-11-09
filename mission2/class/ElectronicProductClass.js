import Product from './ProductClass.js';

export default class ElectronicProduct extends Product {
  constructor(
    name,
    description,
    price,
    tags,
    images,
    favoriteCount,
    createdAt,
    manufacturer = '미상'
  ) {
    super(name, description, price, tags, images, favoriteCount, createdAt);
    this.manufacturer = manufacturer;
  }

  viewAll() {
    // expose all properties manually to visualize private property
    return {
      name: this.name,
      descritpion: this.description,
      price: this.price,
      tags: this.tags,
      images: this.images,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt,
      manufacturer: this.manufacturer,
    };
  }
}
