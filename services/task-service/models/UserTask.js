const mongoose = require('mongoose')

const userTaskSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  username:{
    type:String,
    require:true
  },
  taskId:{
    type:String,
    required:true
  },
  lastViewed:{
    type:Date
  }
})

module.exports = mongoose.model('UserTask',userTaskSchema)