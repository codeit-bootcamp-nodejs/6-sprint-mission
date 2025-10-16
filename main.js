import { ElectronicProduct } from "./electronicProduct.js";
import { Product } from "./product.js";
import * as ProductService from "./productService.js";
import * as ArticleService from "./articleService.js";

async function testProductModel() {
  const { list: rawProducts } = await ProductService.getProductList({
    page: 1,
    pageSize: 20,
    keyword: "",
  });
  const products = [];
  console.log({ rawProducts });
  for (const rawProduct of rawProducts) {
    let product;
    if (rawProduct.tags.includes("전자제품")) {
      product = new ElectronicProduct(rawProduct);
    } else {
      product = new Product(rawProduct);
    }
    products.push(product);
  }

  console.log(products);
}

async function testProductService() {
  const { list: products } = await ProductService.getProductList({
    page: 1,
    pageSize: 20,
    keyword: "",
  });
  const product = await ProductService.getProduct(products[0].id);

  const createdProduct = await ProductService.createProduct({
    name: "포토카드",
    description: "액자 포함",
    price: 10000,
    tags: ["소품"],
    images: ["https://picsum.photos/200/300"],
  });
  const patchedProduct = await ProductService.patchProduct(createdProduct.id, {
    name: "포토카드",
    description: "액자 미포함",
    price: 10000,
    tags: ["소품"],
    images: ["https://picsum.photos/200/300"],
  });
  const deletedResult = await ProductService.deleteProduct(createdProduct.id);

  console.log({
    products,
    product,
    createdProduct,
    patchedProduct,
    deletedResult,
  });
}

async function testArticleService() {
  const { list: articles } = await ArticleService.getArticleList({
    page: 1,
    pageSize: 20,
    keyword: "",
  });
  const article = await ArticleService.getArticle(articles[0].id);
  const createdArticle = await ArticleService.createArticle({
    title: "안녕하세요",
    content: "내용입니다",
    image: "https://picsum.photos/200",
  });
  const patchedArticle = await ArticleService.patchArticle(createdArticle.id, {
    title: "앞으로 잘 부탁드립니다.",
    content: "내용입니다",
    image: "https://picsum.photos/200",
  });
  const deletedResult = await ArticleService.deleteArticle(createdArticle.id);

  console.log({
    articles,
    article,
    createdArticle,
    patchedArticle,
    deletedResult,
  });
}

async function main() {
  await testProductModel();
  await testProductService();
  await testArticleService();
}

main();
