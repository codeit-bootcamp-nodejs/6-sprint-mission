"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function selectFields(item) {
    const result = Object.assign({}, item);
    if (item.comments)
        result.comments = item.comments.map((c) => c.content);
    if (item.likedUsers)
        result.likedUsers = item.likedUsers.map((u) => u.nickname);
    return result;
}
