# Deployment Guide - Career Guidance System

This guide will help you deploy your MERN stack application to production.

## 📋 Prerequisites

- GitHub account (for code hosting)
- MongoDB Atlas account (free tier available)
- Heroku account (for backend) - Free tier discontinued, but alternatives provided
- Vercel/Netlify account (for frontend) - Free tier available

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (choose FREE tier)
4. Wait for cluster to be created (2-3 minutes)

### 1.2 Configure Database Access
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### 1.3 Configure Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add specific IPs for production
4. Click "Confirm"

### 1.4 Get Connection String
1. **On the Clusters page (where you are now)**, click the **"Connect"** button on your Cluster0 card
2. Choose **"Connect your application"** or **"Drivers"**
3. Select **Node.js** as the driver (version 5.5 or later)
4. Copy the connection string that appears
5. **IMPORTANT**: Replace `<password>` with your database user password
6. **IMPORTANT**: Add your database name after the cluster address:
   - Change: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - To: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/career_guidance?retryWrites=true&w=majority`
   - (Add `/career_guidance` before the `?`)

**Example connection string:**
```
mongodb+srv://career_admin:your_password@cluster0.xxxxx.mongodb.net/career_guidance?retryWrites=true&w=majority
```

**What to do on the current page:**
- Click the **"Connect"** button (green button on Cluster0 card)
- Follow the connection wizard
- Copy the connection string
- Make sure to replace `<password>` and add `/career_guidance` database name

## 🚀 Step 2: Deploy Backend (Node.js/Express)

### Option A: Deploy to Render (Recommended - Free Tier Available)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `career-guidance-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables**
   Click "Environment" tab and add:
   ```
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your service URL (e.g., `https://career-guidance-backend.onrender.com`)

### Option B: Deploy to Railway (Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as Render)
6. Set root directory to `backend`
7. Deploy

### Option C: Deploy to Heroku (Paid - $5/month minimum)

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create career-guidance-backend`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_super_secret_jwt_key
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

## 🎨 Step 3: Deploy Frontend (React)

### Option A: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional, can use web interface)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Web Interface**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. **Update Frontend API Calls**
   - Create `frontend/src/config/api.js`:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   export default API_URL;
   ```
   - Update all axios calls to use this URL

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Option B: Deploy to Netlify

1. Go to https://www.netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. Add environment variable:
   - `REACT_APP_API_URL` = your backend URL
7. Deploy

## 🔧 Step 4: Update Frontend Configuration

### 4.1 Create API Configuration File

Create `frontend/src/config/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_URL;
```

### 4.2 Update Axios Calls

Update `frontend/src/context/AuthContext.js`:

```javascript
import axios from 'axios';
import API_URL from '../config/api';

// Set default base URL
axios.defaults.baseURL = API_URL;
```

Update all other files that use axios to import and use API_URL.

### 4.3 Update package.json Proxy

Remove or update the proxy in `frontend/package.json`:

```json
{
  "proxy": ""
}
```

Or remove it entirely since we're using environment variables.

## 📝 Step 5: Update Backend for Production

### 5.1 Update CORS Configuration

Update `backend/server.js`:

```javascript
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
```

### 5.2 Add Production Environment Variable

In your backend hosting platform, add:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 5.3 Update package.json Scripts

Ensure `backend/package.json` has:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🌱 Step 6: Seed Production Database

### Option 1: Via MongoDB Atlas Shell
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Use the data import feature

### Option 2: Via Local Script
1. Update `.env` with production MongoDB URI
2. Run: `node backend/data/seedData.js`

### Option 3: Via Backend API (if you create admin endpoint)
Create a seed endpoint for initial setup.

## ✅ Step 7: Final Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] Network access configured (IP whitelist)
- [ ] Backend deployed and accessible
- [ ] Environment variables set in backend
- [ ] Frontend deployed and accessible
- [ ] Environment variables set in frontend
- [ ] CORS configured correctly
- [ ] Database seeded with initial data
- [ ] Test registration and login
- [ ] Test assessment flow
- [ ] Test all features

## 🔒 Step 8: Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT_SECRET (32+ characters)
   - Rotate secrets regularly

2. **MongoDB Atlas**
   - Use IP whitelist in production
   - Enable MongoDB Atlas authentication
   - Regular backups

3. **HTTPS**
   - Both frontend and backend should use HTTPS
   - Vercel/Netlify provide HTTPS automatically
   - Render provides HTTPS automatically

4. **Rate Limiting** (Optional)
   - Add rate limiting to prevent abuse
   - Use `express-rate-limit` package

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not connecting to MongoDB
- Check MONGODB_URI is correct
- Verify IP is whitelisted in Atlas
- Check database user credentials

**Problem**: CORS errors
- Verify FRONTEND_URL in backend matches frontend URL
- Check CORS configuration

### Frontend Issues

**Problem**: API calls failing
- Verify REACT_APP_API_URL is set correctly
- Check backend URL is accessible
- Verify CORS is configured

**Problem**: Build fails
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check for syntax errors

## 📊 Monitoring (Optional)

1. **Backend Logs**
   - Render: View logs in dashboard
   - Railway: View logs in dashboard
   - Heroku: `heroku logs --tail`

2. **Frontend Analytics**
   - Add Google Analytics
   - Use Vercel Analytics (built-in)

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to `main` branch = automatic deployment
- Pull requests = preview deployments

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas connection

## 🎉 Success!

Once deployed, your application will be accessible at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

Share these URLs with users!
