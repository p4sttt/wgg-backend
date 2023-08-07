import { Router } from 'express';
import { body } from 'express-validator';

import { AuthController } from '~/controllers';

const router = Router();
const controller = new AuthController();

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isLength({ max: 20 })
      .withMessage('email max length is 30 symbols')
      .isEmail()
      .withMessage('incorrect email'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ max: 50 })
      .withMessage('password max length is 30 symbols'),
  ],
  controller.login,
);
router.post(
  '/register',
  [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isLength({ max: 20 })
      .withMessage('email max length is 30 symbols')
      .isEmail()
      .withMessage('incorrect email'),
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .isLength({ max: 20 })
      .withMessage('username max length is 30 symbols'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ max: 50 })
      .withMessage('password max length is 30 symbols'),
  ],
  controller.register,
);

export default router;
