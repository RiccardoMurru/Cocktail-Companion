import express from 'express';
import { authMiddleware } from './middleware/auth';
import * as controller from './controller';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);

router.get('/user-profile', authMiddleware, controller.getUser);
router.put('/add-fave', authMiddleware, controller.addFavourite);
router.put('/remove-fave', authMiddleware, controller.removeFavourite);

export default router;
