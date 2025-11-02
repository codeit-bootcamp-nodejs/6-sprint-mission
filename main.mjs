import articles from './services/ArticleService.mjs';
import products from './services/ProductService.mjs';
import Dummy from './lib/dummy.js';

// 더미 데이터 정리
const {
  articleContent,
  articleContentPatch,
  eProduct,
  cProduct,
  eProductPatch,
  cProductPatch,
} = Dummy;

const params = {
  page: 1,
  pageSize: 5,
  keyword: '',
  orderBy: 'recent',
};

//------------------------------------------------

// // Article

// // Article 리스트
// articles.getArticleList(params);

// // Article 1개 선택
// articles.getArticle(4681);

// // Article 생성
// articles.createArticle(articleContent);

// // Article 수정
// articles.patchArticle(5015, articleContentPatch);

// // Article 삭제
// articles.deleteArticle(5015);

//------------------------------------------------

// // Product

// // Product 리스트
// products.getProductList(params);

// // Product 1개 선택
// products.getProduct(2367);

// // Product 생성
products.createProduct(cProduct);
products.createProduct(eProduct);

// // Product 수정
// products.patchProduct(2630, cProductPatch);
// products.patchProduct(2629, eProductPatch);

// // Product 삭제
// products.deleteProduct(2629);

// ----------------------------
