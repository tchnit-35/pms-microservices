const router = require('express').Router()
const {isAuth} = require('../../isAuthenticated')
const { sendMessage, getMessages } = require('../controllers/messages')

router.get('/conversation/:convoId',isAuth,getMessages)
router.post('/conversation/:convoId',isAuth,sendMessage)

module.exports = router