const express = require('express')
const { createTask,updateTask,deleteTask, getByProjectId } = require('../controllers/tasks')
const { isAuth } = require('../../../shared/middlewares/auth');
const Task = require('../models/Task')
const router = express.Router()
const amqp = require('amqplib')

router.get('/projects/:pid/tasks',isAuth,getByProjectId)
router.post('/projects/:pid/tasks',isAuth,createTask)
router.patch('/projects/:pid/tasks',isAuth,updateTask) 
router.delete('/projects/:pid/tasks',isAuth,deleteTask)




module.exports = router