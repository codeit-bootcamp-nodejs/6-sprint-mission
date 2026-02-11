import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET || 'your_jwt_access_token_secret';
export const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || 'your_jwt_refresh_token_secret';
export const ACCESS_TOKEN_COOKIE_NAME = 'access-token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';

export const ACCESS_TOKEN_EXPIRESIN = '1h';
export const REFRESH_TOKEN_EXPIRESIN = '1d';
export const ACCESS_TOKEN_MAXAGE = 1 * 60 * 60 * 1000; // 1 hour
export const REFRESH_TOKEN_MAXAGE = 1 * 24 * 60 * 60 * 1000; // 1 day

// image paths
//export const STATIC_IMG_PATH = path.resolve(process.cwd(), 'images_upload'); //pc경로 루트디렉토리의 images
//export const PUBLIC_IMG_PATH = '/public/images'; //url경로

// validate req.body
export const allowedProductKeys = ['name', 'description', 'price', 'tags'];
export const allowedArticleKeys = ['title', 'content'];
export const allowedCommentKeys = ['content'];
export const allowedUserKeys = ['email', 'nickname', 'password'];

export const BUCKETNAME = required('AWS_BUCKET_NAME');
export const REGION = required('AWS_REGION');
export const ACCESS_KEY_ID = required('AWS_ACCESS_KEY_ID');
export const SECRET_ACCESS_KEY = required('AWS_SECRET_ACCESS_KEY');

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is missing in .env`);
  }
  return value;
}
