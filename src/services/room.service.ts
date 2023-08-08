import { PrismaClient } from '@prisma/client';

import { RoomCreateData } from '~/types';

const roomClient = new PrismaClient().room;

class RoomService {
  async create(data: RoomCreateData) {
    const { name, lifetime, maxUsersCount, userId } = data;

    const createdAtDate = new Date(Date.now());
    const deleteAtDate =
      lifetime !== 'inf'
        ? new Date(
            createdAtDate.setDate(createdAtDate.getDate() + Number(lifetime)),
          )
        : null;

    const room = roomClient.create({
      data: {
        name: name,
        maxUsersCount: maxUsersCount,
        createdAt: createdAtDate,
        deleteAt: deleteAtDate,
        userId: userId,
      },
    });

    return room;
  }
}

export const roomService = new RoomService();
