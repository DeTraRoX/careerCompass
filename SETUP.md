# Quick Setup Guide

## Step-by-Step Installation

### 1. Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file in the backend directory
# IMPORTANT: You MUST create this file for the application to work!
# Create a file named ".env" (without quotes) in the backend folder
# Add the following content:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/career_guidance
JWT_SECRET=career_guidance_super_secret_jwt_key_2024_change_in_production
NODE_ENV=development

# Note: JWT_SECRET is REQUIRED. Without it, login/registration will fail with "secretOrPrivateKey must have a value" error.
# You can use any random string for JWT_SECRET, but make it long and secure.

# Start MongoDB (if running locally)
# Windows: net start MongoDB
# macOS/Linux: sudo systemctl start mongod

# Seed the database
node data/seedData.js

# Start the server
npm start
# or for development: npm run dev
```

### 3. Frontend Setup

```bash
# Open a new terminal, navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Application

1. Register a new account at http://localhost:3000/register
2. Login with your credentials
3. Take the assessment
4. View your results and recommended careers
5. Click on any career to see detailed information

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your MONGODB_URI in .env file
- For MongoDB Atlas, use the connection string provided

### Port Already in Use
- Change PORT in backend/.env
- Update proxy in frontend/package.json if needed

### Module Not Found
- Run `npm install` in both backend and frontend folders
- Delete node_modules and package-lock.json, then reinstall

### CORS Errors
- Ensure backend is running on port 5000
- Check that frontend proxy is set correctly in package.json
