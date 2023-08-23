import type { NextFunction, Request, Response } from 'express';
import { HttpError } from 'services';

export const handleHttpErrors = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(error.status).json({
    timestamp: new Date(Date.now()).toLocaleString(),
    route: req.baseUrl + req.path,
    message: error.message,
    errors: error.errors,
  });
};
