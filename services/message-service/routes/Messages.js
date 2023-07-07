const router = require('express').Router()
const {isAuth} = require('../../isAuthenticated')
const { sendMessage, getMessages } = require('../controllers/messages')

router.get('/conversations/:convoId',isAuth,getMessages)
router.post('/conversations/:convoId',isAuth,sendMessage)

module.exports = router