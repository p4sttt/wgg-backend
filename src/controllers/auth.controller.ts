import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { HttpError, tokenService, userService } from '~/services';
import { UserLoginData, UserRegisterData } from '~/types';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as UserLoginData;

      const user = await userService.findByEmail(email);

      if (!user) {
        throw HttpError.BadRequest(
          'Authorization failed, check your email or password',
        );
      }

      const isEqualPassword = compareSync(password, user.password);

      if (!isEqualPassword) {
        throw HttpError.BadRequest(
          'Authorization error, check your username or password',
        );
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
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body as UserRegisterData;

      let user: User;
      try {
        user = await userService.create({
          email,
          password,
          username,
        });
      } catch (error) {
        throw HttpError.BadRequest(error.message);
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
      next(error);
    }
  }
}

export const authController = new AuthController();
