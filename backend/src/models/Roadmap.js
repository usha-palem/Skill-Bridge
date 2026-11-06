const mongoose = require('mongoose');

const roadmapModuleSchema = new mongoose.Schema({
  topicId: {
    type: String,
    required: true
  },
  weekNumber: {
    type: Number,
    default: 1
  },
  weekTitle: {
    type: String,
    default: ''
  },
  skillName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Optional'],
    default: 'High'
  },
  targetProficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  currentProficiency: {
    type: String,
    default: 'None'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  order: {
    type: Number,
    required: true
  },
  estimatedDuration: {
    type: String,
    default: '10 Hours'
  },
  learningObjectives: [{ type: String }],
  resources: [
    {
      title: String,
      type: { type: String, default: 'Tutorial' },
      url: String,
      platform: String,
      duration: String
    }
  ],
  practicalProject: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }
}, { _id: false });

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobRole',
      required: true
    },
    jobRoleTitle: {
      type: String,
      required: true
    },
    matchPercentageAtCreation: {
      type: Number,
      default: 0
    },
    currentMatchPercentage: {
      type: Number,
      default: 0
    },
    totalModules: {
      type: Number,
      default: 0
    },
    completedModules: {
      type: Number,
      default: 0
    },
    totalEstimatedHours: {
      type: Number,
      default: 0
    },
    modules: [roadmapModuleSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
