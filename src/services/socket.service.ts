import { Room } from '@prisma/client';
import { Namespace, Server } from 'socket.io';

class SocketService {
  private port = Number(process.env.SOCKET_PORT);
  private io: Server;
  private room: Namespace;

  constructor() {
    this.io = new Server(this.port, {
      cors: { origin: process.env.ALLOWED_URLS },
    });
    this.room = this.io.of('/room');
  }

  listen() {
    console.log(`socket started on port: ${this.port}`);

    this.room.on('connection', socket => {
      console.log(`connected: ${socket.id}`);

      socket.on('change-link', (link: string) => {
        const arrayOfRooms = [...socket.rooms];
        socket.to(arrayOfRooms[1]).emit('resend-link', link);
      });

      socket.on('join', (roomId: string) => {
        console.log(`${socket.id} join into ${roomId}`);
        socket.join(roomId);
      });

      socket.on('leave', (roomId: string) => {
        console.log(`${socket.id} leave from ${roomId}`);
        socket.leave(roomId);
      });

      socket.on('disconnect', () => {
        console.log(`disconnected: ${socket.id}`);
      });
    });
  }

  join(room: Room, username: string) {
    this.room.socketsJoin(room.id);

    this.room.to(room.id).emit('join', {
      username: username,
      room: room,
    });
  }
}

export const socketService = new SocketService();
