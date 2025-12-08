import { getProductList } from './productService.js';

class Product {
  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = favoriteCount;
  }
  favorite() {
    this.favoriteCount += 1;
    console.log(
      `${this.name} 상품을 좋아하는 찜하기 수: ${this.favoriteCount}`
    );
  }
}
// const users1 = new Product('아이폰', null, null, null, null, 0);
// users.favorite();
// users.favorite();
// users.favorite();

class ElectronicProduct extends Product {
  constructor(
    name,
    description,
    price,
    tags,
    images,
    favoriteCount,
    manufacturer
  ) {
    super(name, description, price, tags, images, favoriteCount);
    this.manufacturer = manufacturer;
  }
}

class Article {
  constructor(title, content, wirter, likecount = 0) {
    this.title = title;
    this.content = content;
    this.wirter = wirter;
    this.likecount = likecount;
    this.createdAt = new Date();
  }
  like() {
    this.likecount += 1;
    console.log(
      `올해의 ${this.wirter} 기자의 추천 수: ${this.likecount}, 현재 시각:${this.createdAt}`
    );
  }
}
// const users2 = new Article(null, null, '레온', 0);
// users2.like();
// users2.like();
// users2.like();

async function getPro() {
  const gp = await getProductList();
  const { list } = gp;
  const products = [];

  list.forEach((item) => {
    if (item.tags?.includes('전자제품')) {
      const GP1 = new ElectronicProduct(
        item.name,
        item.description,
        item.price,
        item.tags,
        item.images,
        item.manufacturer,
        0
      );
      products.push(GP1);
    } else {
      const GP2 = new Product(
        item.name,
        item.description,
        item.price,
        item.tags,
        item.images,
        0
      );
      products.push(GP2);
    }
  });
  console.log(products);
}
getPro();
