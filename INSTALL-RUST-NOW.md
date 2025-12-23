# 🦀 Install Rust NOW - දැන් Rust Install කරන්න

## ❌ Error එක ඔබට ලැබුණේ:

```
failed to run 'cargo metadata' command: No such file or directory
```

### හේතුව:
**Rust installed කරලා නැහැ!** Tauri එකට Rust compiler අවශ්‍යයි.

---

## ✅ විසඳුම - 2 Options

### Option 1: Official Rust Installer (Recommended) ⭐

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Install වෙන විට:**
1. Message එකක් පෙන්වයි installation options සමග
2. Type කරන්න: **1** (default installation)
3. Enter press කරන්න
4. Install එක complete වෙනකොට (මිනිත්තු 2-3):

```bash
source $HOME/.cargo/env
```

**Verify:**
```bash
rustc --version
cargo --version
```

ඔබට version numbers පෙන්වන්න ඕනේ!

---

### Option 2: System Package Manager (Alternative)

```bash
sudo apt update
sudo apt install rustc cargo
```

නමුත් **Option 1 recommend කරනවා** (latest version)

---

## 🚀 After Rust Install:

### Step 1: Verify Rust

```bash
rustc --version
cargo --version
```

**Output එක වගේ:**
```
rustc 1.xx.x (xxxxxx)
cargo 1.xx.x (xxxxxx)
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
    libayatana-appindicator3-dev
```

---

### Step 3: Initialize Tauri

```bash
cd /home/pramod/POS/react-ts-app
npx tauri init
```

**සියලු prompts වලට Enter press කරන්න:**

```
✔ App name? › myapp-dashboard [Enter]
✔ Window title? › MyApp Dashboard [Enter]
✔ Web assets? › ../dist [Enter]
✔ Dev server? › http://localhost:5173 [Enter]
✔ Frontend dev? › npm run dev [Enter]
✔ Frontend build? › npm run build [Enter]
```

---

### Step 4: Run Tauri Dev

```bash
npm run tauri:dev
```

**පළමු run:**
- Rust compile වෙනවා (මිනිත්තු 2-3)
- Desktop window open වෙනවා
- Dashboard පෙන්වයි! 🎉

---

## 📝 Complete Setup Script

**සියල්ල එකවර කරන්න:**

```bash
# 1. Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# Type: 1 [Enter]

# 2. Load Rust environment
source $HOME/.cargo/env

# 3. Verify
rustc --version
cargo --version

# 4. Install system dependencies
sudo apt update
sudo apt install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    librsvg2-dev \
    libayatana-appindicator3-dev

# 5. Initialize Tauri
cd /home/pramod/POS/react-ts-app
npx tauri init
# Press Enter for all prompts

# 6. Run!
npm run tauri:dev
```

---

## 🔧 Troubleshooting

### Q: Rust install වෙනවා ඇත්තටම?

```bash
rustc --version
```

Version එක පෙන්වනවා නම් ✅ Installed!  
"command not found" නම් ❌ Not installed

---

### Q: `source $HOME/.cargo/env` කරන්න ඕනේද?

YES! Rust install කරපු terminal එකේම:

```bash
source $HOME/.cargo/env
```

නැතිනම් terminal restart කරන්න.

---

### Q: System dependencies කරන්න ඕනේද?

YES! Tauri එකට webkit2gtk සහ වෙනත් libraries අවශ්‍යයි:

```bash
sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
    curl wget file libssl-dev librsvg2-dev
```

---

## ✅ Checklist

පියවර අනුව:

1. [ ] Rust install කරන්න
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. [ ] Environment load කරන්න
   ```bash
   source $HOME/.cargo/env
   ```

3. [ ] Verify කරන්න
   ```bash
   rustc --version && cargo --version
   ```

4. [ ] System deps install කරන්න
   ```bash
   sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
       curl wget file libssl-dev librsvg2-dev
   ```

5. [ ] Tauri init කරන්න
   ```bash
   npx tauri init
   ```

6. [ ] Run කරන්න
   ```bash
   npm run tauri:dev
   ```

---

## 🎯 Quick Fix

**ඉක්මන්ම fix කරන්න:**

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# (Type 1 and press Enter when prompted)

# Load environment
source $HOME/.cargo/env

# Verify
rustc --version
cargo --version

# If versions show up, Rust is installed! ✅
# Now install system dependencies and run npx tauri init
```

---

## 📚 වැඩිපුර විස්තර

- `START-WITH-TAURI.md` - Full setup guide
- `TAURI-QUICKSTART.txt` - Quick reference
- `TAURI-GUIDE.md` - Complete documentation

---

**ප්‍රථම: Rust install කරන්න!**  
**දෙවන: System deps install කරන්න**  
**තුන්වන: `npx tauri init` run කරන්න**  
**අවසානයේ: `npm run tauri:dev` run කරන්න**  

Desktop app එක open වෙයි! 🎊





