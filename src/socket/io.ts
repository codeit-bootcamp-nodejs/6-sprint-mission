// TODO) Socket.IO: 실시간 알림용 서버
import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { authService, type TokenPayload } from '../services/auth-service.js';

let io: Server | null = null;

export const SOCKET_EVENT_NOTIFICATION = 'notification';

function toOrigin(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed).origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins(): string[] {
  const configured = (process.env.SOCKET_CORS_ORIGINS ?? '')
    .split(',')
    .map((value) => toOrigin(value))
    .filter((value): value is string => Boolean(value));

  if (configured.length > 0) {
    return Array.from(new Set(configured));
  }

  const defaults = [
    toOrigin(process.env.BASE_URL ?? ''),
    toOrigin('http://localhost:3000'),
    toOrigin('http://localhost:5173'),
  ].filter((value): value is string => Boolean(value));

  return Array.from(new Set(defaults));
}

export function initSocket(server: HttpServer) {
  const allowedOrigins = getAllowedOrigins();

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const header = socket.handshake.headers.authorization;
    const bearerToken =
      typeof header === 'string' ? header.split(' ')[1] : null;
    const token = socket.handshake.auth?.token || bearerToken;

    if (!token) {
      return next(new Error('Unauthorized'));
    }

    try {
      const decoded = authService.verifyAccessToken(token) as TokenPayload;
      socket.data.userId = decoded.id;
      return next();
    } catch {
      return next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.userId as number | undefined;
    if (userId) {
      socket.join(`user:${userId}`);
    }
  });

  return io;
}

export function emitToUser<T>(userId: number, event: string, payload: T) {
  if (!io) {
    throw new Error('Socket.IO server is not initialized');
  }
  io.to(`user:${userId}`).emit(event, payload);
}
