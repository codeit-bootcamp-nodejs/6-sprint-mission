// TODO) Env-Loader: 환경, 설정, 공통 미들웨어 정의
// ?) 모든 모듈에서 .env를 확실하게 읽도록 공용 로더 제공
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1) ESM 환경 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2) 루트 위치 .env 파일 명시적으로 로드
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});
