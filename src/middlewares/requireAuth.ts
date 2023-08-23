import { NextFunction, Request, Response } from 'express';
import { tokenService, userService } from 'services';

import { HttpError } from '~/services';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    const { id } = tokenService.verify(authorization as string);
    const user = userService.findById(id);
    if (!user) {
      throw HttpError.Unauthorized();
    }

    next();
  } catch (error) {
    console.error(error.message);

    throw HttpError.Unauthorized();
  }
};
