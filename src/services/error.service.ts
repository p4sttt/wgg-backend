import { Request, Response } from 'express';

class ErrorObj {
  private message: string;
  private timestamp: string;
  private route: string;

  constructor(message: string, route: string) {
    this.message = message;
    this.route = route;
    this.timestamp = new Date(Date.now()).toLocaleString();
  }

  public toJson() {
    return {
      timestamp: this.timestamp,
      route: this.route,
      message: this.message,
    };
  }
}

class Error {
  public BadRequest(
    req: Request,
    res: Response,
    message: string = 'Bad Request',
  ) {
    const error = new ErrorObj(message, req.baseUrl);

    return res.status(400).json(error.toJson());
  }

  public Forbidden(
    req: Request,
    res: Response,
    message: string = 'Access is not allowed',
  ) {
    const error = new ErrorObj(message, req.baseUrl);

    return res.status(401).json(error.toJson());
  }

  public Unauthorized(
    req: Request,
    res: Response,
    message: string = 'Authorization is required',
  ) {
    const error = new ErrorObj(message, req.baseUrl);

    return res.status(403).json(error);
  }

  public InternalServerError(req: Request, res: Response) {
    const error = new ErrorObj('Something went wrong', req.baseUrl);

    return res.status(500).json(error);
  }
}

export const errorService = new Error();
