// Prisma 클라이언트를 가져옵니다
import { PrismaClient } from "@prisma/client";

// Prisma 클라이언트 인스턴스를 생성합니다
const prisma = new PrismaClient({
  // 개발 환경에서는 모든 로그를 출력하고, 운영 환경에서는 에러만 출력합니다
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// 데이터베이스 연결을 테스트합니다 (비동기로 실행, 서버 시작을 막지 않음)
prisma
  .$connect()
  .then(() => {
    console.log("✅ Prisma Client가 데이터베이스에 연결되었습니다.");
  })
  .catch((err) => {
    console.warn(
      "⚠️ Prisma Client 연결 실패 (데이터베이스 설정을 확인하세요):",
      err.message
    );
    console.warn(
      "💡 서버는 계속 실행되지만 데이터베이스 기능은 사용할 수 없습니다."
    );
  });

// 서버가 종료될 때 데이터베이스 연결을 정리합니다
process.on("beforeExit", async () => {
  console.log("🔄 데이터베이스 연결을 종료합니다...");
  await prisma.$disconnect();
});

// Prisma 클라이언트를 내보냅니다
export { prisma };
