import { Server } from 'socket.io';
import type http from 'http';
import { verifyAccessToken } from '../lib/token';

let io: Server;

export function setupSocket(server: http.Server) {
  io = new Server(server, {
    cors: { origin: `*` }
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.accessToken;

      if (!token) {
        return next(new Error('인증 토큰이 없습니다.'));
      }
      const payload = verifyAccessToken(token);
      socket.data.userId = payload.userId;
      console.log('SocketIO connected successfully!');
      next();
    } catch (e) {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.userId;
    const room = `user:${userId}`;
    socket.join(room);

    const roomSet = socket.nsp.adapter.rooms.get(room);
    console.log('joined room:', room, 'count:', roomSet?.size ?? 0);
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket IO is not initialized');
  return io;
}
