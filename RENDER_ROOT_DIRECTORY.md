# How to Set Root Directory to "backend" in Render

## Step-by-Step Visual Guide

### On the "New Web Service" Page:

1. **Fill Basic Information:**
   - Name: `vegan-market-analytics-api`
   - Language: `Node` ✅

2. **Scroll Down** to find **"Advanced"** section (or look for "Root Directory" field)

3. **Find "Root Directory" Field:**
   ```
   ┌─────────────────────────────────┐
   │ Root Directory                  │
   │ ┌─────────────────────────────┐ │
   │ │ backend                     │ │ ← Type "backend" here
   │ └─────────────────────────────┘ │
   │ Leave blank to use repo root    │
   └─────────────────────────────────┘
   ```

4. **Enter:** `backend` (without quotes)

5. **Continue with other settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`

6. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

7. **Click "Create Web Service"**

---

## If You Don't See "Root Directory" Field:

### Option 1: Look for "Advanced" Section
- Scroll down on the form
- Click "Advanced" or expand it
- Root Directory should be there

### Option 2: Set After Creation
1. Click "Create Web Service" first
2. Go to your service dashboard
3. Click **"Settings"** tab
4. Scroll to **"Root Directory"** section
5. Enter: `backend`
6. Click **"Save Changes"**
7. Service will redeploy automatically

---

## What Root Directory Does:

- ✅ Tells Render to only look at the `backend/` folder
- ✅ Ignores the `frontend/` folder completely
- ✅ Runs `npm install` and `npm start` from inside `backend/` folder
- ✅ Finds `package.json` and `server.js` in the `backend/` folder

---

## Verification:

After deployment, check the build logs:
- Should show: `Installing dependencies...`
- Should show: `Starting service...`
- Should NOT show frontend-related files

---

## Quick Reference:

```
Repository Structure:
Vegan-Project/
├── backend/          ← Render uses this folder
│   ├── server.js
│   ├── package.json
│   └── routes/
└── frontend/         ← Render ignores this folder
    └── ...
```

**Root Directory:** `backend` ✅

