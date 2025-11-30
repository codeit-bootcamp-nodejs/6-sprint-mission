import BadRequestError from './errors/BadRequestError.js';
import userRepo from '../repository/userRepo.js';
import articleRepo from '../repository/articleRepo.js';
import productRepo from '../repository/productRepo.js';
import commentRepo from '../repository/commentRepo.js';

async function authorizeUser(req, res, next) {
  try {
    let item;
    if (req.originalUrl.includes('users')) {
      item = await userRepo.findById(Number(req.params.id));
      item.userId = item.id;
    } else if (req.originalUrl.includes('products')) {
      item = await productRepo.findById(Number(req.params.id));
    } else if (req.originalUrl.includes('articles')) {
      item = await articleRepo.findById(Number(req.params.id));
    } else if (req.originalUrl.includes('comments')) {
      item = await commentRepo.findById(Number(req.params.id));
    } else {
      console.log('');
      console.log('Something went wrong');
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
