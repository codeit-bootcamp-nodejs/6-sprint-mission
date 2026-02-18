import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { AWS_REGION, AWS_BUCKET_NAME } from './constants';

const s3 = new S3Client({
  region: AWS_REGION,
  // IAM Role 사용으로 credentials 생략
});

// 파일 업로드
export const putImage = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string,
  contentType: string,
) => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: body, // SDK stream/buffer 호환
    ContentType: contentType,
  });
  return s3.send(command);
};

// 파일 삭제
export const deleteImage = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return s3.send(command);
};

// 파일 조회 (필요 시)
export const getImage = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return s3.send(command);
};

// S3 URL 생성 헬퍼
export const getS3Url = (key: string) => {
  return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};
