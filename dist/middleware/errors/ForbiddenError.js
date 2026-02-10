"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForbiddenError extends Error {
    constructor(message = '권한이 없습니다') {
        super(message);
        this.statusCode = 403;
        this.name = 'ForbiddenError';
    }
}
exports.default = ForbiddenError;
