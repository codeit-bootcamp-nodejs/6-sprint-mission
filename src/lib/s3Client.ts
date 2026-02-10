import { S3Client } from '@aws-sdk/client-s3';
import { ACCESS_KEY_ID, REGION, SECRET_ACCESS_KEY } from './constants';

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});
