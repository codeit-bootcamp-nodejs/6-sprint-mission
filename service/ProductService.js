import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export async function getProductList(params = {}) {
  try {
    const response = await instance.get('/products', { params });
    console.log(`Product count, total:      ${response.data.totalCount}`);
    console.log(`Product count, retrived:   ${response.data.list.length}`);
    console.log('');
    return response.data.list;
  } catch (error) {
    printError(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    printError(error);
  }
}

export async function createProduct(productData) {
  const today = new Date();
  try {
    const response = await instance.post(`/products`, productData);
    return response.data;
  } catch (error) {
    printError(error);
  }
}

export async function patchProduct(id, productData) {
  try {
    const response = await instance.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    printError(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await instance.delete(`/products/${id}`);
    console.log('deleted');
    return response.data;
  } catch (error) {
    printError(error);
  }
}

function printError(error) {
  console.log(error.response.status);
  console.log(error.response.statusText);
  //console.log(error.response.data.message);
  console.log('');
}
