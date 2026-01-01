# 🦀 Tauri Setup Guide - සම්පූර්ණ මාර්ගෝපදේශය

## Tauri කියන්නේ මොකක්ද?

Tauri එක **Electron වලට වඩා හොඳ alternative එකක්**:

| Feature | Tauri | Electron |
|---------|-------|----------|
| **Size** | ~3-5 MB | ~50-100 MB |
| **Speed** | ⚡ Very Fast | Normal |
| **Memory** | Low | High |
| **Backend** | Rust | Node.js |
| **Security** | 🔒 Better | Good |

---

## 📋 Prerequisites - පළමුව Install කරන්න ඕනේ

### 1. Rust Install කරන්න (වැදගත්!)

Tauri එක Rust භාවිතා කරනවා backend සඳහා. Install කරන්න:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install වෙන විට **option 1** (default) select කරන්න.

පසුව terminal restart කරන්න හෝ:
```bash
source $HOME/.cargo/env
```

**Verify:**
```bash
rustc --version
cargo --version
```

---

### 2. System Dependencies Install කරන්න

**Ubuntu/Debian:**
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

---

## 🚀 Tauri Setup කරන්න

### Step 1: Tauri CLI Install කරන්න

```bash
cd /home/pramod/POS/react-ts-app
npm install -D @tauri-apps/cli @tauri-apps/api
```

---

### Step 2: Tauri Initialize කරන්න

```bash
npx tauri init
```

**Prompts වලට answers:**
1. App name: `MyApp Dashboard` (Enter)
2. Window title: `MyApp Dashboard` (Enter)
3. Web assets location: `../dist` (Enter)
4. Dev server URL: `http://localhost:5173` (Enter)
5. Frontend dev command: `npm run dev` (Enter)
6. Frontend build command: `npm run build` (Enter)

මේක `src-tauri/` folder එකක් create කරයි.

---

### Step 3: Package.json එකට Scripts Add කරන්න

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "tauri": "tauri",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build"
  }
}
```

---

## 🎯 භාවිතය

### Development Mode:

```bash
npm run tauri:dev
```

මේක:
- Vite dev server start කරයි
- Desktop window එකක් open කරයි
- Hot reload enable කරයි

---

### Production Build:

```bash
npm run tauri:build
```

Build output: `src-tauri/target/release/bundle/`

**Linux:**
- `*.deb` - Debian package
- `*.AppImage` - Universal Linux binary

---

## 🔧 Troubleshooting

### Rust Install වෙන්නේ නැහැ?

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### System dependencies නැහැ?

```bash
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev librsvg2-dev
```

### Build fail වෙනවා?

```bash
cargo clean
cd src-tauri && cargo build
```

---

## 📦 Build Output Locations

```
src-tauri/target/
├── release/
│   ├── bundle/
│   │   ├── deb/           # .deb packages
│   │   ├── appimage/      # .AppImage files
│   │   └── ...
│   └── myapp-dashboard    # Executable
```

---

## ✅ Quick Commands

```bash
# Development
npm run tauri:dev

# Build
npm run tauri:build

# Check Tauri info
npx tauri info
```

---

## 🎉 Benefits

✅ **3-5 MB** app size (Electron: 50-100 MB)  
✅ **Fast startup** (Rust backend)  
✅ **Low memory** usage  
✅ **Better security** (Rust safety)  
✅ **Native performance**  
✅ **Cross-platform** (Linux, Windows, macOS)  

---

## 📚 Resources

- [Tauri Docs](https://tauri.app)
- [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
- [Tauri with React](https://tauri.app/v1/guides/getting-started/setup/vite)

---

**ඊළඟට:** Rust install කරලා `npm install -D @tauri-apps/cli` run කරන්න!






