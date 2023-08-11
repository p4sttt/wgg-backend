import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';

import { tokenService, userService } from '~/services';
import { UserLoginData, UserRegisterData } from '~/types';

import { Controller } from './controller';

class AuthController extends Controller {
  async login(req: Request, res: Response) {
    try {
      this.handleValidationErrors(req, res);

      const { email, password } = req.body as UserLoginData;

      const user = await userService.findByEmail(email);

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
      this.handleException(res, error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      this.handleValidationErrors(req, res);

      const { email, password, username } = req.body as UserRegisterData;

      let user: User;
      try {
        user = await userService.create({
          email,
          password,
          username,
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
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
      this.handleException(res, error);
    }
  }
}

export const authController = new AuthController();
