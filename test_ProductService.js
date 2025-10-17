import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './service/ProductService.js';

let product;

//------------------------------- getProductList(params)
const params = {
  page: 1,
  pageSize: 3,
  orderBy: 'recent',
  //keyword: '전자제품',
};
//product = await getProductList(params);
//product = await getProductList();

//product = await getProduct(2459);
//product = await getProduct(1); // error test: 404 file not found

const productData = {
  name: 'iPhone 17 Pro 바보',
  description: '15.9cm, Super Retina XDR 디스플레이, 8배 광학 줌 전면 카메라',
  price: 1790000,
  tags: ['전자제품'], // only 1 tag is allowed
  images: 'https://www.apple.com/kr/shop/buy-iphone/iphone-17-pro',
  //manufacturer: 'Apple',
};

//product = await createProduct(productData);

//product = await patchProduct(2626, productData);

product = await deleteProduct(2626);

if (product) console.log(product);
console.log('');
