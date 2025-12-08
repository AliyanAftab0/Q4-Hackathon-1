import google.generativeai as genai
from config import settings
from vector_store import VectorStore
from embeddings import get_embedding_async
import os

class RAGSystem:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.vector_store = VectorStore()

    async def answer_with_context(self, query: str, context: str) -> str:
        """Answer purely based on the provided text selection."""
        prompt = f"""
        You are an expert AI assistant for the book "Physical AI & Humanoid Robotics".
        
        INSTRUCTIONS:
        1. Answer the user's question STRICTLY based on the provided "Selected Text".
        2. If the answer is not in the text, say "I cannot answer this from the selected text."
        3. Be concise and professional.

        Selected Text:
        "{context}"

        Question:
        {query}
        """
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def query(self, query: str) -> dict:
        """Perform RAG: Embed query, search DB, answer with context."""
        # 1. Embed
        embedding = await get_embedding_async(query)
        if not embedding:
            # Fallback: Answer directly without vector search
            print("Warning: Embedding generation failed, answering without context")
            prompt = f"""
            You are an expert AI assistant for "Physical AI & Humanoid Robotics".
            Answer the following question to the best of your ability:
            
            Question: {query}
            """
            response = await self.model.generate_content_async(prompt)
            return {"answer": response.text, "sources": [], "type": "direct"}

        # 2. Retrieve
        search_results = await self.vector_store.search(embedding, limit=5)
        
        if not search_results:
             # Fallback if no vector store populated yet
            context = "No specific context found in the database."
            sources = []
        else:
            context = "\n\n".join([f"[Source: {res.payload.get('title','Doc')}]\n{res.payload.get('text','')}" for res in search_results])
            sources = [{"id": res.id, "title": res.payload.get('title', 'Unknown'), "score": res.score} for res in search_results]

        # 3. Augment & Generate
        prompt = f"""
        You are an expert technical tutor for "Physical AI & Humanoid Robotics".
        Answer the question using ONLY the provided Context sources below.
        
        - If the answer is not in the context, say "I don't have enough information in the book context to answer that, but generally..." and provide a brief general answer marked clearly as outside knowledge.
        - Cite the sources if possible.

        Context:
        {context}

        Question:
        {query}
        """
        response = await self.model.generate_content_async(prompt)
        
        return {
            "answer": response.text,
            "sources": sources
        }

    async def ingest(self, text: str, metadata: dict):
        embedding = await get_embedding_async(text)
        await self.vector_store.upsert(text, embedding, metadata)
    
    async def personalize(self, text: str, profile: dict) -> str:
        prompt = f"""
        Act as a professional technical editor. Rewrite the following textbook chapter content to suit a specific user profile.
        
        User Profile:
        {profile}
        
        Guidelines:
        - If the user is a 'Beginner', simplify complex math and use analogies.
        - If 'Advanced', expand on technical details and optimizations.
        - If 'Hardware: Jetson', mention CUDA optimizations where relevant.
        - KEEP all code blocks intact.
        - Maintain the original structure.
        
        Original Text:
        {text}
        """
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def translate(self, text: str, language: str) -> str:
        prompt = f"""
        Translate the following technical documentation into {language}.
        
        Guidelines:
        - Use high-quality, formal {language} suitable for engineering textbooks.
        - Keep all code blocks, variable names, and technical terms (like 'Tensor', 'ROS2 Node') in English where appropriate for clarity.
        - Maintain formatting (bolding, lists).

        Text:
        {text}
        """
        response = await self.model.generate_content_async(prompt)
        return response.text
