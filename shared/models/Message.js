const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Conversation'
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Conversation'
    },
    message:{
        type:String
    },
    dateTime:{
        type: Date, default: Date.now 
    }
})

module.exports = mongoose.model('Message',messageSchema);
