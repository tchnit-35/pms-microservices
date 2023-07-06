const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  target:{
    String: String
  }
});
module.exports = mongoose.model('Notification',notificationSchema)