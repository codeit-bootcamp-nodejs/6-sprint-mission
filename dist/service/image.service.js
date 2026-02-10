"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selectFields_1 = require("../lib/selectFields");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client_1 = require("../lib/s3Client");
const constants_1 = require("../lib/constants");
const path_1 = __importDefault(require("path"));
const internalServerError_1 = __importDefault(require("../middleware/errors/internalServerError"));
const interfaceType_1 = require("../types/interfaceType");
const bucket = constants_1.BUCKETNAME;
const region = constants_1.REGION;
function getList(type, id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const key = `images/${type}/${id}/`;
        const command = new client_s3_1.ListObjectsV2Command({ Bucket: bucket, Prefix: key });
        try {
            const data = yield s3Client_1.s3Client.send(command);
            const imageUrls = ((_a = data.Contents) !== null && _a !== void 0 ? _a : []).map((obj) => `https://${bucket}.s3.${region}.amazonaws.com/${obj.Key}`);
            return imageUrls;
        }
        catch (err) {
            throw new internalServerError_1.default('S3 장애/권한 오류');
        }
        // DB에서 imageUrls 찾아 반환하는 경우 (현업에서 더 쓰는 방식이라 함)
        //   const repo = RepoMap[type];
        //   const imageUrlsDB = await repo.findImgUrls(id);
        //   return imageUrlsDB;
    });
}
function get(type, id, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `images/${type}/${id}/${filename}`;
        try {
            const imgObj = yield s3Client_1.s3Client.send(new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key }));
            return imgObj;
        }
        catch (err) {
            throw new internalServerError_1.default('AWS S3 fetch failure');
        }
    });
}
function post(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type: imgType, id, file } = input;
        // AWS S3에 이미지 저장
        const ext = path_1.default.extname(file.originalname);
        const key = `images/${imgType}/${id}/${Date.now()}${ext}`;
        const params = {
            Bucket: constants_1.BUCKETNAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command = new client_s3_1.PutObjectCommand(params);
        try {
            yield s3Client_1.s3Client.send(command);
        }
        catch (err) {
            throw new internalServerError_1.default('AWS S3 upload failure');
        }
        // DB에 새 imageUrl 저장
        const repo = interfaceType_1.RepoMap[imgType];
        const imageUrls = yield repo.findImgUrls(input.id);
        const newImageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        let updatedUrls = [];
        if (imageUrls) {
            updatedUrls = [...imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
        }
        else {
            updatedUrls = [newImageUrl];
        }
        const imageData = { imageUrls: updatedUrls };
        const item = yield repo.patch(input.id, imageData);
        if (imgType === 'users')
            return (0, selectFields_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_1.selectFields)(item);
    });
}
function del(type, id, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `images/${type}/${id}/${filename}`;
        yield s3Client_1.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: bucket, Key: key }));
        const repo = interfaceType_1.RepoMap[type];
        const delImgUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        const imageUrls = yield repo.findImgUrls(id);
        const i = imageUrls.indexOf(delImgUrl);
        if (i !== -1)
            imageUrls.splice(i, 1);
        const item = yield repo.patch(id, { imageUrls });
        if (type === 'users')
            return (0, selectFields_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_1.selectFields)(item);
    });
}
function delList(type, id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const key = `images/${type}/${id}/`;
        let command = new client_s3_1.ListObjectsV2Command({ Bucket: bucket, Prefix: key });
        const list = yield s3Client_1.s3Client.send(command);
        if ((_a = list.Contents) === null || _a === void 0 ? void 0 : _a.length) {
            yield s3Client_1.s3Client.send(new client_s3_1.DeleteObjectsCommand({
                Bucket: bucket,
                Delete: {
                    Objects: list.Contents.map((obj) => ({ Key: obj.Key }))
                }
            }));
        }
        const repo = interfaceType_1.RepoMap[type];
        const item = yield repo.patch(id, { imageUrls: [] });
        if (type === 'users')
            return (0, selectFields_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_1.selectFields)(item);
    });
}
exports.default = {
    getList,
    get,
    post,
    del,
    delList
};
