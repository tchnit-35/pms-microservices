const mongoose = require('mongoose')
const User = require('./User')

const workspaceSchema = new mongoose.Schema({
  workspace_id:{
    type:String,
    required:true
  },
  workspace_master:{
    type:User,
    required:true  
  },
  display_name:{
    type:String,
    required:true
  },
  created_at: {
    type: Date, 
    default: Date.now(),
  },
})
module.exports = mongoose.model('Workspace',workspaceSchema)                                                                        
