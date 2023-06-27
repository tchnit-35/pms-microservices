const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Conversation  Schema

const conversationSchema = new schema({
    state:{
        type:String,
        enum:['closed','active'],
        default:"active"
    },
    lastMessage:{
        messageId:String,
        time:Date
    },
    createdAt:{
      type:Date,
      default:Date.now()
    }
})
module.exports = mongoose.model('Conversation',conversationSchema);