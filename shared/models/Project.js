const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  project_title:{
    type:String,
    required:true
  },
  description:{
    type:String
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
  projectMasterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})
module.exports = mongoose.model('Project',ProjectSchema)
