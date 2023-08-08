import { Request, Response } from 'express';
import { tokenService, userService } from 'services';

import { RequestWithToken, RoomCreateData } from '~/types';

class Controller {
  async createRoom(req: Request, res: Response) {
    try {
      const { name, lifetime, maxUsersCount } = req.body as RoomCreateData;
      const { authorization } = req.headers as RequestWithToken;

      const { id } = tokenService.decode(authorization);

      const user = userService.findById(id);
      console.log('user', user);
      console.log(name, lifetime, maxUsersCount);

      res.status(200).json({ message: 'successnpx eslint' });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

export default Controller;
