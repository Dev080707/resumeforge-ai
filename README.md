<div align="center">

# 📄 ResumeForge AI

**Build a better resume. Let AI do the heavy lifting — so you don't have to stare at a blank page questioning your entire career.**

[![Live Demo](https://img.shields.io/badge/demo-live-black?style=for-the-badge)](https://resumeforge-ai-puce.vercel.app/)
![React](https://img.shields.io/badge/React-18-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square)
![Express](https://img.shields.io/badge/Express-black?style=flat-square)
![Gemini](https://img.shields.io/badge/Gemini-AI-black?style=flat-square)

**[🚀 Live Demo →](https://resumeforge-ai-puce.vercel.app/)**

</div>

---

## Why this exists

Writing a resume is the only task in life where you're expected to sound humble and impressive
in the same sentence. "Detail-oriented team player who single-handedly saved the company" —
sure, Karen. ResumeForge AI exists so you don't have to write that sentence yourself. Feed it
your actual experience, skills, and projects, and it turns them into something a hiring manager
(or an ATS robot with the personality of a filing cabinet) will actually take seriously.

## ✨ Features

- **AI-Powered Writing** — turns your rough notes into a polished summary and sharp bullet points
- **ATS-Friendly Formatting** — because somewhere, a robot is skimming your resume for 6 seconds before deciding your fate
- **Job Description Matching** — paste a job post, get a match score and a list of what you're missing (no, it won't let you fake "5 years of Docker experience")
- **3 Resume Templates** — Professional, Modern, and Minimal, switchable without losing your data
- **AI Resume Compatibility Score** — an honest, non-scientific gut check, clearly labeled as such
- **One-Click PDF Export** — real A4, real page breaks, real download
- **Demo Mode** — try the entire app with zero API key and zero commitment, like a situationship but for software
- **Dark Mode** — for 2 a.m. job-hunting sessions
- **Local Autosave** — your data lives in your browser, not on someone else's server judging your work history

## 🖥️ Live Demo

**[https://resumeforge-ai-puce.vercel.app/](https://resumeforge-ai-puce.vercel.app/)**

Click **Try Demo Data** on the builder page to skip data entry entirely and see the whole flow
in under two minutes.

## 🧱 Tech Stack

| Layer      | Tech                                                   |
|------------|---------------------------------------------------------|
| Frontend   | React, Vite, TypeScript, Tailwind CSS, lucide-react      |
| Backend    | Node.js, Express, TypeScript                            |
| AI         | Google Gemini API (`@google/generative-ai`)              |
| PDF Export | html2canvas + jsPDF                                      |
| Storage    | Browser `localStorage` (no login, no database required)  |

## 🏗️ Architecture

```text
React (client)
   ↓
Express (server) — API key never leaves the backend
   ↓
Gemini API — strict prompt, "never invent facts"
   ↓
Structured JSON response
   ↓
Resume renderer (3 templates)
   ↓
PDF export
```

## 🚀 Getting Started

```bash
git clone https://github.com/<your-username>/resumeforge-ai.git
cd resumeforge-ai
npm run install:all
```

### Environment Variables

```bash
cp .env.example server/.env
```

Add your key (get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)):

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

No key? No problem — flip on **Demo Mode** in the app and it'll happily fake it 'til you make it.

### Run Locally

```bash
npm run dev
```

Frontend → `http://localhost:5173`
Backend → `http://localhost:5000`

## 🔌 API Endpoints

| Method | Endpoint               | Description                          |
|--------|-------------------------|----------------------------------------|
| GET    | `/api/health`           | Server + AI configuration status       |
| POST   | `/api/resume/generate`  | Generates resume content via AI        |
| POST   | `/api/resume/analyze`   | Returns ATS Compatibility Score + job match |

## 📁 Project Structure

```text
resumeforge-ai/
├── client/    React + Vite + TypeScript frontend
├── server/    Express + TypeScript backend
├── .env.example
└── README.md
```

## 🗺️ Roadmap

- [ ] User accounts + cloud resume storage
- [ ] More templates
- [ ] Resume version history
- [ ] Cover letter generation
- [ ] A "Confidence Boost" button that just says "you've got this" (kidding... unless?)

## ⚠️ A Note on Honesty

The AI is instructed to **never invent** companies, titles, dates, skills, or achievements you
didn't provide. It can make your real experience sound sharper — it will not give you a
computer science degree you don't have, no matter how badly you want the AI to pull through
for you at 3 a.m. before an application deadline.

## 📄 License

MIT — free to use, fork, and improve. If it lands you a job, a shoutout is not required but
would be emotionally appreciated.

---

<div align="center">

Built for the Generative AI Mini Challenge.
Good luck out there — the job market is a lot, but at least your resume won't be.

</div>
