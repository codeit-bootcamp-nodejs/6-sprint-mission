// TODO) Logger: Winston 기반 공용 로거 설정
/**
 * @see https://github.com/winstonjs/winston#readme
 */

import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// 1) 개발/운영 공용 로거 (레벨은 환경변수로 제어)
export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    printf(({ level, message, timestamp: ts, stack, ...meta }) => {
      const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return stack
        ? `[${ts}] ${level}: ${message} ${rest}\n${stack}`
        : `[${ts}] ${level}: ${message}${rest}`;
    })
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), errors({ stack: true })),
    }),
  ],
});
