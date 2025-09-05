# API Documentation

This document lists all backend endpoints available for frontend integration. The API is served by Flask and CORS is enabled. Base URL (local): http://localhost:5000

Common headers
- Content-Type: application/json

Endpoints

1) GET /api/health
- Purpose: Check server and database readiness.
- Request: none
- Response (200):
  {
    "status": "ok",
    "database_ready": true|false,
    "total_articles": <number>,
    "rag_enabled": true|false,
    "llm_provider": "Mistral AI" (when rag_enabled true)
  }
- Errors: 200 with database_ready false when services unavailable.

2) POST /api/chat
- Purpose: Main RAG chat endpoint. Returns conversational answers based on Law 109 articles.
- Request body (JSON):
  {
    "query": "<user question>",
    "max_articles": <optional, default 5>
  }
- Success (200):
  {
    "query": "...",
    "response": "<generated text>",
    "sources": [
      {"id": "<id>", "contenido": "<article text>", "similarity_score": 0.86, "relevance": "Alta|Media|Baja"}
    ],
    "confidence": <0.0-1.0>,
    "model_used": "mistral-small-latest",
    "articles_consulted": <number>
  }
- Errors:
  - 400 if "query" missing or empty
  - 500 if RAG service unavailable or internal error

3) POST /api/search
- Purpose: Semantic search for similar articles (compatibility mode).
- Request body (JSON):
  {
    "query": "<search text>",
    "n_results": <optional, default 5>
  }
- Success (200):
  {
    "query": "...",
    "results": [
      {"id": "<id>", "contenido": "<article text>", "similarity_score": 0.92, "distance": <distance>},
      ...
    ]
  }
- Errors:
  - 400 if "query" missing or empty
  - 500 if embedding service unavailable or internal error

4) GET /api/articles/<article_id>
- Purpose: Retrieve a specific article by numeric ID.
- Path param: article_id (integer)
- Success (200):
  {"id": <id>, "contenido": "<article text>"}
- Errors:
  - 404 if article not found
  - 500 if embedding service unavailable or internal error

5) GET /api/stats
- Purpose: Return collection/database statistics.
- Success (200):
  {
    "collection_name": "articulos_ley_109",
    "total_documents": <number>,
    "model_name": "paraphrase-multilingual-MiniLM-L12-v2",
    "persist_directory": "<path>"
  }
- Errors: 500 if embedding service unavailable or internal error

6) GET /api/rag/info
- Purpose: Information about the RAG service and capabilities.
- Success (200):
  {
    "service_type": "RAG (Retrieval-Augmented Generation)",
    "llm_provider": "Mistral AI",
    "model": "mistral-small-latest",
    "embedding_model": "<model_name>",
    "total_articles": <number>,
    "capabilities": ["Búsqueda semántica", "Generación de respuestas conversacionales", ...]
  }
- Errors: 500 if RAG service unavailable or internal error

7) POST /api/generate-test
- Purpose: Generate a traffic test with random questions based on Law 109 articles.
- Request body (JSON):
  {
    "num_questions": <optional, default 20, range 1-50>
  }
- Success (200):
  {
    "test_id": "test_<timestamp>",
    "total_questions": <number>,
    "questions": [
      {
        "question": "<question text>",
        "options": ["<option 1>", "<option 2>", "<option 3>"],
        "correct_answer": <1|2|3>,
        "article_id": <article_id>,
        "article_content": "<article text>"
      },
      ...
    ],
    "generated_at": <timestamp>,
    "articles_used": [<article_id1>, <article_id2>, ...]
  }
- Errors:
  - 400 if num_questions is outside range 1-50
  - 500 if RAG service unavailable, no articles available, or question generation fails

Notes and integration tips
- All endpoints return JSON.
- POST endpoints expect a JSON body and validate that "query" exists and is not empty.
- The RAG endpoint uses an async call under the hood; expect slightly higher latency depending on model/api.
- The generate-test endpoint uses the LLM to create questions in the style of real traffic test questions, with 3 multiple choice options and the correct answer.
- When running locally, ensure the backend is started (python app.py) and that the Chromadb embeddings are initialized. The embedding service will auto-load articles from backend/articulos_ley_109.json if the vector DB is empty.

If you need example fetch/axios snippets or added fields in responses, tell me which endpoint and I will provide them.
