const express = require('express')
const { createTeam, addMembers, removeMembers } = require('../controllers/team')
const { isAuth } = require('../../isAuthenticated')
const router = express.Router()

router.post('/project/:projectId/teams',isAuth,createTeam)
router.post('/team/:teamId/newMember',isAuth,addMembers)
router.post('/team/:teamId/removeMember',isAuth,removeMembers)