"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConflictError extends Error {
    constructor(message = '이미 존재합니다') {
        super(message);
        this.statusCode = 409;
        this.name = 'ConflictError';
    }
}
exports.default = ConflictError;
