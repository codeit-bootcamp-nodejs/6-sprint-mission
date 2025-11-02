import axios from '../lib/axios.js';
import { BASE_URL } from '../lib/constants.js';
import Article from '../models/Article.mjs';

// 아티클 리스트 가져오기
function getArticleList(params) {
  return axios
    .get(`${BASE_URL}/articles`, { params })
    .then((res) => {
      console.log(`${res.statusText}! 게시물을 가져왔어요!`);
      console.log(res.data.list);
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `${error.response.status}: ${error.response.data.message}`
        );
      } else {
        console.error(`Network error:`, error.message);
      }
      throw error;
    })
    .finally(() => {
      console.log(`Finished!`);
    });
}

// 아티클 1개 가져오기
function getArticle(articleId) {
  return axios
    .get(`${BASE_URL}/articles/${articleId}`)
    .then((res) => {
      console.log(`${res.statusText}! 게시물을 가져왔어요!`);
      console.log(res.data);
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `${error.response.status}: ${error.response.data.message}`
        );
      } else {
        console.error(`Network error:`, error.message);
      }
      throw error;
    })
    .finally(() => {
      console.log(`Finished!`);
    });
}

// 아티클 생성하기
function createArticle(data) {
  const newArticleContent = makeArticle(data);
  return axios
    .post(`${BASE_URL}/articles`, newArticleContent, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      console.log(`${res.statusText}! 게시물을 생성했습니다.`);
      console.log(res.data);
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `${error.response.status}: ${error.response.data.message}`
        );
      } else {
        console.error(`Network error:`, error.message);
      }
      throw error;
    })
    .finally(() => {
      console.log(`Finished!`);
    });
}

// 아티클 수정하기
function patchArticle(articleId, data) {
  const patchArticleContent = makeArticle(data);
  return axios
    .patch(`${BASE_URL}/articles/${articleId}`, patchArticleContent, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      console.log(`${res.statusText}! ${articleId}번째 게시물을 수정했습니다.`);
      console.log(res.data);
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `${error.response.status}: ${error.response.data.message}`
        );
      } else {
        console.error(`Network error:`, error.message);
      }
      throw error;
    })
    .finally(() => {
      console.log(`Finished!`);
    });
}

// 아티클 삭제하기
function deleteArticle(articleId) {
  axios
    .delete(`${BASE_URL}/articles/${articleId}`)
    .then((res) => {
      console.log(`${res.statusText}! ${articleId}번째 게시물을 삭제했습니다.`);
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `${error.response.status}: ${error.response.data.message}`
        );
      } else {
        console.error(`Network error:`, error.message);
      }
      throw error;
    })
    .finally(() => {
      console.log(`Finished!`);
    });
}

// 아티클 객체 만들기
function makeArticle(data) {
  console.log('article 클래스 생성');
  const localData = new Article(
    data.title,
    data.content,
    data.image,
    data.writer,
    data.createdAt,
    data.likeCount
  );
  const toLocal = localData.toJSON();
  console.log(toLocal);
  const serverData = new Article(data.title, data.content, data.image);
  const toServer = serverData.toServerData();
  return toServer;
}

const articles = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

export default articles;

// ----------
