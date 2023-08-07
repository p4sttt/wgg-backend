import { Router } from 'express';

import { AuthController } from '~/controllers';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);

export default router;
