# React TypeScript Dashboard App

A clean and simple dashboard application built with React, TypeScript, and Vite.

**🚀 Now supports Tauri for desktop apps!** (15x smaller than Electron)

## 🚀 Quick Start

### Development Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Project Structure

```
react-ts-app/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── dist/                # Production build output
└── package.json         # Dependencies and scripts
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## 📝 Available Scripts

### Web App:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Desktop App (Tauri):

| Command | Description |
|---------|-------------|
| `npm run tauri:dev` | Start Tauri development mode |
| `npm run tauri:build` | Build desktop application |

**📚 See [TAURI-QUICKSTART.txt](TAURI-QUICKSTART.txt) for Tauri setup**

## 🎨 Features

- Dashboard layout with sidebar navigation
- Responsive design (mobile & desktop)
- Three sections: Dashboard, Users, Settings
- Clean and modern UI

## 🔧 Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make your changes
5. Build: `npm run build`

## 📄 License

Private project
