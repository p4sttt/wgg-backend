import jwt from 'jsonwebtoken';

import { AuthTokenPayload } from '~/types';

const privateKey = process.env.PRIVATE_KEY;

class TokenService {
  createAuthToken(id: string) {
    const token = jwt.sign(
      {
        id,
      },
      privateKey,
      { expiresIn: '7d' },
    );

    return token;
  }

  decode(token: string) {
    const payload = jwt.decode(token);

    return payload as AuthTokenPayload;
  }

  verify(token: string) {
    const payload = jwt.verify(token, privateKey);

    return payload as AuthTokenPayload;
  }
}

export const tokenService = new TokenService();
