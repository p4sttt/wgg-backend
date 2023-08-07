import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;

export const createToken = <T extends string | object | Buffer>(data: T) => {
  const token = jwt.sign(data, privateKey, {expiresIn: '7d'});

  return token;
};
