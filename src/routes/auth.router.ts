import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from 'middlewares';

import { authController } from '~/controllers';

const router = Router();

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isLength({ max: 20 })
      .withMessage('email max length is 20 symbols')
      .isEmail()
      .withMessage('incorrect email'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ max: 50 })
      .withMessage('password max length is 50 symbols'),
  ],
  handleValidationErrors,
  authController.login,
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
  handleValidationErrors,
  authController.register,
);

export default router;
