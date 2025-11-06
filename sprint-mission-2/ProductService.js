import axios from 'axios';

const API_URL = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/products',
  timeout: 10000,
});

export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    console.log('====getProductList====');
    const params = {
      page: page,
      pageSize: pageSize,
      orderBy: 'recent',
      keyword: keyword,
    };
    const res = await API_URL.get('/', { params });
    console.log(res.data);
    console.log('====getProductList End====');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function PostProduct(productData) {
  try {
    const Data = {
      name: productData._name,
      description: productData._description,
      price: productData._price,
      tags: productData._tags,
      images: productData._images,
    };

    const res = await API_URL.post('/', Data);
    console.log('====PostProduct====');
    console.log(res.data);
    console.log('====PostProduct End====');
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      throw new Error('생성 오류 발생');
    } else if (error.request) {
      throw new Error('리퀘스트는 전송되었으나 응답이 오지 않는 오류 발생');
    } else {
      console.error('Error Message:', error.message);
      throw new Error('그 외 오류');
    }
  }
}

export async function getProduct(id) {
  try {
    const res = await API_URL.get(`/${id}`);
    console.log('====getProduct====');
    console.log(res.data);
    console.log('====getProduct End====');
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      throw new Error('생성 오류 발생');
    } else if (error.request) {
      throw new Error('리퀘스트는 전송되었으나 응답이 오지 않는 오류 발생');
    } else {
      console.error('Error Message:', error.message);
      throw new Error('그 외 오류');
    }
  }
}

export async function patchProduct(id, updateData = {}) {
  const newData = {
    name: updateData._name,
    description: updateData._description,
    price: updateData._price,
    tags: updateData._tags,
    images: updateData._images,
  };
  console.log('====patchProduct====');
  try {
    const res = await API_URL.patch(`/${id}`, newData);
    console.log(res.data);
    console.log('====patchProduct end====');
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      throw new Error('생성 오류 발생');
    } else if (error.request) {
      console.log(error);
      console.log('========================');
      console.log(error.response.status);
      throw new Error('리퀘스트는 전송되었으나 응답이 오지 않는 오류 발생');
    } else {
      console.error('Error Message:', error.message);
      throw new Error('그 외 오류');
    }
  }
}

export async function deleteProduct(id) {
  try {
    const res = await API_URL.delete(`/${id}`);
    console.log('====DeleteProduct====');
    console.log('====DeleteProduct end====');
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      throw new Error('생성 오류 발생');
    } else if (error.request) {
      throw new Error('리퀘스트는 전송되었으나 응답이 오지 않는 오류 발생');
    } else {
      console.error('Error Message:', error.message);
      throw new Error('그 외 오류');
    }
  }
}
