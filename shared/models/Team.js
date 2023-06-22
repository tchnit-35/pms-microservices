const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name:{
        type: String
    },
    users:[{
      user_id:String,
      role:['Head',"Regular"]
    }],
    industry:{
        type: String, 
        default:""
    },
    website:{
        type: String, 
        default:""
    },
    date_time:{
        type: Date, default: Date.now 
    }
    
})

module.exports = mongoose.model('Team',teamSchema);