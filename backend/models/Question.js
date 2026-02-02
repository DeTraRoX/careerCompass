const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  categories: {
    technology: { type: Number, default: 0 },
    management: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    analytical: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    trim: true,
  },
  options: [optionSchema],
  category: {
    type: String,
    enum: ['general', 'technical', 'personality'],
    default: 'general',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', questionSchema);
