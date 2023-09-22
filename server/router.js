const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/user-profile', controller.getUser)
router.post('/add-user', controller.addUser)
router.put('/newfave', controller.addFavourite)
router.put('/remove-fave', controller.removeFavourite)



module.exports = router