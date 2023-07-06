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
function deallocateTask(users,taskId){
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

exports.createSubTask = async(req,res)=>{
  const masterTaskId = req.params.taskId
  const {name,startDate,endDate} = req.body
  const master =  await Task.findById(masterTaskId)
  const users = req.body.users
  
  console.log(users)
  const newTask = new Task({
    name,
    startDate,
    endDate,
    projectId:master.projectId,
    masterTaskId
  })
  newTask
  .save()
  .then(async () => {
    if(users!=undefined)
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

exports.createTask = async (req,res)=>{
  const projectId = req.params.projectId
      const {name,startDate,endDate} = req.body
      const users = req.body.users
      const newTask = new Task({
        name,
        startDate,
        endDate,
        projectId
      })
      newTask
      .save()
      .then(async () => {
        if(users!=undefined)
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
exports.getTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Task.findById(taskId);
  const userTask = await UserTask.findOne({ taskId, userId: req.user._id });

  if (userTask) {
    userTask.lastViewed = Date.now();
    await userTask.save();
  }

  const startDate = task.startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return res.status(200).json({ ...task.toObject(), startDate });
};

exports.getRecentTask = async (req, res) => {
  const recentTasks = await UserTask.find({ userId: req.user._id })
    .sort({ lastViewed: "desc" })
    .limit(3);

  // Get an array of task IDs from the recentTasks array
  const taskIds = recentTasks.map(({ taskId }) => taskId);

  // Get an array of tasks with their names and project IDs
  const tasks = await Task.find({ _id: { $in: taskIds } }, { name: 1, projectId: 1, createdAt: 1 });

  // Map the tasks array to include the lastViewed date for each task
  const tasksWithLastViewed = tasks.map((task) => {
    const recentTask = recentTasks.find(({ taskId }) => taskId.match(task._id));

    if (recentTask.lastViewed == undefined) {
      const lastViewed = new Date(recentTask.lastViewed);
      return { ...task._doc, lastViewed: lastViewed.toLocaleString("default", { month: "short", day: "numeric" }) };
    } else {
      const createdAt = new Date(task.createdAt);
      return { ...task._doc, lastViewed: createdAt.toLocaleString("default", { month: "short", day: "numeric" }) };
    }
  });

  return res.status(200).json({ tasksWithLastViewed });
};

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

exports.getByProjectId = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Fetch all the master tasks for the project
    const masterTasks = await Task.find({ projectId: projectId, masterTaskId: null });

    // Fetch all the subtasks for each master task and group them under their respective master task
    const tasks = await Promise.all(
      masterTasks.map(async (masterTask) => {
        const subTasks = await Task.find({ projectId: projectId, masterTaskId: masterTask._id });
        const userTasks = await UserTask.find({ taskId: masterTask._id}||{taskId: subTask._id} ,{username:1});
        const assignedTo = userTasks.filter(user => user != null).map(user => user.username); // extract username property and return as an array of strings
        

        // Format the startDate and endDate fields
        const options = { month: 'short', day: 'numeric' };
        const startDate = new Date(masterTask.startDate).toLocaleString('en-US', options);
        const endDate = new Date(masterTask.endDate).toLocaleString('en-US', options);

        return { ...masterTask._doc, subTasks, assignedTo, startDate, endDate };
      })
    );

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};

exports.getByUserId = async (req, res) => {
  const id = req.user._id;
  const allTasks = [];
  try {
    const allTaskRecords = await UserTask.find({ userId: id });
    for (const taskRecord of allTaskRecords) {
      const task = await Task.findById(taskRecord.taskId);
      const startDate = task.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      allTasks.push({ ...task.toObject(), startDate });
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

exports.completeTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    await Task.findByIdAndUpdate(req.params.taskId, { $set: { isCompleted:(!task.isCompleted) } }).exec()
    res.status(200).json('Task updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).json('Error updating task');
  }
}