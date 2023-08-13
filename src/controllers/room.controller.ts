import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { roomService, tokenService, userService } from '~/services';
import { RequestWithToken } from '~/types';

import { Controller } from './controller';

class RoomController extends Controller {
  // TODO: remember user by browser/ip/something else shit to protect by spam
  async createRoom(req: Request, res: Response) {
    try {
      super.handleValidationErrors(req, res);

      const { name, lifetime, maxUsersCount } = req.body;
      const { authorization } = req.headers as RequestWithToken;

      let user: User | null = null;
      if (authorization) {
        const { id } = tokenService.decode(authorization);
        user = await userService.findById(id);
      }
      roomService
        .createRoom({
          name: name,
          maxUsersCount: maxUsersCount,
          lifetime: lifetime,
          userId: user ? user.id : null,
        })
        .then(room => {
          res.status(200).json({
            roomId: room.id,
          });
        })
        .catch(error => {
          res.status(403).json({
            message: error.message,
          });
        });
    } catch (error) {
      super.handleException(req, res, error);
    }
  }
  async getUserRooms(req: Request, res: Response) {
    try {
      const { authorization } = req.headers as RequestWithToken;

      const { id } = tokenService.decode(authorization);

      const user = await userService.findById(id);

      const rooms = await roomService.getUserRooms(user.id);

      res.status(200).json({
        rooms,
      });
    } catch (error) {
      super.handleException(req, res, error);
    }
  }
  async joinRoom(req: Request, res: Response) {
    try {
      super.handleValidationErrors(req, res);
    } catch (error) {
      super.handleException(req, res, error);
    }
  }
}

export const roomController = new RoomController();
