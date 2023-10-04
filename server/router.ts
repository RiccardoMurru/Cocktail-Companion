import express from 'express';
import { authMiddleware } from './middleware/auth';
import * as userController from './controllers/userController';
import * as cocktailsController from './controllers/cocktailsController';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/user-profile', authMiddleware, userController.getUser);
router.put('/add-fave', authMiddleware, userController.addFavourite);
router.put('/remove-fave', authMiddleware, userController.removeFavourite);

router.get('/cocktails', cocktailsController.getCocktails);

router.get('/most-liked-drinks', userController.getMostLikedDrinks)
export default router;
