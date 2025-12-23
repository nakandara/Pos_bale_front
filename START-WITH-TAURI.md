# 🚀 START WITH TAURI - ආරම්භ කරන්න

## ✅ මම කළ දේ (Already Done):

1. ✅ Tauri CLI installed (`@tauri-apps/cli`)
2. ✅ Tauri API installed (`@tauri-apps/api`)
3. ✅ Scripts added to `package.json`:
   - `npm run tauri` - Tauri CLI
   - `npm run tauri:dev` - Development mode
   - `npm run tauri:build` - Production build
4. ✅ Documentation created:
   - `TAURI-QUICKSTART.txt` - Quick reference
   - `TAURI-GUIDE.md` - Full guide
   - `TAURI-SETUP.md` - Setup instructions
   - `TAURI-INFO.md` - Detailed information
5. ✅ README updated

---

## ⚠️ ඔබ කරන්න ඕනේ දේ (YOU NEED TO DO):

### පියවර 1: Rust Install කරන්න (වැදගත්!)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- Option **1** select කරන්න (default installation)
- Install එක complete වෙනකොට terminal restart කරන්න හෝ:

```bash
source $HOME/.cargo/env
```

**Verify කරන්න:**
```bash
rustc --version
cargo --version
```

---

### පියවර 2: System Dependencies Install කරන්න

```bash
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

මේකට මිනිත්තු 2-3ක් විතර යයි.

---

### පියවර 3: Tauri Initialize කරන්න

```bash
npx tauri init
```

**Prompts වලට answers (සියල්ලටම Enter press කරන්න):**

```
✔ What is your app name? › myapp-dashboard
✔ What should the window title be? › MyApp Dashboard
✔ Where are your web assets located? › ../dist
✔ What is the URL of your dev server? › http://localhost:5173
✔ What is your frontend dev command? › npm run dev
✔ What is your frontend build command? › npm run build
```

මේක `src-tauri/` folder එක create කරයි.

---

### පියවර 4: Development Run කරන්න

```bash
npm run tauri:dev
```

**පළමු run එක:**
- Rust compile වෙනවා (මිනිත්තු 2-3)
- Desktop window එක open වෙනවා
- ඔබේ dashboard පෙන්වයි

**ඊළඟ runs:**
- ඉක්මන් (10-30 seconds)
- Hot reload වැඩ කරනවා

---

## 🎯 Commands Summary

| Command | කරන දේ | වේලාව |
|---------|--------|---------|
| `npm run dev` | Web browser එකේ පමණක් | Instant |
| `npm run tauri:dev` | Desktop window (development) | First: 2-3 min, Next: Fast |
| `npm run tauri:build` | Desktop app build | 5-10 min |
| `npx tauri info` | System info | Few seconds |

---

## 📦 Build Output (After `npm run tauri:build`)

```
src-tauri/target/release/bundle/
├── appimage/
│   └── myapp-dashboard_1.0.0_amd64.AppImage  (~5 MB)
└── deb/
    └── myapp-dashboard_1.0.0_amd64.deb       (~5 MB)
```

**Run AppImage:**
```bash
chmod +x src-tauri/target/release/bundle/appimage/*.AppImage
./src-tauri/target/release/bundle/appimage/*.AppImage
```

**Install DEB:**
```bash
sudo dpkg -i src-tauri/target/release/bundle/deb/*.deb
```

---

## 🔍 Troubleshooting

### ❌ "rustc not found"
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### ❌ "webkit2gtk not found"
```bash
sudo apt install -y libwebkit2gtk-4.1-dev
```

### ❌ "Port 5173 already in use"
```bash
lsof -ti:5173 | xargs kill -9
npm run tauri:dev
```

### ❌ Build slow
පළමු build එක slow - ඊළඟ builds fast වෙයි (Rust incremental compilation)

---

## 📊 Tauri vs Electron

| Metric | Tauri | Electron |
|--------|-------|----------|
| **App Size** | 3-5 MB ⚡ | 50-100 MB 🐘 |
| **Memory** | ~80 MB | ~300 MB |
| **Startup** | <0.5s | 1-2s |
| **Backend** | Rust (Safe) | Node.js |

**15x smaller!**  
**4x less memory!**

---

## 📚 Documentation Files

| File | කරන දේ |
|------|--------|
| `TAURI-QUICKSTART.txt` | ⭐ Quick start guide |
| `TAURI-GUIDE.md` | 📖 Full guide with examples |
| `TAURI-SETUP.md` | 🛠️ Detailed setup |
| `TAURI-INFO.md` | 📘 Technical information |
| `START-WITH-TAURI.md` | 🚀 This file |

---

## ✅ Setup Checklist

Before running `npm run tauri:dev`:

- [ ] Rust installed? (`rustc --version`)
- [ ] System deps installed? (`dpkg -l | grep webkit`)
- [ ] Tauri initialized? (`src-tauri/` folder exists?)
- [ ] Port 5173 free? (`lsof -ti:5173`)

---

## 🎉 Quick Start Commands

```bash
# 1. Install Rust (one time)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# 2. Install system deps (one time)
sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
    curl wget file libssl-dev librsvg2-dev

# 3. Initialize Tauri (one time)
npx tauri init
# Press Enter for all prompts

# 4. Run development
npm run tauri:dev
```

---

## 💡 What You Get

✅ **Desktop Application** - Native window  
✅ **Small Size** - ~5 MB (vs 80 MB Electron)  
✅ **Fast Performance** - Rust backend  
✅ **Cross-Platform** - Linux, Windows, macOS  
✅ **Hot Reload** - Development productivity  
✅ **Better Security** - Rust memory safety  

---

## 🚀 Next Steps

### Now:
1. Install Rust (පියවර 1)
2. Install system deps (පියවර 2)
3. Run `npx tauri init` (පියවර 3)

### Then:
```bash
npm run tauri:dev
```

**Desktop window එක open වෙයි ඔබේ dashboard එක සමග!** 🎊

---

## 📖 Need Help?

```bash
# Quick reference
cat TAURI-QUICKSTART.txt

# Full guide
cat TAURI-GUIDE.md

# Detailed setup
cat TAURI-SETUP.md

# Technical info
cat TAURI-INFO.md
```

---

**සාර්ථකත්වය සඳහා ආරම්භ කරන්න!** 🦀

**First:** Install Rust  
**Then:** Run `npx tauri init`  
**Finally:** `npm run tauri:dev`  

Desktop app එක ready! 🎉




