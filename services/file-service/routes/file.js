const express = require('express')
const router = express.Router()
const {isAuth} = require('../../isAuthenticated')

router.get('projects/:projectId/files',isAuth)
router.post('projects/:projectId/files',isAuth)

module.exports = router