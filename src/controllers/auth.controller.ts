import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { tokenService, userService } from '~/services';
import { UserLoginData, UserRegisterData } from '~/types';

class Controller {
  async login(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation error',
          errors: validationErrors.array(),
        });
      }

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
        return res.status(400).json({
          message: 'Validation error',
          errors: validationErrors.array(),
        });
      }

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
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

export default Controller;
