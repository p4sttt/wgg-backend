import { PrismaClient } from '@prisma/client';

const roomClient = new PrismaClient().room;

class RoomService {
  async createPermanentRoom(data: {
    name: string;
    maxUsersCount: number;
    userId: string;
  }) {
    const { name, maxUsersCount, userId } = data;

    const room = roomClient.create({
      data: {
        name: name,
        maxUsersCount: maxUsersCount,
        createdAt: new Date(Date.now()),
        userId: userId,
      },
    });

    return room;
  }
  async createTemporaryRoom(data: {
    name: string;
    lifetime: string;
    maxUsersCount: number;
  }) {
    const { name, lifetime, maxUsersCount } = data;

    const deleteAtDate = new Date(Date.now());
    deleteAtDate.setDate(deleteAtDate.getDate() + Number(lifetime));

    const room = roomClient.create({
      data: {
        name: name,
        maxUsersCount: maxUsersCount,
        createdAt: new Date(Date.now()),
        deleteAt: deleteAtDate,
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
}

export const roomService = new RoomService();
