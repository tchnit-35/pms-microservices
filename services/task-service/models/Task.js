const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
    projectId:String,  
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
  duration:{
    type:Number,
  },
  percentComplete:{
    type:Number,
  },
  description:{
    type:String, 
    default:""
  },
  depedencies:[{
      taskId:String
    }],
  
  toBeApproved:{
    type:Boolean,
    default:false
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  priority:{
    type:String,
    enum:['high','moderate','low'],
    default:'high'
  },
  status:{
    type:String,
    enum:['In-Progress','On Hold','Completed'],
    default:'In-Progress'
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  masterTaskId:{
    type:String
  }
})

module.exports = mongoose.model("Task",TaskSchema)