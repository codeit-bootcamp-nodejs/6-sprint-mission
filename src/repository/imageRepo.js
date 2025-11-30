import prisma from '../lib/prismaClient.js';

async function updateProduct(id, imageUrls) {
  return await prisma.product.update({
    where: { id },
    data: { imageUrls }
    //select: { imageUrls: true } // imageUrls만 보고 싶다면
  });
}

async function updateArticle(id, imageUrls) {
  return await prisma.article.update({
    where: { id },
    data: { imageUrls }
    //select: { imageUrls: true } // imageUrls만 보고 싶다면
  });
}

async function updateUser(id, imageUrls) {
  return await prisma.user.update({
    where: { id },
    data: { imageUrls }
    //select: { imageUrls: true } // imageUrls만 보고 싶다면
  });
}

export default {
  updateProduct,
  updateArticle,
  updateUser
};

// 게시물 이미지 등록
// req.params에 articleId 있어야 함
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
async function postArticleImage(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(articleId) },
      select: { imageUrls: true } // 저장된 imageUrls 배열 가져옴
    });

    // 새로 추가/생성할 이미지 url
    const newImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    app.use('/images', express.static('uploads'));

    // 기존 imgeUrls에 새로운 imageUrl 추가하기
    const updatedUrls = [...article.imageUrls, newImageUrl];

    // DB의 imageUrls 필드 업데이트
    const updated = await prisma.article.update({
      where: { id: Number(articleId) },
      data: { imageUrls: updatedUrls }
      //select: { imageUrls: true } // imageUrls만 보고 싶다면
    });
    console.log('imageUrls updated & stored in DB.');
    res.status(201).send(updated);
  } catch (err) {
    next(err);
  }
}
