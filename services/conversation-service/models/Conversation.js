const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Conversation  Schema

const conversationSchema = new schema({
    topic:{
        type:String,
    },
    state:{
        type:String,
        enum:['inactive','active'],
        default:"inactive"
    },
    lastMessage:{
        messageId:String,
        time:Date
    },
    createdBy:{
        type:String
    },
    createdAt:{
      type:Date,
      default:Date.now()
    },
    type:{
        type:String,
        enum:['public','private'],
        default:'private'
    }
})
module.exports = mongoose.model('Conversation',conversationSchema);