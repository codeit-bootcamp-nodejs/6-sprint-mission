"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProductFields = selectProductFields;
exports.selectArticleFields = selectArticleFields;
exports.selectUserFields = selectUserFields;
const myFuns_js_1 = require("./myFuns.js");
function selectProductFields(item) {
    const { id, name, description, price, tags, imageUrls, userId, createdAt, likedUsers = [], comments = [] } = item;
    let commentsToShow;
    if (!(0, myFuns_js_1.isEmpty)(comments)) {
        const safeComments = Array.isArray(comments) ? comments : [comments];
        commentsToShow = safeComments.map((c) => c.content);
    }
    let likedUsersToShow;
    if (!(0, myFuns_js_1.isEmpty)(likedUsers)) {
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
function selectArticleFields(item) {
    const { id, title, content, imageUrls, userId, createdAt, likedUsers = [], comments = [] } = item;
    let likedUsersToShow;
    if (!(0, myFuns_js_1.isEmpty)(likedUsers)) {
        const safeLikedUsers = Array.isArray(likedUsers) ? likedUsers : [likedUsers];
        likedUsersToShow = safeLikedUsers.map((u) => u.nickname);
    }
    let commentsToShow;
    if (!(0, myFuns_js_1.isEmpty)(comments)) {
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
function selectUserFields(user, fieldStr) {
    let { id, email, nickname, createdAt, imageUrls, products = [], articles = [], likedArticles = [], likedProducts = [], comments = [] } = user;
    const coreFields = { id, email, nickname, imageUrls, createdAt };
    //let extraFields: Record<string, any> = {};
    let extraFields = {};
    if (fieldStr === 'core')
        return coreFields;
    if (!(0, myFuns_js_1.isEmpty)(products)) {
        if (fieldStr === 'myProducts' || fieldStr === 'all') {
            const newProducts = products.map((p) => {
                return `id:${p.id}, ${p.name}`;
                //return { id: p.id, name: p.name };
            });
            extraFields = Object.assign(Object.assign({}, extraFields), { products: newProducts });
            if (fieldStr === 'myProducts')
                return Object.assign(Object.assign({}, coreFields), extraFields);
        }
    }
    if (!(0, myFuns_js_1.isEmpty)(articles)) {
        if (fieldStr === 'myArticles' || fieldStr === 'all') {
            const newArticles = articles.map((a) => {
                return `id:${a.id}, ${a.title}`;
                //return { id: a.id, name: a.title };
            });
            extraFields = Object.assign(Object.assign({}, extraFields), { articles: newArticles });
            if (fieldStr === 'myArticles')
                return Object.assign(Object.assign({}, coreFields), extraFields);
        }
    }
    if (!(0, myFuns_js_1.isEmpty)(likedProducts)) {
        if (fieldStr === 'likedProducts' || fieldStr === 'all') {
            const newLikedProducts = likedProducts.map((p) => {
                return `id:${p.id}, ${p.name}`;
                //return { id: p.id, name: p.name };
            });
            extraFields = Object.assign(Object.assign({}, extraFields), { likedProducts: newLikedProducts });
            if (fieldStr === 'likedProducts')
                return Object.assign(Object.assign({}, coreFields), extraFields);
        }
    }
    if ((0, myFuns_js_1.isEmpty)(likedArticles)) {
        if (fieldStr === 'likedArticles' || fieldStr === 'all') {
            const newLikedArticles = likedArticles.map((a) => {
                return `id:${a.id}, ${a.title}`;
                //return { id: a.id, name: a.title };
            });
            extraFields = Object.assign(Object.assign({}, extraFields), { likedArticles: newLikedArticles });
            if (fieldStr === 'likedArticles')
                return Object.assign(Object.assign({}, coreFields), extraFields);
        }
    }
    if (!(0, myFuns_js_1.isEmpty)(comments)) {
        if (fieldStr === 'comments' || fieldStr === 'all') {
            const newComments = comments.map((c) => {
                return `id:${c.id}, ${c.content}`;
                //return { id: c.id, name: c.content };
            });
            extraFields = Object.assign(Object.assign({}, extraFields), { comments: newComments });
            if (fieldStr === 'comments')
                return Object.assign(Object.assign({}, coreFields), extraFields);
        }
    }
    return Object.assign(Object.assign({}, coreFields), extraFields);
}
