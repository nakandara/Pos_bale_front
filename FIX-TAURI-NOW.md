# 🔧 FIX TAURI NOW - ඉක්මන් විසඳුම

## 🔍 ඔබේ System Status (from `npx tauri info`):

### ❌ Missing (Install කරන්න ඕනේ):
- ❌ **rustc** - Rust compiler
- ❌ **cargo** - Rust package manager
- ❌ **webkit2gtk-4.1** - Web rendering library
- ❌ **rsvg2** - SVG support

### ⚠️ Wrong Configuration:
- ❌ `frontendDist: ../build` → should be `../dist`
- ❌ `devUrl: http://localhost:3000` → should be `http://localhost:5173`

---

## 🚀 COMPLETE FIX - Copy & Paste

### Step 1: Install Rust (වැදගත්!)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Prompts:**
- "1) Proceed with installation" → Type: **1** [Enter]
- Wait for install (මිනිත්තු 2-3)

**After install:**
```bash
source $HOME/.cargo/env
```

**Verify:**
```bash
rustc --version
cargo --version
```

---

### Step 2: Install System Dependencies

```bash
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    librsvg2-dev \
    libayatana-appindicator3-dev \
    libxdo-dev
```

මේකට මිනිත්තු 2-3ක් විතර.

---

### Step 3: Fix Tauri Configuration

```bash
cd /home/pramod/POS/react-ts-app
npx tauri init --force
```

**Correct answers (වැදගත්!):**

```
✔ App name? › myapp-dashboard [Enter]

✔ Window title? › MyApp Dashboard [Enter]

✔ Web assets location? › ../dist [IMPORTANT!]

✔ Dev server URL? › http://localhost:5173 [IMPORTANT!]

✔ Frontend dev command? › npm run dev [Enter]

✔ Frontend build command? › npm run build [Enter]
```

---

### Step 4: Verify Setup

```bash
npx tauri info
```

**Check for:**
```
[✔] Environment
    ✔ webkit2gtk-4.1: installed
    ✔ rsvg2: installed
    ✔ rustc: 1.xx.x
    ✔ Cargo: 1.xx.x

[-] App
    - frontendDist: ../dist        ✓
    - devUrl: http://localhost:5173/ ✓
```

---

### Step 5: Run Tauri!

```bash
npm run tauri:dev
```

**පළමු run:**
- Rust compile වෙනවා (මිනිත්තු 2-3)
- Desktop window open වෙනවා
- Dashboard පෙන්වයි! 🎉

---

## 🎯 Complete Setup Script (All-in-One)

**Copy මේ සම්පූර්ණ script එක terminal එකට:**

```bash
#!/bin/bash

echo "🦀 Installing Rust..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

echo "📦 Loading Rust environment..."
source $HOME/.cargo/env

echo "✅ Verifying Rust..."
rustc --version
cargo --version

echo "📦 Installing system dependencies..."
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    librsvg2-dev \
    libayatana-appindicator3-dev \
    libxdo-dev

echo "🔧 Removing old Tauri config..."
rm -rf src-tauri

echo "🎯 Initializing Tauri with correct config..."
npx tauri init --yes \
    --app-name "myapp-dashboard" \
    --window-title "MyApp Dashboard" \
    --frontend-dist "../dist" \
    --dev-url "http://localhost:5173"

echo "✅ Setup complete! Checking status..."
npx tauri info

echo ""
echo "🚀 Ready to run: npm run tauri:dev"
```

**Save එක script එකක් විදියට:**

```bash
cat > setup-tauri.sh << 'EOF'
#!/bin/bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env
rustc --version && cargo --version
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev librsvg2-dev libayatana-appindicator3-dev libxdo-dev
rm -rf src-tauri
npx tauri init --yes --app-name "myapp-dashboard" --window-title "MyApp Dashboard" --frontend-dist "../dist" --dev-url "http://localhost:5173"
npx tauri info
echo "🚀 Ready! Run: npm run tauri:dev"
EOF

chmod +x setup-tauri.sh
./setup-tauri.sh
```

---

## 📝 Manual Step-by-Step (Prefer this if script fails)

### 1. Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### 2. System Deps:
```bash
sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
    curl wget file libssl-dev librsvg2-dev libayatana-appindicator3-dev
```

### 3. Re-init Tauri:
```bash
rm -rf src-tauri
npx tauri init --force
```

**Critical answers:**
- Web assets: `../dist` (NOT ../build)
- Dev URL: `http://localhost:5173` (NOT :3000)

### 4. Run:
```bash
npm run tauri:dev
```

---

## 🔍 Verify Each Step

### After Step 1 (Rust):
```bash
rustc --version
# Should show: rustc 1.xx.x
```

### After Step 2 (System deps):
```bash
dpkg -l | grep webkit2gtk
# Should show: libwebkit2gtk-4.1-dev
```

### After Step 3 (Tauri init):
```bash
cat src-tauri/tauri.conf.json | grep -A 2 build
# Should show:
#   "frontendDist": "../dist",
#   "devUrl": "http://localhost:5173"
```

### After all steps:
```bash
npx tauri info
# Should show all ✔ marks!
```

---

## ⚠️ Common Mistakes You Made

### ❌ Wrong: `../build`
Your Vite builds to `dist/`, not `build/`

### ❌ Wrong: `http://localhost:3000`
Your Vite dev server runs on port `5173`, not `3000`

### ✅ Correct Config:
```json
{
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:5173"
  }
}
```

---

## 🎯 Quick Fix Commands

```bash
# 1. Install everything
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev librsvg2-dev

# 2. Fix Tauri config
rm -rf src-tauri
npx tauri init --force
# Answer: ../dist and http://localhost:5173

# 3. Run
npm run tauri:dev
```

---

## ✅ Success Checklist

- [ ] Rust installed? (`rustc --version` works?)
- [ ] Cargo installed? (`cargo --version` works?)
- [ ] webkit2gtk installed? (`dpkg -l | grep webkit`)
- [ ] Config correct? (`frontendDist: ../dist`)
- [ ] Config correct? (`devUrl: http://localhost:5173`)
- [ ] `npx tauri info` shows all ✔ marks?

---

## 🚀 After All Steps:

```bash
npm run tauri:dev
```

**Expected:**
1. Vite dev server starts
2. Rust compiles (පළමු වතාවට slow)
3. Desktop window opens
4. Dashboard පෙන්වයි! 🎊

---

**ඉක්මන්ම fix කරන්න:**

1. Install Rust
2. Install system deps
3. Re-run `npx tauri init --force` with **correct** answers
4. `npm run tauri:dev`

Desktop app එක ready! 🎉






