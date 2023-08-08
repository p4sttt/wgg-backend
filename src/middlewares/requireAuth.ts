import { NextFunction, Request, Response } from 'express';
import { tokenService, userService } from 'services';

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
      res.status(403).json({
        message: 'Access is not allowed',
      });
    }

    next();
  } catch (error) {
    res.status(403).json({
      message: 'Access is not allowed',
    });
  }
};
