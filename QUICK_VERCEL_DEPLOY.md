# Quick Vercel Deployment Steps

## 🚀 Fast Track (5 minutes)

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy on Vercel

**Via Dashboard:**
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your repository
4. **Important Settings:**
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

### 3. Add Environment Variable

**Before clicking Deploy:**
- Click "Environment Variables"
- Add:
  - **Name**: `REACT_APP_API_URL`
  - **Value**: `https://YOUR-BACKEND-URL.com/api` (replace with your actual backend URL)
  - Select: Production, Preview, Development
  - Click "Save"

### 4. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your app will be live! 🎉

### 5. Test
- Visit the provided Vercel URL
- Try logging in/registering
- If CORS errors appear, update backend CORS settings

---

## ⚠️ Common Issues

**Build fails?**
- Make sure Root Directory is set to `frontend`
- Check that `package.json` exists in frontend folder

**API not working?**
- Verify `REACT_APP_API_URL` is set correctly
- Make sure it includes `/api` at the end
- Check backend CORS allows Vercel domain

**Blank page?**
- Check browser console (F12)
- Verify `vercel.json` exists
- Hard refresh (Ctrl+Shift+R)

---

## 📝 Your Backend URL Format

If your backend is deployed on:
- **Render**: `https://your-app.onrender.com/api`
- **Railway**: `https://your-app.railway.app/api`
- **Heroku**: `https://your-app.herokuapp.com/api`
- **Other**: `https://your-domain.com/api`

Make sure to include `/api` at the end!
