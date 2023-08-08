import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

import { UserRegisterData } from '~/types';

const userClient = new PrismaClient().user;

class UserService {
  async create(data: UserRegisterData) {
    const { email, password, username } = data;

    const existUser = await userClient.findFirst({ where: { email: email } });

    if (existUser) {
      throw new Error('user with this email already exists');
    }

    const passwordHash = hashSync(password, 5);

    const user = await userClient.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
      },
    });

    return user;
  }
  async findById(id: string) {
    const user = await userClient.findFirst({ where: { id: id } });

    return user;
  }
  async findByEmail(email: string) {
    const user = await userClient.findFirst({ where: { id: email } });

    return user;
  }
}

export const userService = new UserService();
