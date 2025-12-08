"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArray = isEmptyArray;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyString = isEmptyString;
exports.isEmpty = isEmpty;
exports.print = print;
function isEmptyArray(v) {
    if (Array.isArray(v))
        return v.length === 0;
}
function isEmptyObject(v) {
    if (v === null)
        return true;
    if (typeof v === 'object')
        return Object.keys(v).length === 0;
}
function isEmptyString(v) {
    if (typeof v === 'string')
        return v.length === 0;
}
function isEmpty(v) {
    if (v === undefined)
        return true;
    return Boolean(isEmptyObject(v) || isEmptyArray(v) || isEmptyString(v));
}
function print(message) {
    console.log('');
    console.log(message);
    console.log('');
}
