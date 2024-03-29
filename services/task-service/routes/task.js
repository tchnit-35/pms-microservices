const express = require('express')
const { createTask,createSubTask,updateTask,deleteTask, getByProjectId, getByUserId, getTask, getRecentTask, completeTasks, approveTasks } = require('../controllers/tasks')
const { isAuth } = require('../../isAuthenticated'); 
const router = express.Router()
const Task = require('../models/Task');
const kafka = require('kafka-node');

router.get('/tasks',isAuth,getByUserId)
router.get('/projects/:projectId',isAuth,getByProjectId)
router.post('/projects/:projectId',isAuth,createTask)
router.get('/tasks/recent',isAuth,getRecentTask)
router.get('/tasks/:taskId',isAuth,getTask)
router.post('/tasks/:taskId',isAuth,createSubTask)
router.patch('/tasks/:taskId',isAuth,updateTask)
router.delete('/tasks/:taskId',isAuth,deleteTask)
router.put('/tasks/:taskId/complete',completeTasks) 
router.put('/tasks/:taskId/approve',isAuth,approveTasks) 
// Task deletion (consumer)
const consumer = new kafka.ConsumerGroup({
  kafkaHost: 'localhost:9092',
  groupId: 'task-deletion-group',
}, ['project-deletion']); 

consumer.on('message', async function(message) {
  const { projectId } = JSON.parse(message.value);
  try {
    await Task.deleteMany({ 'project.projectId': projectId });
    console.log('Tasks associated with project deleted:', projectId);
  } catch (err) {
    console.error('Error deleting tasks associated with project:', err);
  }
});

module.exports = router