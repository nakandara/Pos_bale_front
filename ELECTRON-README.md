# MyApp Dashboard - Electron Desktop Application

මේ application එක React + TypeScript + Electron භාවිතයෙන් build කරපු desktop application එකක්.

## 🚀 Development Mode එකේ Run කරන්න

```bash
# Development mode - Hot reload සමග
npm run electron:dev
```

මේ command එක Vite dev server එක සහ Electron window එක එකට එක්ක run කරයි.

## 📦 Desktop Application එකක් විදියට Build කරන්න

### Linux සඳහා (AppImage සහ .deb)
```bash
npm run electron:build:linux
```

### Windows සඳහා (Installer සහ Portable)
```bash
npm run electron:build:win
```

### macOS සඳහා (DMG සහ ZIP)
```bash
npm run electron:build:mac
```

### සියලු platforms සඳහා
```bash
npm run electron:build
```

## 📁 Build Output

Build කරපු files `release/` folder එකේ තියෙනවා:

- **Linux**: `release/*.AppImage` සහ `release/*.deb`
- **Windows**: `release/*.exe` (installer) සහ `release/*.exe` (portable)
- **macOS**: `release/*.dmg` සහ `release/*.zip`

## 🎯 Commands සාරාංශය

| Command | විස්තරය |
|---------|---------|
| `npm run dev` | Vite dev server පමණක් |
| `npm run electron` | Built app එක electron එකේ run කරන්න |
| `npm run electron:dev` | Development mode (hot reload) |
| `npm run electron:build` | Desktop app build කරන්න |
| `npm run electron:build:linux` | Linux app build කරන්න |
| `npm run electron:build:win` | Windows app build කරන්න |
| `npm run electron:build:mac` | macOS app build කරන්න |

## ⚙️ Configuration

### Application Details

`package.json` file එකේ `build` section එකේ customize කරන්න පුළුවන්:

```json
{
  "build": {
    "appId": "com.myapp.react-ts-app",
    "productName": "MyApp Dashboard"
  }
}
```

### Window Size

`electron.js` file එකේ window size change කරන්න පුළුවන්:

```javascript
const win = new BrowserWindow({
  width: 1100,
  height: 700,
  // ...
});
```

## 🔧 Icon හදන්නේ කොහොමද

Application icon එකක් add කරන්න නම්:

1. `build/` folder එකේ icon files දාන්න:
   - `icon.png` (512x512 හෝ 1024x1024) - Linux සඳහා
   - `icon.ico` - Windows සඳහා
   - `icon.icns` - macOS සඳහා

2. නැතිනම් online tools භාවිතයෙන් convert කරන්න:
   - [ICO Convert](https://icoconvert.com/) - PNG to ICO
   - [ICNS Maker](https://cloudconvert.com/png-to-icns) - PNG to ICNS

## 🐛 Troubleshooting

### Linux සඳහා sandbox error එනවා නම්

```bash
npm run fix:sandbox
```

### Build එක fail වෙනවා නම්

1. Node modules clean කරන්න:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Dist folder clean කරන්න:
```bash
rm -rf dist release
npm run build
```

## 📝 Additional Notes

- Development mode එකේ application එක `http://localhost:5173` load කරයි
- Production build එකේ `dist/index.html` file එක load කරයි
- Build කරපු files `release/` folder එකේ save වෙනවා

## 🎨 Current Features

- Dashboard layout with sidebar navigation
- Responsive design (mobile සහ desktop)
- Three sections: Dashboard, Users, Settings
- Clean and modern UI

Enjoy your desktop application! 🎉

