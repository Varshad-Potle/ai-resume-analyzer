# AI Resume Analyzer

AI Resume Analyzer is a high-performance, client-side application designed to evaluate resumes against Applicant Tracking System (ATS) algorithms. Built with a modern, lightweight tech stack, it provides real-time feedback on content, structure, and keyword optimization without server-side latency.

---

**Live Demo:** [https://ai-resume-analyzer-opal-sigma.vercel.app](https://ai-resume-analyzer-opal-sigma.vercel.app)

---

## ✨ Features

* **PDF Resume Parsing** – Robust text extraction using Mozilla’s PDF.js
* **AI-Powered Analysis** – Intelligent evaluation of skills, experience, and relevance
* **ATS Compatibility Check** – Identifies formatting and keyword issues
* **Structured Resume Summary** – Clean, readable breakdown of resume content
* **Fast, Reactive UI** – Instant feedback with zero unnecessary re-renders
* **Modern UI Animations** – Subtle motion for better UX, not visual noise
* **Global State Management** – Predictable, minimal, and efficient

---

## 🧠 Tech Stack

| Category           | Technology            | Why It’s Used                               |
| ------------------ | --------------------- | ------------------------------------------- |
| Core Framework     | React + Vite          | Blazing-fast HMR and optimized builds       |
| State Management   | Zustand               | Lightweight global state without Redux pain |
| Styling            | Tailwind CSS          | Rapid, consistent UI without CSS hell       |
| PDF Engine         | PDF.js                | Industry-standard PDF parsing by Mozilla    |
| Utilities          | clsx + tailwind-merge | Safe dynamic class composition              |
| Animations         | tw-animate-css        | Preconfigured, clean UI animations          |
| Storage / Platform | Puter.js              | Browser-based storage & app utilities       |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Varshad-Potle/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2️⃣ Initialize the Project (Vite + React)

```bash
npm create vite@latest . -- --template react
npm install
```

### 3️⃣ Install Core Dependencies

```bash
npm install zustand pdfjs-dist
```

### 4️⃣ Install UI Utilities

```bash
npm install clsx tailwind-merge
```

### 5️⃣ Install Animation Library (Dev Dependency)

```bash
npm install -D tw-animate-css
```

### 6️⃣ Start the Development Server

```bash
npm run dev
```

App will be running at:

```
http://localhost:5173
```

---

## 🗂 Project Structure (High-Level)

```
src/
│── app/
  │── components/     
  │── routes/            
  │── lib/
  │── app.css
  │── root.tsx             
│── constants/            
│── types/

```

## 🔐 Security & Privacy

* No silent data leaks
* Resume data stays client-side unless explicitly stored
* PDF parsing happens locally in the browser

---
