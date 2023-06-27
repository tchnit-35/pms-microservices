const express = require('express')
const { createTask,updateTask,deleteTask, getByProjectId, getByUserId } = require('../controllers/tasks')
const { isAuth } = require('../../isAuthenticated');
const router = express.Router()

router.get('/user/tasks',isAuth,getByUserId)
router.get('/projects/:pid/tasks',isAuth,getByProjectId)
router.post('/projects/:pid/tasks',isAuth,createTask)
router.patch('/task/:taskId',isAuth,updateTask) 
router.delete('/task/:taskId',isAuth,deleteTask)

module.exports = router