"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNotFoundHandler = defaultNotFoundHandler;
exports.globalErrorHandler = globalErrorHandler;
const superstruct_1 = require("superstruct");
const client_1 = require("@prisma/client");
function defaultNotFoundHandler(req, res, next) {
    return res.status(404).send({ message: '요청하신 페이지를 찾을 수 없습니다' });
}
const defaultMessageByStatus = {
    400: '잘못된 요청입니다',
    401: '인증이 필요합니다',
    403: '권한이 없습니다',
    404: '존재하지 않습니다',
    409: '중복 상태/관계가 존재합니다',
    500: '서버 내부 문제가 발생했습니다',
    503: '일시적 서버 문제가 발생했습니다. 잠시 후 다시 시도해 주세요'
};
function globalErrorHandler(err, req, res, next) {
    var _a, _b, _c;
    console.error(err);
    let statusCode = err.statusCode;
    let message = err.message;
    // 1) Superstruct
    if (!statusCode && err instanceof superstruct_1.StructError) {
        statusCode = 400;
        const failures = typeof err.failures === 'function' ? err.failures() : [];
        const firstFailure = failures[0];
        if (!message && (firstFailure === null || firstFailure === void 0 ? void 0 : firstFailure.message)) {
            message = firstFailure.message;
        }
    }
    // 2) Prisma
    if (!statusCode && err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const prismaToHttp = {
            P2002: 409,
            P2003: 400,
            P2007: 400,
            P2015: 404,
            P2025: 404,
            P1000: 500,
            P1010: 500,
            P1012: 500,
            P1017: 503,
            P2021: 500
        };
        statusCode = (_a = prismaToHttp[err.code]) !== null && _a !== void 0 ? _a : 500;
        message = (_b = defaultMessageByStatus[statusCode]) !== null && _b !== void 0 ? _b : defaultMessageByStatus[500];
    }
    // 3) JSON 파싱 에러
    if (!statusCode && err instanceof SyntaxError && 'body' in err) {
        statusCode = 400;
    }
    // 4) 최종 폴백
    statusCode !== null && statusCode !== void 0 ? statusCode : (statusCode = 500);
    message !== null && message !== void 0 ? message : (message = (_c = defaultMessageByStatus[statusCode]) !== null && _c !== void 0 ? _c : defaultMessageByStatus[500]);
    return res.status(statusCode).send({ message });
}
