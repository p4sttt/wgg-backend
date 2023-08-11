import { NextFunction, Request, Response } from 'express';
import { tokenService, userService } from 'services';

import { errorService } from '~/services';

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
      return errorService.Unauthorized(req, res);
    }

    next();
  } catch (error) {
    console.error(error.message);

    return errorService.Unauthorized(req, res);
  }
};
