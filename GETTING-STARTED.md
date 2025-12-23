# 🚀 Getting Started - ආරම්භ කරන්න

## Simple React Dashboard App

මේ application එක දැන් **සරල web application එකක්** - Electron නැහැ!

---

## ⚡ Run කරන්න

### Development Mode (Hot Reload සමග):

```bash
npm run dev
```

Browser එකේ automatically open වෙයි: **http://localhost:5173**

Code change කළාම automatic reload වෙනවා! 🔥

---

## 📦 Production Build කරන්න

```bash
npm run build
```

Build කරපු files `dist/` folder එකේ save වෙනවා.

---

## 👀 Production Build Preview කරන්න

```bash
npm run preview
```

Production build එක local server එකක test කරන්න පුළුවන්.

---

## 🎯 Available Commands

| Command | කරන දේ |
|---------|--------|
| `npm run dev` | Development server start කරයි |
| `npm run build` | Production build කරයි |
| `npm run preview` | Build එක preview කරන්න |
| `npm run lint` | Code check කරන්න (ESLint) |

---

## 📁 Project Structure

```
react-ts-app/
├── src/
│   ├── App.tsx       # Main dashboard component
│   ├── main.tsx      # Entry point
│   └── index.css     # Styles
├── public/           # Static files
├── dist/             # Build output
└── package.json      # Dependencies
```

---

## 🎨 Features

✅ Dashboard layout with sidebar  
✅ Responsive design (mobile & desktop)  
✅ Three sections: Dashboard, Users, Settings  
✅ Clean modern UI  
✅ TypeScript for type safety  
✅ Fast Vite dev server  

---

## 🔧 What Changed?

### ❌ Removed:
- Electron desktop app setup
- All Electron dependencies
- Electron scripts and configurations
- Desktop build files
- Electron documentation

### ✅ Kept:
- React + TypeScript dashboard
- Vite build system
- All UI components
- Responsive layout
- Development workflow

---

## 🌐 Deploy කරන්න (Optional)

Production build කරලා web server එකක host කරන්න පුළුවන්:

### Build කරන්න:
```bash
npm run build
```

### Deploy Options:
- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Upload `dist/` folder
- **Any web server**: Upload `dist/` folder contents

---

## 💡 Tips

1. **Development:**
   ```bash
   npm run dev
   ```
   Browser එකේ http://localhost:5173 open කරන්න

2. **Production:**
   ```bash
   npm run build
   npm run preview
   ```
   Production build එක test කරන්න

3. **Code Quality:**
   ```bash
   npm run lint
   ```
   Code issues check කරන්න

---

## ✅ Summary

**Before:** Electron desktop application  
**Now:** Simple React web application  

**Run:** `npm run dev`  
**Build:** `npm run build`  
**Preview:** `npm run preview`  

**ඉතින් ඔබේ app එක clean React web app එකක්!** 🎉

---

## 🚀 දැන් Try කරන්න:

```bash
npm run dev
```

Browser එක open වෙලා dashboard පෙන්වයි! 🎊





