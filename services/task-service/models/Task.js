const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({

  name:{
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
  
  project:{
    project_id:String,
  },
  users:[{
    user_id:String,
  }],
  description:{
    type:String,
    default:""
  },
  toBeApproved:{
    type:Boolean,
    default:false
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Task',TaskSchema)