import { PrismaClient } from '@prisma/client';

const roomClient = new PrismaClient().room;

class RoomService {
  async createRoom(data: {
    name: string;
    maxUsersCount: number;
    userId?: string;
    lifetime: string;
  }) {
    const { name, maxUsersCount, userId = null, lifetime } = data;

    if (!userId && lifetime == 'inf') {
      throw new Error('Access not allowed');
    }

    let deleteAt: Date | null = null;

    if (lifetime !== 'inf') {
      const dateNow = new Date(Date.now());
      new Date(Date.now()).setDate(
        new Date(Date.now()).getDate() + Number(lifetime),
      );
      deleteAt = dateNow;
    }

    const room = await roomClient.create({
      data: {
        name: name,
        maxUsersCount: maxUsersCount,
        userId: userId,
        deleteAt: deleteAt,
      },
    });

    return room;
  }
  async getUserRooms(userId: string) {
    const userRooms = await roomClient.findMany({
      where: {
        userId: userId,
      },
    });

    return userRooms;
  }
  async findRoomById(roomId: string) {
    const room = roomClient.findFirst({
      where: {
        id: roomId,
      },
    });

    return room;
  }
}

export const roomService = new RoomService();
