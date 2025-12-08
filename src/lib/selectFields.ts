import { completeUser, completeProduct, completeArticle } from '../dto/interfaceType.js';
import { isEmpty } from './myFuns.js';

export function selectProductFields(item: completeProduct) {
  const {
    id,
    name,
    description,
    price,
    tags,
    imageUrls,
    userId,
    createdAt,
    likedUsers = [],
    comments = []
  } = item;

  let commentsToShow;
  if (!isEmpty(comments)) {
    const safeComments = Array.isArray(comments) ? comments : [comments];
    commentsToShow = safeComments.map((c) => c.content);
  }
  let likedUsersToShow;
  if (!isEmpty(likedUsers)) {
    const safeLikedUsers = Array.isArray(likedUsers) ? likedUsers : [likedUsers];
    likedUsersToShow = safeLikedUsers.map((u) => u.nickname);
  }

  return {
    id,
    name,
    description,
    price,
    tags,
    imageUrls,
    userId,
    createdAt,
    comments: commentsToShow,
    likedUsers: likedUsersToShow
  };
}

export function selectArticleFields(item: completeArticle) {
  const { id, title, content, imageUrls, userId, createdAt, likedUsers = [], comments = [] } = item;

  let likedUsersToShow;
  if (!isEmpty(likedUsers)) {
    const safeLikedUsers = Array.isArray(likedUsers) ? likedUsers : [likedUsers];
    likedUsersToShow = safeLikedUsers.map((u) => u.nickname);
  }
  let commentsToShow;
  if (!isEmpty(comments)) {
    const safeComments = Array.isArray(comments) ? comments : [comments];
    const commentsToShow = safeComments.map((c) => c.content);
  }

  return {
    id,
    title,
    content,
    imageUrls,
    userId,
    createdAt,
    likedUsers: likedUsersToShow,
    comments: commentsToShow
  };
}

export function selectUserFields(user: completeUser, fieldStr: string) {
  let {
    id,
    email,
    nickname,
    createdAt,
    imageUrls,
    products = [],
    articles = [],
    likedArticles = [],
    likedProducts = [],
    comments = []
  } = user;
  const coreFields = { id, email, nickname, imageUrls, createdAt };

  //let extraFields: Record<string, any> = {};
  let extraFields = {};
  if (fieldStr === 'core') return coreFields;
  if (!isEmpty(products)) {
    if (fieldStr === 'myProducts' || fieldStr === 'all') {
      const newProducts = products.map((p) => {
        return `id:${p.id}, ${p.name}`;
        //return { id: p.id, name: p.name };
      });
      extraFields = { ...extraFields, products: newProducts };
      if (fieldStr === 'myProducts') return { ...coreFields, ...extraFields };
    }
  }
  if (!isEmpty(articles)) {
    if (fieldStr === 'myArticles' || fieldStr === 'all') {
      const newArticles = articles.map((a) => {
        return `id:${a.id}, ${a.title}`;
        //return { id: a.id, name: a.title };
      });
      extraFields = { ...extraFields, articles: newArticles };
      if (fieldStr === 'myArticles') return { ...coreFields, ...extraFields };
    }
  }

  if (!isEmpty(likedProducts)) {
    if (fieldStr === 'likedProducts' || fieldStr === 'all') {
      const newLikedProducts = likedProducts.map((p) => {
        return `id:${p.id}, ${p.name}`;
        //return { id: p.id, name: p.name };
      });
      extraFields = { ...extraFields, likedProducts: newLikedProducts };
      if (fieldStr === 'likedProducts') return { ...coreFields, ...extraFields };
    }
  }

  if (isEmpty(likedArticles)) {
    if (fieldStr === 'likedArticles' || fieldStr === 'all') {
      const newLikedArticles = likedArticles.map((a) => {
        return `id:${a.id}, ${a.title}`;
        //return { id: a.id, name: a.title };
      });
      extraFields = { ...extraFields, likedArticles: newLikedArticles };
      if (fieldStr === 'likedArticles') return { ...coreFields, ...extraFields };
    }
  }
  if (!isEmpty(comments)) {
    if (fieldStr === 'comments' || fieldStr === 'all') {
      const newComments = comments.map((c) => {
        return `id:${c.id}, ${c.content}`;
        //return { id: c.id, name: c.content };
      });
      extraFields = { ...extraFields, comments: newComments };
      if (fieldStr === 'comments') return { ...coreFields, ...extraFields };
    }
  }
  return { ...coreFields, ...extraFields };
}
