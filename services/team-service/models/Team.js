const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name:{
        type: String
    },
    users:[{
      userId:String,
      role:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Role'
      },
      default:[]
    }],
    projectId:{
        type:String,
        required:true
    },

    created_at:{
        type: Date, default: Date.now 
    }
    
})

module.exports = mongoose.model('Team',teamSchema);