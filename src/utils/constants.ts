import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT;
const JWT_ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_TOKEN_SECRET || 'this_is_temporary_access_token_secret';
const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || 'this_is_temporary_refresh_token_secret';
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ACCESS_TOKEN_COOKIE_NAME = 'access-token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';

export {
  NODE_ENV,
  PORT,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  AWS_REGION,
  AWS_BUCKET_NAME,
};
