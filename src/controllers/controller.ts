import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorService } from '~/services';

class Controller {
  handleValidationErrors(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return errorService.BadRequest(req, res);
    }
  }

  handleException(req: Request, res: Response, error) {
    console.error(error);

    return errorService.InternalServerError(req, res);
  }
}

export { Controller };
