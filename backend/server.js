const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not set in environment variables');
  console.error('Please create a .env file in the backend directory with:');
  console.error('JWT_SECRET=your_super_secret_jwt_key_change_this_in_production');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.warn('WARNING: MONGODB_URI is not set. Using default: mongodb://localhost:27017/career_guidance');
}

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/assessment', require('./routes/assessmentRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Career Guidance System API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
