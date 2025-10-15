import { addParams } from '../lib/myFuns.js';

//let url = new URL('https://panda-market-api-crud.vercel.app/articles');
let url = 'https://panda-market-api-crud.vercel.app/articles';

export async function getArticleList(params = {}) {
  url = addParams(url, params);
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        printError(response);
        throw new Error('getArticleList()');
      } else {
        const data = await response.json();
        if (data.list.length) {
          // if there are articles found
          console.log(`Article count, total:      ${data.totalCount}`);
          console.log(`Article count, retrived:   ${data.list.length}`);
          return data.list;
        } else {
          // if no articles are found
          console.log(response.status);
          console.log('No articles found');
        }
      }
    })
    .catch(() => console.log('No articles retreived'))
    .finally(() => console.log(''));
}

export async function getArticle(id) {
  return fetch(`${url}/${id}`)
    .then((response) => {
      if (!response.ok) {
        printError(response);
        throw new Error('getArticle()');
      } else {
        console.log(response.status);
        return response.json();
      }
    })
    .catch(() => console.log(`No article_${id} exists`))
    .finally(() => console.log(''));
}

export async function createArticle(articleData) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) {
        printError(response);
        throw new Error('createArticle()');
      } else {
        console.log(response.status);
        return response.json();
      }
    })
    .catch(() => console.log('No article created'));
}

export async function patchArticle(id, articleData) {
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) {
        printError(response);
        throw new Error('patchArticle()');
      } else {
        console.log(response.status);
        return response.json();
      }
    })
    .catch(() => console.log('No article patched'));
}

export function deleteArticle(id) {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        printError(response);
        throw new Error('deleteArticle()');
      } else {
        console.log(response.status);
        console.log('deleted');
        return response.json();
      }
    })
    .catch(() => console.log('No article deleted'));
}

function printError(response) {
  console.log(response.status);
  console.log(response.statusText);
}
