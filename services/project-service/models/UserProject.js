const mongoose = require('mongoose');

const userProjectSchema = new mongoose.Schema({
  user: {
    type:String,
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  permission: {
    type: String,
    enum: ['read', 'write', 'admin'],
    default: 'read'
  }
});

const UserProject = mongoose.model('UserProject', userProjectSchema);

module.exports = UserProject;