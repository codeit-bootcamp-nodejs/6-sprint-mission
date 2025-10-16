import { BASE_URL } from "./constants.js";

export function getArticleList({ page, pageSize, keyword }) {
  return fetch(
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch article");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function createArticle({ title, content, image }) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create article");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function patchArticle(articleId, data) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to patch article");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export async function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error("Failed to delete article");
        console.error(error);
        throw error;
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
}
