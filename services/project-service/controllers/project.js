const Project = require("../models/Project");
const mongoose = require('mongoose');
const amqp = require('amqplib');
const UserProject = require("../models/UserProject");


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
  const { project_title, startDate, endDate } = req.body
  const user = req.user._id
  try {
    const project = new Project({ project_title,endDate,startDate })
    const userProject = new UserProject({user,projectId,permission:'admin'})
    await project.save();
    await userProject.save()
    res.send(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};



exports.updateProject = async (req, res)=> {
  const id = req.params.projectId;
  const updateObject = req.body;
  await Project.updateOne({ _id:id }, { $set:updateObject })
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
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Publish message to RabbitMQ indicating project has been deleted
    const event = {
      action: 'delete',
      projectId
    };
    await publishEvent(event);

    res.send(`Project ${project.name} has been deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

