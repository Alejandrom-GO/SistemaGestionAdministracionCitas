import { checkRole } from './../middlewares/rol';
import { checkJwt } from './../middlewares/jwt';

import { Router } from 'express';
import AuthController from '../controller/AuthController';
import DatesController from '../controller/DatesController';

const router = Router();

// login
router.post('/login', AuthController.login);

export default router;
