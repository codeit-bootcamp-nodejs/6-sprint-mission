"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const constants_1 = require("./constants");
exports.s3Client = new client_s3_1.S3Client({
    region: constants_1.REGION,
    credentials: {
        accessKeyId: constants_1.ACCESS_KEY_ID,
        secretAccessKey: constants_1.SECRET_ACCESS_KEY
    }
});
