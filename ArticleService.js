const url = 'https://panda-market-api-crud.vercel.app/articles';

export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  return fetch(`${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('게시글 리스트 불러오기 실패');
      }
      return res.json();
    })
    .then((data) => data.items)
    .catch((err) => {
      console.error(err);
    });
}

export function getArticle(id) {
  return fetch(`${url}/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('게시글 불러오기 실패');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function createArticle(title, content, image) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('게시글 등록 실패');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function patchArticle(id, data) {
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('게시글 수정 실패');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function deleteArticle(id) {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('게시글 삭제 실패');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}
