const express = require("express")
const { isAuth } = require('../../isAuthenticated')
const { createConversation, joinConversation, getUserConversations,leaveConversation,inviteConversation } = require("../controllers/conversation")
const router = express.Router()


router.get('/',isAuth,getUserConversations)
router.post('/',isAuth,createConversation)
router.get('/:convoId/join',isAuth,joinConversation)
router.post('/:convoId/invite',isAuth,inviteConversation)
router.get('/:convoId/leave',isAuth,leaveConversation)




module.exports = router