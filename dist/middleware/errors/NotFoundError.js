"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(modelName, id) {
        super('존재하지 않습니다');
        this.name = 'NotFoundError';
    }
}
exports.default = NotFoundError;
