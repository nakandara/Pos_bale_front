# Vercel Deployment Guide for React Frontend

## ✅ Fixed Issues

1. **Added `@types/node`** to `package.json` - This was causing the TypeScript build error
2. **Created `.env` template** - For backend API configuration

## 🚀 Vercel Deployment Settings

Use these settings when deploying on Vercel:

### Basic Settings
- **Framework Preset**: `Vite` ✅
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Environment Variables (IMPORTANT!)

Click **"Environment Variables"** and add:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | Your Render backend URL |

**Example:**
```
VITE_API_URL=https://pos-bale-back.onrender.com/api
```

## 📝 Step-by-Step Deployment

### 1. Push to GitHub (Already Done!)
```bash
cd ~/POS/react-ts-app
git add .
git commit -m "Fix TypeScript build and add deployment config"
git push origin master
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import `nakandara/Pos_bale_front` repository
4. Configure:
   - Framework: **Vite**
   - Root Directory: **./** (default)
   - Build Command: **npm run build** (auto)
   - Output Directory: **dist** (auto)
5. Click **"Environment Variables"**
6. Add `VITE_API_URL` with your backend URL
7. Click **"Deploy"**

### 3. Update Backend CORS

After deployment, update your backend's `FRONTEND_URL` environment variable on Render:

```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## 🔧 Troubleshooting

### Build Error: "Cannot find type definition file for 'node'"
**Solution**: Already fixed! We added `@types/node` to package.json

### API Calls Failing
**Solution**: 
1. Check `VITE_API_URL` is set correctly in Vercel
2. Verify backend is running on Render
3. Check backend CORS settings include your Vercel URL

### Environment Variable Not Working
**Solution**: 
- Vercel environment variables must start with `VITE_` to be accessible in the frontend
- Redeploy after adding/changing environment variables

## 📊 Expected Build Output

Successful build should show:
```
✓ built in XXXms
✓ XX modules transformed
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.js       XXX.XX kB
dist/assets/index-XXXXX.css       XX.XX kB
```

## 🌐 After Deployment

Your app will be available at:
```
https://pos-bale-front.vercel.app
```
(or your custom domain)

### Test Your Deployment

1. **Check Frontend**: Visit your Vercel URL
2. **Test API Connection**: 
   - Open browser console (F12)
   - Go to Categories page
   - Check Network tab for API calls
   - Should see requests to your Render backend

3. **Verify CORS**: 
   - If you see CORS errors, update backend `FRONTEND_URL`
   - Redeploy backend on Render

## 🔗 Full Stack URLs

- **Frontend**: `https://pos-bale-front.vercel.app`
- **Backend**: `https://pos-bale-back.onrender.com`
- **API Endpoint**: `https://pos-bale-back.onrender.com/api`

## 🎉 You're Done!

Your POS system is now fully deployed:
- ✅ Backend on Render (Node.js + Express + MongoDB)
- ✅ Frontend on Vercel (React + Vite + TypeScript)
- ✅ Connected via REST API

Enjoy your cloud-based POS system! 🚀

