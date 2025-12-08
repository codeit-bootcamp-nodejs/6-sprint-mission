const Leon = 'https://panda-market-api-crud.vercel.app';

export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  return fetch(
    `${Leon}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((res) => {
      if (!res.ok) throw new Error(`getArticleList 실패: ${res.status}`);
      return res.json();
    })
    .catch((err) => console.error(err.message || err));
}

export function getArticle(id) {
  return fetch(`${Leon}/articles/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`getArticle 실패: ${res.status}`);
      return res.json();
    })
    .catch((err) => console.log(err.message || err));
}

export function createArticle({ title, content, image }) {
  return fetch(`${Leon}/articles/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`createArticle 실패: ${res.status}`);
      return res.json();
    })
    .catch((err) => console.log(err.message || err));
}

export function patchArticle(id, patch) {
  return fetch(`${Leon}/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`patchArticle 실패: ${res.status}`);
      return res.json();
    })
    .catch((err) => console.log(err.message || err));
}

export function deleteArticle(id) {
  return fetch(`${Leon}/articles/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`deleteArticle 실패: ${res.status}`);
      return res.json();
    })
    .catch((err) => console.log(err.message || err));
}
