# 🚀 Tauri Desktop App - සම්පූර්ණ මාර්ගෝපදේශය

## 📖 Tauri කියන්නේ මොකක්ද?

Tauri යනු **modern desktop applications** හදන්න පුළුවන් framework එකක්.

### ✅ Electron වලට වඩා වාසි:

| Feature | Tauri | Electron |
|---------|-------|----------|
| **App Size** | 3-5 MB ⚡ | 50-100 MB 🐘 |
| **Memory** | ~80 MB | ~300+ MB |
| **Startup** | Very Fast ⚡ | Slower |
| **Backend** | Rust (Safe & Fast) | Node.js |
| **Security** | 🔒 Excellent | Good |
| **Binary Size** | Small | Large |

---

## 🛠️ Setup කරන්න - Step by Step

### ✅ දැනටමත් කරලා තියෙන දේවල්:

1. ✅ Tauri CLI installed (`@tauri-apps/cli`)
2. ✅ Tauri API installed (`@tauri-apps/api`)
3. ✅ Scripts added to package.json

---

### ⚠️ කරන්න ඕනේ දේවල්:

#### **Step 1: Rust Install කරන්න** (වැදගත්!)

Tauri එකට Rust compiler එක අවශ්‍යයි.

```bash
# Rust install කරන්න
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install වෙන විට:
- **1** (default installation) type කරලා Enter

පසුව:
```bash
# Environment load කරන්න
source $HOME/.cargo/env

# Verify
rustc --version
cargo --version
```

---

#### **Step 2: System Dependencies Install කරන්න**

Linux වල Tauri එකට webkit සහ වෙනත් libraries අවශ්‍යයි:

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

#### **Step 3: Tauri Initialize කරන්න**

```bash
cd /home/pramod/POS/react-ts-app
npx tauri init
```

**Prompts වලට answers** (Enter press කරන්න defaults සඳහා):

```
? What is your app name? › myapp-dashboard
? What should the window title be? › MyApp Dashboard
? Where are your web assets located? › ../dist
? What is the URL of your dev server? › http://localhost:5173
? What is your frontend dev command? › npm run dev
? What is your frontend build command? › npm run build
```

මේක `src-tauri/` folder එක create කරයි ඔබේ project එකේ.

---

## 🎯 Run කරන්න

### **Development Mode:**

```bash
npm run tauri:dev
```

**මේක කරන දේ:**
1. Vite dev server start කරයි (React app)
2. Rust backend compile කරයි (පළමු වතාවට slow - මිනිත්තු 2-3)
3. Desktop window එක open කරයි
4. Hot reload enable කරයි (code change කළාම automatic reload)

**පළමු run එකට slow වෙන්න පුළුවන් (Rust compile වෙනවා)**

---

### **Production Build:**

```bash
npm run tauri:build
```

**Output:**
```
src-tauri/target/release/bundle/
├── deb/
│   └── myapp-dashboard_1.0.0_amd64.deb
└── appimage/
    └── myapp-dashboard_1.0.0_amd64.AppImage
```

**Build කරපු files:**
- `.deb` - Ubuntu/Debian install කරන්න පුළුවන්
- `.AppImage` - Click කරලා run කරන්න පුළුවන්

---

## 📋 Commands සාරාංශය

| Command | කරන දේ | Time |
|---------|--------|------|
| `npm run tauri:dev` | Development mode | First: 2-3 min, Next: Fast |
| `npm run tauri:build` | Production build | 5-10 min |
| `npx tauri info` | System info check | Few seconds |

---

## 🔧 Tauri Configuration

### Main Config File: `src-tauri/tauri.conf.json`

```json
{
  "productName": "MyApp Dashboard",
  "version": "1.0.0",
  "identifier": "com.myapp.dashboard",
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "MyApp Dashboard",
        "width": 1100,
        "height": 700,
        "resizable": true,
        "fullscreen": false
      }
    ]
  }
}
```

---

## 📁 Project Structure (After Init)

```
react-ts-app/
├── src/                    # React app
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── src-tauri/              # 🆕 Tauri backend
│   ├── src/
│   │   └── main.rs         # Rust main file
│   ├── Cargo.toml          # Rust dependencies
│   ├── tauri.conf.json     # Tauri config
│   └── target/             # Build output
├── dist/                   # Frontend build
└── package.json
```

---

## 🎨 Features & Customization

### Window Settings

Edit `src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [
      {
        "title": "Your Title",
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false,
        "decorations": true,
        "transparent": false
      }
    ]
  }
}
```

---

## 🔍 Troubleshooting

### 1. Rust නැති error:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

---

### 2. webkit2gtk error:

```bash
sudo apt install libwebkit2gtk-4.1-dev
```

---

### 3. Build slow වෙනවා:

පළමු build එක slow (Rust compile වෙනවා).  
ඊළඟ builds fast වෙයි.

Release build:
```bash
npm run tauri:build -- --verbose
```

---

### 4. Port 5173 error:

```bash
lsof -ti:5173 | xargs kill -9
npm run tauri:dev
```

---

## 📊 Comparison: Tauri vs Electron

### **Size Comparison:**

**Tauri:**
```
MyApp Dashboard.AppImage: ~5 MB
```

**Electron (පෙර තිබුණු):**
```
MyApp Dashboard.AppImage: ~80 MB
```

**15x smaller!** 🎉

---

### **Memory Usage:**

**Tauri:** ~80 MB RAM  
**Electron:** ~300 MB RAM  

**4x less memory!** 🚀

---

## 📦 Distribution

### Install කරන්න (After Build):

**AppImage:**
```bash
chmod +x src-tauri/target/release/bundle/appimage/*.AppImage
./src-tauri/target/release/bundle/appimage/*.AppImage
```

**DEB Package:**
```bash
sudo dpkg -i src-tauri/target/release/bundle/deb/*.deb
```

---

## ✅ Setup Checklist

පළමු වතාවට run කරන්න කලින්:

- [ ] Rust installed? (`rustc --version`)
- [ ] System deps installed? (webkit2gtk, etc.)
- [ ] Tauri initialized? (`src-tauri/` folder තියෙනවාද?)
- [ ] Scripts added? (package.json එකේ `tauri:dev` තියෙනවාද?)

---

## 🎯 Quick Start

### පළමු වතාවට:

```bash
# 1. Rust install කරන්න
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# 2. System deps
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev librsvg2-dev

# 3. Tauri init
npx tauri init

# 4. Run!
npm run tauri:dev
```

---

## 📚 Resources

- 🌐 [Tauri Official Docs](https://tauri.app)
- 📖 [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
- 🎓 [Tauri with Vite](https://tauri.app/v1/guides/getting-started/setup/vite)
- 💬 [Tauri Discord](https://discord.com/invite/tauri)

---

## 🎉 Summary

**Before (Electron):**
- ❌ 80 MB app size
- ❌ 300 MB memory
- ❌ Slow startup

**After (Tauri):**
- ✅ 5 MB app size (15x smaller!)
- ✅ 80 MB memory (4x less!)
- ✅ Fast startup
- ✅ Better security
- ✅ Native performance

---

## 🚀 Next Steps

1. **Setup:** Install Rust & dependencies (එකම වතාවක්)
2. **Init:** Run `npx tauri init`
3. **Develop:** `npm run tauri:dev`
4. **Build:** `npm run tauri:build`
5. **Enjoy:** Fast, small, secure desktop app! 🎊

---

**වැඩිපුර විස්තර සඳහා:**
- `TAURI-SETUP.md` - Detailed setup
- `TAURI-INFO.md` - Additional information





