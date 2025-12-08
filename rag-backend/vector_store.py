from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from config import settings
import uuid

class VectorStore:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY if settings.QDRANT_API_KEY else None
        )
        self.collection_name = "physical_ai_book"
        self.vector_size = 768 # Standard Gemini embedding size
        self.init_collection()

    def init_collection(self):
        """Create collection if not exists."""
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE)
            )

    async def upsert(self, text: str, embedding: list[float], metadata: dict):
        """Upsert a single vector."""
        point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, text[:256])) # Deterministic ID based on content
        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload={"text": text, **metadata}
                )
            ]
        )

    async def search(self, embedding: list[float], limit: int = 5, filter_meta: dict = None):
        """Search for similar vectors."""
        query_filter = None
        if filter_meta:
            must_conditions = []
            for k, v in filter_meta.items():
                must_conditions.append(
                    FieldCondition(key=k, match=MatchValue(value=v))
                )
            query_filter = Filter(must=must_conditions)

        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=embedding,
            query_filter=query_filter,
            limit=limit
        )
        return results
