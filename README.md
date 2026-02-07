# PathshalaAI — AI-Powered Academic Notes Platform

> **Pathshala** (पाठशाला) means "school" in Nepali/Hindi. PathshalaAI is an intelligent academic platform that helps students upload, share, and summarize study notes using AI.

## ✨ Features

- **📄 AI PDF Summarizer** — Upload any PDF and get an instant AI-generated summary powered by Groq or OpenRouter
- **🌓 Dark / Light Mode** — Toggle between themes, with system preference detection
- **📚 Browse Notes** — Search and filter study materials by college, program, subject, year, and semester
- **📊 Dashboard** — Track uploads, downloads, views, and ratings
- **⬆️ Upload System** — Share notes with file upload and classification
- **🔐 Authentication** — Login and signup with multi-step registration
- **🛠️ Admin Panel** — Manage colleges, programs, subjects, notes, and users

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS 4 + Custom Design System |
| Routing | React Router DOM 7 |
| Backend API | FastAPI (see `../server`) |
| AI Platforms | Groq, OpenRouter |
| Fonts | Fraunces, Source Sans 3, JetBrains Mono |

## 📁 Project Structure

```
src/
├── components/
│   ├── common/      # Button, Card, Badge, Modal, ThemeToggle, etc.
│   ├── layout/      # Navbar, Footer, Sidebar
│   ├── notes/       # NoteCard, FileUpload, NotesFilter
│   ├── chat/        # MessageBubble, ChatInput
│   └── admin/       # AdminForm, AdminStats
├── pages/           # HomePage, SummaryPage, DashboardPage, etc.
├── layouts/         # MainLayout, AuthLayout, ChatLayout
├── routes/          # React Router config
├── data/            # Mock data
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, and CTA |
| AI Summary | `/summary` | Upload PDFs → get AI summaries (Groq / OpenRouter) |
| Dashboard | `/dashboard` | User stats and activity |
| Notes | `/notes` | Browse and search notes |
| Upload | `/upload` | Upload new notes |
| Admin | `/admin` | Admin panel |
| About | `/about` | About page |
| Contact | `/contact` | Contact form |
| Login | `/login` | User authentication |
| Signup | `/signup` | Multi-step registration |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend server running (see `../server/README.md`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

### Backend Connection

The AI Summarizer calls the FastAPI backend at `http://127.0.0.1:8000`. Make sure the server is running:

```bash
cd ../server
source .venv/bin/activate
uvicorn app.main:app --reload
```

## 🎨 Design System

- **Light theme** — Warm academic palette with dark blue primary (`#1e3a5f`) and gold accent (`#c9a227`)
- **Dark theme** — Deep slate backgrounds with softened blue primary and muted tones
- **Components** — Buttons, Cards, Badges, Modals, Dropdowns, Inputs in multiple variants
- **Typography** — Fraunces (display), Source Sans 3 (body), JetBrains Mono (code)

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 License

MIT
