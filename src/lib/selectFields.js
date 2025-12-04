import { id } from 'date-fns/locale';
import { isEmpty } from './myFuns.js';

export function selectArticleProductFields(item) {
  let { updatedAt, comments, likedUsers, ...rest } = item;
  let selectedFields = rest;

  if (!isEmpty(comments)) {
    if (!Array.isArray(comments)) comments = [comments];
    const commentsToShow = comments.map((c) => c.content);
    selectedFields = { ...selectedFields, comments: commentsToShow };
  }

  if (!isEmpty(likedUsers)) {
    if (!Array.isArray(likedUsers)) likedUsers = [likedUsers];
    const likedUsersToShow = likedUsers.map((u) => u.nickname);
    selectedFields = { ...selectedFields, likedUsers: likedUsersToShow };
  }
  return selectedFields;
}

export function selectUserFields(user, fieldStr) {
  let { id, email, nickname, password, createdAt, updatedAt, imageUrls, ...rest } = user;
  const coreFields = { id, email, nickname, imageUrls, createdAt };

  //   switch (fieldStr) {
  //     case 'imageUrls':
  //       return coreFields;
  //     case 'myProducts' || 'all':
  //       if (isEmpty(rest.products)) break;
  //       rest.products = rest.products.map((p) => {
  //         return { id: p.id, name: p.name };
  //       });
  //       return { ...coreFields, products: rest.products };
  //     case 'myArticles' || 'all':
  //       if (isEmpty(rest.articles)) break;
  //       rest.articles = rest.articles.map((a) => {
  //         return { id: a.id, title: a.title };
  //       });
  //       return { ...coreFields, articles: rest.articles };
  //     case 'likedProducts' || 'all':
  //       if (isEmpty(rest.likedProducts)) break;
  //       rest.likedProducts = rest.likedProducts.map((p) => {
  //         return { id: p.id, name: p.name };
  //       });
  //       return { ...coreFields, likedProducts: rest.likedProducts };
  //     case 'likedArticles' || 'all':
  //       if (isEmpty(rest.likedArticles)) break;
  //       rest.likedArticles = rest.likedArticles.map((a) => {
  //         return { id: a.id, title: a.title };
  //       });
  //       return { ...coreFields, likedArticles: rest.likedArticles };
  //     case 'comments' || 'all':
  //       if (isEmpty(rest.comments)) break;
  //       rest.comments = rest.comments.map((c) => {
  //         return { id: c.id, content: c.content };
  //       });
  //       return { ...coreFields, comments: rest.comments };
  //     default:
  //       return rest;
  //   }

  let extraFields = [];

  if (fieldStr === 'core') return coreFields;
  if (fieldStr === 'myProducts' || fieldStr === 'all') {
    rest.products = rest.products.map((p) => {
      return { id: p.id, name: p.name };
    });
    extraFields = { ...extraFields, products: rest.products };
    if (fieldStr === 'myProducts') return { ...coreFields, ...extraFields };
  }
  if (fieldStr === 'myArticles' || fieldStr === 'all') {
    rest.articles = rest.articles.map((a) => {
      return { id: a.id, name: a.title };
    });
    extraFields = { ...extraFields, articles: rest.articles };
    if (fieldStr === 'myArticles') return { ...coreFields, ...extraFields };
  }
  if (fieldStr === 'likedProducts' || fieldStr === 'all') {
    rest.likedProducts = rest.likedProducts.map((p) => {
      return { id: p.id, name: p.name };
    });
    extraFields = { ...extraFields, likedProducts: rest.likedProducts };
    if (fieldStr === 'likedProducts') return { ...coreFields, ...extraFields };
  }
  if (fieldStr === 'likedArticles' || fieldStr === 'all') {
    rest.likedArticles = rest.likedArticles.map((a) => {
      return { id: a.id, name: a.title };
    });
    extraFields = { ...extraFields, likedArticles: rest.likedArticles };
    if (fieldStr === 'likedArticles') return { ...coreFields, ...extraFields };
  }
  if (fieldStr === 'comments' || fieldStr === 'all') {
    rest.comments = rest.comments.map((c) => {
      return { id: c.id, name: c.content };
    });
    extraFields = { ...extraFields, comments: rest.comments };
    return { ...coreFields, ...extraFields };
  }
}
