const Task = require("../models/Task");

const mongoose = require('mongoose')

exports.createTask = async (req,res)=>{
  const projectId = req.params.pid
      const {name,startDate,endDate} = req.body
      const newTask = new Task({
        name,
        startDate,
        endDate,
        projectId
      })
      newTask
      .save()
      .then(() => {
      return res.status(200).json({
          success: true,
          message: 'Task is created',
          CreatedTask: newTask,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error:err.message
        });
      });
    }


exports.updateTask = async (req, res)=> {
  const id = req.query.taskId;
  const updateObject = req.body;
  await Task.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Task is updated',
        updateProject: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

exports.deleteTask = async (req,res)=>{
  const id = req.query.taskId
  await Task.findByIdAndRemove(id)
  .exec()
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'Task is deleted',
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  });
}

exports.getByProjectId = async(req,res)=>{
  const id = req.params.pid
  await Task.find({projectId :id})
  .then((allTasks) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all tasks',
      Cause: allTasks,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
}

exports.getByUserId = async(req,res)=>{
  const id = req.user._id
  await Task.find({userId :id})
  .then((allTasks) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all tasks',
      Cause: allTasks,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  });
}