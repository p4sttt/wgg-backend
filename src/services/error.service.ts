import { NumericRange } from 'types';

class HttpError extends Error {
  public readonly status: number;
  public readonly errors: Array<object> = [];

  constructor(
    status: NumericRange<400, 599>,
    message: string,
    errors: Array<object> = [],
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static BadRequest(
    message: string = 'Bad Request',
    errors: Array<object> = [],
  ) {
    return new HttpError(400, message, errors);
  }

  public static Unauthorized() {
    return new HttpError(401, 'Authorization is required');
  }

  public static Forbidden() {
    return new HttpError(403, 'Access not allowed');
  }

  public static InternalServerError() {
    return new HttpError(500, 'Something went wrong');
  }
}

export { HttpError };
