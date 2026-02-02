# Vercel Frontend Deployment Guide

This guide will help you deploy your Career Guidance System frontend to Vercel.

## Prerequisites

1. ✅ Backend already deployed (you mentioned it's done)
2. GitHub account (or GitLab/Bitbucket)
3. Vercel account (free tier works)

## Step 1: Prepare Your Frontend

### 1.1 Update API Configuration

The `frontend/src/config/api.js` file is already configured to use environment variables. Make sure it looks like this:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default API_URL;
```

### 1.2 Commit Your Code

Make sure all your frontend code is committed to Git:

```bash
cd frontend
git add .
git commit -m "Prepare for Vercel deployment"
```

## Step 2: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in (or sign up with GitHub)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository containing your frontend

3. **Configure Project**:
   - **Framework Preset**: Create React App (should auto-detect)
   - **Root Directory**: `frontend` (if your repo has both frontend and backend)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `build` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add the following:
     ```
     Name: REACT_APP_API_URL
     Value: https://your-backend-url.com/api
     ```
   - Replace `https://your-backend-url.com/api` with your actual deployed backend URL
   - Make sure to add it for **Production**, **Preview**, and **Development** environments
   - Click "Save"

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts:
     - Set up and deploy? **Yes**
     - Which scope? (Select your account)
     - Link to existing project? **No** (first time) or **Yes** (if redeploying)
     - What's your project's name? (Enter a name or press Enter)
     - In which directory is your code located? `./` (press Enter)
     - Want to override the settings? **No**

5. **Set Environment Variables**:
   ```bash
   vercel env add REACT_APP_API_URL
   ```
   - Enter your backend URL when prompted: `https://your-backend-url.com/api`
   - Select environments: Production, Preview, Development

6. **Redeploy with Environment Variables**:
   ```bash
   vercel --prod
   ```

## Step 4: Verify Deployment

1. **Check Your Deployment**:
   - Vercel will provide you with a URL like: `https://your-app-name.vercel.app`
   - Visit the URL to see if your app loads

2. **Test the Application**:
   - Try registering a new user
   - Try logging in
   - Take the assessment
   - Check if API calls are working (open browser DevTools → Network tab)

3. **Check for Errors**:
   - Open browser console (F12)
   - Look for any CORS errors or API connection errors
   - If you see CORS errors, make sure your backend CORS is configured to allow your Vercel domain

## Step 5: Update Backend CORS (If Needed)

If you get CORS errors, update your backend's `server.js` to include your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app-name.vercel.app',
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

Or use an environment variable:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then add `FRONTEND_URL=https://your-app-name.vercel.app` to your backend's environment variables.

## Common Issues & Solutions

### Issue 1: Build Fails
**Error**: `Module not found` or build errors
**Solution**: 
- Make sure all dependencies are in `package.json`
- Check that `package.json` has the correct build script
- Try running `npm run build` locally first to catch errors

### Issue 2: API Calls Fail
**Error**: `Network Error` or `CORS Error`
**Solution**:
- Verify `REACT_APP_API_URL` is set correctly in Vercel environment variables
- Check that your backend URL includes `/api` at the end (e.g., `https://backend.com/api`)
- Make sure backend CORS allows your Vercel domain

### Issue 3: Blank Page After Deployment
**Error**: Page loads but shows nothing
**Solution**:
- Check browser console for errors
- Verify `vercel.json` is correct (should route all requests to `index.html`)
- Make sure `build` folder is being generated correctly

### Issue 4: Environment Variables Not Working
**Error**: API calls go to wrong URL
**Solution**:
- Environment variables must start with `REACT_APP_` to be accessible in React
- After adding environment variables, you must redeploy
- Clear browser cache and hard refresh (Ctrl+Shift+R)

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `frontend` (if needed)
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Build completed successfully
- [ ] App accessible at Vercel URL
- [ ] API calls working
- [ ] Backend CORS updated (if needed)

## Next Steps

1. **Custom Domain** (Optional):
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain

2. **Automatic Deployments**:
   - Vercel automatically deploys when you push to your main branch
   - Preview deployments are created for pull requests

3. **Monitor Deployments**:
   - Check Vercel Dashboard for deployment logs
   - Set up error monitoring (optional)

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Make sure backend is accessible and CORS is configured

---

**Your Backend URL**: Replace `https://your-backend-url.com/api` with your actual deployed backend URL in the environment variables.
