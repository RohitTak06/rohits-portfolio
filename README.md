# Rohit Tak — Computer Science Student & Software Developer

[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Express.js%20%2B%20Node.js-339933.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack personal portfolio for **Rohit Tak**, a Computer Science student at **JK Lakshmipat University, Jaipur**.

The portfolio highlights projects in emergency healthcare support, sports management, and computer vision. Its Express/MongoDB backend handles contact submissions and serves the PDF and Word resume files.

## Profile & Quick Links

- **Developer:** Rohit Tak
- **Institution:** JK Lakshmipat University (JKLU), Jaipur
- **Degree:** B.Tech in Computer Science (2024–2028)
- **GitHub:** [https://github.com/RohitTak06](https://github.com/RohitTak06)
- **LinkedIn:** [https://www.linkedin.com/in/rohit-tak-7150762b8/](https://www.linkedin.com/in/rohit-tak-7150762b8/)

---

## 🌟 Core Features

### 🖥️ Frontend (`/client`)
- **Modern Design System:** Built with Tailwind CSS, HSL design tokens, glassmorphism, responsive typography, and glowing gradients.
- **Theme Toggle:** Fully functional, persistent Dark and Light mode (defaults to dark mode with zero flash of unstyled content).
- **Animated Hero:** GSAP line-hover typography, a scroll-responsive 3D fluid-cube backdrop, and links to projects and resume downloads.
- **IconSpace Integration:** Dynamic animated SVG icons derived and inspired by [IconSpace](https://iconspace.dev/) with `currentColor` inheritance and micro-interactions.
- **Interactive Project Showcase:** Filter and inspect three resume-aligned projects, with descriptions, technology badges, and source links.
- **Interactive Contact Form:** Real-time client-side validation, loading spinners, honeypot anti-spam protection, and celebratory confetti upon confirmed database persistence.
- **Dual Resume Modal:** Modal allowing instant download of both official PDF and editable Word (DOCX) resumes directly via the Express API.
- **Fully Responsive & Accessible:** Fluid scaling across mobile, tablet, and desktop viewports with keyboard navigation support and `prefers-reduced-motion` compliance.

### ⚙️ Backend & API (`/server`)
- **Express REST API:** Structured controller-service-route pattern with centralized error handling.
- **MongoDB & Mongoose:** Schema validation, automated timestamps, indexing, and persistent storage of contact messages.
- **Binary Resume Serving:** Express routes serving verified binary PDF and Word DOCX files with correct MIME types and `Content-Disposition` headers.
- **Hardened Security:**
  - `Helmet` for secure HTTP headers.
  - `CORS` configured with environment origin guards.
  - `express-rate-limit` protecting contact form submissions against spam flooding.
  - Payload size limiting (`50kb`) preventing DoS attacks.
  - Automated input sanitization and XSS protection.

---

## Featured Projects

The project links below are the repositories listed with these projects in the resume. No live-demo URLs were supplied, so the portfolio links to source repositories instead.

| Project | Tech Stack | Category | Problem Solved | GitHub Link |
|---|---|---|---|---|
| **SAHARA v2.0** | Next.js, React, Tailwind CSS, Prisma, PostgreSQL, Leaflet | Full Stack | Centralizes access to hospitals, ambulance services, and blood banks. | [SAHARA Repository](https://github.com/Tejender09/SAHARA-v2.0) |
| **Muqabla** | Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS | Full Stack | Supports sports event and participant management with an admin dashboard. | [Muqabla Repository](https://github.com/RohitTak06/Muqabla) |
| **Driver Drowsiness Detection** | Python, OpenCV, MediaPipe | AI & Computer Vision | Monitors driver alertness from a webcam feed using eye and mouth aspect ratios. | [Driver Drowsiness Repository](https://github.com/Riyachauhan18/driver-drowsiness-detection) |

---

## 📁 Repository Architecture

```text
rohit-portfolio/
├── client/                     # Frontend React (Vite) Application
│   ├── public/                 # Static assets & generated resume binaries
│   │   ├── Rohit_Tak_Resume.pdf
│   │   ├── Rohit_Tak_Resume.docx
│   │   ├── resume.pdf
│   │   └── resume.docx
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── AnimatedIcon.jsx # IconSpace animated SVG integration
│   │   │   ├── Navbar.jsx      # Glassmorphic responsive header
│   │   │   ├── Footer.jsx      # Social & navigation footer
│   │   │   ├── ProjectModal.jsx# Architectural deep-dive modal
│   │   │   ├── ResumeDownloadModal.jsx # PDF/DOCX downloader
│   │   │   └── ThemeToggle.jsx # Dark/Light mode switcher
│   │   ├── data/               # Verified data sources
│   │   │   ├── projectsData.js
│   │   │   ├── skillsData.js
│   │   │   └── experienceData.js
│   │   ├── hooks/
│   │   │   └── useTheme.js     # Persistent theme management hook
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── sections/           # Modular SPA sections
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Achievements.jsx
│   │   │   └── Contact.jsx
│   │   ├── services/
│   │   │   └── api.js          # HTTP service connecting to Express API
│   │   ├── styles/
│   │   │   └── index.css       # Tailwind & custom CSS design tokens
│   │   ├── App.jsx             # React Router routing setup
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend Node.js & Express REST API
│   ├── src/
│   │   ├── assets/resume/      # Binary resume storage
│   │   │   ├── Rohit_Tak_Resume.pdf
│   │   │   └── Rohit_Tak_Resume.docx
│   │   ├── config/
│   │   │   └── db.js           # Mongoose connection & event lifecycle
│   │   ├── controllers/
│   │   │   ├── contactController.js # Validation, storage, spam handling
│   │   │   └── resumeController.js  # Binary PDF/DOCX stream serving
│   │   ├── middleware/
│   │   │   ├── errorHandler.js # Centralized 404 & error shield
│   │   │   └── rateLimiter.js  # IP rate limiting
│   │   ├── models/
│   │   │   └── ContactMessage.js # Mongoose contact schema
│   │   ├── routes/
│   │   │   └── api.js          # /api/health, /api/contact, /api/resume/*
│   │   ├── validators/
│   │   │   └── contactValidator.js
│   │   ├── app.js              # Express app configuration & middleware
│   │   └── server.js           # Server listen & graceful shutdown
│   ├── scripts/
│   │   └── generate-resumes.js # Generates valid binary PDF & DOCX resumes
│   ├── tests/
│   │   └── api.test.js         # Automated backend test suite
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── project-audit.md        # Complete discovery and codebase audit report
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies Utilized |
|---|---|
| **Frontend Core** | React 18, Vite 6, React Router DOM 6 |
| **Styling & Motion** | Tailwind CSS, Framer Motion, HSL Tokens, Glassmorphism |
| **Iconography** | Lucide React, [IconSpace](https://iconspace.dev/) Animated SVGs |
| **Backend Core** | Node.js 24, Express.js 4.21 (ES Modules) |
| **Database** | MongoDB Atlas / Local MongoDB, Mongoose 8 ODM |
| **Security** | Helmet 8, CORS, Express-Rate-Limit, Validator.js, Honeypot Anti-Spam |
| **Testing** | Node.js Test Runner, Supertest, MongoDB-Memory-Server |
| **Document Generation** | PDFKit (Binary PDF), docx (Binary Word Document) |

---

## 🚦 REST API Documentation

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies operational readiness of API and database connection without exposing internal secrets.
- **Sample Response:**
  ```json
  {
    "success": true,
    "status": "healthy",
    "timestamp": "2026-10-17T12:00:00.000Z",
    "uptime": 120,
    "services": {
      "api": "operational",
      "database": "connected"
    },
    "version": "1.0.0"
  }
  ```

### 2. Contact Message Submission
- **Endpoint:** `POST /api/contact`
- **Rate Limit:** 10 submissions per 15 minutes per IP
- **Payload Schema:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello Rohit, interested in discussing full-stack roles."
  }
  ```
- **Validation Rules:**
  - `name`: 2 to 100 characters, required.
  - `email`: RFC-valid email address, required.
  - `message`: 10 to 3000 characters, required.
  - `bot_field`: Honeypot field; if populated, submission is silently dropped.
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Thank you, Rohit has received your message and will respond shortly!",
    "data": {
      "id": "6710ea1234567890abcdef12",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "createdAt": "2026-10-17T12:05:00.000Z"
    }
  }
  ```

### 3. Binary Resume Downloads
- **Endpoint:** `GET /api/resume/pdf`
  - **MIME Type:** `application/pdf`
  - **Header:** `Content-Disposition: attachment; filename="Rohit_Tak_Resume.pdf"`
  - **Query:** `?inline=true` streams the PDF directly in the browser.
- **Endpoint:** `GET /api/resume/docx`
  - **MIME Type:** `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  - **Header:** `Content-Disposition: attachment; filename="Rohit_Tak_Resume.docx"`

---

## 💻 Local Installation & Setup Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (Tested on Node.js v24.14.0)
- **npm:** v9.0.0 or higher
- **MongoDB:** Local MongoDB instance or free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/RohitTak06/rohit-tak-portfolio.git
cd rohit-tak-portfolio
```

### 2. Install All Dependencies
Install dependencies for root, client, and server in one command:
```bash
npm run install:all
```
*(Or install manually inside each folder: `cd server && npm install && cd ../client && npm install`)*

### 3. Configure Environment Variables
Copy `.env.example` to `.env` in the root and in `server/`:

```bash
# Server configuration (server/.env)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/rohit_portfolio
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGODB_URI` with your connection string:
```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rohit_portfolio?retryWrites=true&w=majority
```

### 4. Generate Binary Resume Files (If Needed)
The binary PDF and DOCX files are pre-generated and included. To regenerate them:
```bash
cd server
node scripts/generate-resumes.js
cd ..
```

### 5. Run the Application in Development
From the root directory, start both the Express backend and the Vite frontend concurrently:
```bash
npm run dev
```
- **Frontend SPA:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Automated Testing & Verification

The backend includes an automated test suite utilizing Node.js native test runner, Supertest, and `mongodb-memory-server` (allowing 100% deterministic test execution without requiring an active external MongoDB daemon):

Run the test suite:
```bash
npm test
```
*(Or `cd server && npm test`)*

### Test Suite Coverage:
- ✔ `GET /api/health` — Returns 200 with operational status and database connection.
- ✔ `POST /api/contact` — Validates payload, persists document into MongoDB, and returns 201.
- ✔ `POST /api/contact (Invalid Email)` — Rejects invalid email with 400.
- ✔ `POST /api/contact (Short Message)` — Rejects messages shorter than 10 chars with 400.
- ✔ `POST /api/contact (Honeypot Spam)` — Silently drops bot submissions without saving.
- ✔ `GET /api/resume/pdf` — Verifies 200 status, `application/pdf` MIME type, and `%PDF` binary header.
- ✔ `GET /api/resume/docx` — Verifies 200 status, Word OpenXML MIME type, and `PK` binary header.
- ✔ `GET /api/undefined-route` — Verifies structured 404 JSON response.

### Build Verification:
```bash
npm run build
```
*(Builds the React/Vite client. The Three.js background can produce a large-chunk advisory.)*

---

## 🌐 Production Deployment Guide

### Frontend Deployment (Vercel)
1. Push this repository to GitHub.
2. Link the repository to your [Vercel](https://vercel.com/) dashboard.
3. Set **Root Directory** to `client`.
4. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://your-backend-api.onrender.com/api`
6. Deploy!

### Backend Deployment (Option 1: Vercel Serverless)
1. In your [Vercel](https://vercel.com/) dashboard, click **Add New...** ➔ **Project**.
2. Import the `rohits-portfolio` repository.
3. In **Project Configuration**:
   - Set **Project Name** (e.g. `rohit-portfolio-backend`).
   - Set **Root Directory** to `server`.
4. Add **Environment Variables**:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/rohit_portfolio?retryWrites=true&w=majority`
   - `CLIENT_URL` = your Vercel frontend URL (e.g. `https://rohits-portfolio-tyg3.vercel.app`)
5. Deploy!
6. Note your backend URL (e.g. `https://rohit-portfolio-backend.vercel.app`).
7. In your **Frontend Vercel project** (`rohits-portfolio-tyg3`), set `VITE_API_BASE_URL` to `https://rohit-portfolio-backend.vercel.app/api` and redeploy.

### Backend Deployment (Option 2: Render)
1. In your [Render](https://render.com/) dashboard, create a new **Web Service**.
2. Connect this repository and set **Root Directory** to `server`.
3. Set **Build Command** to `npm install && node scripts/generate-resumes.js`.
4. Set **Start Command** to `node src/server.js`.
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/rohit_portfolio?retryWrites=true&w=majority`
   - `CLIENT_URL` = your exact Vercel frontend origin, without a trailing slash
6. Deploy!
7. Set `VITE_API_BASE_URL` in the Vercel **frontend** project to the backend's public URL ending in `/api`, then redeploy the frontend.
8. Verify `GET <backend-url>/api/health` returns HTTP 200 and `services.database` is `connected` before testing contact submissions.

`MONGODB_URI` must be set on the backend deployment that serves `/api`; a missing value is not replaced with localhost in production. If the health endpoint returns HTTP 503 with `database: disconnected`, confirm the backend's MongoDB Atlas URI, database network access, and credentials in that hosting provider's private environment settings. Do not put database credentials in frontend environment variables or commit them to the repository.

---

## 🔒 Security & Safe Practice Checks

- **Zero Secrets in Git:** All `.env` files are excluded by `.gitignore`.
- **Payload Limits:** Body parser capped at `50kb` to eliminate JSON bomb vectors.
- **Honeypot Protection:** Concealed input traps spam bots without impacting human users.
- **Security Headers:** Powered by `helmet` with strict cross-origin policies.
- **Fail-Safe Offline Mode:** If MongoDB disconnects, the API informs visitors to use direct email rather than crashing.

---

## 📜 Academic Integrity & Attribution

Portfolio project descriptions and personal details are aligned with the supplied resume. Project repository links point to the URLs listed in that resume.
- No fabricated stars, statistics, or testimonials have been introduced.
- Custom iconography integrates principles and SVG assets from [IconSpace](https://iconspace.dev/) with full attribution.

---

**Crafted by Rohit Tak** • [rohittak006@gmail.com](mailto:rohittak006@gmail.com) • [LinkedIn](https://www.linkedin.com/in/rohit-tak-7150762b8/)
