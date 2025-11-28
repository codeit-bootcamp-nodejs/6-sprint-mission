import axios from 'axios';

const BASE_URL = `https://panda-market-api-crud.vercel.app`; // /products/   ${BASE_URL}/products

//=============== 겟 프로덕트 리스트 ============
async function getProductList(page, pageSize, keyword) {
  try {
    const response = await axios.get(BASE_URL + '/products', {
      params: {
        page,
        pageSize,
        keyword,
      },
    });
    const productData = response.data.list; //list: [{...}, {...}, {...}] => list 자리가 products라면 response.data.products
    //아직 원리를 제대로 이해하지 못했다.
    console.log('성공!: ', response.data); //내용 출력
    return productData; //다른곳에서 쓸 수 있게 리턴해준다. ?
  } catch (error) {
    console.error('실패!!!: ', error.message);
    if (error.response) {
      console.log('에러 코드: ', error.response.status);
      console.log('에러 내용: ', error.response.data);
    }
  } finally {
    console.log(`======겟 프로덕트 리스트 테스트 완료======`);
  }
}

//================ 겟 프로덕트 ================

async function getProduct(id) {
  try {
    const response = await axios.get(BASE_URL + '/products/' + id);
    const productData = response.data;
    console.log('성공!: ', productData);
    return productData;
  } catch (error) {
    console.error('실패!!!: ', error.message);
    if (error.response) {
      console.log('에러 코드: ', error.response.status);
      console.log('에러 내용: ', error.response.data);
    }
  } finally {
    console.log('======== 겟 프로닥 실험 끝 ========');
  }
}

//================ 프로덕트 생성 ================
async function createProduct(myProduct) {
  try {
    const response = await axios.post(BASE_URL + '/products', myProduct);
    const createdProductData = response.data;
    console.log('생성 성공!: ', createdProductData);
  } catch (error) {
    console.error('실패!!!: ', error.message);
    if (error.response) {
      console.log('에러 코드: ', error.response.status);
      console.log('에러 내용: ', error.response.data);
    }
  } finally {
    console.log('======== 생성 실험 끝 ========');
  }
}

//========= 프로덕트 패치하기 ==========
async function patchProduct(id, myProduct) {
  try {
    const response = await axios.patch(`${BASE_URL}/products/${id}`, myProduct);
    const productData = response.data;
    console.log('성공!: ', productData);
  } catch (error) {
    console.error('실패!!!: ', error.message);
    if (error.response) {
      console.log('에러 코드: ', error.response.status);
      console.log('에러 내용: ', error.response.data);
    }
  } finally {
    console.log('======= 프로덕트 패치 실험 끝 =======');
  }
}

// ========= 프로덕트 삭제 =========
async function deleteProduct(id) {
  try {
    const response = await axios.delete(BASE_URL + '/products/' + id);
    const responseData = response.data;
    console.log('성공!: ', responseData);
  } catch (error) {
    console.error('실패!!!: ', error.message);
    if (error.response) {
      console.log('에러 코드: ', error.response.status);
      console.log('에러 내용: ', error.response.data);
    }
  } finally {
    console.log('======= 게시글 삭제 실험 끝 ========');
  }
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
