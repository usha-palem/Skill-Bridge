const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['Documentation', 'Video Course', 'Interactive Tutorial', 'Hands-on Project', 'Cheat Sheet'],
    default: 'Documentation'
  },
  url: { type: String, required: true },
  duration: { type: String, default: '3 hours' },
  platform: { type: String, default: 'Official Docs' },
  isFree: { type: Boolean, default: true }
}, { _id: false });

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Frontend',
        'Backend',
        'Database',
        'Cloud & DevOps',
        'Programming Languages',
        'System Architecture',
        'AI & Data Science',
        'Security & Testing'
      ],
      default: 'Frontend'
    },
    description: {
      type: String,
      default: ''
    },
    industryDemand: {
      type: String,
      enum: ['High', 'Very High', 'Critical', 'Moderate'],
      default: 'High'
    },
    typicalDifficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    estimatedHoursToLearn: {
      type: Number,
      default: 20
    },
    resources: [resourceSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Skill', skillSchema);
