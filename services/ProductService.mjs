import axios from '../lib/axios.js';
import Product from '../models/Product.mjs';
import ElectronicProduct from '../models/ElectronicProduct.mjs';

const products = []; // 프로덕트 리스트 배열

// 상품정보 리스트 가져오기
async function getProductList(params) {
  try {
    const res = await axios.get('/products', { params });
    console.log(`${res.statusText}! 게시물 리스트를 가져왔어요!`);

    // 인스턴스 리스트 만들기
    for (const receiveData of res.data.list) {
      const productInstance = makeProduct(receiveData);
      products.push(productInstance);
    }
    console.log(products);
    return products;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`Network error:`, error.message);
    }
    throw error;
  } finally {
    console.log('Finished!');
  }
}

// 상품정보 1개 가져오기
async function getProduct(productId) {
  try {
    const res = await axios.get(`/products/${productId}`);
    console.log(`${res.statusText}! 게시물을 가져왔어요!`);

    // 인스턴스 만들기
    const productInstance = makeProduct(res.data);
    products.push(productInstance);
    console.log(products);
    return products;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`Network error:`, error.message);
    }
    throw error;
  } finally {
    console.log('Finished!');
  }
}

// 상품정보 등록하기
async function createProduct(data) {
  try {
    const receiveData = makeProduct(data);
    const req = await axios.post(`/products`, receiveData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`${req.statusText}! 게시물을 생성했습니다.`);
    console.log(req.data);
    return req.data;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`Network error:`, error.message);
    }
    throw error;
  } finally {
    console.log('Finished!');
  }
}

// 상품정보 수정하기
async function patchProduct(productId, data) {
  try {
    const receiveData = makeProduct(data);
    const req = await axios.patch(`/products/${productId}`, receiveData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(`${req.statusText}! ${productId}번째 게시물을 수정했습니다.`);
    console.log(req.data);
    return req.data;
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`Network error:`, error.message);
    }
    throw error;
  } finally {
    console.log('Finished!');
  }
}

// 상품정보 삭제하기
async function deleteProduct(productId) {
  try {
    const res = await axios.delete(`/products/${productId}`);
    console.log(`${res.statusText}! ${productId}번째 게시물을 삭제했습니다.`);
  } catch (error) {
    if (error.response) {
      console.error(`${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`Network error:`, error.message);
    }
    throw error;
  } finally {
    console.log('Finished!');
  }
}

// 상품정보 생성하기
function makeProduct(data) {
  if (data.tags.includes('전자제품') || data.tags.includes('전자 제품')) {
    console.log('ElectronicProduct 클래스 생성');
    const electronicData = new ElectronicProduct(
      data.name,
      data.description,
      data.price,
      data.tags,
      data.images
      // data.favoriteCount,
      // data.manufacturer
    );
    const eProduct = electronicData.toJSON();
    delete eProduct.favoriteCount;
    delete eProduct.manufacturer;
    return eProduct;
  } else {
    console.log('Product 클래스 생성');
    const commonProductData = new Product(
      data.name,
      data.description,
      data.price,
      data.tags,
      data.images
      // data.favoriteCount,
    );
    const cProduct = commonProductData.toJSON();
    delete cProduct.favoriteCount;
    return cProduct;
  }
}

// export
const makeProducts = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};

export default makeProducts;
