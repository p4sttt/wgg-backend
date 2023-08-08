import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { tokenService, userService } from '~/services';
import { UserLoginData, UserRegisterData } from '~/types';

const userClient = new PrismaClient().user;

class Controller {
  async login(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors);
      }

      const { email, password } = req.body as UserLoginData;

      const user = await userClient.findFirst({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({
          message: 'Authorization failed, check your email or password',
        });
      }

      const isEqualPassword = compareSync(password, user.password);

      if (!isEqualPassword) {
        return res.status(400).json({
          message: 'Authorization failed, check your email or password',
        });
      }

      const token = tokenService.createAuthToken(user.id);

      return res.status(200).json({
        token: token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors);
      }

      const { email, password, username } = req.body as UserRegisterData;

      const user = await userService.create({
        email,
        password,
        username,
      });

      const token = tokenService.createAuthToken(user.id);

      return res.status(200).json({
        token: token,
        user: {
          username: user.username,
          email: user.email,
        },
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
