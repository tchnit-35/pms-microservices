const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Conversation  Schema

const conversationSchema = new schema({
    firstUser:{
        user_id:String
    },
    secondUser:{
        user_id:String
    },
    state:{
        type:String,
        default:"active"
    },
    lastMessage:{
        type:String,
        default:""
    },
    dateTime:{
        type: Date, default: Date.now 
    }
})
module.exports = mongoose.model('Conversation',conversationSchema);