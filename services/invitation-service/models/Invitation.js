const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  senderUsername: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;