import { getProductList } from './ProductService.js';
import { getArticleList } from './ArticleService.js';

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
  }
}

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
  constructor(title, content, writer, likeCount = 0) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = likeCount;
    this.createdAt = new Date(); // 생성 시간 저장
  }

  like() {
    this.likeCount += 1;
  }
}

async function main() {
  console.log('=== 상품 가져오기 ===');
  const products = await getProductList(1, 5, '');
  console.log(products);

  console.log('=== 찜한상품 가져오기 ===');
  getArticleList(1, 5, '')
    .then((articles) => {
      console.log(articles);
    })
    .catch((err) => {
      console.error('에러:', err);
    });
}

main();
