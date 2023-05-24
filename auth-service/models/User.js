const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique: true
  },
  acc_password:{
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
  tokens: [{ type: Object }],
})
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

UserSchema.virtual('display_name').get(function() {
  return this.firstname+" "+this.lastname;
});
module.exports = mongoose.model('User',UserSchema)
