import { Socket } from 'socket.io';

const handleSocketConnection = (socket: Socket) => {
  console.log(`connected: ${socket.id}`);

  socket.on('join', ({ roomId }: { roomId: string }) => {
    console.log(`join: ${socket.id} to ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnected: ${socket.id}`);
  });
};

export default handleSocketConnection;
