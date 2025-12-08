import os
import asyncpg
from config import settings

async def get_db_connection():
    """Establish connection to Neon Postgres."""
    conn = await asyncpg.connect(settings.NEON_DB_URL)
    return conn

async def init_db():
    """Initialize database tables (No user associations)."""
    conn = await get_db_connection()
    try:
        # Personalizations Cache Table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS personalizations (
                id SERIAL PRIMARY KEY,
                chapter_path TEXT NOT NULL,
                content TEXT NOT NULL,
                options JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(chapter_path)
            );
        """)

        # Chat History Table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS chats (
                id SERIAL PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        """)
    finally:
        await conn.close()
