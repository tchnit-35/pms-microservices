const mongoose = require('mongoose');

const userProjectSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    default: 'admin'
  }
});

const UserProject = mongoose.model('UserProject', userProjectSchema);

module.exports = UserProject;