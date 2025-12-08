# Physical AI & Humanoid Robotics

A World-Class Premium Textbook Platform powered by Agentic AI.

## Features
- **UI**: Premium Dark-Mode Glassmorphism, Animated Hero, Responsive.
- **AI**: "Select-to-Ask" RAG Chatbot, Chapter Personalization, Auto-Translation.
- **Backend**: FastAPI, Gemini 1.5 Flash (Embeddings + Chat), Qdrant Vector Store, Neon Postgres.
- **Content**: 24-Chapter comprehensive curriculum.

## Setup

### 1. Environment
Create `.env` in the root:
```ini
GEMINI_API_KEY=your_key_here
QDRANT_URL=http://localhost:6333
NEON_DB_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-key-change-in-production
BETTER_AUTH_URL=http://localhost:4000
PORT=4000
```

### 2. Run Auth Service
```bash
cd auth-service
npm install
npm run dev
```
*(Or use Docker: `docker-compose up auth-service`)*

### 3. Run Backend
```bash
cd rag-backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
*(Or use Docker: `docker-compose up backend`)*

### 4. Run Frontend
```bash
cd e-book
npm install
npm start
```

### 5. Initialize Database
Better Auth requires database tables. Run the migration:
```bash
cd auth-service
npm run generate
# Then apply the migrations to your database
```

### 6. Ingest Content
Index the documentation into Qdrant for the RAG chatbot to work:
```bash
python scripts/index_docs.py
```

## Demo Flow
1. Open Homepage (`localhost:3000`). Adminire the animations.
2. Go to **Docs** -> **Intro**.
3. Highlight any text -> Click **Ask Gemini**.
4. Go to **Sign Up** -> Create 'Jetson/Expert' profile.
5. Watch the future of robotics.
