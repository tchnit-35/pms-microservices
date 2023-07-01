const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  fileName:{
    type:String
  },
  fileSize:{
    type:Number
  },
  fileType:{
    type:String
  },
  filePath:{
    type:String
  },
  projectId:{
    type:String,
    required:true
  },
  Author:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true,
  },
  access:{
    type:[String],
    required:true,
    default:[]
  },
  description:{
    type:String,
  },
  uploadDate:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model("File",fileSchema)