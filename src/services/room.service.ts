import { PrismaClient } from '@prisma/client';

const roomClient = new PrismaClient().room;

class RoomService {
  async create() {
    const room = await roomClient.findFirst({ where: { name: 'some ' } });
    console.log(room);
  }
}

export const roomService = new RoomService();
