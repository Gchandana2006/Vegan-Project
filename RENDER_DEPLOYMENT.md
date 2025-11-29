# Render Deployment Guide (Backend)

## Quick Steps

1. **Go to render.com** and sign in with GitHub

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure:**
   - **Name**: `vegan-market-analytics-api`
   - **Environment**: Node
   - **Scroll down** and find **"Root Directory"** field (or look in "Advanced" section)
   - **Root Directory**: Type `backend` ⚠️ IMPORTANT (this tells Render to use only the backend folder)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

   **Note:** If you don't see "Root Directory" field:
   - Look for "Advanced" section and expand it
   - OR create the service first, then go to Settings → Root Directory → set to `backend`

5. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

6. **Click "Create Web Service"**

7. **Wait for deployment** (takes 2-5 minutes)

8. **Copy your backend URL** (e.g., `https://vegan-market-analytics-api.onrender.com`)

9. **Update Frontend Environment Variable:**
   - In Vercel, set `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

## Important Notes

- ✅ Root directory MUST be set to `backend`
- ✅ Free tier services spin down after 15 minutes of inactivity
- ✅ First request after spin-down may take 30-60 seconds
- ✅ Health check endpoint: `/api/health`
- ✅ Auto-deploy is enabled by default

## Render Free Tier Limitations

- Services spin down after inactivity
- Cold starts take 30-60 seconds
- 750 hours/month free (enough for always-on)
- Consider upgrading for production use

