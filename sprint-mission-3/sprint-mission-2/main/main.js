import Product from '../class/Product.js';
import ElectronicProduct from '../class/ElectronicProduct.js';
import Article from '../class/Article.js';
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from '../service/ArticleService.js';
import {
  getProduct,
  getProductList,
  createProduct,
  deleteProduct,
  patchProduct,
} from '../service/ProductService.js';

//------------------------------------------------------------
console.log('=====테스트 시작=====');

//----올릴 포스트/패치 내용 쓰는 곳----
// const articleData = {
//   title: '검은 고양이',
//   content: '검은 고양이',
//   image:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdlFJ7CNFqVBVVHTq3Vjfio8TTIFoktx9-sQ&s',
// };

//--------------리스트 가져오기--------------
// getArticleList(1, 10, '고양이');

//----------------고양이 포스트하기----------------------
// createArticle(articleData);

//-------------- 포스트 한것 구하기--------------4715, 4718 ,34,35,36
// getArticle(4715);

// ---------------patch 하기-----------------4718
// patchArticle(4715, articleData);

//-------------------------------------------------delete-------------------------------------------------------------------4734, 35, 36
// deleteArticle(4734);
// deleteArticle(4735);
// deleteArticle(4736);

//============ getProductList (page, pageSize, keyword) ==========
// getProductList(1, 10, '');

//======= 겟 프로덕트(ID) =======
// getProduct(1234);

//======= 프로덕트 생성 ========
// const myProduct = new Product(
//   '태블릿',
//   '평범한 태블릿이다.',
//   500000,
//   ['전자제품'],
//   []
// );
// createProduct(myProduct);

//============== 프로덕트 패치 ==============
// patchProduct(2407, myProduct);

//======= delete product ======= 2405
// deleteProduct();
// deleteProduct();

//======== instance 어쩌구 저쩌구 ==================
const products = []; //최종적으로 모든게 담겨야 할 상자

async function productsItems() {
  try {
    let temp = []; //임시 리스트를 만들어준다.
    temp = await getProductList(1, 10, ''); //임시 리스트 안에 넣을 리스트를, await으로 받아올 때까지 기다린다
    temp.forEach((item) => {
      //임시리스트 안에 있는 값들을 forEach로 하나씩 돌면서
      let instance; //새로운 인스턴스안에
      if (item.tags && item.tags.includes('전자제품')) {
        //아이템 태그에 전자제품이 있다면 전자제품으로 분류, 전자제품 클래스를 가져와서 인스턴스에 집어넣는다
        instance = new ElectronicProduct( //오류가 나던 item을 item.name … 이런식으로 변경
          item.name,
          item.description,
          item.price,
          item.tags,
          item.image,
          item.favoriteCount,
          item.manufacturer
        );
      } else {
        //그게 아니라면 일반 제품으로 집어 넣는다
        instance = new Product(
          item.name,
          item.description,
          item.price,
          item.tags,
          item.image,
          item.favoriteCount
        );
      } //instance안에 있는 제품들을 product로 집어 넣는다
      products.push(instance);
    }); //성공 시 products 안에 있는 제품들이 뭔지 알 수 있도록 한번 출력해줬다
    console.log('성공!: ', products);
  } catch (error) {
    console.error('실패!!!: ', error.message);
  } finally {
    console.log('========= 테스트 끝 =======');
  }
}

productsItems(); //함수 실행
