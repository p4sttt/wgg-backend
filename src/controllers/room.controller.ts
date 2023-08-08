import { Request, Response } from 'express';
import { tokenService, userService } from 'services';
import { roomService } from 'services/room.service';

import { RequestWithToken } from '~/types';

class Controller {
  async createRoom(req: Request, res: Response) {
    try {
      const { name, lifetime, maxUsersCount } = req.body;
      const { authorization } = req.headers as RequestWithToken;

      const { id } = tokenService.decode(authorization);

      const user = await userService.findById(id);

      const room = await roomService.create({
        userId: user.id,
        name: name,
        lifetime: lifetime,
        maxUsersCount: maxUsersCount,
      });

      res.status(200).json({ roomId: room.id });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

export default Controller;
