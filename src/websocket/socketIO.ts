import { Server } from 'socket.io';
import type http from 'http';
import { verifyAccessToken } from '../lib/token';
import notiRepo from '../repository/notification.repo';

let io: Server;

export function setupSocket(server: http.Server) {
  io = new Server(server, {
    cors: { origin: `*` },
    transports: ['websocket', 'polling']
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.accessToken;

      if (!token) {
        return next(new Error('인증 토큰이 없습니다.'));
      }
      const payload = verifyAccessToken(token);
      socket.data.userId = payload.userId;

      console.log('');
      console.log('SocketIO connected successfully!');
      next();
    } catch (e) {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.data.userId;
    const room = `user:${userId}`;
    socket.join(room);

    const roomSet = socket.nsp.adapter.rooms.get(room);
    console.log('joined room:', room, 'count:', roomSet?.size ?? 0);
    //console.log('connected', socket.id, 'transport:', socket.conn.transport.name);

    // unread count 계산해서 방금 연결된 소켓에 전송
    const unreadCount = await notiRepo.countUnread(userId);
    socket.emit('notification:unreadCount', { unreadCount });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket IO is not initialized');
  return io;
}
