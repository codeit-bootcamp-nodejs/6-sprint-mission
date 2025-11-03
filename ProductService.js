const url = 'https://panda-market-api-crud.vercel.app/products';

export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const response = await fetch(
      `${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if (!response.ok) {
      throw new Error('상품 리스트 불러오기 실패');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error('상품 불러오기 실패');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!response.ok) {
      throw new Error('상품 등록 실패');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function patchProduct(id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('상품 수정 실패');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('상품 삭제 실패');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
