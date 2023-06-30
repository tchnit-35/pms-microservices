const Task = require("../models/Task");
const UserTask = require('../models/UserTask')

const mongoose = require('mongoose')

function allocateTask(users,taskId){
  try{
    console.log(users)
    users.forEach(userToAdd=>{
    const newUserTask = new UserTask({
      userId:userToAdd,
      taskId
    })
    console.log(newUserTask)
    newUserTask.save()
  })}
  catch(err){
    if(err){
      console.log(`Task not Allocated\n ${err.message}`)
    }else{

    }
  }
}
function deallocateTask([],taskId){
  try{[].forEach(userToRemove=>{
    UserTask.findOneAndRemove({userId:userToRemove,taskId})
    })
  }
  catch(err){
    if(err){
      console.log(`Task not deallocated\n ${err.message}`)
    }else{

    }

  }
}

exports.createTask = async (req,res)=>{
  const projectId = req.params.pid
      const {name,startDate,endDate} = req.body
      const users = []
      if(req.body.users!=undefined)
      users.push(req.body.users)


      const newTask = new Task({
        name,
        startDate,
        endDate,
        projectId
      })
      newTask
      .save()
      .then(async () => {
      allocateTask(users,newTask._id)
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
  const id = req.params.taskId;
  const updateObject = req.body;
  const usersToAdd = req.body.usersToAdd
  const usersToRemove = req.body.usersToRemove
  //Allocate task to any user if needed
  allocateTask(usersToAdd,id)
  //Allocate task off any user if needed
  deallocateTask(usersToRemove,id)
  //Update other Info
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
  .then(async (Task) => {
    await UserTask.findOneAndRemove({taskId})
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

exports.getByUserId = async (req, res) => {
  const id = req.user._id;
  const allTasks = [];
  try {
    const allTaskRecords = await UserTask.find({ userId: id });
    for (const taskRecord of allTaskRecords) {
      const task = await Task.findById(taskRecord.taskId);
      allTasks.push(task);
    }
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
