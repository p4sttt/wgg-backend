import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { HttpError, roomService, tokenService, userService } from '~/services';
import { socketService } from '~/services';
import { RequestWithToken } from '~/types';

class RoomController {
  // TODO: remember user by browser/ip/something else shit to protect by spam
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, lifetime, maxUsersCount } = req.body;
      const { authorization } = req.headers as RequestWithToken;

      let user: User | null = null;
      if (authorization) {
        const { id } = tokenService.decode(authorization);
        user = await userService.findById(id);
      }

      const room = await roomService.createRoom({
        name: name,
        maxUsersCount: maxUsersCount,
        lifetime: lifetime,
        userId: user ? user.id : null,
      });

      return res.status(200).json({ roomId: room.id });
    } catch (error) {
      next(error);
    }
  }
  async getUserRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers as RequestWithToken;

      const { id } = tokenService.decode(authorization);

      const user = await userService.findById(id);

      const rooms = await roomService.getUserRooms(user.id);

      res.status(200).json({
        rooms,
      });
    } catch (error) {
      next(error);
    }
  }
  async joinRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId, username } = req.body as {
        roomId: string;
        username: string;
      };

      const room = await roomService.findRoomById(roomId);
      if (!room) {
        throw HttpError.BadRequest('Error, no room with this id was found');
      }

      socketService.join(room, username);

      return res.status(200).json({
        roomId: room.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const roomController = new RoomController();
