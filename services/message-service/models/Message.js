const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversationId:{
        type:String
    },
    senderUsername:{
        type:String
    },
    message:{
        type:String
    },
    sentAt:{
        type: Date, default: Date.now 
    },
    mention:[{
        username:String
    }]
})

module.exports = mongoose.model('Message',messageSchema);
