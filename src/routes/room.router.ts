import { Router } from 'express';
import { body } from 'express-validator';

import { RoomController } from '~/controllers';

const router = Router();
const controller = new RoomController();

router.post(
  '/room',
  [
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isLength({ max: 20 })
      .withMessage('name max length is 20 symbols')
      .isEmail(),
    body('maxUsersCount')
      .notEmpty()
      .withMessage('max users count is required')
      .isNumeric()
      .withMessage('max users count mast be number')
      .isInt()
      .withMessage('max users count mast be integer'),
  ],
  controller.createRoom,
);

export default router;
