const Task = require("../models/Task");
const mongoose = require('mongoose')

exports.createTask = async (req,res)=>{
  const {name,startDate,endDate} = req.body
  const {projectId} = req.query.pid
  const newTask = new Task({
    name,
    projectId,
    startDate,
    endDate
  })
  return newTask
  .save()
  .then((newTask) => {
    return res.status(201).json({
      success: true,
      message: 'New task created successfully',
      Project: newTask,
    });
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });

}