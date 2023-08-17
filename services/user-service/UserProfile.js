const mongoose = require('mongoose')
const UserProfileSchema = new mongoose.Schema({
  userId:String,
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{ 
    type:String,
    required:true
  },  
  profilePicture: {
    fileName: String,
    fileType: String,
    fileSize: Number,
    filePath: String,
    uploadDate: Date
  },
  contactInformation:{
    address:{
    country:String,
    city:String,
    street:String,
   
    }, 
    phoneNumber:String
  },
  Gender:{
    type:String,
    enum:["Male","Female"]
  },
  birthDate:{
    type:Date
  },
  interests:{
    type:String
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  
})


UserProfileSchema.virtual('display_name').get(function() {
  return this.firstname+" "+this.lastname;
});
module.exports = mongoose.model('UserProfile',UserProfileSchema)
