import google.generativeai as genai
from config import settings
import time
import asyncio

genai.configure(api_key=settings.GEMINI_API_KEY)

def get_embedding(text: str, retries: int = 3) -> list[float]:
    """Generates embeddings using Gemini API with retry logic."""
    model = 'models/embedding-001' 
    for attempt in range(retries):
        try:
            result = genai.embed_content(
                model=model,
                content=text,
                task_type="retrieval_document",
                title="Embedding of text"
            )
            return result['embedding']
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt) # Exponential backoff
            else:
                print(f"Error generating embedding: {e}")
                return []
    return []

async def get_embedding_async(text: str) -> list[float]:
    """Async wrapper for embeddings."""
    return await asyncio.to_thread(get_embedding, text)
