const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserProfileSchema = new mongoose.Schema({
  userID:{
    user_id:String,
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
  address:{
    country:String,
    city:String,
    street:String,
    phoneNumber:String
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  tokens: [{ type: Object }],
})



UserSchema.virtual('display_name').get(function() {
  return this.firstname+" "+this.lastname;
});
module.exports = mongoose.model('User',UserProfileSchema)
