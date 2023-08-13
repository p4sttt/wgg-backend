import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorService } from '~/services';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return errorService.BadRequest(req, res, {
      message: 'Invalid values, validation error',
      errors: validationErrors.array(),
    });
  }

  next();
};
