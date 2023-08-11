import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class Controller {
  handleValidationErrors(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationErrors.array(),
      });
    }
  }

  handleException(res: Response, error) {
    console.error(error);

    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}

export { Controller };
