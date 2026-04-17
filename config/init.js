import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './database.js';

// ES6 모듈에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    console.log('데이터베이스 초기화를 시작합니다...');

    // 스키마 파일 읽기
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // 스키마 실행
    await pool.query(schemaSQL);
    console.log('데이터베이스 스키마가 성공적으로 생성되었습니다.');

    // 테이블 존재 확인
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log(
      '생성된 테이블:',
      tables.rows.map((row) => row.table_name),
    );
  } catch (error) {
    console.error('데이터베이스 초기화 오류:', error);
    throw error;
  }
}

// 스크립트가 직접 실행될 때만 초기화 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('데이터베이스 초기화가 완료되었습니다.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('데이터베이스 초기화 실패:', error);
      process.exit(1);
    });
}

export default initializeDatabase;
