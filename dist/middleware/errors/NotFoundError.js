"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message = '존재하지 않습니다') {
        super(message);
        this.statusCode = 404;
        this.name = 'NotFoundError';
    }
}
exports.default = NotFoundError;
