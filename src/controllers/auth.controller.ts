import { Request, Response } from 'express';

class Controller {
  login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      return res.status(200).json({
        token: 'sometoken',
        user: {
          username: 'username',
          email: 'email',
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}

export default Controller;
