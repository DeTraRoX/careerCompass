const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a career title'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  roadmap: {
    education: { type: String, required: true },
    skills: { type: String, required: true },
    certifications: { type: String, required: true },
    internship: { type: String, required: true },
    job: { type: String, required: true },
  },
  salaryRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
  },
  growthOpportunities: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['technology', 'management', 'creativity', 'analytical', 'communication'],
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  videos: [{
    title: { type: String },
    url: { type: String },
    description: { type: String },
  }],
  resources: [{
    title: { type: String },
    url: { type: String },
    type: { type: String, enum: ['article', 'course', 'book', 'website', 'other'], default: 'other' },
    description: { type: String },
  }],
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Career', careerSchema);
