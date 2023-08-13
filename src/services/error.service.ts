import { Request, Response } from 'express';

class ErrorObj {
  private message: string;
  private timestamp: string;
  private route: string;
  private errors: Array<object>;

  constructor({
    message,
    route,
    errors,
  }: {
    message: string;
    route: string;
    errors?: Array<object>;
  }) {
    this.message = message;
    this.route = route;
    this.timestamp = new Date(Date.now()).toLocaleString();
    this.errors = errors;
  }

  public toJson() {
    const json = {
      timestamp: this.timestamp,
      route: this.route,
      message: this.message,
    };

    this.errors.length ? (json['errors'] = this.errors) : null;

    return json;
  }
}

interface Options {
  message?: string;
  errors?: Array<object>;
}

class Error {
  public BadRequest(req: Request, res: Response, options?: Options) {
    const error = new ErrorObj({
      message: options?.message || 'Bas Request',
      route: req.baseUrl + req.route.path,
      errors: options?.errors,
    });

    return res.status(400).json(error.toJson());
  }

  public Forbidden(req: Request, res: Response, options?: Options) {
    const error = new ErrorObj({
      message: options?.message || 'Access is not allowed',
      route: req.baseUrl + req.route.path,
    });

    return res.status(401).json(error.toJson());
  }

  public Unauthorized(req: Request, res: Response, options?: Options) {
    const error = new ErrorObj({
      message: options?.message || 'Authorization is required',
      route: req.baseUrl + req.route.path,
    });

    return res.status(403).json(error);
  }

  public InternalServerError(req: Request, res: Response) {
    const error = new ErrorObj({
      message: 'Something went wrong',
      route: req.baseUrl + req.route.path,
    });

    return res.status(500).json(error);
  }
}

export const errorService = new Error();
