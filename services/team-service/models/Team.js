const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name:{
        type: String
    },
    users:[{
      type:String,
      role:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Role'
      },
      default:[],
      required:true
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