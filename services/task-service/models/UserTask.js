const mongoose = require('mongoose')

const userTaskSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  taskId:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('UserTask',userTaskSchema)