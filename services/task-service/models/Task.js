/** @format */

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: String,
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  duration: {
    type: Number,
  },
  percentComplete: {
    type: Number,
  },
  description: {
    type: String,
    default: '',
  },
  depedencies: [
    {
      taskId: String,
    },
  ],
  toBeApproved: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'high',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  masterTaskId: {
    type: String,
  },
});
TaskSchema.virtual('status').get(function() {
  const currentDate = new Date();
  const daysUntilDue = (this.endDate - currentDate) / (1000 * 60 * 60 * 24);

  if (!this.isCompleted && daysUntilDue <= 2) {
    return 'At Risk';
  } else if (this.toBeApproved && !this.isApproved && this.isCompleted) {
    return 'On-hold';
  } else if (this.isCompleted && !this.toBeApproved && !this.isApproved && this.endDate >= currentDate) {
    return 'Completed';
  } else if (this.isCompleted && this.isApproved) {
    return 'Approved';
  } else if (!this.isCompleted && this.endDate >= currentDate) {
    return 'On-track';
  } else {
    return 'Off-track';
  }
});

module.exports = mongoose.model('Task', TaskSchema);
