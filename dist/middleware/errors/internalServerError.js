"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalServerError extends Error {
    constructor(message = '서버 내부 문제가 발생했습니다') {
        super(message);
        this.statusCode = 500;
        this.name = 'InternalServerError';
    }
}
exports.default = InternalServerError;
