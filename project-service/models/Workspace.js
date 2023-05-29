const mongoose = require('mongoose')
const WorkspaceSchema = new mongoose.Schema({
  master_id:{
    user_id:String,
    required:true
  },
 display_name:{
    type:String,
    required:true
  },
  users:[{
    user_id:String,
    required:false,
  }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Workspace',WorkspaceSchema)
