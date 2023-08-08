import { PrismaClient } from '@prisma/client';

import { RoomCreateData } from '~/types';

const roomClient = new PrismaClient().room;

class RoomService {
  async create(data: RoomCreateData) {
    const { name, lifetime, maxUsersCount, userId } = data;

    const deleteAtDate = new Date(Date.now());
    deleteAtDate.setDate(deleteAtDate.getDate() + Number(lifetime));

    const room = roomClient.create({
      data: {
        name: name,
        maxUsersCount: maxUsersCount,
        createdAt: new Date(Date.now()),
        deleteAt: lifetime !== 'inf' ? deleteAtDate : null,
        userId: userId,
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
