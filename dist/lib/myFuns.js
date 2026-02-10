"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArray = isEmptyArray;
exports.isEmptyObject = isEmptyObject;
exports.isEmpty = isEmpty;
exports.print = print;
exports.includedOk = includedOk;
exports.stripNulls = stripNulls;
function isEmptyArray(v) {
    if (Array.isArray(v))
        return v.length === 0;
    else
        return false;
}
function isEmptyObject(v) {
    if (typeof v === 'object')
        return Object.keys(v).length === 0;
    else
        return false;
}
function isEmpty(v) {
    if (v === undefined)
        return true;
    return Boolean(isEmptyObject(v) || isEmptyArray(v));
}
function print(message) {
    console.log('');
    console.log(message);
    console.log('');
}
function includedOk(myArray, myKey, myValue) {
    return myArray.some((n) => n[myKey] === myValue);
}
function stripNulls(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null));
}
