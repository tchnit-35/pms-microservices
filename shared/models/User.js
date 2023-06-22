const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
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

// UserSchema.pre('save', function(next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//       if (err) return next(err);

//       // hash the password using our new salt
//       bcrypt.hash(user.password, salt, function(err, hash) {
//           if (err) return next(err);
//           // override the cleartext password with the hashed one
//           user.password = hash;
//           next();
//       });
//   });
// });
   
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// };

UserSchema.virtual('display_name').get(function() {
  return this.firstname+" "+this.lastname;
});
module.exports = mongoose.model('User',UserSchema)
