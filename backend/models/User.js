const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  education: {
    type: String,
    default: '',
  },
  interests: {
    type: [String],
    default: [],
  },
  assessmentResults: {
    technology: { type: Number, default: 0 },
    management: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    analytical: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
  },
  recommendedCareers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
  assessmentHistory: [{
    date: { type: Date, default: Date.now },
    scores: {
      technology: { type: Number, default: 0 },
      management: { type: Number, default: 0 },
      creativity: { type: Number, default: 0 },
      analytical: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
    },
    recommendedCareers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
    }],
  }],
  savedCareers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
