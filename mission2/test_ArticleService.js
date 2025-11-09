import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './service/ArticleService.js';

// query parameters for getArticleList()
const params = {
  page: 1,
  pageSize: 3,
  orderBy: 'recent',
  //keyword: '게시글',
};

let articles;
//articles = await getArticleList(params); // retrieve articles by params
//articles = await getArticleList();

articles = await getArticle(5023); // retrieve an article by id
//articles = await getArticle(10); // retrieve an article by id - error test

const articleData = {
  title: 'test5: createArticle() by nobody',
  content: '노드백엔드 6기 스프린트 미션2 - API serviceS',
  image: 'https://example.com/...',
  //writer: 'noname',
};

//articles = await createArticle(articleData); // create a new article

//articles = await patchArticle(5023, articleData); // modify an existing article

//articles = await deleteArticle(5023); // delete an existing article

if (articles) console.log(articles);
console.log('');
