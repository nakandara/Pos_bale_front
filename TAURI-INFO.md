# 📘 Tauri Information - සවිස්තරාත්මක තොරතුරු

## 🎯 Tauri vs Electron - සම්පූර්ණ සංසන්දනය

### App Size Comparison

| Metric | Tauri | Electron |
|--------|-------|----------|
| **Final App Size** | 3-5 MB | 50-100 MB |
| **Minimum Binary** | ~3 MB | ~47 MB |
| **With Dependencies** | ~5 MB | ~80 MB |
| **Compressed** | ~2 MB | ~35 MB |

### Performance Comparison

| Metric | Tauri | Electron |
|--------|-------|----------|
| **Startup Time** | <0.5s | 1-2s |
| **Memory Usage** | 80-150 MB | 300-500 MB |
| **CPU Usage** | Low | Medium |
| **Battery Impact** | Minimal | Higher |

### Technology Stack

| Component | Tauri | Electron |
|-----------|-------|----------|
| **Frontend** | Any (React, Vue, etc.) | Any |
| **Backend** | Rust | Node.js |
| **Rendering** | System WebView | Chromium |
| **Process Model** | Single | Multi-process |

---

## 🏗️ Architecture

### Tauri Architecture:

```
┌─────────────────────────────────────┐
│        Frontend (React/Vite)        │
│     HTML + CSS + JavaScript         │
└──────────────┬──────────────────────┘
               │
       ┌───────▼────────┐
       │   Tauri API    │
       │  (TypeScript)  │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │  Rust Backend  │
       │   (tauri-core) │
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │  System WebView│
       │  (webkit2gtk)  │
       └────────────────┘
```

### Benefits:
✅ Single binary  
✅ Native performance  
✅ Small size  
✅ Uses system webview (no Chromium bundled)  

---

## 📦 What Gets Installed?

### NPM Packages (Already Done):

```json
{
  "devDependencies": {
    "@tauri-apps/cli": "^2.x.x",    // Tauri CLI
    "@tauri-apps/api": "^2.x.x"     // Frontend API
  }
}
```

### System Requirements (Need to Install):

1. **Rust** (~1 GB)
   - `rustc` - Rust compiler
   - `cargo` - Rust package manager

2. **System Libraries** (~100 MB)
   - `webkit2gtk-4.1` - Web rendering
   - `build-essential` - C/C++ compiler
   - `libssl-dev` - SSL library
   - `librsvg2-dev` - SVG support

---

## 🚀 Development Workflow

### First Time Setup (One Time Only):

```bash
# 1. Install Rust (5-10 minutes)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Install system deps (2-3 minutes)
sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
    curl wget file libssl-dev librsvg2-dev

# 3. Initialize Tauri (1 minute)
npx tauri init
```

### Daily Development:

```bash
# Start development
npm run tauri:dev

# First run: 2-3 minutes (Rust compile)
# Subsequent runs: 10-30 seconds
```

### Building for Production:

```bash
# Build
npm run tauri:build

# Time: 5-10 minutes (optimized Rust compile)
# Output: AppImage + .deb in src-tauri/target/release/bundle/
```

---

## 📁 Project Structure After Init

```
react-ts-app/
├── src/                          # React frontend
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── src-tauri/                    # Tauri backend (NEW)
│   ├── src/
│   │   ├── main.rs              # Rust entry point
│   │   └── lib.rs               # Tauri app logic
│   │
│   ├── Cargo.toml               # Rust dependencies
│   ├── Cargo.lock               # Dependency lock file
│   ├── tauri.conf.json          # Tauri configuration
│   ├── build.rs                 # Build script
│   │
│   ├── icons/                   # App icons
│   │   ├── icon.icns            # macOS
│   │   ├── icon.ico             # Windows
│   │   └── icon.png             # Linux
│   │
│   └── target/                  # Build output
│       ├── debug/               # Debug builds
│       └── release/             # Production builds
│           └── bundle/          # Installable packages
│               ├── deb/         # .deb packages
│               └── appimage/    # AppImage files
│
├── dist/                        # Vite build output
├── node_modules/
├── package.json
└── vite.config.ts
```

---

## ⚙️ Configuration Files

### 1. `src-tauri/tauri.conf.json`

Main Tauri configuration:

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
    "security": {
      "csp": null
    },
    "windows": [
      {
        "title": "MyApp Dashboard",
        "width": 1100,
        "height": 700,
        "resizable": true,
        "fullscreen": false,
        "decorations": true
      }
    ]
  }
}
```

### 2. `src-tauri/Cargo.toml`

Rust dependencies:

```toml
[package]
name = "myapp-dashboard"
version = "1.0.0"
edition = "2021"

[dependencies]
tauri = { version = "2", features = [] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[build-dependencies]
tauri-build = { version = "2" }
```

---

## 🎨 Customization Options

### Window Settings:

Edit `src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [
      {
        "title": "Your App Name",
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "maxWidth": 1920,
        "maxHeight": 1080,
        "resizable": true,
        "maximizable": true,
        "minimizable": true,
        "closable": true,
        "fullscreen": false,
        "transparent": false,
        "decorations": true,
        "alwaysOnTop": false,
        "center": true
      }
    ]
  }
}
```

### App Identifier:

```json
{
  "identifier": "com.yourname.yourapp"
}
```

Important: Reverse domain notation (com.company.appname)

---

## 🔒 Security

### Tauri Security Features:

✅ **No Remote Code Execution** - Only bundled code runs  
✅ **Sandboxed Webview** - Limited system access  
✅ **Command Allowlisting** - Explicit backend function calls  
✅ **CSP Protection** - Content Security Policy  
✅ **Rust Safety** - Memory safe backend  

### vs Electron:

Tauri has **better default security** because:
- Rust prevents memory issues
- No Node.js in renderer (no direct filesystem access)
- Explicit API calls only
- Smaller attack surface

---

## 📊 Build Output

### After `npm run tauri:build`:

```
src-tauri/target/release/bundle/
├── appimage/
│   ├── myapp-dashboard_1.0.0_amd64.AppImage      (~5 MB)
│   └── myapp-dashboard_1.0.0_amd64.AppImage.tar.gz
│
└── deb/
    └── myapp-dashboard_1.0.0_amd64.deb           (~5 MB)
```

### Installation:

**AppImage:**
```bash
chmod +x *.AppImage
./myapp-dashboard_1.0.0_amd64.AppImage
```

**DEB:**
```bash
sudo dpkg -i myapp-dashboard_1.0.0_amd64.deb
# Uninstall: sudo apt remove myapp-dashboard
```

---

## 💡 Tips & Best Practices

### 1. Development:

```bash
# Hot reload works!
npm run tauri:dev
# Edit React files → Auto reload
```

### 2. First Build Slow:

```bash
# First: 2-3 minutes (compile everything)
# Next: 10-30 seconds (incremental)
```

### 3. Clean Build:

```bash
cd src-tauri
cargo clean
cd ..
npm run tauri:build
```

### 4. Check Tauri Info:

```bash
npx tauri info
# Shows: System, Rust, Node, Tauri versions
```

---

## 🌐 Distribution

### AppImage Advantages:

✅ No installation needed  
✅ Works on any Linux distro  
✅ Portable (USB stick)  
✅ No root required  

### DEB Package Advantages:

✅ Proper installation  
✅ Desktop integration  
✅ Easy updates  
✅ Uninstall support  

---

## 📚 Resources

### Official:
- [Tauri Docs](https://tauri.app)
- [API Reference](https://tauri.app/v1/api/js/)
- [Tauri GitHub](https://github.com/tauri-apps/tauri)

### Community:
- [Discord](https://discord.com/invite/tauri)
- [Reddit](https://reddit.com/r/tauriapp)
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri)

---

## ✅ Checklist Before Starting

### System Ready?

```bash
# Check Rust
rustc --version          # Should show version
cargo --version          # Should show version

# Check webkit
dpkg -l | grep webkit    # Should show webkit2gtk

# Check Tauri
npx tauri --version      # Should show version
```

### Project Ready?

- [ ] `src-tauri/` folder exists?
- [ ] `package.json` has tauri scripts?
- [ ] Vite config correct?
- [ ] React app builds? (`npm run build`)

---

## 🎉 Summary

**Tauri offers:**
- 🚀 15x smaller apps
- ⚡ 4x less memory
- 🔒 Better security
- 🦀 Rust performance
- 💰 Free & open source

**Perfect for:**
- Desktop apps from web apps
- Cross-platform tools
- Lightweight applications
- Security-focused apps

**සාර්ථකත්වය සඳහා ආරම්භ කරන්න!** 🎊




