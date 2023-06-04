const mongoose = require('mongoose')
const ProjectSchema = new mongoose.Schema({

  project_title:{
    type:String,
    required:true
  },
 startDate:{
    type:Date,
    default:Date.now,
    required:true
  },
  endDate:{
    type:Date,
    default:Date.now,
    required:true
  },
  tasks:[{
    task_id:String,
  }],
  teams:[{
    team_id:String,
  }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Project',ProjectSchema)
