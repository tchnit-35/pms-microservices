const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    team_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Team',
      required:true
    }
})

module.exports = mongoose.model('Role',roleSchema);