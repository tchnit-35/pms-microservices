const UserProject = require('./project-service/models/UserProject')
const Task = require('./task-service/models/Task')
const Team = require('./team-service/models/Team')

function getProjectIdFromTaskId(taskId){
  Task.findById(taskId)
  .then((Task)=>{
    return Task.projectId
  })
}
function getProjectIdFromTeamId(taskId){
  Team.findById(teamId)
  .then((Team)=>{
    return Team.projectId
  })
}
exports.isAdmin = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  await UserProject.findOne({user:req.user._id,projectId:projectId})
  .then((userProject)=>{
    if (userProject.permission==='admin'){
      next()
    }else{
      res.status(403).json({message:'Forbidden'})
    }
  })
}
exports.isLevel3 = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  await UserProject.findOne({user:req.user._id,projectId:projectId})
  .then((userProject)=>{
    if (userProject.permission==='write'){
      next()
    }else{
      res.status(403).json({message:'Forbidden'})
    }
  })
}

exports.isLevel2 = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  await UserProject.findOne({user:req.user._id,projectId:projectId})
  .then((userProject)=>{
    if (userProject.permission==='read'){
      next()
    }else{
      res.status(403).json({message:'Forbidden'})
    }
  })
}