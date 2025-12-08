import os
from dotenv import load_dotenv

# Load from parent directory .env if exists, or current
load_dotenv(dotenv_path="../.env")

class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", "")
    NEON_DB_URL = os.getenv("NEON_DB_URL", "postgresql://user:pass@localhost:5432/db") # Fallback to local
    JWT_SECRET = os.getenv("JWT_SECRET", "supersecret")
    BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET", "better_auth_secret")

settings = Settings()
