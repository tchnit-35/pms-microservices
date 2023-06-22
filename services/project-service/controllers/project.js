const Project = require("../../../shared/models/Project");
const mongoose = require('mongoose');
const Task = require("../../../shared/models/Task");


exports.getFutureProjects = async (req,res)=>{
  await Project.find({startDate:{$gt:Date.now()}})
  .select('project_title')
  .then((allProjects) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all projects',
      Cause: allProjects,
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

exports.getCurrentProjects = async (req,res)=>{
  await Project.find({endDate:{$gt:Date.now()}})
  .select('project_title')
  .then((allProjects) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all projects',
      Cause: allProjects,
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

exports.getOldProjects = async (req,res)=>{
  await Project.find({endDate:{$ls:Date.now()}})
  .select('project_title')
  .then((allProjects) => {
    return res.status(200).json({
      success: true,
      message: 'A list of all projects',
      project: allProjects,
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

exports.getSingleProject = async (req,res) =>{

    const id = req.params.projectId;
    await Project.findById(id)
      .then((singleProject) => {
        res.status(200).json({
          success: true,
          message: `More on ${singleProject.project_title}`,
          Cause: singleProject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'This cause does not exist',
          error: err.message,
        });
     });
  
}

exports.findProject = (req, res) => {
  const project_title = req.query.project_title;
  var condition = project_title ? { project_title: { $regex: new RegExp(project_title), $options: "i" } } : {};

  Project.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.createProject = async (req,res)=>{
  const {project_title,startDate,endDate} = req.body
  
  //Check if project already exists
  const projectExists = await Project.findOne({project_title});

  if(projectExists){
    return res.status(400).json({
      success:false,
      message:'Project Already Existing'
    })
  }

  const newProject = new Project({
    project_title,
    startDate,
    endDate
  })
  return newProject
  .save()
  .then((newProject) => {
    return res.status(201).json({
      success: true,
      message: 'New project created successfully',
      Project: newProject,
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

exports.updateProject = async (req, res)=> {
  const id = req.params.projectId;
  const updateObject = req.body;
  await Project.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Project is updated',
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

exports.deleteProject = async (req,res)=>{
  const id = req.params.projectId
  await Project.findByIdAndRemove(id)
  .exec()
  .then(async ()=>{
    await Task.deleteMany({projectId:id})
  })
  .then(() => {
    res.status(200).json({
      success: true,
      message: 'Project is deleted',
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  });
}