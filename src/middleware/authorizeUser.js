import BadRequestError from './errors/BadRequestError.js';
import articleRepo from '../repository/articleRepo.js';
import productRepo from '../repository/productRepo.js';
import commentRepo from '../repository/commentRepo.js';

async function authorizeUser(req, res, next) {
  try {
    let item;
    if (req.baseUrl.includes('product')) {
      item = await productRepo.findById(Number(req.params.productId));
    } else if (req.baseUrl.includes('article')) {
      item = await articleRepo.findById(Number(req.params.articleId));
    } else if (req.baseUrl.includes('comment')) {
      item = await commentRepo.get(Number(req.params.commentId));
    } else {
      console.log('');
      console.log('Type should be article / product / comment');
      throw new BadRequestError('BADREQUEST');
    }

    if (req.user.id !== item.userId) {
      console.log('');
      console.log('Unauthorized');
      throw new BadRequestError('UNAUTHORIZED');
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default authorizeUser;
