// TODO) Upload-Cleaner: 이미지 업로드 정리
import { unlink } from 'fs/promises';
import path from 'path';
import { logger } from '../core/error/logger.js';

// 1) 업로드 경로 구분
const UPLOAD_PREFIX = '/uploads/';

// 2) 업로드 경로 함수 (절대/상대 경로 모두 지원 & 변한 실패 시 null 반환)
const resolveUploadPath = (url: string | null | undefined): string | null => {
  // 2-1) URL 없으면 null 반환
  if (!url) return null;
  try {
    // 2-2) 업로드 Prefix가 포함되었는지 확인 (없으면 null 반환)
    const idx = url.indexOf(UPLOAD_PREFIX);
    if (idx === -1) return null;

    // 2-3) Prefix 이후 상대 경로 추출 (없으면 null 반환)
    const relative = url.slice(idx + UPLOAD_PREFIX.length);
    if (!relative) return null;

    // 2-4) 프로젝트 루트 절대 경로 반환
    return path.join(process.cwd(), 'public', 'uploads', relative);
  } catch {
    // 2-5) 위 조건이 무시되면 null 반환 안전장치
    return null;
  }
};

// 3) 업로드 삭제 함수 (로컬에 저장된 파일 삭제 & 없을 시 조용히 무시)
export const deleteLocalUploadIfExists = async (
  url: string | null | undefined
): Promise<void> => {
  // 3-1) URL 실제 경로로 반환
  const filePath = resolveUploadPath(url);
  if (!filePath) return;
  try {
    // 3-2) 파일 존재 시 삭제 시도
    await unlink(filePath);
  } catch (error: any) {
    // 3-3) ENOENT(파일 없음)은 무시, 그 외 에러만 처리
    if (error.code !== 'ENOENT') {
      logger.error('파일 삭제 실패', {
        message: error.message,
        code: error.code,
        stack: error.stack,
        filePath,
      });
    }
  }
};
