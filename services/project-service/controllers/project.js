const Project = require("../models/Project");
const mongoose = require('mongoose');
const UserProject = require("../models/UserProject");
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);


exports.getFutureProjects = async (req, res) => {
  try {
    const futureProjects = [];
    const userProjects = await UserProject.find({ userId: req.user._id });
    for (const project of userProjects) {
      const futureProject = await Project.findOne({ 
        _id: project.projectId, 
        startDate: { $gt: Date.now() },
        endDate: { $gt: Date.now() } 
      }).select('project_title');
      if (futureProject) {
        futureProjects.push(futureProject);
      }
    }
    return res.status(200).send(futureProjects)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
}

exports.getCurrentProjects = async (req, res) => {
  try {
    const currentProjects = [];
    const userProjects = await UserProject.find({ userId: req.user._id });
    for (const project of userProjects) {
      const currentProject = await Project.findOne({ 
        startDate: { $lt: Date.now() },
        endDate: { $gt: Date.now() } 
      }).select('project_title');
      if (currentProject) {
        currentProjects.push(currentProject);
      }
    }
    return res.status(200).send(currentProjects)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
}

exports.getOldProjects = async (req, res) => { 
  try {
    const oldProjects = [];
    const userProjects = await UserProject.find({ userId: req.user._id });
    for (const project of userProjects) {
      const oldProject = await Project.findOne({ 
        _id: project.projectId, 
        endDate: { $lt: Date.now() } 
      }).select('project_title');
      if (oldProject) {
        oldProjects.push(oldProject);
      }
    }
    return res.status(200).send(oldProjects)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
}


exports.getSingleProject = async (req, res) => {
  const id = req.params.projectId;
  try {
    const singleProject = await Project.findById(id, { project_title: 1 });
    if (!singleProject) {
      return res.status(404).json({
        success: false,
        message: 'This project does not exist'
      });
    }
    return res.status(200).json({ singleProject });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      error: err.message
    });
  }
}; 

exports.findProject = async (req, res) => {
  const project_title = req.query.project_title;
  const condition = project_title ? { project_title: { $regex: new RegExp(project_title), $options: "i" } } : {};
  try {
    const projects = await UserProject.find({ userId: req.user._id });
    const data = projects.filter(condition);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occurred while retrieving projects."
    });
  }
};

exports.createProject = async (req,res)=>{
  const { project_title, startDate, endDate ,description} = req.body
  const project_master = req.user.username
  const userId = req.user._id
  if(await Project.findOne({project_title,project_master})){
    return res.status(200).json({message:'Project Already Exist'})
  }
  try {
    const project = new Project({ project_title,endDate,startDate,project_master,description })
    await project.save()
    const userProject = new UserProject({userId:userId,projectId:project._id,permission:'admin'})
    await userProject.save()
    const payload = {
      topic: 'project-create',
      messages: JSON.stringify(
        {
          topic:project.project_title,
          username:req.user.username,
        }
        ),
    };
    await producer.send([payload], function(err, data) {
      if (err) {
       res.status(400).json(err)
      } else {
        res.status(200).json({project:project,message:'Conversation Message sent ',data})
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
 
exports.updateProject = async (req, res)=> {
  const projectId = req.params.projectId;
  const updateObject = req.body;
  const project = await Project.findById(projectId)
  if(req.user.username !== project.project_master) return res.status(200).json({message:'You cannot edit this project'})
  await Project.updateOne({ _id:projectId }, { $set:updateObject })
    .exec()
    .then(async () => {
      const newProject = await Project.findById(projectId)
      const payload = {
        topic: 'project-update',
        messages: JSON.stringify(
          {
            oldTopic:project.project_title,
            newTopic:newProject.project_title,
            creator:req.user.username,
          }
          ),
      };
      producer.send([payload], function(err, data) {
        if (err) {
         console.log(err)
        } else {
          console.log({project:project,message:'Conversation Message sent ',data})
        }
      });
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
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId)
  if(req.user.username !== project.project_master) return res.status(200).json({message:'You cannot delete this project'})
    await UserProject.deleteMany({projectId})
    await Project.findByIdAndRemove(projectId)
    .then((project)=>{    
      const payload = {
      topic: 'project-deletion',
      messages: JSON.stringify({ projectId:project._id,project_title:project.project_title,createdBy:project.project_master }),
    };
    producer.send([payload], function(err, data) {
      if (err) {
        console.error('Error sending message:', err);
      } else {
        console.log('Delete Message sent:', data);
      }
    });
    return res.status(200).json({message:`Project ${project.project_title} has been deleted`});
  }
    )
    .catch((err)=>{
       return res.status(404).json('Project not found') 
  })
}

exports.inviteToProject = async (req,res)=>{
  const payload = {
    topic: 'project-invite',
    messages: JSON.stringify(
      { 
        projectId:req.params.projectId, 
        usernames:req.body.usernames,
        senderUsername:req.user.username,
        link:`http://localhost:3002/projects/${req.params.projectId}/join`
      }
      ),
  };
  producer.send([payload], function(err, data) {
    if (err) {
     res.status(400).json(err)
    } else {
      res.status(200).json({message:'Invite sent',data})
    }
  });
} 

exports.joinProject = async (req,res)=>{  
  const project = await Project.findOne({_id:req.params.projectId},)
  const userProject = new UserProject({userId:req.user._id,projectId:req.params.projectId,permission:'write'})
  await userProject.save()
  .then(()=>{
    const payload = {
      topic: 'join-project',
      messages: JSON.stringify(
        { 
          joinTopic:project.project_title, 
          joinCreatedBy:project.project_master,
          joinUsername:req.user.username
        }
        ),
    };
    producer.send([payload], function(err, data) {
      if (err) {
       console.log(err)
      } else {
        console.log({message:'',data})
      }
    });
    res.status(200).json({message:'Joint Successfully',data})
  })
  .catch((err)=>{
    res.status(400).json(err)
  })
}
