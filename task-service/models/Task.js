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
  projectId:{
    type:mongoose.Schema.Types.ObjectId, ref: 'Project',
    required:true
  },
  users:[{
    type:mongoose.Schema.Types.ObjectId, ref: 'User',
    required:false
  }],
  description:{
    type:String,
    default:""
  },
  toBeApproved:{
    type:Boolean,
    default:true
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