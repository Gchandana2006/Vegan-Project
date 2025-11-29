# Vercel Deployment Guide (Frontend)

## Quick Steps

1. **Go to vercel.com** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure:**
   - **Root Directory**: `frontend` ⚠️ IMPORTANT
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

5. **Add Environment Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
   - Replace with your actual Render backend URL

6. **Click "Deploy"**

7. **Done!** Your frontend will be live at `https://your-project.vercel.app`

## Important Notes

- ✅ Root directory MUST be set to `frontend`
- ✅ Environment variable `VITE_API_URL` must point to your Render backend
- ✅ Vercel will auto-deploy on every GitHub push
- ✅ Custom domain can be added in project settings

