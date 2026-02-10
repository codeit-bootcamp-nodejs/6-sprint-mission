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
exports.setupSocket = setupSocket;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
const token_1 = require("../lib/token");
const notification_repo_1 = __importDefault(require("../repository/notification.repo"));
let io;
function setupSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: { origin: `*` },
        transports: ['websocket', 'polling']
    });
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.accessToken;
            if (!token) {
                return next(new Error('인증 토큰이 없습니다.'));
            }
            const payload = (0, token_1.verifyAccessToken)(token);
            socket.data.userId = payload.userId;
            console.log('');
            console.log('SocketIO connected successfully!');
            next();
        }
        catch (e) {
            next(new Error('unauthorized'));
        }
    });
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = socket.data.userId;
        const room = `user:${userId}`;
        socket.join(room);
        const roomSet = socket.nsp.adapter.rooms.get(room);
        console.log('joined room:', room, 'count:', (_a = roomSet === null || roomSet === void 0 ? void 0 : roomSet.size) !== null && _a !== void 0 ? _a : 0);
        //console.log('connected', socket.id, 'transport:', socket.conn.transport.name);
        // unread count 계산해서 방금 연결된 소켓에 전송
        const unreadCount = yield notification_repo_1.default.countUnread(userId);
        socket.emit('notification:unreadCount', { unreadCount });
    }));
    return io;
}
function getIO() {
    if (!io)
        throw new Error('Socket IO is not initialized');
    return io;
}
