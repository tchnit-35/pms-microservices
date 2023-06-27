const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userConversationSchema = new schema({
  username:{
    type:String
  },
  conversationId:{
    type:String
  },
  joinedAt:{
    type:Date,
    default:Date.now()
  },
  leavedAt:{
    type:Date
  }
})
module.exports = mongoose.model('UserConversation',userConversationSchema);