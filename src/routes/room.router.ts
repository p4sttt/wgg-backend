import { Router } from 'express';
import { body } from 'express-validator';

import { roomController } from '~/controllers';
import { requireAuth } from '~/middlewares';

const router = Router();

router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isLength({ max: 50 })
      .withMessage('name max length is 50 symbols'),
    body('maxUsersCount')
      .notEmpty()
      .withMessage('max users count is required')
      .isNumeric()
      .withMessage('max users count mast be number')
      .isInt({ min: 2, max: 20 })
      .withMessage('max users count mast be between 2 and 20'),
    body('lifetime')
      .notEmpty()
      .withMessage('lifetime is required')
      .isIn(['1', '3', '7', 'inf'])
      .withMessage('lifetime must be 1, 3, 7 or inf'),
  ],
  roomController.createRoom,
);
router.get('/', requireAuth, roomController.getUserRooms);
router.post(
  '/join',
  [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('username must be between 2 and 20'),
    body('roomId')
      .notEmpty()
      .withMessage('roomId is required')
      .isLength({ max: 30 }),
  ],
  roomController.joinRoom,
);

export default router;
