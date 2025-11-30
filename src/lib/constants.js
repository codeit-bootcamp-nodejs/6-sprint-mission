import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET || 'your_jwt_access_token_secret';
const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || 'your_jwt_refresh_token_secret';
const ACCESS_TOKEN_COOKIE_NAME = 'access-token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';

const ACCESS_TOKEN_EXPIRESIN = '1h';
const REFRESH_TOKEN_EXPIRESIN = '1d';
const ACCESS_TOKEN_MAXAGE = 1 * 60 * 60 * 1000; // 1 hour
const REFRESH_TOKEN_MAXAGE = 1 * 24 * 60 * 60 * 1000; // 1 day

// image paths
const STATIC_IMG_PATH = path.resolve(process.cwd(), 'images_upload'); //pc경로 루트디렉토리의 images
const PUBLIC_IMG_PATH = '/public/images'; //url경로

export {
  NODE_ENV,
  PORT,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_MAXAGE,
  REFRESH_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_MAXAGE,
  PUBLIC_IMG_PATH,
  STATIC_IMG_PATH
};
