import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpError } from '~/services';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    next(HttpError.BadRequest('Validation error', validationErrors.array()));
  }

  next();
};
