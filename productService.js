const Leon = 'https://panda-market-api-crud.vercel.app';

export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const res = await fetch(
      `${Leon}/products?page=${page}&pageSize=${pageSize}&keyword${keyword}`
    );
    if (!res.ok) throw new Error(`getProductList 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(err.message || err);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${Leon}/products/${id}`);
    if (!res.ok) throw new Error(`getProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(err.message || err);
  }
}

export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  try {
    const res = await fetch(`${Leon}/products/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`createProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(err.message || err);
  }
}

export async function patchProduct(id, patch) {
  try {
    const res = await fetch(`${Leon}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error(`patchProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(err.message || err);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${Leon}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`deleteProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(err.message || err);
  }
}
