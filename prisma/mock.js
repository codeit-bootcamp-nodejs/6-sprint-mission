// TODO) Mock: DB 데이터 샘플 설정
import bcrypt from 'bcrypt';

const hash = (pw) => bcrypt.hashSync(pw, 10);

// &) Users
export const mockUsers = Array.from({ length: 50 }, (_, i) => {
  const idx = i + 1;
  return {
    email: `leon${idx}@test.com`, // leon1 ~ 50@test.com
    nickname: `Leon${idx}`, //  Leon1 ~ 50
    image: null,
    password: hash('leon1234'),
  };
});

const tagList = [
  'NONE',
  'FASHION',
  'BEAUTY',
  'SPORTS',
  'ELECTRONICS',
  'HOME_INTERIOR',
  'HOUSEHOLD_SUPPLIES',
  'KITCHENWARE',
];

// &) Products
export const mockProducts = Array.from({ length: 50 }, (_, i) => {
  const idx = i + 1;
  return {
    name: `[테스트]상품: ${idx}`,
    description: `[테스트]상품 설명: ${idx}`,
    price: 1000 * idx,
    stock: 10 + (idx % 5),
    tags: tagList[idx % tagList.length],
    imagePath: `/uploads/sample-${idx}.jpg`,
    userIndex: i % mockUsers.length, // 유저 순환 참조
  };
});

// &) Articles
export const mockArticles = Array.from({ length: 50 }, (_, i) => {
  const idx = i + 1;
  return {
    title: `[테스트]게시글: ${idx}`,
    content: `[테스트]게시글 설명: ${idx}`,
    userIndex: i % mockUsers.length, // 유저 순환 참조
  };
});

// &) Product comments
export const mockProductComments = Array.from({ length: 50 }, (_, i) => {
  return {
    content: `[테스트]상품 댓글: ${i + 1}`,
    productIndex: i % mockProducts.length, // 상품 순환 참조
    userIndex: (i + 1) % mockUsers.length, // 유저 순환 참조
  };
});

// &) Article comments
export const mockArticleComments = Array.from({ length: 50 }, (_, i) => {
  return {
    content: `[테스트]게시글 댓글: ${i + 1}`,
    articleIndex: i % mockArticles.length, // 상품 순환 참조
    userIndex: (i + 2) % mockUsers.length, // 유저 순환 참조
  };
});

// &) Likes: 앞 20개씩 교차 생성
export const mockProductLikes = Array.from({ length: 50 }, (_, i) => ({
  productIndex: i % mockProducts.length,
  userIndex: (i + 3) % mockUsers.length,
}));

export const mockArticleLikes = Array.from({ length: 50 }, (_, i) => ({
  articleIndex: i % mockArticles.length,
  userIndex: (i + 4) % mockUsers.length,
}));
