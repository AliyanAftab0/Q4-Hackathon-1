from fastapi import FastAPI, HTTPException, UploadFile, File, status, Request
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from rag import RAGSystem
from config import settings
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from db import init_db
import json

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing Database Connection...")
    await init_db()
    print("Backend Startup: Ready to serve.")
    yield
    print("Backend Shutdown.")

app = FastAPI(title="Physical AI RAG Backend", lifespan=lifespan)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://aliyanaftab0.github.io"
    ], # Frontend ports & Prod URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGSystem()

# --- Models ---
class AskRequest(BaseModel):
    query: str
    selected_text: Optional[str] = None

class IngestRequest(BaseModel):
    text: str
    metadata: dict

class PersonalizeRequest(BaseModel):
    text: str

class TranslateRequest(BaseModel):
    text: str
    target_language: str = "Urdu"

# --- Endpoints (All Public) ---

@app.post("/ask")
async def ask(request: AskRequest):
    """
    RAG Chat Endpoint - Public Access
    """
    try:
        if request.selected_text:
            # Context-specific chat
            answer = await rag.answer_with_context(request.query, request.selected_text)
            return {"answer": answer, "sources": [], "type": "context-specific"}
        else:
            # Full RAG
            result = await rag.query(request.query)
            return {"answer": result["answer"], "sources": result["sources"], "type": "rag"}
    except Exception as e:
        print(f"ERROR in /ask endpoint: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ingest")
async def ingest(request: IngestRequest):
    try:
        await rag.ingest(request.text, request.metadata)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/personalize")
async def personalize(request: PersonalizeRequest):
    """Personalize content - Public Access"""
    try:
        content = await rag.personalize(request.text, {"name": "User"})
        return content
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate")
async def translate(request: TranslateRequest):
    """Translate content - Public Access"""
    try:
        content = await rag.translate(request.text, request.target_language)
        return content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok", "version": "2.0.0-no-auth", "db": "Neon Postgres"}
