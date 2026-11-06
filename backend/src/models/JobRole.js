const mongoose = require('mongoose');

const requiredSkillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  category: { type: String, default: 'General' },
  minimumProficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  importance: {
    type: String,
    enum: ['Mandatory', 'Core Requirement', 'Recommended'],
    default: 'Core Requirement'
  },
  weight: {
    type: Number,
    default: 1.0
  }
}, { _id: false });

const jobRoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      default: 'Software Development'
    },
    shortDescription: {
      type: String,
      required: true
    },
    fullDescription: {
      type: String,
      default: ''
    },
    averageSalary: {
      type: String,
      default: '$85,000 - $125,000 / ₹8 - 18 LPA'
    },
    hiringDemand: {
      type: String,
      enum: ['High Demand', 'Exponential Growth', 'Stable', 'Competitive'],
      default: 'High Demand'
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level / College Graduate', 'Associate (0-2 Yrs)', 'Mid Level (2-4 Yrs)'],
      default: 'Entry Level / College Graduate'
    },
    keyResponsibilities: [
      {
        type: String
      }
    ],
    requiredSkills: [requiredSkillSchema],
    recommendedSkills: [requiredSkillSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('JobRole', jobRoleSchema);
