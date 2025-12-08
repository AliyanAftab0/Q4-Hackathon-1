# Physical AI & Robotics (Q4 Hackathon)

## Overview
A premium, dark‑mode, glassmorphism‑styled Docusaurus site that showcases a **Physical AI & Robotics** curriculum. It includes a **RAG chatbot**, chapter personalization, and auto‑translation powered by **Google Gemini 1.5 Flash**.

## Features
- **UI**: Premium dark‑mode, glassmorphism, animated hero, fully responsive.
- **AI**: "Select‑to‑Ask" RAG chatbot, chapter personalization, auto‑translation.
- **Backend**: FastAPI, Gemini 1.5 Flash (embeddings + chat), Qdrant vector store, Neon Postgres.
- **Content**: 24‑chapter comprehensive curriculum.

## Tech Stack
- **Frontend**: Docusaurus (React, TypeScript, Framer Motion)
- **Backend**: FastAPI (Python), Google Generative AI, Qdrant, Neon Postgres
- **Deployment**: GitHub Pages for static site, any cloud provider (Render, Railway, Vercel) for the FastAPI backend.

## Setup
```bash
# Clone repo
git clone https://github.com/AliyanAftab0/Q4-Hackathon-1.git
cd Q4-Hackathon-1

# Frontend (e‑book)
cd e-book
npm install
npm run start   # http://localhost:3000

# Backend (rag‑backend)
cd ../rag-backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Make sure to create a `.env` file with `GEMINI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, and `NEON_DB_URL`.

## Deploy to GitHub Pages (Static Frontend)
1. Edit `e-book/docusaurus.config.ts`:
   ```ts
   url: "https://aliyanaftab0.github.io",
   baseUrl: "/Q4-Hackathon-1/",
   organizationName: "AliyanAftab0",
   projectName: "Q4-Hackathon-1",
   ```
2. Install deployment helper:
   ```bash
   cd e-book
   npm install --save-dev gh-pages
   ```
3. Add scripts to `e-book/package.json`:
   ```json
   "scripts": { "build": "docusaurus build", "deploy": "docusaurus deploy" }
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. Enable GitHub Pages in the repo settings (branch `gh-pages`).

## Deploy Backend (FastAPI)
The backend must run on a server that supports Python. Example with Render:
1. Create a new Web Service on Render and link the GitHub repo.
2. Set the start command to `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`.
3. Add the required environment variables (`GEMINI_API_KEY`, `QDRANT_URL`, etc.) in the Render dashboard.
4. Deploy – the service URL will be something like `https://your-service.onrender.com`.
5. Update the frontend API URL in `e-book/src/lib/api.ts` to point to this backend URL.

## .gitignore
The `.env` file is now ignored to protect your API keys:
```
.env
```

## License
MIT License – feel free to fork, modify, and deploy.
