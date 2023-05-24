const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  user_id:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  acc_password:{
    type:String,
    required:true
  },
  display_name:{
    type:String,
    required:true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('User',UserSchema)
