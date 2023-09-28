import express from 'express';
const controller = require('./controller')
const router = express.Router()

router.post('/user-profile', controller.getUser)
router.post('/add-user', controller.addUser)
router.put('/addfave', controller.addFavourite)
router.put('/remove-fave', controller.removeFavourite)



export default router;