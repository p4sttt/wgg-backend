import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { roomService, tokenService, userService } from '~/services';
import { RequestWithToken } from '~/types';

class Controller {
  // TODO: remember user by browser/ip/something else shit to protect by spam
  async createRoom(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation error',
          errors: validationErrors.array(),
        });
      }

      const { name, lifetime, maxUsersCount } = req.body;

      let room: Room;
      if (lifetime == 'inf') {
        try {
          const { authorization } = req.headers as RequestWithToken;

          const { id } = tokenService.verify(authorization);

          const user = await userService.findById(id);

          room = await roomService.createPermanentRoom({
            userId: user.id,
            name: name,
            maxUsersCount: maxUsersCount,
          });
        } catch (error) {
          return res.status(500).json({
            message: 'Access not allowed',
          });
        }
      } else {
        room = await roomService.createTemporaryRoom({
          name: name,
          lifetime: lifetime,
          maxUsersCount: maxUsersCount,
        });
      }

      res.status(200).json({ roomId: room.id });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
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
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

export default Controller;
