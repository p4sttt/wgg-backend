import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { createToken } from '~/helpers';
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

      const token = createToken<{ userId: string }>({ userId: user.id });

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

      const existUser = await userClient.findFirst({ where: { email: email } });

      if (existUser) {
        return res
          .status(400)
          .json({ message: 'A user with such an email already exists' });
      }

      const passwordHash = hashSync(password, 5);

      const user = await userClient.create({
        data: {
          username: username,
          email: email,
          password: passwordHash,
        },
      });

      const token = createToken<{ userId: string }>({ userId: user.id });

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
