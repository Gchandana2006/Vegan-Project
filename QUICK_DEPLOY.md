# 🚀 Quick Deployment Checklist

## Backend → Render (Do This First!)

1. ✅ Go to [render.com](https://render.com) → Sign in with GitHub
2. ✅ Click "New +" → "Web Service"
3. ✅ Connect your GitHub repo
4. ✅ **Root Directory**: `backend` ⚠️
5. ✅ **Build Command**: `npm install`
6. ✅ **Start Command**: `npm start`
7. ✅ **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
8. ✅ Click "Create Web Service"
9. ✅ **Copy Backend URL** (e.g., `https://your-api.onrender.com`)

## Frontend → Vercel (Do This Second!)

1. ✅ Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. ✅ Click "Add New Project"
3. ✅ Import your GitHub repo
4. ✅ **Root Directory**: `frontend` ⚠️
5. ✅ **Environment Variable**:
   - `VITE_API_URL` = `https://your-api.onrender.com/api`
   - (Use the backend URL from step 1)
6. ✅ Click "Deploy"
7. ✅ **Copy Frontend URL** (e.g., `https://your-app.vercel.app`)

## ✅ Test Your Deployment

- [ ] Backend health check: `https://your-api.onrender.com/api/health`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Data displays correctly on all pages
- [ ] No CORS errors in browser console

## 🎉 Done!

Your app is now live! 🚀

---

**Need help?** Check `DEPLOYMENT.md` for detailed instructions.
