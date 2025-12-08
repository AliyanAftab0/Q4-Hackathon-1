import os
import glob
import asyncio
import sys

# Add backend to path to import rag modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../rag-backend')))

from vector_store import VectorStore
from embeddings import get_embedding_async

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../e-book/docs'))

async def process_file(filepath):
    """Reads a file, splits it into chunks, and ingests."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple chunking by paragraphs or max char length
    # For robust production, use RecursiveCharacterTextSplitter (LangChain) or similar
    # Here we simulate chunking ~1000 chars
    
    chunks = []
    chunk_size = 1000
    overlap = 100
    
    for i in range(0, len(content), chunk_size - overlap):
        chunk = content[i : i + chunk_size]
        chunks.append(chunk)

    print(f"Processing {os.path.basename(filepath)}: {len(chunks)} chunks.")
    
    vector_store = VectorStore()
    
    for idx, chunk in enumerate(chunks):
        embedding = await get_embedding_async(chunk)
        if embedding:
            metadata = {
                "source": os.path.basename(filepath),
                "path": filepath,
                "chunk_index": idx,
                "title": os.path.basename(filepath).replace('.md', '').replace('-', ' ').title()
            }
            await vector_store.upsert(chunk, embedding, metadata)
            print(f"  Upserted chunk {idx}")
        else:
            print(f"  Failed to embed chunk {idx}")

async def main():
    print(f"Scanning docs in: {DOCS_DIR}")
    files = glob.glob(os.path.join(DOCS_DIR, '**/*.md'), recursive=True)
    print(f"Found {len(files)} markdown files.")
    
    for f in files:
        await process_file(f)

if __name__ == "__main__":
    asyncio.run(main())
