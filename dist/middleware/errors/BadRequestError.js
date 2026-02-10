"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequestError extends Error {
    constructor(message = '잘못된 요청입니다') {
        super(message);
        this.statusCode = 400;
        this.name = 'BadRequestError';
    }
}
exports.default = BadRequestError;
