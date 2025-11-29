# Deployment Guide

Complete guide for deploying Vegan Market Analytics Platform to production.

## 🚀 Deployment Overview

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Render

1. **Ensure backend folder has all files:**
   - `server.js`
   - `package.json`
   - `routes/` folder
   - `data/` folder

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Connect your GitHub account

### Step 3: Deploy Backend Service

1. **Click "New +" → "Web Service"**

2. **Connect Repository:**
   - Select your GitHub repository
   - Choose the repository containing your project

3. **Configure Service:**
   - **Name**: `vegan-market-analytics-api` (or your preferred name)
   - **Root Directory**: `backend` (IMPORTANT: Set this!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid plan)

4. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses port 10000 by default)

5. **Click "Create Web Service"**

6. **Wait for Deployment:**
   - Render will install dependencies
   - Build and start your server
   - You'll get a URL like: `https://vegan-market-analytics-api.onrender.com`

7. **Copy Your Backend URL:**
   - Example: `https://vegan-market-analytics-api.onrender.com`
   - This is your backend API URL

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend for Vercel

1. **Update API URL in frontend:**
   - The frontend will use environment variable `VITE_API_URL`
   - We'll set this in Vercel dashboard

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Connect your GitHub account

### Step 3: Deploy Frontend

1. **Click "Add New..." → "Project"**

2. **Import Repository:**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (IMPORTANT: Set this!)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables:**
   - Click "Environment Variables"
   - Add:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
     - Replace `your-backend-url` with your actual Render backend URL
     - Example: `https://vegan-market-analytics-api.onrender.com/api`

5. **Click "Deploy"**

6. **Wait for Deployment:**
   - Vercel will build your frontend
   - Deploy it to a CDN
   - You'll get a URL like: `https://vegan-market-analytics.vercel.app`

---

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Backend URL is accessible
- [ ] Health check works: `https://your-backend.onrender.com/api/health`
- [ ] API endpoints respond correctly
- [ ] CORS is enabled (already configured)

### Frontend (Vercel)
- [ ] Frontend URL is accessible
- [ ] Environment variable `VITE_API_URL` is set correctly
- [ ] Frontend can connect to backend API
- [ ] All pages load correctly
- [ ] Data displays properly

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check Render logs, ensure `package.json` has correct start script
- **Check**: Root directory is set to `backend`

**Problem**: CORS errors
- **Solution**: Backend already has CORS enabled, but verify it's working
- **Check**: Render URL is correct in frontend environment variable

**Problem**: Port issues
- **Solution**: Render uses port from `PORT` env var or defaults to 10000
- **Check**: Server.js uses `process.env.PORT || 5000` (should work)

### Frontend Issues

**Problem**: Frontend can't connect to backend
- **Solution**: Verify `VITE_API_URL` environment variable is set correctly
- **Check**: URL should end with `/api` (e.g., `https://backend.onrender.com/api`)

**Problem**: Build fails
- **Solution**: Check Vercel build logs
- **Check**: Ensure `frontend` is set as root directory

**Problem**: 404 errors on routes
- **Solution**: Vercel.json is configured for SPA routing
- **Check**: All routes redirect to index.html

---

## 📝 Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔄 Updating Deployments

### Update Backend:
1. Push changes to GitHub
2. Render automatically redeploys (if auto-deploy is enabled)
3. Or manually trigger redeploy in Render dashboard

### Update Frontend:
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Or manually trigger redeploy in Vercel dashboard

---

## 🌍 Custom Domains (Optional)

### Backend (Render):
1. Go to Render dashboard → Your service → Settings
2. Click "Custom Domains"
3. Add your domain
4. Follow DNS configuration instructions

### Frontend (Vercel):
1. Go to Vercel dashboard → Your project → Settings
2. Click "Domains"
3. Add your domain
4. Vercel will configure DNS automatically

---

## 📊 Monitoring

### Render:
- View logs in Render dashboard
- Monitor service health
- Check deployment status

### Vercel:
- View build logs in Vercel dashboard
- Monitor analytics
- Check deployment status

---

## 🎯 Quick Reference URLs

After deployment, you'll have:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Base**: `https://your-backend.onrender.com/api`

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Project Issues**: Check GitHub repository

