import { Router } from 'express';
import { body } from 'express-validator';

import { RoomController } from '~/controllers';
import { requireAuth } from '~/middlewares';

const router = Router();
const controller = new RoomController();

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
  controller.createRoom,
);
router.get('/', requireAuth, controller.getUserRooms);

export default router;
